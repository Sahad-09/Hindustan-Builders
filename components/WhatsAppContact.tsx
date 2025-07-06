import React from 'react';
import Image from 'next/image';

const WhatsAppContact = () => {
    // Replace with your WhatsApp number including country code (e.g., +1234567890)
    const phoneNumber = "+91 6363024288";

    const handleWhatsAppClick = () => {
        window.open(`https://wa.link/p933br`, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center animate-bounce"
            aria-label="Contact on WhatsApp"
        >
            <Image
                src="/whatsapp.svg"
                alt="WhatsApp Icon"
                width={48} // Adjust size as needed
                height={48} // Adjust size as needed
                className="w-12 h-12" // Tailwind classes to ensure consistent sizing
            />
        </button>
    );
};

export default WhatsAppContact;
