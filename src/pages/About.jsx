import { Sparkles, Rocket, Users, Target, Heart, Zap, Globe, BookOpen, ExternalLink } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Aman Mathur',
      role: 'Founder & Lead Developer',
      bio: 'Passionate about making space exploration accessible through technology',
      icon: '🚀'
    },
    {
      name: 'Cosmic Community',
      role: 'Global Explorers',
      bio: 'Thousands of astronomy enthusiasts and educators worldwide',
      icon: '🌍'
    }
  ];

  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge AI and interactive technology'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'Making complex cosmic concepts understandable for everyone'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Community',
      description: 'Building a global network of space enthusiasts and educators'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Delivering scientifically accurate and visually stunning experiences'
    }
  ];

  const milestones = [
    { year: '2024', achievement: 'Launched Stellar Illusion Platform' },
    { year: '2024', achievement: 'Reached 50,000+ Active Users' },
    { year: '2024', achievement: 'Created 1,000+ Astronomy Resources' },
    { year: '2024', achievement: 'Expanded to 150+ Countries' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900/50 border border-slate-800 rounded-2xl mb-6 shadow-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Stellar Illusion
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mt-6">
            Your gateway to space exploration through interactive simulators, quizzes, and cosmic discoveries. We're on a mission to make the universe accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Stellar Illusion was born from a childhood fascination with the night sky. Our mission is to make the wonders of the universe accessible to everyone through immersive digital experiences that blend scientific accuracy with artistic beauty.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We believe that understanding our cosmos inspires wonder, curiosity, and a deeper appreciation for our place in the universe. Through interactive tools, engaging content, and cutting-edge technology, we're democratizing space education.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center">
                  <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-slate-300 italic">
                    "Explore the cosmos and discover your place among the stars"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <div className="text-purple-400 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Journey</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-slate-700 transition-colors">
                <div className="text-2xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                <p className="text-slate-300 text-sm">{milestone.achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                <div className="text-5xl mb-4">{member.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-slate-800 rounded-3xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
                <p className="text-slate-400">Active Users</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
                <p className="text-slate-400">Resources Created</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">150+</div>
                <p className="text-slate-400">Countries Reached</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
                <p className="text-slate-400">Available Access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <Target className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Interactive Simulators</h3>
              <p className="text-slate-400">Experience gravity, space flight, and asteroid challenges firsthand</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Educational Content</h3>
              <p className="text-slate-400">Comprehensive articles and quizzes on astronomy and space science</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <Users className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community</h3>
              <p className="text-slate-400">Connect with fellow space enthusiasts and educators worldwide</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-slate-800 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of cosmic explorers discovering the wonders of the universe through interactive experiences and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.stellarillusion.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25">
                Visit Stellar Illusion
                <ExternalLink className="w-5 h-5" />
              </a>
              <a href="https://www.stellarillusion.com/contact-us/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-xl transition-all hover:bg-slate-900/50">
                Get in Touch
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
