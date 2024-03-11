import './App.scss';
import Header from './Header/Header';
import Body from './Body/Body';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom"
import Registration from './RegistrationPage/Registration';
import Login from './RegistrationPage/Login';
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Routes path="/" element={<Body/>}/> */}
      </Routes>
    </Router>

  );
}

export default App;
