import React from 'react';
import QRCode from "react-qr-code";
import { Copy } from 'lucide-react';

const QRCodePage = () => {
    const uploadUrl = window.location.origin + '/upload';

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{
                border: '4px solid #0f172a',
                padding: '4rem',
                borderRadius: '20px',
                display: 'inline-block'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    PrintDrop
                </h1>

                <p style={{
                    fontSize: '1.5rem',
                    marginBottom: '3rem',
                    color: '#334155'
                }}>
                    Scan to upload files for printing
                </p>

                <div style={{
                    border: '2px solid #e2e8f0',
                    padding: '2rem',
                    borderRadius: '12px',
                    display: 'inline-block',
                    backgroundColor: '#fff'
                }}>
                    <QRCode value={uploadUrl} size={350} />
                </div>

                <p style={{
                    marginTop: '3rem',
                    fontSize: '1.25rem',
                    color: '#64748b',
                    fontFamily: 'monospace'
                }}>
                    {uploadUrl}
                </p>
            </div>

            <button
                className='btn btn-outline prevent-print'
                onClick={() => window.print()}
                style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem'
                }}
            >
                Print Poster
            </button>
            <style>{`
                @media print {
                    .prevent-print { display: none; }
                    body { margin: 0; padding: 0; }
                }
            `}</style>
        </div>
    );
};

export default QRCodePage;
