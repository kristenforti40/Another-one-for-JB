import React, { useState, FormEvent } from 'react';

const PartnershipInquiryPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Ownership Inquiry from ${formState.name}`);
        const body = encodeURIComponent(
`You have a new ownership inquiry from the Keri Brion Racing website.

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
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-lg">Ownership Inquiry</h1>
                </div>
            </div>
        
            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-stone-200">
                        <p className="text-center text-stone-600 mb-8 text-lg">
                            Ready to experience the thrill of ownership? Please fill out the form below, and we will contact you to discuss our current partnership opportunities.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">Your Name</label>
                                    <input type="text" id="name" value={formState.name} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1">Your Email</label>
                                    <input type="email" id="email" value={formState.email} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-1">Message <span className="text-xs text-stone-500">(Tell us a little about your interest in racehorse ownership)</span></label>
                                <textarea id="message" rows={7} value={formState.message} onChange={handleInputChange} className="w-full bg-stone-50 border border-stone-300 rounded-md py-2 px-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-brand-teal text-white font-bold py-3 px-10 rounded-lg hover:bg-opacity-80 transition-all duration-300">
                                    Send Inquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnershipInquiryPage;