import './App.scss';
import {Route, Routes} from 'react-router';
import {Catalogue} from './components/pages/Catalogue/Catalogue';
import {Header} from './components/Header/Header';
import {Home} from './components/pages/Home/Home';
import {Login} from './components/pages/Login/Login';
import {Register} from './components/pages/Register/Register';
import {Footer} from './components/Footer/Footer';
import {UserProvider} from './contexts/User';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />

        <main className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/user">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
          <ToastContainer />
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;