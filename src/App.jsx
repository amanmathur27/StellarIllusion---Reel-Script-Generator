import { useState, useEffect } from 'react';
import { Copy, Wand2, Sparkles, Volume2, Video, Clock, AlertCircle, Layers, FileText, Share2, History, X, Trash2 } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { SYSTEM_PROMPT } from './config/systemPrompt';

// --- API CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // The environment will inject the key automatically
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

// --- FIREBASE SETUP ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export default function ViralReelArchitect({ showHistory, setShowHistory }) {
  // State
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedState, setCopiedState] = useState(null);
  const [history, setHistory] = useState([]);

  // --- AUTHENTICATION ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          // Note: signInWithCustomToken is not imported, using anonymous auth instead
          await signInAnonymously(auth);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Authentication error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // --- FIRESTORE HISTORY LISTENER ---
  useEffect(() => {
    if (!user) return;

    // Strict Path Rule: /artifacts/{appId}/users/{userId}/scripts
    const scriptsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'scripts');
    
    // Listen for real-time updates
    const unsubscribe = onSnapshot(scriptsRef, (snapshot) => {
      const loadedHistory = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort in memory (Rule 2: No complex queries)
      // Sort by timestamp descending (newest first)
      loadedHistory.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setHistory(loadedHistory);
    }, (err) => {
      console.error("Error fetching history:", err);
    });

    return () => unsubscribe();
  }, [user]);

  // --- GENERATION LOGIC ---
  const generateScript = async () => {
    if (!title || !description) return;
    if (!user) {
      setError("Waiting for authentication... please try again in a second.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    const userPrompt = `
      Title: ${title}
      Description: ${description}
      Generate a viral reel script following the ElevenLabs V3 and Retention rules.
    `;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { responseMimeType: "application/json" }
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      
      // Validate API response structure
      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid API response format');
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      const parsedData = JSON.parse(generatedText);
      
      setResult(parsedData);

      // Save to Firestore History
      await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'scripts'), {
        title: title,
        description: description,
        result: parsedData,
        createdAt: serverTimestamp()
      });

    } catch (err) {
      setError(err.message || "Failed to generate script.");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---
  const loadFromHistory = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setResult(item.result);
    setShowHistory(false); // Close sidebar on mobile
  };

  const deleteHistoryItem = async (e, itemId) => {
    e.stopPropagation(); // Prevent loading the item when clicking delete
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'scripts', itemId));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(key);
      setTimeout(() => setCopiedState(null), 2000);
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Mobile Overlay Backdrop */}
      {showHistory && (
        <div 
          className="fixed inset-0 z-[55] bg-black/50"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* --- HISTORY SIDEBAR (Slides from Left) --- */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${showHistory ? 'translate-x-0' : '-translate-x-full'} md:fixed md:z-[60] md:border-r md:border-slate-800 flex flex-col h-screen pt-16 md:pt-0`}>
        <div className="p-4 h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold flex items-center text-slate-200">
              <History className="w-5 h-5 mr-2 text-purple-400" />
              History
            </h2>
            <button 
              onClick={() => setShowHistory(false)} 
              className="md:hidden p-2 -mr-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              aria-label="Close history"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* History Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
            {history.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">
                No generated scripts yet.
              </div>
            ) : (
              history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="group relative p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800 border border-slate-800/50 hover:border-purple-500/30 transition-all cursor-pointer"
                >
                  <h3 className="font-medium text-slate-300 text-sm truncate pr-6">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">{item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}</p>
                  
                  <button 
                    onClick={(e) => deleteHistoryItem(e, item.id)}
                    className="absolute right-2 top-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
                    aria-label="Delete history item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-2">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">V3 Alpha Edition</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                New Reel Project
              </h1>
            </div>

            {/* Input Form */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Reel Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Great Filter"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Core Concept / Twist</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the topic and the scary/mind-blowing fact you want to highlight..."
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <button
                  onClick={generateScript}
                  disabled={loading || !title || !description}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
                    loading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25 active:scale-[0.99]'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Crafting Viral Hook...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Script
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 mr-3" />
                {error}
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Strategy Note */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded uppercase">Strategy</div>
                    <h3 className="font-semibold text-white">{result.title_suggestion}</h3>
                  </div>
                  <p className="text-slate-400 text-sm italic">"{result.hook_strategy}"</p>
                </div>

                {/* Social Captions */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-pink-400 font-bold text-xs uppercase"><FileText className="w-3 h-3 mr-2"/> Instagram</div>
                      <button onClick={() => copyToClipboard(result.instagram_caption, 'insta')} className="text-xs text-slate-500 hover:text-white">{copiedState === 'insta' ? "Copied!" : "Copy"}</button>
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap h-24 overflow-y-auto custom-scrollbar">{result.instagram_caption}</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-red-400 font-bold text-xs uppercase"><Share2 className="w-3 h-3 mr-2"/> Shorts</div>
                      <button onClick={() => copyToClipboard(result.youtube_shorts_caption, 'yt')} className="text-xs text-slate-500 hover:text-white">{copiedState === 'yt' ? "Copied!" : "Copy"}</button>
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap">{result.youtube_shorts_caption}</p>
                  </div>
                </div>

                {/* Script Segments */}
                <div className="space-y-4">
                   <div className="flex items-center text-slate-400 font-bold uppercase tracking-wider text-xs">
                    <Layers className="w-4 h-4 mr-2" /> Script Timeline
                   </div>

                   {result.segments.map((segment, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                      <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded flex items-center">
                             <Clock className="w-3 h-3 mr-1" /> {segment.time}
                           </span>
                           <span className="text-xs font-bold text-slate-300 uppercase">{segment.section_type}</span>
                        </div>
                      </div>

                      <div className="p-4 grid md:grid-cols-2 gap-6">
                        {/* Visuals */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center mb-1"><Video className="w-3 h-3 mr-1"/> Visual Prompt</label>
                            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-xs text-slate-300 leading-relaxed relative group">
                              {segment.visual_prompt}
                              <button onClick={() => copyToClipboard(segment.visual_prompt, `vis-${idx}`)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-slate-800 p-1 rounded text-slate-400 hover:text-white transition-opacity">
                                <Copy className="w-3 h-3"/>
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center mb-1"><Layers className="w-3 h-3 mr-1"/> Text Overlay</label>
                            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-xs font-bold text-center text-white">{segment.text_overlay}</div>
                          </div>
                        </div>

                        {/* Audio */}
                        <div>
                           <div className="flex justify-between items-center mb-1">
                             <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center"><Volume2 className="w-3 h-3 mr-1"/> Audio (ElevenLabs V3)</label>
                             <button onClick={() => copyToClipboard(segment.audio_script, `aud-${idx}`)} className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center">
                               {copiedState === `aud-${idx}` ? "Copied!" : <><Copy className="w-3 h-3 mr-1"/> Copy Script</>}
                             </button>
                           </div>
                           <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50 text-sm text-slate-200 font-mono leading-relaxed">
                              {segment.audio_script.split(/(\[.*?\])/g).map((part, i) => (
                                part.startsWith('[') && part.endsWith(']') 
                                  ? <span key={i} className="text-purple-400 font-bold">{part}</span> 
                                  : part
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                   ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}