
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ThreeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-black text-white p-8">
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">3D Scene Error</h2>
            <p className="text-sm text-gray-400 mb-4">
              The 3D scene failed to load. This is usually caused by:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
              <li>Multiple React instances (module resolution issue)</li>
              <li>WebGL context loss</li>
              <li>Missing 3D model files</li>
            </ul>
            {this.state.error && (
              <details className="mt-4">
                <summary className="text-sm cursor-pointer text-blue-400">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs bg-gray-900 p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
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
