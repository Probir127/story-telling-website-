import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-screen bg-black flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <h1 className="text-white text-2xl font-light mb-4 tracking-wide">
                            Something went wrong
                        </h1>
                        <p className="text-white/60 text-sm mb-8 leading-relaxed">
                            We encountered an unexpected error. Please refresh the page to try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-white text-black font-light text-sm tracking-widest uppercase hover:bg-gray-200 transition-all rounded-sm"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
