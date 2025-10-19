import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import KBRacingLogo from './KBRacingLogo';

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-brand-teal transition-colors duration-300" aria-label={label}>
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d={path} />
        </svg>
    </a>
);

const Footer: React.FC = () => {
    const { logoUrl } = useContent();

    return (
        <footer className="bg-stone-100 border-t border-stone-200">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left space-y-8 md:space-y-0">
                    {/* 1. Logo */}
                    <Link to="/" className="inline-block">
                       {logoUrl ? (
                         <img src={logoUrl} alt="Keri Brion Racing Logo" className="h-20 w-auto" />
                       ) : (
                         <KBRacingLogo />
                       )}
                    </Link>

                    {/* 2. Contact Info */}
                    <div className="space-y-1 text-stone-600">
                         <a href="tel:717-475-4838" className="block hover:text-brand-teal transition-colors">717-475-4838</a>
                        <a href="mailto:kbracingstable@gmail.com" className="block hover:text-brand-teal transition-colors">kbracingstable@gmail.com</a>
                    </div>

                    {/* 3. Address */}
                     <div className="text-stone-600">
                        <p>Fair Hill Training Center</p>
                        <p>630 Training Center Drive</p>
                        <p>Elkton, MD 21921</p>
                    </div>

                    {/* 4. Socials */}
                    <div className="flex justify-center space-x-8">
                        <SocialIcon 
                            href="https://x.com/Keri145" 
                            label="Twitter"
                            path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
                        />
                        <SocialIcon 
                            href="https://www.facebook.com/KBRacingLLC" 
                            label="Facebook"
                            path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" 
                        />
                    </div>
                </div>
            </div>
            <div className="bg-stone-200">
                <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-stone-600">
                     &copy; {new Date().getFullYear()} Keri Brion Racing. All Rights Reserved.
                     <Link to="/login" className="ml-6 text-stone-500 hover:text-brand-teal transition-colors">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;