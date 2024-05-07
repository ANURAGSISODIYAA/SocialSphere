import { Avatar, Divider, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch } from 'react-redux';
import { CreateCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { useSelector } from 'react-redux'
import { isLikedByReqUser } from '../../utils/isLikedByUser';

const PostCard = ({ item }) => {
    const {post,auth} = useSelector(store=>store)
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch()
    const handleShowComment = () => setShowComments(!showComments);

    const handleCreateComment = (content) => {
        //  console.log("postid---->" , item.postId)
        const reqData = {
            postId: item.postId,

            data: {
                content
            }
        }
        dispatch(CreateCommentAction(reqData))
    }

    const handleLikePost=()=>{
        dispatch(likePostAction(item.postId))
    }
    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                       {item.user?.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user?.firstName + " " + item.user?.lastName}
                subheader={"@" + item.user?.firstName.toLowerCase() + "_" + item.user?.lastName.toLowerCase()}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="Paella dish"
            /> */}
            <img className='w-full max-h-[30rem] object-cover object-top' src={item.image} alt=''/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user?.id,item ) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        <ShareIcon />
                    </IconButton>

                    <IconButton onClick={handleShowComment} >
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && <section>
                <div className='flex items-centre space-x-5 mx-3 my-5'>
                    <Avatar sx={{}} />
                    <input onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                            handleCreateComment(e.target.value)
                            console.log("enter key pressed", e.target.value)
                        }
                    }}
                        className='w-full outline-none bg-transparent
                    border border-[#3b4054] rounded-full px-2 py-2' type="text"
                        placeholder='write your comments'
                    />
                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs '>

                    {item.comments.map((comment) => <div className='flex items-centre space-x-5'>
                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}>
                            {comment.user?.firstName[0]}
                        </Avatar>
                        <p>{comment.content}</p>
                    </div>
                    )}

                </div>
            </section>}

        </Card>
    )
}

export default PostCard