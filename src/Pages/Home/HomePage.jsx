import { Grid } from '@mui/material';
import React from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import MiddlePart from '../../Components/MiddlePart/MiddlePart';
import Reels from '../../Components/Reels/Reels';
import CreateReelsForm from '../../Components/Reels/CreateReelsForm';
import Profile from '../Profile/Profile';
import HomeRight from '../../Components/HomeRight/HomeRight';
import SideBar from '../../Components/SideBar/SideBar';
import { useSelector } from "react-redux"
import Notification from '../../Components/Notifcation/Notification';
const HomePage = () => {
 
  
  const location = useLocation();
 
  const { auth } = useSelector(store => store);
 
  console.log("auth ", auth)
 
  return (
    <div className='px-20'>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <div className='sticky top-0'>
            <SideBar />
          </div>
        </Grid>
         {/* lg={location.pathname === '/' ? 6 : 9} */}
        <Grid item xs={12} lg={location.pathname === '/' ? 6 : 9} className='px-5 flex justify-center'>
          <Routes>
            <Route path='/' element={<MiddlePart />} />
            <Route path='/reels' element={<Reels />} />
            <Route path='/create-reels' element={<CreateReelsForm />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/list' element={<Notification />} />
            <Route path='/community' element={<Notification />} />
          </Routes>
        </Grid>

        {location.pathname==="/" && <Grid item xs={12} lg={3} className='relative'>
          <div className='sticky top-0 w-full'>
            <HomeRight />
          </div>
        </Grid>}
        
      </Grid>
    </div>
  );
};

export default HomePage;
