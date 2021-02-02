import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import NewMood from './components/NewMood';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Feedback from './pages/Feedback';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const respuesta = await axios.get('http://localhost:4000/api/auth', {
          headers: { 'x-auth-token': token },
        });
        setUser(respuesta.data.usuario);
      } catch (error) {
        console.log(error.response.data.msg);
        localStorage.removeItem('token');
        setToken('');
      }
    };
    checkToken();
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/feedback">
            <Feedback token={token} />
          </Route>
          <Route path="/newmood">
            <NewMood token={token} />
          </Route>
          <Route exact path="/">
            <Home token={token} user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
