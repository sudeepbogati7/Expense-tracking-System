import React, { useEffect,useState} from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function ErrorNotification({ error }: any) {
    const [displayedErrors, setDisplayedErrors] = useState<string[]>([]);

    useEffect(() => {
        if (error && error.error && Array.isArray(error.error)) {
            // Concatenate error messages into a single string
            const errorMessage = error.error.join(', ');

            // Display toast for the error message if it's different from the ones already displayed
            if (!displayedErrors.includes(errorMessage)) {
                toast.error(errorMessage, {
                    autoClose: 7000, // Auto-close after 7 seconds
                });
                setDisplayedErrors([...displayedErrors, errorMessage]);
            }
        } else if (error && typeof error.error === 'string') {
            // Handle single string error
            if (!displayedErrors.includes(error.error)) {
                toast.error(error.error, {
                    autoClose: 7000, // Auto-close after 7 seconds
                });
                setDisplayedErrors([...displayedErrors, error.error]);
            }
        }
    }, [error, displayedErrors]);

    return <ToastContainer />;
}

export function SuccessNotification({ successResponse }: any) {
    const [displayedError, setDisplayedError] = useState<string | null>(null);

    useEffect(() => {
        // Display toast for the error message if it's different from the one already displayed
        if (successResponse && successResponse.message !== displayedError) {
            toast.success(successResponse.message, {
                autoClose: 7000, // Auto-close after 7 seconds
            });
            setDisplayedError(successResponse.message);
        }
    }, [successResponse, displayedError]);

    return <ToastContainer />;
}
