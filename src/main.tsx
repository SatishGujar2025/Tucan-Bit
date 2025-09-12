import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './styles/index.css';
import { fetcher } from './services/cms/fetcher';
import { TranslationsGetDocument, useTranslationsGetQuery } from './services/cms/__generated__/hooks.ts';

// --- Viewport helper (keep your existing logic) ---
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 10m cache
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retryOnMount: false,
    },
  },
});

async function bootstrap() {
  // Set initial viewport height + listeners
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  const language = import.meta.env.VITE_DEFAULT_LANGUAGE;
  await queryClient.prefetchQuery({
    queryKey: useTranslationsGetQuery.getKey({ language }),
    queryFn: fetcher(TranslationsGetDocument, { language }),
    staleTime: 5 * 60 * 1000, 
  });

  // Render the app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

bootstrap();
