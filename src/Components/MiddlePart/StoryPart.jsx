import { Avatar } from '@mui/material'
import React from 'react'

const StoryPart = () => {
  return (
    <div>
         <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
        
          </Avatar>
          <p>Story</p>
        </div>
    </div>
  )
}

export default StoryPart