import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import img from "./social-sphere-high-resolution-logo.png";

const Authentication = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', backgroundColor: '#212534' }}
    >
      <Grid item xs={12} sm={7}>
        <img
          src={img}
          alt='Worldwide Connection'
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box p={2}>
          <Card style={{ backgroundColor: '#212534', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', color: 'white' }}>
            <Box p={4}>

              <Typography variant="h5" align="center" gutterBottom>
                Social Sphere
              </Typography>

              <Box mb={4}>
                <Typography variant="body1" align="center" paragraph>
                  Introducing SocialSphere, a specialized social platform for coders. Engage in tech discussions, share insights, and collaborate within our vibrant community.
                </Typography>
              </Box>

              <Box mb={4}>
                <Routes>
                  <Route path='/' element={<Login/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/signup' element={<Register/>}></Route>
                </Routes>
              </Box>

            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Authentication;
