"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the 'next/navigation' module for app router
import PinEntry from './PinEntry';

interface AdminProtectedProps {
    children: React.ReactNode;
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const authStatus = sessionStorage.getItem('adminAuthenticated');
        setIsAuthenticated(authStatus === 'true');
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <PinEntry onSuccess={() => setIsAuthenticated(true)} />;
    }

    return <>{children}</>;
};

export default AdminProtected;
