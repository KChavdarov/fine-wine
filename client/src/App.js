import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from 'react-router';
import {Catalogue} from './components/pages/Catalogue/Catalogue';
import {Header} from './components/Header/Header';
import {Home} from './components/pages/Home/Home';
import {Footer} from './components/Footer/Footer';
import {UserProvider} from './contexts/User';
import {Auth} from './components/pages/Auth/Auth';
import {Login} from './components/pages/Auth/Login/Login';
import {Register} from './components/pages/Auth/Register/Register';
import {Logout} from './components/pages/Auth/Logout';
import {Cart} from './components/pages/Cart/Cart';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {verify} from './store/slices/userSlice';
import {User} from './components/pages/User/User';
import {Profile} from './components/pages/User/Profile/Profile';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verify());
  }, [dispatch]);

  return (
    <UserProvider>
      <div className="App">
        <Header />
        <main className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/user" element={<User />}>
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
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