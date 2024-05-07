import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileAction } from '../../Redux/Auth/auth.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    outline: "none",
    overflow: "scroll-y",
    borderRadius: 3
};

export default function ProfileModel({ open, handleClose }) {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: ""
        },
        onSubmit: (values,) => {
            console.log("values ", values)
            dispatch(updateProfileAction(values))
        }
    })

    return (
        <div>
            
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>
                            <Button type="submit">Save</Button>
                        </div>
                        <div>
                            <div className='h-[15rem'>
                               <img className='w-full h-full rounded-t-md'
                                    src='https://i.pinimg.com/564x/33/c9/b1/33c9b18e7ef7cf56817f6955f220486c.jpg' />
                            </div>

                            <div className='pl-5'>
                                <Avatar className='transform -translate-y-24'
                                        sx={{ width:"10rem", height:"10rem"}}
                                        src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'
                                        />
                            </div>
                        </div>
                        <div className='space-y-3'>
                                <TextField 
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
