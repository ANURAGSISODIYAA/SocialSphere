import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import  { CreatePostAction } from '../../Redux/Post/post.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '.6rem',
    outline: 'none'
};

const CreatePostModel = ({ open, handleClose }) => {
    const { auth } = useSelector(store => store)
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handelSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], 'image');
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue('image', imageUrl);
    };

    const handelSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], 'video');
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue('video', videoUrl);
    };

    const formik = useFormik({
        initialValues: {
            caption: '',
            image: '',
            video: ''
        },
        onSubmit: (values) => {
            console.log('formik values', values);
            dispatch(CreatePostAction(values));
        }
    });



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className='flex space-x-4 items-center'>
                                <Avatar />
                                <div>
                                    <p className='font-bold text-lg'>{auth.user.firstName+" "+auth.user.lastName}</p>
                                    <p className='text-sm'>{"@"+auth.user.firstName.toLowerCase()+"_"+auth.user.lastName.toLowerCase()}</p>
                                </div>
                            </div>

                            <textarea className='outline-none w-full mt-5 p-2 
                                bg-transparent border border-[#3b4054] rounded-lg'
                                placeholder='write caption.....'
                                name='caption'
                                value={formik.values.caption}
                                onChange={formik.handleChange}
                                rows='4'>
                            </textarea>

                            <div className='flex space-x-5 items-center mt-5'>
                                <div>
                                    <input type='file'
                                        accept='image/*'
                                        onChange={handelSelectImage}
                                        style={{ display: 'none' }}
                                        id='image-input'
                                    />
                                    <label htmlFor='image-input'>
                                        <IconButton color='primary' component='span'>
                                            <ImageIcon />
                                        </IconButton>
                                    </label>
                                    <span>Image</span>
                                </div>

                                <div>
                                    <input type='file'
                                        accept='video/*'
                                        onChange={handelSelectVideo}
                                        style={{ display: 'none' }}
                                        id='video-input'
                                    />
                                    <label htmlFor='video-input'>
                                        <IconButton color='primary' component='span'>
                                            <VideocamIcon />
                                        </IconButton>
                                    </label>
                                    <span>Video</span>
                                </div>
                                
                                <div className="flex flex-col">
                                    {selectedImage && <img className='max-h-80 mt-2' src={selectedImage} alt="Selected Image" />}
                                    {selectedVideo && <video className='max-h-80 mt-2' src={selectedVideo} controls></video>}
                                </div>

                                <div className='w-full mt-2'>
                                    <Button variant='contained' type='submit' sx={{ borderRadius: '1.5rem' }}>Post</Button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
};

export default CreatePostModel;
