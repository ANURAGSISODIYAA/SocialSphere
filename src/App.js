import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import Message from './Pages/Message/Message';
import HomePage from './Pages/Home/HomePage';



function App() {
  return (
    <div className="">
    <Routes>
        <Route  path='/*' element={<Authentication/>}></Route>
        <Route  path='/home' element={<HomePage/>}></Route>
        <Route  path='/message' element={<Message/>}></Route>
    </Routes>
       
    </div>
  );
}

export default App;
