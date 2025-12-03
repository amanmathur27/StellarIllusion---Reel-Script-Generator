import { useState } from 'react';
import { Copy, Wand2, Sparkles, Volume2, Video, Clock, AlertCircle, Layers, FileText, Share2, ExternalLink } from 'lucide-react';

// --- API CONFIGURATION ---
// const API_KEY = ""; // The environment will inject the key automatically
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `
**ROLE:**
You are a World-Class Viral Content Architect and AI Director. Your goal is to create high-retention Science, Astronomy, and Tech reels that feel cinematic and emotionally gripping.

**THE "RETENTION" RULES (STRICTLY FOLLOW):**
1.  **NO GREETINGS:** Never start with "Hello" or "Today we discuss."
2.  **THE 3-SECOND HOOK:** The first 3 seconds must feature a "Pattern Interrupt" (shocking statement, counter-intuitive fact, or high stakes).
3.  **THE "YOU" PARADIGM:** Frame science around the viewer.
4.  **PACING:** No sentence longer than 12 words. Punchy audio.
5.  **EMOTIONAL ARC:** Fear/Shock -> Curiosity -> Hope/Awe.

**CRITICAL: ELEVENLABS V3 ALPHA FORMATTING RULES:**
The V3 model resets emotion after every full stop. You MUST follow these rules:
1.  **TAG EVERY SENTENCE:** You must place an expression tag *before* every single sentence.
    * *Bad:* [Excited] This is a black hole. It is huge.
    * *Good:* [Excited] This is a black hole. [Fearful whisper] It is huge.
2.  **USE THESE SPECIFIC TAG CATEGORIES:**
    * **Emotional:** [happy], [sad], [angry], [nervous], [curious], [mischievously], [calmly], [sarcastically], [awe-struck], [inspired].
    * **Delivery:** [whispers], [shouts], [speaking softly], [loudly], [dramatically], [flatly], [monotone], [deep voice], [fast paced], [slowly].
    * **Reactions/SFX:** [laughs], [sighs], [gasps], [gulps], [clears throat], [crying], [applause], [door creaks], [explosion], [gunshot], [bird chirping].
    * **Pacing:** [pause], [long pause], [rushed], [stammers], [hesitates].
3.  **LAYERING:** Combine tags for nuance, e.g., [nervous][whispers].

**VISUAL PROMPT RULES:**
* Create "Midjourney/Runway" ready prompts.
* Be extremely detailed: specify lighting (e.g., "cinematic lighting", "volumetric fog", "rembrandt lighting"), camera angles (e.g., "wide angle lens", "macro shot", "dolly zoom"), textures (e.g., "hyper-realistic 8k", "unreal engine 5 render"), and mood.

**OUTPUT FORMAT:**
Return ONLY valid JSON with this structure:
{
  "hook_strategy": "Brief explanation of why this hook stops the scroll.",
  "title_suggestion": "A viral alternative title",
  "instagram_caption": "Engaging caption with 3-5 lines of context + 10-15 relevant hashtags.",
  "youtube_shorts_caption": "Punchy 1-line caption + 3 relevant hashtags (Max 100 chars).",
  "segments": [
    {
      "time": "0:00-0:05",
      "section_type": "The Hook",
      "visual_prompt": "Detailed AI image/video prompt...",
      "text_overlay": "Big punchy text",
      "audio_script": "[Tag] Script text. [Tag] Next sentence."
    }
  ]
}
`;

