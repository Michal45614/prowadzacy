import { useState } from 'react';
import mockData from './dane.json'; // Importujemy Twoje dane

const SubjectsView = () => {
    // Stan (state) przechowujący listę tematów. Używamy useState, żeby React
    // automatycznie odświeżył tabelę po usunięciu jakiegoś elementu.
    const [subjects, setSubjects] = useState(mockData);

    // Symulacja zalogowanego prowadzącego
    const currentUser = "dr inż. Jan Kowalski";

    // Funkcja usuwająca temat z listy
    const handleDelete = (idToRemove) => {
        if (window.confirm("Czy na pewno chcesz usunąć ten temat?")) {
            const updatedSubjects = subjects.filter(subject => subject.id !== idToRemove);
            setSubjects(updatedSubjects);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>📚 Zarządzanie Tematami</h2>
                <button style={{
                    padding: '10px 20px', backgroundColor: '#0984e3', color: 'white',
                    border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                }}>
                    + Dodaj nowy temat
                </button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#636e72', marginBottom: '20px' }}>
                    Zalogowany jako: <strong>{currentUser}</strong>
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ borderBottom: '2px solid #dfe6e9', color: '#2d3436' }}>
                        <th style={{ padding: '12px 8px' }}>ID</th>
                        <th style={{ padding: '12px 8px' }}>Temat Projektu</th>
                        <th style={{ padding: '12px 8px' }}>Prowadzący</th>
                        <th style={{ padding: '12px 8px' }}>Status</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center' }}>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id} style={{ borderBottom: '1px solid #dfe6e9' }}>
                            <td style={{ padding: '12px 8px', color: '#636e72' }}>{subject.id}</td>
                            <td style={{ padding: '12px 8px', fontWeight: '500' }}>{subject.temat}</td>
                            <td style={{ padding: '12px 8px' }}>{subject.prowadzacy}</td>
                            <td style={{ padding: '12px 8px' }}>
                  <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: subject.status === 'aktywny' ? '#e3fce0' : '#f1f2f6',
                      color: subject.status === 'aktywny' ? '#27ae60' : '#7f8fa6'
                  }}>
                    {subject.status.toUpperCase()}
                  </span>
                            </td>
                            <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                {/* Warunkowe renderowanie: pokazujemy przyciski tylko jeśli prowadzący z JSONa zgadza się z currentUser */}
                                {subject.prowadzacy === currentUser ? (
                                    <>
                                        <button style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#fdcb6e', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edytuj</button>
                                        <button onClick={() => handleDelete(subject.id)} style={{ padding: '6px 12px', backgroundColor: '#ff7675', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Usuń</button>
                                    </>
                                ) : (
                                    <span style={{ color: '#b2bec3', fontSize: '13px' }}>Brak uprawnień</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubjectsView;