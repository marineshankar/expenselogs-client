import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Signup } from './pages/signup/signup.js';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { Contact } from './pages/contact/contact';
import { Bills } from './pages/bills/bills';
import { AddBill } from './pages/bills/addBill';
import { ModifyBill } from './pages/bills/modifyBill';
import { RequireAuth } from "./components/auth/auth";


function App() {

  return (
    <div>
      <Switch>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <RequireAuth>
          <Route path="/contact"><Contact /></Route>
          <Route exact path="/settings"><Settings /></Route>
          <Route exact path="/bills"><Bills /></Route>
          <Route path="/bills/add"><AddBill /></Route>
          <Route path="/bills/edit/:id"><ModifyBill /></Route>
          <Route path="/" exact><Home /></Route>
        </RequireAuth>
      </Switch>
    </div>
  );
}

export default App;
