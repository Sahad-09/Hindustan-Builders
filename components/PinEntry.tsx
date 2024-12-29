import { useState } from 'react';
import { checkPin } from '../utils/auth';

interface PinEntryProps {
    onSuccess: () => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ onSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkPin(pin)) {
            sessionStorage.setItem('adminAuthenticated', 'true');
            onSuccess();
        } else {
            setError('Incorrect PIN');
            setPin('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Enter Admin PIN</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full p-2 text-center text-2xl tracking-widest border rounded-md mb-4"
                        placeholder="****"
                    />
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PinEntry;
