import './App.css';
import { Routes, Route } from 'react-router-dom';

import { PATH_NAME } from './constants';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import SignupPage from './pages/SignupPage/SignupPage';
import BoardPage from './pages/BoardPage/BoardPage';
import MemberPage from './pages/MemberPage/MemberPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
        {/* <Route exact path="/login" element={<LoginPage />}/> */}
        <Route exact path={ PATH_NAME.login } element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />}/>
        <Route exact path="/board/all" element={<BoardPage />}/>
        <Route exact path="/board/:seq" element={<BoardPage />}/>
        <Route exact path="/member" element={<MemberPage />}/>

      </Routes>
    </div>
  );
}

export default App;
