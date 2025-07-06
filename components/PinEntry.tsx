import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockKeyhole, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { checkPin } from '../utils/auth';

interface PinEntryProps {
    onSuccess: () => void;
}

const PinEntry: React.FC<PinEntryProps> = ({ onSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (checkPin(pin)) {
            sessionStorage.setItem('adminAuthenticated', 'true');
            onSuccess();
        } else {
            setError('Incorrect PIN');
            setPin('');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-96">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-2">
                        <LockKeyhole className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <Input
                                type="password"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="text-center text-2xl tracking-widest"
                                placeholder="****"
                                disabled={loading}
                            />

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                        <CardFooter className="px-0 mt-6">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={pin.length !== 4 || loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify PIN'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PinEntry;