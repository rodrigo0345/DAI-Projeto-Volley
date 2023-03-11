import { RouterProvider } from 'react-router-dom';
import MainLayout from './views/MainLayout';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
