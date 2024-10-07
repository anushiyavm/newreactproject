
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Forgot from './components/Forgot';
import UpdatePass from './components/UpdatePass';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/reset-password/:id/:token' element={<UpdatePass/>}/>
        <Route path='/all-users' element={<Users/>}/>
      </Routes>
    </div>
  );
}

export default App;
