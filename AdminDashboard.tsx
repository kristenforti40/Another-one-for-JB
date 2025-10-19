

import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../../context/ContentContext';

const StatCard: React.FC<{ title: string; count: number; link: string; }> = ({ title, count, link }) => (
    <Link to={link} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
        <p className="text-4xl font-bold text-brand-teal">{count}</p>
    </Link>
);

const ActionCard: React.FC<{ title: string; link: string; children: React.ReactNode }> = ({ title, link, children }) => (
    <Link to={link} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
        <div className="text-brand-teal h-12 w-12 mx-auto flex items-center justify-center">
            {children}
        </div>
        <h3 className="text-lg font-semibold text-gray-500 mt-2">{title}</h3>
    </Link>
);


const AdminDashboard: React.FC = () => {
    const { horses, teamMembers, newsPosts } = useContent();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">
                Welcome to the Keri Brion Racing Content Management System. Here you can update the content on your website.
            </p>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Content Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Top Horses" count={horses.length} link="/admin/horses" />
                    <StatCard title="Team Members" count={teamMembers.length} link="/admin/team" />
                    <StatCard title="News Posts" count={newsPosts.length} link="/admin/news" />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Manage Site Pages</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ActionCard title="Home Page" link="/admin/homepage">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </ActionCard>
                    <ActionCard title="Meet Keri Page" link="/admin/meet-keri">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </ActionCard>
                    <ActionCard title="Training Page" link="/admin/training">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                         </svg>
                    </ActionCard>
                     <ActionCard title="Facilities Page" link="/admin/facilities">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18h16.5M5.25 6h13.5m-13.5 3v6h13.5v-6m-13.5 6v3h13.5v-3m-12-12v10.5m10.5-10.5v10.5" />
                        </svg>
                    </ActionCard>
                     <ActionCard title="Bloodstock Page" link="/admin/bloodstock">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </ActionCard>
                     <ActionCard title="Partnerships Page" link="/admin/partnerships">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.289 2.72a3 3 0 0 1-4.682-2.72 9.094 9.094 0 0 1 3.741-.479m7.289 2.72-7.289-2.72m0 0a3 3 0 1 0-5.864 2.14 3 3 0 0 0 5.864-2.14ZM12 14.25a3 3 0 1 0-5.864 2.14 3 3 0 0 0 5.864 2.14Zm5.864 2.14a3 3 0 1 0-5.864-2.14 3 3 0 0 0 5.864 2.14ZM9 11.25a3 3 0 1 0-5.864 2.14 3 3 0 0 0 5.864-2.14Z" />
                        </svg>
                    </ActionCard>
                     <ActionCard title="Racing Stats" link="/admin/stats">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                    </ActionCard>
                    <ActionCard title="Logo & Branding" link="/admin/branding">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.473 9 7.32l8.036 8.036-1.148 1.148L7.848 8.473Zm-2.122 2.121L4.578 9.446l8.036-8.036 1.148 1.148-9.182 9.182Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12 18-1.148-1.148L19.422 8.28l1.148 1.148L12 18Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.728 9.446a3.75 3.75 0 1 0 5.302-5.302l-1.147 1.147-2.028-2.028 1.147-1.147a3.75 3.75 0 1 0-5.302 5.302l2.028 2.028Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.03 8.297 12 7.327l1.147 1.147-2.117 2.117-1.148-1.148 1.148-1.147Z" />
                        </svg>
                    </ActionCard>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Site Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ActionCard title="Import / Export Data" link="/admin/data">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                    </ActionCard>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;