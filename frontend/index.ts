import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './output.css';
import App from './App.js';

createRoot(document.getElementById('outlet')!).render(createElement(App));
