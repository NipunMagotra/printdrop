import { useState } from 'react';
import { Upload, File, CheckCircle2 } from 'lucide-react';

const CustomerUploadPage = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            progress: 0,
            status: 'pending' // pending, uploading, complete
        }));

        setFiles(prev => [...prev, ...newFiles]);
        simulateUpload(newFiles);
    };

    const simulateUpload = (newFiles) => {
        setUploading(true);

        // Simulate each file upload individually
        newFiles.forEach((file, index) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }

                setFiles(prevFiles => prevFiles.map(f => {
                    if (f.name === file.name) {
                        return { ...f, progress, status: progress === 100 ? 'complete' : 'uploading' };
                    }
                    return f;
                }));

                // Check if all complete
                setFiles(currentFiles => {
                    const allComplete = currentFiles.every(f => f.progress === 100);
                    if (allComplete) {
                        setSuccess(true);
                        setUploading(false);
                    }
                    return currentFiles;
                });

            }, 500);
        });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'var(--font-sans)' }}>
            {/* Header */}
            <header style={{ marginBottom: '3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: '600' }}>PrintDrop Center</h1>
            </header>

            <main>
                {/* Main Action Area */}
                {!success ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1e293b' }}>Upload Files for Printing</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem' }}>
                            Select your files and upload them for printing. No app required.
                        </p>

                        <label
                            htmlFor="file-upload"
                            className="btn btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '1.25rem 2.5rem',
                                fontSize: '1.2rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                width: '100%',
                                maxWidth: '300px',
                                justifyContent: 'center'
                            }}
                        >
                            <Upload size={24} />
                            Choose Files
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept=".pdf,.jpg,.png,.doc,.docx"
                        />

                        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Supported: PDF, JPG, PNG, DOC
                        </p>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem 0', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <CheckCircle2 size={64} color="#16a34a" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '1.8rem', color: '#166534', marginBottom: '1rem' }}>Files Received</h2>
                        <p style={{ fontSize: '1.2rem', color: '#15803d' }}>
                            Please proceed to the counter.
                        </p>
                        <button
                            onClick={() => { setFiles([]); setSuccess(false); }}
                            className="btn btn-outline"
                            style={{ marginTop: '2rem', borderColor: '#16a34a', color: '#166534', backgroundColor: 'transparent' }}
                        >
                            Upload More
                        </button>
                    </div>
                )}

                {/* File List */}
                {files.length > 0 && !success && (
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#334155' }}>Uploading...</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {files.map((file, idx) => (
                                <div key={idx} style={{
                                    padding: '1rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <File size={24} color="#64748b" />
                                        <div>
                                            <div style={{ fontWeight: '500', color: '#0f172a' }}>{file.name}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{file.size}</div>
                                        </div>
                                    </div>
                                    <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {file.status === 'complete' ? (
                                            <CheckCircle2 size={24} color="#16a34a" />
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '8px',
                                                backgroundColor: '#e2e8f0',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${file.progress}%`,
                                                    height: '100%',
                                                    backgroundColor: '#3b82f6',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CustomerUploadPage;
