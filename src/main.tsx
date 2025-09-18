import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// 1. Import the BrowserRouter
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SearchProvider } from "./context/searchBarContext.tsx";
import { Toaster } from 'react-hot-toast';
import { SnippetsProvider } from "./context/snippetContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
        <SnippetsProvider>

         <BrowserRouter>

          <App />
          <Toaster
      position="top-center" 
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
      />
        </BrowserRouter>
      </SnippetsProvider>
        </SearchProvider>
      
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
