import { useState } from 'react';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import { Menu, X, Sparkles, ExternalLink } from 'lucide-react';

export default function AppRouter() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-4">
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
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-slate-800 pt-4">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <a
                href="https://www.stellarillusion.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all mt-2"
              >
                Visit Main Site
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <div>
        {currentPage === 'home' && <App />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900/50 to-slate-950 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Stellar Illusion
              </h3>
              <p className="text-slate-400 text-sm">Viral Reel Generator - Create stunning cosmic content with AI</p>
              <a
                href="https://www.stellarillusion.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                Visit Main Site
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={() => handleNavClick('home')} className="hover:text-purple-400 transition-colors">Home</button></li>
                <li><button onClick={() => handleNavClick('about')} className="hover:text-purple-400 transition-colors">About</button></li>
                <li><button onClick={() => handleNavClick('contact')} className="hover:text-purple-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Stellar Illusion</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://www.stellarillusion.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="https://www.stellarillusion.com/solar-system-quiz" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Quizzes</a></li>
                <li><a href="https://www.stellarillusion.com/gravity-simulator" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Simulators</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://www.instagram.com/stellar__illusion/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Instagram</a></li>
                <li><a href="https://www.facebook.com/stellarillusion" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Facebook</a></li>
                <li><a href="https://www.youtube.com/@FreakyAstrophile" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2024 Stellar Illusion - Viral Reel Generator. All rights reserved. Developed by Aman Mathur</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
