import React from 'react'
import { Card, CardHeader, Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({chat}) => {
    const { auth } = useSelector(store => store);
     // console.log("id dhek  ",auth.user.id)
    return (
        <Card>
            <CardHeader

                avatar={
                    <Avatar sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem", bgcolor: "#191c29", color: "rbg(88, 199, 250)" }}
                        src='https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400' />
                }

                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }

                title={auth.user.id === chat.user[0].id ? chat.user[1].firstName + " " + chat.user[1].lastName
                    : chat.user[0].firstName + " " + chat.user[0].lastName}
                    
                subheader={"new message"}
            >

            </CardHeader>
        </Card>
    )
}

export default UserChatCard