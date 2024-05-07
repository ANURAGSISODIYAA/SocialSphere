import React, { useState } from 'react'
import { Card, CardHeader, Avatar } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/Auth/auth.action'
import { createChat } from '../../Redux/Message/message.action';


const SearchUser = () => {
  const [username, setusername] = useState("")
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
   
  const handleSearchUser = (e) => {
    setusername(e.target.value)
    console.log("search user")
    dispatch(searchUserAction(username))
  }

  const handleClick = (id) => {
  dispatch(createChat({userId:id}))
   
  };

  return (
    <div>
      <div className='py-5 relative'>

        <input className='bg-transparent border border-[#3b0454]
                    outline-none w-full px-5 py-3 rounded-full ' type='text'
          placeholder='search user.....' onChange={handleSearchUser} />

        {
          username && (
            auth.searchUser.map((item) => <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer '>
            
            <CardHeader onClick={() => {
                handleClick(item.id);
                setusername("")
                }}
              avatar={<Avatar src='https://images.pexels.com/photos/19961874/pexels-photo-19961874/free-photo-of-a-woman-is-standing-in-front-of-a-neon-sign.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' />}
              title={item.firstName+" "+item.lastName}
              subheader={"@"+item.firstName.toLowerCase()+" "+item.lastName.toLowerCase()}
            />
          </Card>
           )
          )
        }
      </div>


    </div>
  )
}

export default SearchUser