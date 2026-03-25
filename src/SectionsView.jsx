import { useState } from 'react';
import sectionsData from './sekcje.json'; // Importujemy Twoje dane o sekcjach

const SectionsView = () => {
    const [sections, setSections] = useState(sectionsData);
    const currentUser = "dr inż. Jan Kowalski"; // Symulacja zalogowanego użytkownika

    // Funkcja usuwająca sekcję
    const handleDelete = (idToRemove) => {
        if (window.confirm("Czy na pewno chcesz usunąć tę sekcję?")) {
            setSections(sections.filter(sec => sec.id !== idToRemove));
        }
    };

    // Funkcja pomocnicza do kolorowania statusów
    const getStatusBadge = (stan) => {
        switch (stan) {
            case 'otwarta':
                return { bg: '#e3fce0', text: '#27ae60' };
            case 'zamknięta':
                return { bg: '#ffeaea', text: '#d63031' };
            case 'utworzona':
                return { bg: '#f1f2f6', text: '#7f8fa6' };
            default:
                return { bg: '#f1f2f6', text: '#2d3436' };
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>👥 Sekcje Projektowe</h2>
                <button style={{
                    padding: '10px 20px', backgroundColor: '#0984e3', color: 'white',
                    border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                    + Utwórz nową sekcję
                </button>
            </div>

            <p style={{ color: '#636e72', marginBottom: '20px' }}>
                Zalogowany jako: <strong>{currentUser}</strong>
            </p>

            {/* Siatka kart (Grid) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px'
            }}>
                {sections.map((sec) => {
                    const badgeStyle = getStatusBadge(sec.stan);
                    const isOwner = sec.prowadzacy === currentUser;

                    return (
                        <div key={sec.id} style={{
                            backgroundColor: 'white', borderRadius: '8px', padding: '20px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderTop: `4px solid ${badgeStyle.text}`,
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                        }}>

                            {/* Nagłówek karty */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <h3 style={{ margin: 0, color: '#2d3436' }}>{sec.id}</h3>
                                    <span style={{
                                        backgroundColor: badgeStyle.bg, color: badgeStyle.text,
                                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'
                                    }}>
                    {sec.stan.toUpperCase()}
                  </span>
                                </div>

                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#636e72' }}>
                                    Prowadzący: <strong>{sec.prowadzacy}</strong>
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#636e72' }}>
                                    Zapełnienie: <strong>{sec.ilosc_zapisanych_osob} / {sec.limit_osob}</strong>
                                </p>

                                {/* Lista studentów */}
                                <div style={{ marginTop: '15px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#2d3436' }}>Zapisani studenci:</h4>
                                    {sec.zapisani_studenci.length > 0 ? (
                                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#2d3436' }}>
                                            {sec.zapisani_studenci.map((student, idx) => (
                                                <li key={idx} style={{ marginBottom: '4px' }}>{student}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span style={{ fontSize: '13px', color: '#b2bec3', fontStyle: 'italic' }}>Brak zapisanych studentów</span>
                                    )}
                                </div>
                            </div>

                            {/* Przyciski akcji na dole karty */}
                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                {isOwner ? (
                                    <>
                                        <button style={{ flex: 1, padding: '8px', backgroundColor: '#fdcb6e', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#2d3436' }}>
                                            Zarządzaj składem
                                        </button>
                                        <button onClick={() => handleDelete(sec.id)} style={{ padding: '8px', backgroundColor: '#ff7675', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Usuń
                                        </button>
                                    </>
                                ) : (
                                    <span style={{ color: '#b2bec3', fontSize: '12px', textAlign: 'center', width: '100%', padding: '8px' }}>
                     Brak uprawnień do edycji
                   </span>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SectionsView;