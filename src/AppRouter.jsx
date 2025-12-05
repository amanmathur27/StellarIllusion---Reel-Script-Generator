import { useState } from 'react';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { Menu, X, Sparkles, ExternalLink, History } from 'lucide-react';

export default function AppRouter() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile Menu Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[55] bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu (Slides from Right) */}
      <div className={`fixed inset-y-0 right-0 z-[60] w-64 bg-slate-900 border-l border-slate-800 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-purple-400">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 -mr-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.name}
            </button>
          ))}
          
          {/* History Toggle Button (Mobile) */}
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg font-medium transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>

          <a
            href="https://www.stellarillusion.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all mt-4"
          >
            Visit Main Site
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-950 rounded-lg p-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Stellar Illusion
                </span>
                <span className="text-xs text-slate-500 font-medium">Viral Reel Generator</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium transition-all duration-300 relative group ${
                    currentPage === item.id
                      ? 'text-purple-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {currentPage === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA & History Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
                aria-label="Toggle history"
              >
                <History className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
              </button>
              <a
                href="https://www.stellarillusion.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Visit Main Site
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div>
        {currentPage === 'home' && <App showHistory={showHistory} setShowHistory={setShowHistory} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </div>

      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
