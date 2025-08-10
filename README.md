# Puppi ur companion🐶 - Static HTML/CSS/JavaScript Version

A cute study companion web application converted to pure HTML, CSS, and JavaScript for easy deployment and sharing.

## Features

🐶 **Puppi AI Companion** - Your friendly AI study buddy (simulated responses)
⏰ **Pomodoro Timer** - Customizable study sessions with break reminders  
📝 **Task Management** - Add, complete, and organize your tasks
💫 **Motivational Quotes** - Daily inspiration with save and share features
🧘 **Self-Care Tools** - Water tracking, mood monitoring, and breathing exercises
📊 **Analytics Dashboard** - Track your study progress and achievements
🌧️ **Background Themes** - Relaxing thunderstorm video background
🎁 **Kinder Joy Surprises** - Hidden treats and interactions

## Files Included

- `index.html` - Main application structure
- `styles.css` - Complete styling and theme system  
- `script.js` - All functionality and interactivity
- `thunderstorm-video.mp4` - Background thunderstorm video
- `kinderjoy-video.mp4` - Kinder Joy button video
- `README.md` - This documentation file

## Quick Start

1. Extract all files to a folder
2. Open `index.html` in any modern web browser
3. Enjoy your cute study companion!

## Browser Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- HTML5 video support

## Features Overview

### 🏠 Home Section
- Welcome message with daily affirmations
- Quick action buttons to navigate to different features
- Cute puppy-themed design with animations

### ⏰ Pomodoro Timer
- Customizable study and break durations
- Visual circular progress indicator
- Session statistics tracking
- Audio notifications for session completion
- Local storage for persistence

### 📝 Task Management
- Add tasks with descriptions and priority levels
- Mark tasks as complete/incomplete
- Filter tasks (All, Pending, Completed)
- Edit and delete functionality
- Persistent storage

### 💫 Motivational Quotes
- Curated collection of inspirational quotes
- Save favorite quotes
- Share quotes (copy to clipboard)
- Random quote generation

### 🧘 Self-Care Features
- **Water Tracker**: Visual glass filling system with 8-glass daily goal
- **Mood Tracker**: Select and track daily emotions
- **Breathing Exercise**: Guided breathing with visual circle animation

### 📊 Analytics
- Study session statistics
- Daily and weekly progress tracking
- Achievement system
- Visual progress bars

### 🐶 AI Assistant (Simulated)
- Chat interface with Puppi companion
- Context-aware responses based on keywords
- Daily greeting system
- Conversation history
- Typing indicators

### 🌧️ Background Themes
- Fullscreen thunderstorm video background
- Auto-fading controls (appear on left hover)
- Volume and play/pause controls
- Smooth fade animations

## Local Storage Features

The application uses browser local storage to save:
- Tasks and their completion status
- Saved quotes
- Pomodoro timer settings and statistics
- Water intake tracking
- Current mood selection
- Daily greeting status
- AI conversation history

## Customization

### Colors and Themes
Edit the CSS custom properties in `styles.css`:

```css
:root {
  --primary-color: hsl(339, 100%, 70%);
  --secondary-color: hsl(339, 50%, 55%);
  --accent-color: hsl(331, 70%, 85%);
  /* ... more color variables */
}
```

### Adding New Quotes
Modify the `quotes` array in `script.js`:

```javascript
let quotes = [
    { text: "Your new quote here", author: "Author Name" },
    // ... existing quotes
];
```

### Pomodoro Settings
Default timer values can be changed in `script.js`:

```javascript
let pomodoroState = {
    studyTime: 25,    // minutes
    breakTime: 5,     // minutes
    longBreakTime: 15 // minutes
    // ...
};
```

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Accessibility Features

- Keyboard navigation support
- Focus indicators
- High contrast mode support
- Screen reader friendly structure
- Reduced motion preferences respected

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment Options

### Local File System
Simply open `index.html` in a web browser

### Web Server
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

### Simple HTTP Server
For development/testing:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

## Known Limitations

- AI responses are simulated (not connected to real AI API)
- Video files require HTTPS for autoplay on some browsers
- Local storage has size limitations (usually 5-10MB)
- Some features may require user interaction to fully activate

## Tips for Best Experience

1. **First Load**: Allow video autoplay when prompted
2. **Audio**: Enable sound for timer notifications
3. **Storage**: Don't clear browser data to keep your progress
4. **Mobile**: Use landscape mode for better experience on small screens

## Troubleshooting

### Videos Not Playing
- Check if browser supports MP4 format
- Ensure files are served over HTTPS if needed
- Try refreshing the page

### Data Not Saving
- Check if localStorage is enabled
- Ensure you're not in private/incognito mode
- Clear browser cache and try again

### Performance Issues
- Close other browser tabs
- Restart browser
- Check available system memory

## License

This is a cute study companion app created for educational and personal use. The thunderstorm and Kinder Joy videos are included for demonstration purposes.

## Credits

- **Design**: Cute puppy-themed aesthetic with pastel colors
- **Fonts**: Google Fonts (Nunito, Pacifico)
- **Icons**: Font Awesome
- **Videos**: Background media for ambiance

---

Made with 💖 for students who love cute and functional study tools!

🐶✨ Happy studying with Puppi ur companion! ✨🐶