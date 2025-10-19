

import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('kbr-auth-token');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Home Page', path: '/admin/homepage' },
        { name: 'Logo & Branding', path: '/admin/branding' },
        { name: 'Racing Stats', path: '/admin/stats' },
        { name: 'Meet Keri Page', path: '/admin/meet-keri' },
        { name: 'Training Page', path: '/admin/training' },
        { name: 'Facilities Page', path: '/admin/facilities' },
        { name: 'Bloodstock Page', path: '/admin/bloodstock' },
        { name: 'Partnerships Page', path: '/admin/partnerships' },
        { name: 'Horses', path: '/admin/horses' },
        { name: 'Team', path: '/admin/team' },
        { name: 'News', path: '/admin/news' },
        { name: 'Import / Export Data', path: '/admin/data' },
    ];

    const baseLinkClass = "block px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const activeLinkClass = "bg-brand-teal text-white";
    const inactiveLinkClass = "text-gray-700 hover:bg-gray-200";

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold text-brand-teal">KBR CMS</h1>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map(item => (
                         <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'} // `end` prop for exact match on dashboard link
                            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t">
                     <NavLink to="/" className="text-sm text-gray-600 hover:text-brand-teal">
                        &larr; Back to Public Site
                    </NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200">
                    <div className="flex items-center justify-end h-16 px-6">
                        <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-brand-teal rounded-md hover:bg-opacity-90">
                            Logout
                        </button>
                    </div>
                </header>
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
                        <p className="font-bold">Important Notice</p>
                        <p>All content changes are saved locally to your browser. To make them live for all visitors, you must export the data file from the <NavLink to="/admin/data" className="font-bold underline hover:text-yellow-800">Import / Export Data</NavLink> page and replace the `content.json` file in the project, then redeploy the site.</p>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;