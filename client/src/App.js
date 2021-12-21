import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from 'react-router';
import {Navigate} from 'react-router-dom';
import {Catalogue} from './components/pages/Catalogue/Catalogue';
import {Header} from './components/Header/Header';
import {Home} from './components/pages/Home/Home';
import {Footer} from './components/Footer/Footer';
import {Auth} from './components/pages/Auth/Auth';
import {Login} from './components/pages/Auth/Login/Login';
import {Register} from './components/pages/Auth/Register/Register';
import {Logout} from './components/pages/Auth/Logout';
import {Cart} from './components/pages/Cart/Cart';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {verify} from './store/slices/userSlice';
import {User} from './components/pages/User/User';
import {Profile} from './components/pages/User/Profile/Profile';
import {loadCart} from './store/slices/cartSlice';
import {Checkout} from './components/pages/Cart/Checkout/Checkout';
import {Summary} from './components/pages/Cart/Summary/Summary';
import {Favorites} from './components/pages/User/Favorites/Favorites';
import {Details} from './components/pages/Details/Details';
import {Admin} from './components/pages/Admin/Admin';
import {Create} from './components/pages/Admin/Create/Create';
import {Error} from './components/pages/Error/Error';


function App() {
  const dispatch = useDispatch();
  const mainRef = useRef();
  useEffect(() => {
    dispatch(verify());
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <div className="App">
      <Header mainRef={mainRef} />
      <main className="site-content" ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:wineId" element={<Details />} />
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
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="/cart" element={<Cart />}>
            <Route path="" element={<Summary />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="create" element={<Create />} />
          </Route>
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;