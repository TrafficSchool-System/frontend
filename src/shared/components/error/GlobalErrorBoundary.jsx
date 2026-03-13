import React, { Component } from "react";

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Global error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-red-600">Något gick fel: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
