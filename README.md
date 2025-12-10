# 🎵 Worship Song Manager

A complete frontend-only Christian worship song management tool built with React, Vite, and Tailwind CSS. All data is stored locally using JSON files and localStorage - no backend required!

## Features

### 📚 Song Bank
- Manage your worship song library
- Add, edit, and delete songs
- Search and filter by category, key, and tempo
- Clean, intuitive table interface

### 🎯 Song Picker
- Plan worship songs by month and week
- 5 customizable slots per week:
  - Opening
  - Praise
  - Worship
  - Persembahan
  - Penutup
- Easy song selection modal
- Navigate through past and future months

### 📊 Analytics
- View most and least used songs
- Track usage by category
- Visual bar charts using Recharts
- Real-time statistics

### ⚙️ Settings
- Backup all data or individual datasets (songs, usage)
- Restore from previous backups
- Reset to factory defaults
- All data stored as JSON

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **LocalStorage** - Client-side persistence

## Project Structure

```
worship-song-manager/
├── public/
├── src/
│   ├── data/              # JSON data files
│   │   ├── songs.json
│   │   ├── usage.json
│   │   └── categories.json
│   ├── components/        # Reusable UI components
│   │   ├── ChartCard.tsx
│   │   ├── FileUploadButton.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── Layout.tsx
│   │   ├── PickerWeekCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SongFormModal.tsx
│   │   ├── SongSelectModal.tsx
│   │   └── SongTable.tsx
│   ├── contexts/          # React Context providers
│   │   ├── CategoriesContext.tsx
│   │   ├── SongsContext.tsx
│   │   └── UsageContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useCategories.ts
│   │   ├── useSongs.ts
│   │   └── useUsage.ts
│   ├── pages/             # Main application pages
│   │   ├── Analytics.tsx
│   │   ├── Settings.tsx
│   │   ├── SongBank.tsx
│   │   └── SongPicker.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Helper functions
│   │   ├── helpers.ts
│   │   └── storage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd worship-song-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Data Models

### Song
```typescript
{
  id: string;
  title: string;
  category: string;
  key: string;      // C, D, E, F, G, A, B, etc.
  tempo: number;    // BPM
}
```

### Usage Data
```typescript
{
  "2025-01": {
    "week1": {
      "opening": "songId",
      "worship": "songId",
      "praise": "songId",
      "persembahan": "songId",
      "penutup": "songId"
    }
  }
}
```

### Categories
```typescript
["Opening", "Praise", "Worship", "Persembahan", "Penutup"]
```

## Data Storage

All data is stored in two places:

1. **Initial Data**: JSON files in `src/data/` (used as defaults)
2. **Runtime Data**: Browser localStorage (persists between sessions)

### Storage Keys
- `worship-songs` - Song library
- `worship-usage` - Usage tracking
- `worship-categories` - Category list

## Features in Detail

### Song Management
- **Add Songs**: Click "Add New Song" button
- **Edit Songs**: Click "Edit" on any song row
- **Delete Songs**: Click "Delete" with confirmation
- **Search**: Real-time search by title
- **Filter**: Multi-criteria filtering (category, key, tempo)

### Song Planning
- **Select Month**: Dropdown with past and future months
- **Week Cards**: 5 weeks per month (week1-week5)
- **Slot Selection**: Click any slot to choose a song
- **Visual Feedback**: Shows currently assigned songs

### Data Backup
- **Full Backup**: Downloads all data as single JSON file
- **Partial Backup**: Songs or usage separately
- **Restore**: Upload JSON files to restore
- **Reset**: Clear all data and reload defaults

## Customization

### Adding New Categories
1. Go to Settings page
2. Or modify `src/data/categories.json`

### Adding More Slots
1. Update `SlotType` in `src/types/index.ts`
2. Update `SLOTS` array in `PickerWeekCard.tsx`
3. Add to `WeekData` interface

### Changing Styling
- Edit `tailwind.config.js` for theme changes
- Modify component classes for specific changes

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- Strict mode enabled
- React Context for state management
- Custom hooks for reusable logic

## Limitations

- **No Authentication**: Single-user, local-only
- **No Backend**: All data stored in browser
- **No Sync**: No cross-device synchronization
- **Storage Limit**: localStorage typically ~5-10MB

## Future Enhancements

Potential features to add:
- PDF export for worship schedules
- Print-friendly views
- Import from CSV
- Dark mode
- Mobile-responsive improvements
- Song lyrics storage
- YouTube video links
- Team member assignments

## Contributing

This is a self-contained project. To modify:
1. Fork or copy the project
2. Make your changes
3. Test thoroughly
4. Build and deploy

## License

Open source - feel free to use and modify as needed.

## Support

For issues or questions, check the code comments or refer to:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

**Built with ❤️ for worship teams**
# worship-song-manager
