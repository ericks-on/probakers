'use client'
import { useState } from "react";

export default function DeleteButton(
    { id, deleteFunction, aria  }: { id: string, deleteFunction: (id: string) => void , aria?: boolean}
) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteFunction(id);
            setIsDeleting(false); // Trigger a refresh or handle UI update
        } catch (error) {
            console.error('Failed to delete product:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        aria ? (
            <div className="p-2 bg-green-400 rounded">Current</div>
        ) : (
            <button
                className={`text-sm p-2 text-white bg-red-500 rounded-lg ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                    'Delete'
                )}
            </button>
        )
    );
}