import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import { Button, Result } from 'antd';
import { Spinner } from 'src/components/Elements/Spinner';
import { AuthProvider } from 'src/lib/auth';
import { queryClient } from 'src/lib/react-query';

const ErrorFallback = () => {
  return (
    <>
      <Result
        status="error"
        title="Something went wrong!"
        subTitle="Please refresh the page to continue"
        extra={
          <Button type="primary" onClick={() => window.location.assign(window.location.origin)}>
            Refresh
          </Button>
        }
      />
    </>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.MODE !== 'test' && <ReactQueryDevtools />}
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
