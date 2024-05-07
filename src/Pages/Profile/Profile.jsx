import { Avatar, Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../Components/Post/PostCard';
import UserReelsCard from '../../Components/Reels/UserReelsCard';
import ProfileModel from './ProfileModel';
const tabs = [
  { value: "posts", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
]
const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1, 1];
const saved = [1, 11, 1, 11, 1];

const Profile = () => {
  // const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useSelector(store => store)
  const [value, setValue] = React.useState('posts');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <Card className='py-10 w-[70%]'>

      <div className='rounded-md'>

        <div className='h-full w-full'>
          <img className='w-full h-full rounded-t-md' src="https://i.pinimg.com/564x/33/c9/b1/33c9b18e7ef7cf56817f6955f220486c.jpg"></img>
        </div>

        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem" }} src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' />

          {true ? <Button onClick={handleOpenProfileModel}  sx={{ borderRadius: "20px" }} variant='outlined'>Edit Profile</Button>
            : <Button sx={{ borderRadius: "20px" }} variant='outlined'>Follow</Button>}
        </div>

        <div className="p-5">

          <div>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
            <p>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
          </div>

          <div className='flex gap-4 items-centre py-3'>
            <span>6 post</span>
            <span>63 followers</span>
            <span>300 following</span>
          </div>

          <div>
            <p>AI engineering || Full Stack development || Ex-abc, xyz, 123</p>
          </div>

          <section>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >

                {tabs.map((items) => <Tab value={items.value} label={items.name} wrapped></Tab>)}
              </Tabs>
            </Box>
            <div className='flex justify-center'>

              {value === "posts" ? <div className='space-y-5 w-[95%] my-10'>
                {posts.map((item) => <div className='border border-slate-100 '> <PostCard item={item}/> </div>)}
              </div> : value === "reels" ? <div className='flex justify-center flex-wrap gap-2 my-7'>
                {reels.map((item) => <div className=''> <UserReelsCard item={item}/> </div>)}
              </div> : value === "saved" ? <div className='space-y-5 w-[95%] my-10'>
                {saved.map((item) => <div className='border border-slate-100'>  <PostCard item={item} /></div>)}
              </div> : ""}

            </div>
          </section>
        </div>
      </div>

      <section>
       <ProfileModel open={open} handleClose={handleClose}></ProfileModel>
      </section>
    </Card>
  )
}

export default Profile