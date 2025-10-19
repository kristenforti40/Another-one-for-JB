
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // For this client-side CMS, we use an environment variable for the password.
    // In a real production environment, this variable MUST be set.
    // The fallback 'password' is for local development convenience only.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('kbr-auth-token', 'true');
            navigate('/admin');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-brand-teal">Admin Login</h1>
                    <p className="text-gray-600">Keri Brion Racing CMS</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-teal"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-brand-teal rounded-md hover:bg-opacity-90 transition-colors">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;