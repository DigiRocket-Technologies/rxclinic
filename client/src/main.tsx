
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// React 19 optimized rendering
const root = createRoot(document.getElementById("root")!)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
