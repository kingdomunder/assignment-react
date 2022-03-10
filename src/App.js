import './App.css';
import { Routes, Route } from 'react-router-dom';

import { ROUTE_PATH } from './constants';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import BoardAllPage from './pages/BoardPage/BoardAllPage';
import BoardOnePage from './pages/BoardPage/BoardOnePage/BoardOnePage';
import BoardWritePage from './pages/BoardPage/BoardOnePage/BoardWritePage';
import BoardModifyPage from './pages/BoardPage/BoardOnePage/BoardModifyPage';
import MemberPage from './pages/MemberPage/MemberPage';
import AdminPage from './pages/MemberPage/AdminPage/AdminPage';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path={ ROUTE_PATH.main } element={<MainPage />}/>
        <Route exact path={ ROUTE_PATH.login } element={<LoginPage />} />
        <Route exact path={ ROUTE_PATH.signup } element={<SignupPage />} />
        <Route exact path={ ROUTE_PATH.boardAllView} element={<BoardAllPage />}/>
        <Route exact path={ ROUTE_PATH.boardOneView} element={<BoardOnePage />}/>
        <Route exact path={ ROUTE_PATH.boardWrite} element={<BoardWritePage />}/>
        <Route exact path={ ROUTE_PATH.BoardModify} element={<BoardModifyPage />}/>
        <Route exact path={ ROUTE_PATH.member} element={<MemberPage />}/>
        <Route exact path={ ROUTE_PATH.admin} element={<AdminPage />}/>
      </Routes>
    </div>
  );
}

export default App;
