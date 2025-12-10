# 🚀 Quick Start Guide

## Installation & Setup

```bash
# Navigate to project
cd worship-song-manager

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## First Steps

### 1️⃣ Explore the Song Bank
- Navigate to **Song Bank** (default page)
- You'll see 5 sample songs pre-loaded
- Try searching, filtering, and adding a new song

### 2️⃣ Plan Your Worship Schedule
- Go to **Song Picker**
- Select current or future month
- Click any slot in any week
- Choose a song from the modal
- Song is automatically saved to localStorage

### 3️⃣ View Analytics
- Go to **Analytics**
- See most/least used songs
- View usage by category
- Statistics update in real-time

### 4️⃣ Backup Your Data
- Go to **Settings**
- Click "Backup All Data"
- JSON file downloads to your computer
- Keep it safe for future restoration

## Key Features Demo

### Add a Song
1. Click "Add New Song" button
2. Fill in:
   - Title: "Amazing Love"
   - Category: Worship
   - Key: G
   - Tempo: 85
3. Click "Add"

### Plan a Service
1. Go to Song Picker
2. Select current month
3. Click "Opening" slot in Week 1
4. Search for "Hosanna"
5. Click to select
6. Repeat for other slots

### View Statistics
1. Go to Analytics
2. See which songs are used most
3. Check category distribution
4. Plan future services based on data

## Data Persistence

- All changes saved automatically to **localStorage**
- Data persists even after closing browser
- No internet connection required
- No account or login needed

## Keyboard Shortcuts

- **Tab** - Navigate through forms
- **Enter** - Submit forms
- **Escape** - Close modals (add to components if needed)

## Tips & Best Practices

### Song Management
- Use consistent naming (title case)
- Set accurate tempos for planning
- Use categories to organize by service type

### Planning Services
- Plan 2-3 months in advance
- Review analytics before planning
- Rotate songs to avoid repetition

### Data Safety
- Backup data monthly
- Test restore process occasionally
- Keep backups in cloud storage (Google Drive, Dropbox)

## Troubleshooting

### Songs Not Saving?
- Check browser localStorage is enabled
- Clear browser cache and reload
- Try different browser

### Charts Not Showing?
- Ensure you have usage data
- Check browser console for errors
- Try clearing filters

### Modal Not Opening?
- Refresh the page
- Check browser console
- Ensure JavaScript is enabled

## File Structure Quick Reference

```
src/
├── data/           ← JSON seed data
├── components/     ← UI components  
├── contexts/       ← State management
├── hooks/          ← Data logic
├── pages/          ← Main views
├── types/          ← TypeScript types
└── utils/          ← Helper functions
```

## Build for Production

```bash
# Build static files
npm run build

# Files output to dist/
# Deploy dist/ folder to any static host:
# - Netlify
# - Vercel  
# - GitHub Pages
# - Any web server
```

## Next Steps

1. ✅ Customize categories in Settings
2. ✅ Add your church's song library
3. ✅ Plan upcoming services
4. ✅ Share with worship team
5. ✅ Set up regular backups

---

**Need Help?** Check the main [README.md](./README.md) for full documentation.
