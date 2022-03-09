import './App.css';
import { Routes, Route } from 'react-router-dom';

import { ROUTE_PATH } from './constants';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import SignupPage from './pages/SignupPage/SignupPage';
import BoardAllPage from './pages/BoardPage/BoardAllPage'
import MemberPage from './pages/MemberPage/MemberPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path={ ROUTE_PATH.main } element={<MainPage />}/>
        <Route exact path={ ROUTE_PATH.login } element={<LoginPage />} />
        <Route exact path={ ROUTE_PATH.signup } element={<SignupPage />} />
        {/* <Route exact path={ ROUTE_PATH.boardOne} element={<BoardOnePage />}/> */}
        <Route exact path={ ROUTE_PATH.boardAll} element={<BoardAllPage />}/>
        <Route exact path="/member" element={<MemberPage />}/>

      </Routes>
    </div>
  );
}

export default App;
