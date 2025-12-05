import { Sparkles, ExternalLink } from 'lucide-react';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-gradient-to-b from-slate-900/50 to-slate-950 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Mobile Layout - Compact Horizontal */}
        <div className="md:hidden space-y-6">
          {/* Brand Section */}
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Stellar Illusion
            </h3>
            <p className="text-slate-400 text-xs mb-3">Viral Reel Generator - Create stunning cosmic content with AI</p>
            <a
              href="https://www.stellarillusion.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-xs font-medium"
            >
              Visit Main Site
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Links Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2 text-xs uppercase">Navigation</h4>
              <ul className="space-y-1 text-slate-400 text-xs">
                <li><button onClick={() => onNavClick('home')} className="hover:text-purple-400 transition-colors">Home</button></li>
                <li><button onClick={() => onNavClick('about')} className="hover:text-purple-400 transition-colors">About</button></li>
                <li><button onClick={() => onNavClick('contact')} className="hover:text-purple-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-xs uppercase">Resources</h4>
              <ul className="space-y-1 text-slate-400 text-xs">
                <li><a href="https://www.stellarillusion.com/blog" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="https://www.stellarillusion.com/solar-system-quiz" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Quizzes</a></li>
                <li><a href="https://www.stellarillusion.com/gravity-simulator" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Simulators</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-2 text-xs uppercase">Connect</h4>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/stellar__illusion/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors text-xs">Instagram</a>
              <a href="https://www.facebook.com/stellarillusion" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors text-xs">Facebook</a>
              <a href="https://www.youtube.com/@FreakyAstrophile" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors text-xs">YouTube</a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original 4 columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
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
              <li><button onClick={() => onNavClick('home')} className="hover:text-purple-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavClick('about')} className="hover:text-purple-400 transition-colors">About</button></li>
              <li><button onClick={() => onNavClick('contact')} className="hover:text-purple-400 transition-colors">Contact</button></li>
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

        {/* Copyright - Same for both */}
        <div className="border-t border-slate-800 pt-6 md:pt-8 text-center text-slate-500 text-xs md:text-sm">
          <p>&copy; 2024 Stellar Illusion - Viral Reel Generator. All rights reserved. Developed by Aman Mathur</p>
        </div>
      </div>
    </footer>
  );
}
