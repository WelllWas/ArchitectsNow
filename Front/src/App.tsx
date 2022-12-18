import React from 'react';
import { AuthProvider } from './Authorization/AuthContext';
import Router from './Authorization/Router';
import Background from './components/Background/Background';

function App() {
  return (
    <>
    <Background />
     <AuthProvider>
          <Router />
    </AuthProvider>
    </>
  );
}

export default App;
