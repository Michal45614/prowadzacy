import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SubjectsView from './SubjectsView';
import AttendanceView from './AttendanceView';
import GradesView from './GradesView';
import SectionsView from './SectionsView';

// 2. Główny komponent aplikacji
function App() {
  return (
      <Router>
        {/* Główny kontener - układ Flexbox (menu po lewej, treść po prawej) */}
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>

          {/* Pasek boczny (Sidebar) */}
          <nav style={{ width: '260px', backgroundColor: '#1e272e', color: 'white', padding: '20px' }}>
            <h2 style={{ color: '#00d8d6', borderBottom: '1px solid #485460', paddingBottom: '20px', marginBottom: '20px' }}>
              Panel Prowadzącego
            </h2>

            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li>
                <Link to="/" style={{ color: '#d2dae2', textDecoration: 'none', fontSize: '18px', display: 'block', padding: '10px', borderRadius: '5px' }}>
                  Tematy Projektów
                </Link>
              </li>
              <li>
                <Link to="/sekcje" style={{ color: '#d2dae2', textDecoration: 'none', fontSize: '18px', display: 'block', padding: '10px', borderRadius: '5px' }}>
                  Sekcje projektowe
                </Link>
              </li>
              <li>
                <Link to="/obecnosc" style={{ color: '#d2dae2', textDecoration: 'none', fontSize: '18px', display: 'block', padding: '10px', borderRadius: '5px' }}>
                  Obecność
                </Link>
              </li>
              <li>
                <Link to="/oceny" style={{ color: '#d2dae2', textDecoration: 'none', fontSize: '18px', display: 'block', padding: '10px', borderRadius: '5px' }}>
                  Oceny
                </Link>
              </li>
            </ul>
          </nav>

          {/* Prawa strona - dynamicznie zmieniająca się treść */}
          <main style={{ flex: 1, padding: '40px', backgroundColor: '#f1f2f6', color: '#2f3640' }}>
            <Routes>
              <Route path="/" element={<SubjectsView />} />
              <Route path="/sekcje" element={<SectionsView />} />
              <Route path="/obecnosc" element={<AttendanceView />} />
              <Route path="/oceny" element={<GradesView />} />
            </Routes>
          </main>

        </div>
      </Router>
  );
}

export default App;