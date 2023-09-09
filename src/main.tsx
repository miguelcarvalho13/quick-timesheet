import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';
import App from './App.tsx';
import './index.css';

dayjs.extend(CustomParseFormat);
dayjs.extend(Duration);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
