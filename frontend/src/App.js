import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import InstaLoginPage from './components/InstaLogin/InstaLoginPage';
import Login from './components/Login/Login';
import SignUp from "./components/SignUp/SignUp"
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import NavBar from './components/NavBar';
import Home from './components/Home';
import JobPostForm from './components/JobPostForm';
import UserProfile from './components/UserProfile';

function App() {
  const [isLogin, setLogin] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(user);
        navigate("/home")
      } else {
        setLogin(null);
      }
    });
  }, []);

  console.log(isLogin)

  if (isLogin === null) {
    return <div >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  }

  return (
    <div >
      <Routes>
        {/* <Route path='/' element={<InstaLoginPage/>} /> */}
        <Route path='/home' element={<Home />}></Route>
        <Route path='/post-job' element={<JobPostForm />}></Route>
        <Route path='/user-list' element={<InstaLoginPage />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
