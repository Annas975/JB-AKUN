import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Page/mainLayout';
import { JBProvider } from './Page/context';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JBProvider><MainLayout /></JBProvider>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;