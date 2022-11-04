import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import { routes } from './configs/routes';
import AppContextProvider from './contexts';
import 'antd/dist/antd.css';
import './App.css';
import Career from './pages/Career';
import Book from './pages/Book';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  if(!localStorage.getItem('token') && window.location.pathname !== routes.LOGIN()) {
    window.location.href = '/login'
  }
  return (
  <BrowserRouter>
    <AppContextProvider>
      <Navbar />
      <div className='App'>
          <Routes>
            <Route path={routes.HOMEPAGE()} exact element={<Home />} />
            <Route path={routes.GALLERY()} element={<Gallery />} />
            <Route path={routes.CAREER()} element={<Career />} />
            <Route path={routes.BOOK()} element={<Book />} />
            <Route path={routes.LOGIN()} element={<Login />} />
            <Route path={routes.REGISTER()} element={<Register />} />
          </Routes>
      </div>
    </AppContextProvider>
  </BrowserRouter>
  );
}

export default App;
