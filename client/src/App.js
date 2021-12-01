import './App.scss';
import {Route, Routes} from 'react-router';
import {Catalogue} from './components/pages/Catalogue/Catalogue';
import {Header} from './components/Header/Header';
import {Home} from './components/pages/Home/Home';
import {Login} from './components/Login';
import {Register} from './components/Register';

function App() {
  return (
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
      </main>

    </div>
  );
}

export default App;