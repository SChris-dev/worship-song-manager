import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SongsProvider } from './contexts/SongsContext';
import { UsageProvider } from './contexts/UsageContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { Layout } from './components/Layout';
import { SongBank } from './pages/SongBank';
import { SongPicker } from './pages/SongPicker';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CategoriesProvider>
          <SongsProvider>
            <UsageProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Navigate to="/songs" replace />} />
                  <Route path="songs" element={<SongBank />} />
                  <Route path="picker" element={<SongPicker />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </UsageProvider>
          </SongsProvider>
        </CategoriesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
