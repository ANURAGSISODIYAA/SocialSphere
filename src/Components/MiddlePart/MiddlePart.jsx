import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryPart from './StoryPart';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModel from '../CreatePost/CreatePostModel';
import { useDispatch } from 'react-redux'
import { getAllPostAction } from '../../Redux/Post/post.action';
import {useSelector} from 'react-redux'

const story = [11, 1, 1, 1, 1]
//const posts = [11, 1, 1, 1, 1]

const MiddlePart = () => {

  const dispatch = useDispatch();
  const {post} = useSelector(store=>store)

  const [openCreatePostModel, setOpenCreatePostModel] = useState(false);

  const handleCloseCreatePostModel = () => {
    setOpenCreatePostModel(false);
  }

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModel(true);
  }

  useEffect(()=>{
    dispatch(getAllPostAction())
  },[post.newComment])

  return (
    <div className='px-20'>
      {/* Story Section */}
      <section className='flex  items-centre p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }}></AddIcon>
          </Avatar>
          <p>Add</p>
        </div>
        {story.map((item) => <StoryPart></StoryPart>)}
      </section>

      {/* Create Post Section */}
      <Card className='p-5 mt-5'>

        <div className='flex justify-between'>
          <Avatar />
          <input onClick={handleOpenCreatePostModel} readOnly className='outline-none w-[90%] rounded-full px-5 
          bg-transparent border-[#3b4054] border' type='text' ></input>
        </div>

        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span>Write Post</span>
          </div>
        </div>




      </Card>

      {/* Post Section */}
      <div className='mt-5 space-y-3'>
        {post.posts.map((item) => <PostCard item={item}/>)}

      </div>
      <div>
        <CreatePostModel open={openCreatePostModel} handleClose={handleCloseCreatePostModel} />
      </div>
    </div>
  )
}

export default MiddlePart