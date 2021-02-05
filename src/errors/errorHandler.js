import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error ", error);
    console.log("errorInfo ", errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="global-error">
          <h1>Something went wrong.</h1>
          <p>Please Refresh the page or Contact support!</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
