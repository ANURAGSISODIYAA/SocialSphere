import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', backgroundColor: '#fff' }}
    >
      <Grid item xs={12} sm={7}>
        <img
          src='https://media.istockphoto.com/id/486401982/vector/social-network.jpg?s=612x612&w=0&k=20&c=hYmtwoEoVtICdHdUePkCTdQtN8QrJ-vbo3HdOaXBiVU='
          alt='Worldwide Connection'
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box p={2}>
          <Card style={{ backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Box p={4}>
              <Typography variant="h5" align="center" gutterBottom style={{ color: '#333' }}>
                Social Sphere
              </Typography>
              <Box mb={4}>
                <Typography variant="body1" align="center" paragraph style={{ color: '#666' }}>
                  Introducing SocialSphere, a specialized social platform for coders. Engage in tech discussions, share insights, and collaborate within our vibrant community.
                </Typography>
              </Box>
              <Box mb={4}>
                {/* Add spacing between email container, password container, and login button */}
                {/* <Login /> */}
                <Register></Register>
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Authentication;











// import React from 'react';
// import { Card, Grid } from '@mui/material';
// import Login from './Login';

// const Authentication = () => {
//   return (
//     <Grid container>
//       <Grid item xs={7}>
//         <img
//           src='https://img.freepik.com/free-vector/worldwide-connection-blue-background-illustration-vector_53876-76826.jpg?t=st=1711547186~exp=1711550786~hmac=08c2158c2107dcfd095dd40285117c3ec74228032c78e443cd650ae1619f50d6&w=1380'
//           alt='Worldwide Connection'
//           style={{ width: '100%', height: '145%', objectFit: 'cover', marginLeft: '-0%' }}
//         />
//       </Grid>
//       <Grid item xs={5}>
//         <div className='px-20 flex flex-col justify-center h-full'>
//           <Card className='p-8'>
//             <div className='flex flex-col items-center mb-8 space-x-1'>
//               <h1 className='text-center'>Social Sphere</h1>
//               <p className='text-center text-sm'>Introducing SocialSphere, a specialized social platform for coders. Engage in tech discussions, share insights, and collaborate within our vibrant community.</p>
//             </div>
//             <Login />
//           </Card>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }

// export default Authentication;
