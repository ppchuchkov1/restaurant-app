import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CategoryProvider } from './context/category-context';
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
