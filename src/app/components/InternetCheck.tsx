import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const notifyUser = (message: string) => {
    toast.error(message, {
        duration: 5000,
        position: 'top-center',
        style: {
            border: '1px solid #ff0000',
            padding: '16px',
            color: '#ff0000',
        },
    });
};

const InternetCheckComponent: React.FC = () => {
    useEffect(() => {
        const handleOnline = () => {
            toast.dismiss();
        };

        const handleOffline = () => {
            notifyUser('You are offline. Please check your internet connection.');
        };

        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            console.error('Unhandled rejection:', event.reason);
            notifyUser('An unexpected error occurred. Please try again.');
        };

        const handleError = (event: ErrorEvent) => {
            console.error('Error occurred:', event.message);
            notifyUser('An error occurred. Please reload the page or check your connection.');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        window.addEventListener('error', handleError);

        if (!navigator.onLine) {
            notifyUser('You are offline. Please check your internet connection.');
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            window.removeEventListener('error', handleError);
        };
    }, []);

    return <Toaster />;
};

export default InternetCheckComponent;
