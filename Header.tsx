import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_DROPDOWNS, NAVIGATION_LINKS } from '../constants';
import type { NavDropdown } from '../types';
import { useContent } from '../context/ContentContext';
import KBRacingLogo from './KBRacingLogo';

const Dropdown: React.FC<{ item: NavDropdown, closeMobileMenu: () => void }> = ({ item, closeMobileMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
        closeMobileMenu();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                className="font-serif text-2xl font-bold text-stone-900 hover:text-brand-teal transition-colors duration-300 px-4 py-2 flex items-center"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {item.label}
                <svg className={`w-6 h-6 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div 
                    className="absolute z-20 left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-2 border border-stone-200"
                >
                    {item.links.map(link => (
                        <Link key={link.href} to={link.href} onClick={handleLinkClick} className="font-serif block px-5 py-3 text-xl text-stone-900 hover:bg-stone-100 hover:text-brand-teal transition-colors duration-200">
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { logoUrl } = useContent();

    useEffect(() => {
        // Close menu on navigation
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);


    return (
        <header className="bg-brand-background sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-shrink-0">
                        <Link to="/">
                           {logoUrl ? (
                             <img src={logoUrl} alt="Keri Brion Racing Logo" className="h-20 w-auto" />
                           ) : (
                             <KBRacingLogo />
                           )}
                        </Link>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {NAVIGATION_DROPDOWNS.map(item => (
                            <Dropdown key={item.label} item={item} closeMobileMenu={() => {}} />
                        ))}
                        {NAVIGATION_LINKS.map(link => (
                            <Link key={link.href} to={link.href} className="font-serif text-2xl font-bold text-stone-900 hover:text-brand-teal transition-colors duration-300 px-4 py-2">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-900 hover:text-brand-teal focus:outline-none" aria-label="Open menu">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-brand-background z-50 md:hidden flex flex-col items-center overflow-y-auto px-4 pt-24 pb-8">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-6 text-stone-900 hover:text-brand-teal" aria-label="Close menu">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    
                    <nav className="flex flex-col items-center text-center">
                        {NAVIGATION_DROPDOWNS.map((dropdown, index) => (
                           <div key={dropdown.label} className={index > 0 ? "w-48 pt-8 mt-8 border-t border-stone-200" : ""}>
                                <p className="font-serif text-brand-teal font-bold text-2xl mb-3">{dropdown.label}</p>
                                <div className="flex flex-col space-y-3">
                                    {dropdown.links.map(link => (
                                        <Link key={link.href} to={link.href} className="font-serif text-2xl font-medium text-stone-900 hover:text-brand-teal">
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-stone-200 w-48 mt-8 pt-8">
                            {NAVIGATION_LINKS.map(link => (
                                 <Link key={link.href} to={link.href} className="font-serif text-2xl font-medium text-stone-900 hover:text-brand-teal">
                                     {link.label}
                                 </Link>
                             ))}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;