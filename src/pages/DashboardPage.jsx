import React, { useState } from 'react';
import { Download, Trash2, Printer, CheckCircle, Clock } from 'lucide-react';

const DashboardPage = () => {
    const [jobs, setJobs] = useState([
        { id: 1, name: 'Report_Final_v2.pdf', time: '10:42 AM', type: 'PDF', status: 'pending', size: '2.4 MB' },
        { id: 2, name: 'IMG_20240901.jpg', time: '10:38 AM', type: 'JPG', status: 'printed', size: '4.1 MB' },
        { id: 3, name: 'Flyer_Design.pdf', time: '10:15 AM', type: 'PDF', status: 'pending', size: '1.2 MB' },
        { id: 4, name: 'Resume_Jane_Doe.docx', time: '09:55 AM', type: 'DOCX', status: 'printed', size: '0.5 MB' },
        { id: 5, name: 'Scan_001.pdf', time: '09:30 AM', type: 'PDF', status: 'pending', size: '8.3 MB' },
        { id: 6, name: 'Menu_Draft.pdf', time: '09:12 AM', type: 'PDF', status: 'printed', size: '3.7 MB' },
    ]);

    const markPrinted = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'printed' } : job));
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #334155' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>PrintDrop</h1>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Staff Dashboard</span>
                </div>
                <nav style={{ flex: 1, padding: '1rem' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>
                            <a href="#" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: '#334155', color: '#fff', fontWeight: '500' }}>
                                Incoming Files
                            </a>
                        </li>
                        <li>
                            <a href="#" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: '6px', color: '#cbd5e1', fontWeight: '400' }}>
                                History
                            </a>
                        </li>
                        <li>
                            <a href="#" style={{ display: 'block', padding: '0.75rem 1rem', borderRadius: '6px', color: '#cbd5e1', fontWeight: '400' }}>
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
                <div style={{ padding: '1.5rem', borderTop: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Print Shop Admin</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>v1.0.4</div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>Incoming Files</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ backgroundColor: '#fff' }}>Refresh</button>
                        <button className="btn btn-primary">Clear All</button>
                    </div>
                </header>

                {/* Dashboard Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Pending Jobs</span>
                        <span style={{ fontSize: '2rem', fontWeight: '600', color: '#0f172a' }}>{jobs.filter(j => j.status === 'pending').length}</span>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Completed Today</span>
                        <span style={{ fontSize: '2rem', fontWeight: '600', color: '#0f172a' }}>{jobs.filter(j => j.status === 'printed').length}</span>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Storage Used</span>
                        <span style={{ fontSize: '2rem', fontWeight: '600', color: '#0f172a' }}>45%</span>
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-container" style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id}>
                                    <td style={{ fontWeight: '500' }}>{job.name}</td>
                                    <td style={{ color: '#64748b' }}>{job.time}</td>
                                    <td><span style={{
                                        padding: '2px 8px',
                                        backgroundColor: '#f1f5f9',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        color: '#475569'
                                    }}>{job.type}</span></td>
                                    <td style={{ color: '#64748b' }}>{job.size}</td>
                                    <td>
                                        {job.status === 'pending' ?
                                            <span className="badge badge-pending">Pending</span> :
                                            <span className="badge badge-success">Printed</span>
                                        }
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button
                                                className="btn btn-outline"
                                                title="Download"
                                                style={{ padding: '0.5rem', border: 'none', color: '#3b82f6' }}
                                            >
                                                <Download size={18} />
                                            </button>
                                            <button
                                                onClick={() => markPrinted(job.id)}
                                                className="btn btn-outline"
                                                title="Mark as Printed"
                                                style={{ padding: '0.5rem', border: 'none', color: '#16a34a' }}
                                            >
                                                <Printer size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteJob(job.id)}
                                                className="btn btn-outline"
                                                title="Delete"
                                                style={{ padding: '0.5rem', border: 'none', color: '#ef4444' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
