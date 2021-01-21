import React, { Component, createContext } from 'react';
import ErrorScreen from 'src/components/ErrorScreen/ErrorScreen';

export const ErrorBoundariesContext = createContext<{ onError(error: Error): void }>(null);

interface ErrorBoundariesProps {
  children: React.ReactNode;
}

interface ErrorBoundariesState {
  error: Error;
}

export default class ErrorBoundaries extends Component<ErrorBoundariesProps, ErrorBoundariesState> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  handleError = (error: Error) => this.setState({ error });

  render() {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} />;
    }

    return (
      <ErrorBoundariesContext.Provider value={{ onError: this.handleError }}>
        {this.props.children}
      </ErrorBoundariesContext.Provider>
    );
  }
}
