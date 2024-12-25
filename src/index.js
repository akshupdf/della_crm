import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter> 
    <AuthProvider> 
     <Provider store={store}>
    <App />
    </Provider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


