import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import Message from './Pages/Message/Message';
import HomePage from './Pages/Home/HomePage';
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';


function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    console.log("Home page me bhejo isko loging kar diya isne");
    dispatch(getProfileAction(jwt))
  }, [jwt])

  return (
    
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path='/*' element={auth.user? <HomePage /> :<Authentication/>}></Route>
        <Route path='/*' element={<Authentication />}></Route>
        <Route path='/message' element={<Message />}></Route>
      </Routes>

    </ThemeProvider>
  );
}

export default App;