export default function ViralReelArchitect() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedState, setCopiedState] = useState(null); // stores key of copied item

  const generateScript = async () => {
    if (!title || !description) return;
    
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: {
            responseMimeType: "application/json"
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      const parsedData = JSON.parse(generatedText);
      setResult(parsedData);

    } catch (err) {
      setError(err.message || "Failed to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(key);
      setTimeout(() => setCopiedState(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900/50 border border-slate-800 rounded-2xl mb-6 shadow-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Stellar Illusion - Viral Reel Architect
            </h1>
          </div>
          <p className="text-slate-400 max-w-lg mx-auto">
            Advanced scripting for Expressive ElevenLabs V3 Alpha voiceovers with cinematic visual prompts and social captions. -Developed by Aman Mathur
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 mb-8 backdrop-blur-md shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Reel Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Great Filter"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Key Concept/Twist</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Explain why we haven't found aliens yet (they are dead)."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>
          
          <button
            onClick={generateScript}
            disabled={loading || !title || !description}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
              loading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25 active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                Directing Scene...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate V3 Script
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3" />
            {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Strategy Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mr-3">
                    Viral Strategy
                  </div>
                  <h3 className="text-lg font-semibold text-white">{result.title_suggestion}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed italic">
                  "{result.hook_strategy}"
                </p>
              </div>
            </div>

            {/* Social Media Pack */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Instagram Caption */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-pink-400 font-bold text-sm">
                    <FileText className="w-4 h-4 mr-2" /> Instagram Caption
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.instagram_caption, 'insta')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {copiedState === 'insta' ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
                  {result.instagram_caption}
                </div>
              </div>

              {/* YouTube Shorts Caption */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-red-400 font-bold text-sm">
                    <Share2 className="w-4 h-4 mr-2" /> Shorts Caption
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.youtube_shorts_caption, 'yt')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                     {copiedState === 'yt' ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {result.youtube_shorts_caption}
                </div>
              </div>
            </div>

            {/* Script Timeline */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-purple-400" />
                Script Timeline
              </h3>

              {result.segments.map((segment, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group"
                >
                  {/* Segment Header */}
                  <div className="bg-slate-950/50 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                        <Clock className="w-3 h-3 mr-1" />
                        {segment.time}
                      </div>
                      <span className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                        {segment.section_type}
                      </span>
                    </div>
                  </div>

                  {/* Segment Content */}
                  <div className="p-6 grid md:grid-cols-12 gap-6">
                    
                    {/* Visual Column */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="space-y-2">
                        <label className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Video className="w-3 h-3 mr-1" /> Visual Prompt (Runway/Midjourney)
                        </label>
                        <div className="bg-slate-950 rounded-lg p-3 text-sm text-slate-300 leading-relaxed border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                          {segment.visual_prompt}
                          <button 
                            onClick={() => copyToClipboard(segment.visual_prompt, `vis-${idx}`)}
                            className="mt-2 text-xs flex items-center text-slate-500 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3 mr-1" /> 
                            {copiedState === `vis-${idx}` ? "Copied!" : "Copy Prompt"}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Layers className="w-3 h-3 mr-1" /> Text Overlay
                        </label>
                        <div className="bg-slate-950 rounded-lg p-3 text-sm font-bold text-white border border-slate-800/50 text-center">
                          {segment.text_overlay}
                        </div>
                      </div>
                    </div>

                    {/* Audio Column */}
                    <div className="md:col-span-7">
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <Volume2 className="w-3 h-3 mr-1" /> Audio Script (ElevenLabs V3)
                        </label>
                        <button
                          onClick={() => copyToClipboard(segment.audio_script, `aud-${idx}`)}
                          className="text-xs flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {copiedState === `aud-${idx}` ? (
                            <span className="flex items-center text-green-400">Copied!</span>
                          ) : (
                            <span className="flex items-center"><Copy className="w-3 h-3 mr-1" /> Copy Script</span>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 text-base text-slate-200 border border-slate-700/50 font-medium leading-relaxed font-mono">
                        {segment.audio_script.split(/(\[.*?\])/g).map((part, i) => {
                          if (part.startsWith('[') && part.endsWith(']')) {
                            // Highlighting Tags
                            return <span key={i} className="text-purple-400 font-bold bg-purple-500/10 rounded px-1">{part}</span>;
                          }
                          return part;
                        })}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        *Paste directly into ElevenLabs text input
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-8 pb-12">
              <button 
                 onClick={() => window.location.reload()}
                 className="text-slate-500 hover:text-slate-300 text-sm flex items-center justify-center w-full transition-colors"
              >
                Create Another Script
              </button>
            </div>

          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-slate-800 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Explore More on Stellar Illusion</h3>
          <p className="text-slate-400 mb-6">Discover interactive simulators, quizzes, and cosmic content on our main platform</p>
          <a 
            href="https://www.stellarillusion.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
          >
            Visit Stellar Illusion
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}