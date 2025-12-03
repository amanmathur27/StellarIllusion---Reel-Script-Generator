# Stellar Illusion - Viral Reel Architect

A cutting-edge AI-powered tool for generating viral short-form video scripts optimized for ElevenLabs V3 Alpha voiceovers. Create cinematic, retention-focused reels for Science, Astronomy, and Tech content with AI-generated visual prompts, social media captions, and expressive audio scripts.

## Features

- **AI-Powered Script Generation**: Uses Google's Gemini 2.5 Flash model to generate viral reel scripts
- **ElevenLabs V3 Alpha Integration**: Generates scripts with emotion and delivery tags for expressive voiceovers
- **Cinematic Visual Prompts**: AI-generated prompts optimized for Midjourney and Runway AI
- **Social Media Optimization**: Auto-generates captions for Instagram and YouTube Shorts
- **Retention-Focused Design**: Built-in hooks and pacing rules to maximize viewer engagement
- **Timeline-Based Structure**: Organized script segments with time codes, visuals, overlays, and audio
- **One-Click Copy**: Easy clipboard integration for all generated content

## Tech Stack

- **Frontend**: React 19.2 + Vite 7.2
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Icons**: Lucide React 0.555
- **AI API**: Google Generative AI (Gemini 2.5 Flash)
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint 9.39

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Google Gemini API key (get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd siviralreelrenegrator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Check code quality:
```bash
npm run lint
```

## How to Use

1. **Enter Reel Title**: Provide a catchy title for your reel (e.g., "The Great Filter")
2. **Enter Key Concept/Twist**: Describe the main idea or plot twist (e.g., "Explain why we haven't found aliens yet")
3. **Generate Script**: Click "Generate V3 Script" to create your viral reel
4. **Review Output**:
   - **Hook Strategy**: Why this opening will stop the scroll
   - **Title Suggestion**: Alternative viral title
   - **Social Captions**: Ready-to-use Instagram and YouTube Shorts captions
   - **Script Timeline**: Detailed segments with:
     - Visual prompts for AI video generation
     - Text overlays
     - Audio scripts with ElevenLabs V3 emotion/delivery tags

5. **Copy & Use**: Click copy buttons to grab any content for your workflow

## Script Output Format

Each generated script includes:

```json
{
  "hook_strategy": "Why this hook stops the scroll",
  "title_suggestion": "Alternative viral title",
  "instagram_caption": "Multi-line caption with hashtags",
  "youtube_shorts_caption": "Punchy 1-line caption",
  "segments": [
    {
      "time": "0:00-0:05",
      "section_type": "The Hook",
      "visual_prompt": "Detailed AI image/video prompt",
      "text_overlay": "Big punchy text",
      "audio_script": "[Tag] Script with emotion tags"
    }
  ]
}
```

## Key Design Principles

### Retention Rules
- **No Greetings**: Scripts start with pattern interrupts, not pleasantries
- **3-Second Hook**: First 3 seconds feature shocking statements or counter-intuitive facts
- **Punchy Pacing**: No sentence longer than 12 words
- **Emotional Arc**: Fear/Shock → Curiosity → Hope/Awe

### ElevenLabs V3 Alpha Formatting
- Every sentence tagged with emotion/delivery expressions
- Emotion tags: `[happy]`, `[sad]`, `[angry]`, `[nervous]`, `[curious]`, `[awe-struck]`, etc.
- Delivery tags: `[whispers]`, `[shouts]`, `[dramatically]`, `[fast paced]`, etc.
- Reaction tags: `[gasps]`, `[laughs]`, `[sighs]`, etc.

### Visual Prompt Standards
- Cinematic lighting specifications
- Camera angles and lens types
- Texture and rendering details (8K, Unreal Engine 5, etc.)
- Mood and atmosphere

## Project Structure

```
siviralreelrenegrator/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── .env                  # Environment variables (not committed)
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Dependencies and scripts
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for script generation | Yes |

## API Integration

The app uses Google's Generative AI API with:
- **Model**: `gemini-2.5-flash-preview-09-2025`
- **Response Format**: JSON
- **System Prompt**: Specialized instructions for viral content creation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with ES2020+ support

## Performance

- Fast HMR (Hot Module Replacement) with Vite
- Optimized React 19 rendering
- Tailwind CSS purging for minimal bundle size
- Lazy-loaded API responses

## Troubleshooting

### API Key Issues
- Ensure `VITE_GEMINI_API_KEY` is set in `.env`
- Verify the key is valid at [Google AI Studio](https://aistudio.google.com/)
- Check API quota and rate limits

### Generation Failures
- Check browser console for error messages
- Verify internet connection
- Ensure API key has sufficient quota
- Try with simpler title/concept

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (`npm run dev`)
- Check Tailwind CSS configuration

## Contributing

Contributions are welcome! Please ensure:
- Code passes ESLint checks (`npm run lint`)
- Changes maintain the existing code style
- New features include appropriate documentation

## License

This project is private and proprietary.

## Credits

Developed by Aman Mathur

---

**Ready to create viral content?** Start the dev server and begin generating your next hit reel!
