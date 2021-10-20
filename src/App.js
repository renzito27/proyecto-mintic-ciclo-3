import React from 'react';
import LoginPage from './login/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";
import RegisterPage from './register/RegisterPage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavbarComponent from './shared/components/navbar/NavbarComponent';
import AfooterComponent from './shared/components/AfooterComponent';
import ForbidenComponent from './shared/components/forbiden/ForbidenComponent';
import HomePage from './home/HomePage';
function App() {
  return (
    <Router>
      <NavbarComponent title="Mision Factory"/>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forbiden" exact>
        <ForbidenComponent/>
      </Route>
      </Switch> 
      <AfooterComponent/> 
    </Router>

  );
}

export default App;