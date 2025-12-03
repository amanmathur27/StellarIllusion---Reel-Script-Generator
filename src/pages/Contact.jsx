import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate form submission (replace with actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'contact@stellarillusion.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Phone',
      value: '+91 (555) 123-4567',
      description: 'Available Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Location',
      value: 'Global Community',
      description: 'Serving explorers worldwide'
    }
  ];

  const faqs = [
    {
      question: 'How can I use Stellar Illusion for education?',
      answer: 'Stellar Illusion offers free educational resources including interactive simulators, quizzes, and articles. Teachers can use our tools in classrooms to make astronomy engaging and accessible.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, Stellar Illusion is web-based and works on all modern browsers. Mobile optimization is in progress for a better experience on smartphones and tablets.'
    },
    {
      question: 'Can I contribute content to Stellar Illusion?',
      answer: 'Yes! We welcome contributions from educators, astronomers, and space enthusiasts. Contact us to discuss collaboration opportunities.'
    },
    {
      question: 'How accurate is the scientific information?',
      answer: 'All content is reviewed by astronomy experts and based on current scientific data. We update our resources regularly to reflect the latest discoveries.'
    },
    {
      question: 'Is Stellar Illusion free to use?',
      answer: 'Yes, Stellar Illusion is completely free. We believe space exploration should be accessible to everyone.'
    },
    {
      question: 'How can I report a bug or suggest a feature?',
      answer: 'Use the contact form below or email us directly. We value user feedback and actively work on improvements.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

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
              Get in Touch
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mt-6">
            Have questions, feedback, or want to collaborate? We'd love to hear from you. Reach out to the Stellar Illusion team.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors text-center">
                <div className="text-purple-400 mb-4 flex justify-center">{method.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-slate-300 font-semibold mb-2">{method.value}</p>
                <p className="text-slate-500 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-purple-400" />
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl flex items-center">
                <CheckCircle className="w-5 h-5 mr-3" />
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 mr-3" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows="6"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
                  loading
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25 active:scale-[0.99]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center text-slate-400 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              We typically respond within 24 hours
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-900/80 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                  <span className={`text-purple-400 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-slate-800 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
            <p className="text-slate-400 mb-8">Follow Stellar Illusion on social media for the latest cosmic discoveries and updates</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.instagram.com/stellar__illusion/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/stellarillusion" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-colors">
                Facebook
              </a>
              <a href="https://www.youtube.com/@FreakyAstrophile" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-colors">
                YouTube
              </a>
              <a href="https://www.stellarillusion.com/contact-us/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white rounded-lg transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-slate-800 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you have questions or just want to start your cosmic journey, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.stellarillusion.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25">
                Visit Main Site
                <ExternalLink className="w-5 h-5" />
              </a>
              <button onClick={() => window.location.href = '/'} className="px-8 py-3 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-xl transition-all hover:bg-slate-900/50">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
