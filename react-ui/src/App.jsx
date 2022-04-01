import './app.scss'
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Home from './pages/home/Home.jsx';
import Watch from './pages/watch/Watch.jsx';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
const App = () => {
  const user = true
  return <>
    {/* <Home /> */}
    {/* <Watch /> */}
    {/* <Register /> */}
    {/* <Login /> */}
    <Router>
      <Routes>
        <Route path="/" exact element={ user? < Home /> : <Navigate to="/login"/> } />
        <Route path="/register"  element={ !user? < Register /> : <Navigate to="/"/> } />
        <Route path="/login"  element={ !user? < Login /> : <Navigate to="/"/>} />
        <Route path="/movies" exact element={ < Home type="movies" /> } />
        <Route path="/series" exact element={ < Home  type="series"/> } />
        <Route path="/watches" exact element={ < Watch /> } />
      </Routes>
    </Router>
      


  </>;
};

export default App;