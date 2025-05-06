// components/InputLCDId.tsx
"use client"
import { Kantumruy_Pro } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const kantumruy = Kantumruy_Pro({
    subsets: ["khmer", "latin"],
    weight: ["300", "400", "700"],
});

const InputLCDId: React.FC = () => {
    const [lcdId, setLcdId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lcdId) {
            setError("សូមបញ្ចូលលេខសម្គាល់ LCD ឱ្យបានត្រឹមត្រូវ!");
            return;
        }
        console.log("Navigating to /home/" + lcdId);
        router.push(`/lcd/${lcdId}`);
    };

    return (
        <div className={`mx-auto px-16 py-8 w-full ${kantumruy.className}`}>
            <form onSubmit={handleSubmit} className="mb-4 pl-4">
                <label htmlFor="lcd_id" className="block text-white mb-2 text-4xl pb-4">
                    សូមបញ្ចូលលេខសម្គាល់ LCD ដើម្បីបង្ហាញព័ត៌មានការប្រជុំ:
                </label>
                <input
                    id="lcd_id"
                    type="text"
                    value={lcdId}
                    onChange={(e) => setLcdId(e.target.value)}
                    className="px-4 py-2 text-black rounded-md bg-white text-2xl"
                    placeholder="បញ្ចូលលេខសម្គាល់ LCD"
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-2xl">
                    បញ្ចូល
                </button>
            </form>

            {error && <div className="text-red-500 pl-4 text-2xl">{error}</div>}
        </div>
    );
};

export default InputLCDId;
