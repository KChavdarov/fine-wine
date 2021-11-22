import {Route, Routes} from 'react-router';
import './App.css';
import {Catalogue} from './components/Catalogue';
import {Header} from './components/Header';
import {Home} from './components/Home';
import {Login} from './components/Login';
import {Register} from './components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;