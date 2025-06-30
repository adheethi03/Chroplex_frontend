// App.jsx
import Home from './Pages/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import L_S from './Pages/L_S.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Admin from './Pages/Admin.jsx';
import User from './Pages/User.jsx';
import ViewUsers from './Pages/ViewUsers.jsx';
import AddMovie from './Pages/AddMovie.jsx';
import Moviedetail from './Pages/Moviedetail.jsx';
function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ls" element={<L_S />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path='/view_users' element={<ViewUsers/>}/>
        <Route path='/add_movie' element={<AddMovie/>}/>
        <Route path="/movies/:title"  element={<Moviedetail/>}/>
        <Route path='/user/logout' element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;