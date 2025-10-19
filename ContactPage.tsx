

import React, { useState, FormEvent } from 'react';

const ContactInfoIcon: React.FC<{ path: string }> = ({ path }) => (
    <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
    </svg>
);

const SocialIcon: React.FC<{ href: string, path: string, label: string }> = ({ href, path, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-brand-teal transition-colors duration-300" aria-label={label}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d={path} />
        </svg>
    </a>
);


const keyContacts = [
    {
        name: 'Keri Brion',
        role: 'Head Trainer',
        phone: '717-475-4838',
        email: 'kbracingstable@gmail.com',
    },
];

const socialLinks = {
    twitter: 'https://x.com/Keri145',
    facebook: 'https://www.facebook.com/KBRacingLLC',
};


const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Contact Form Message from ${formState.name}`);
        const body = encodeURIComponent(
`You have a new message from the Keri Brion Racing website.

Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}`
        );
        window.location.href = `mailto:kbracingstable@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div>
            <div className="bg-gradient-to-b from-brand-teal/70 to-brand-teal/60 backdrop-blur-sm py-10 shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-lg">Get In Touch</h1>
                </div>
            </div>
        
            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Info */}
                        <div className="space-y-10">
                             {/* Contacts */}
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                                    <ContactInfoIcon path="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6m-6-1a6 6 0 00-6-6m6 6v-1m0 1a6 6 0 00-6-6" />
                                    Contact
                                </h2>
                                <div className="space-y-6 pl-8">
                                    {keyContacts.map(contact => (
                                        <div key={contact.name}>
                                            <h3 className="text-xl font-semibold text-stone-800">{contact.name}</h3>
                                            <p className="text-brand-teal font-medium mb-2">{contact.role}</p>
                                            <div className="flex items-center gap-3 text-stone-600 mb-2">
                                                <ContactInfoIcon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                <a href={`tel:${contact.phone}`} className="hover:text-brand-teal">{contact.phone}</a>
                                            </div>
                                            <div className="flex items-center gap-3 text-stone-600 mb-2">
                                                <ContactInfoIcon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                <a href={`mailto:${contact.email}`} className="hover:text-brand-teal">{contact.email}</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Address */}
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                                    <ContactInfoIcon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    Training Barn Address
                                </h2>
                                <div className="text-stone-600 text-lg pl-8">
                                    <p>Fair Hill Training Center</p>
                                    <p>630 Training Center Drive</p>
                                    <p>Elkton, MD 21921</p>
                                </div>
                            </div>

                             {/* Socials Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                                    <ContactInfoIcon path="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    Socials
                                </h2>
                                <div className="flex items-center gap-4 pl-8">
                                    <SocialIcon href={socialLinks.twitter} label="Twitter" path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    <SocialIcon href={socialLinks.facebook} label="Facebook" path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </div>
                            </div>

                        </div>
                        {/* Right Column: Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                            <p className="text-center text-stone-600 mb-8 text-lg">
                                We'd love to hear from you. If you are interested in ownership, have a horse for our program, or just want to learn more, please send us a message.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">Name</label>
                                        <input type="text" id="name" value={formState.name} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1">Email</label>
                                        <input type="email" id="email" value={formState.email} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-1">Message</label>
                                    <textarea id="message" rows={5} value={formState.message} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="bg-brand-teal text-white font-bold py-3 px-10 rounded-lg hover:bg-opacity-80 transition-all duration-300">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;