import React, { useEffect, useState } from 'react';
import { Grid, Avatar, } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../Components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChat } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Message = () => {

  const dispatch = useDispatch()
  const { auth, message } = useSelector(store => store);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    dispatch(getAllChat())
  }, [])

  useEffect(() => {
    setMessages([...messages, message.message])
  }, [message.message])

  console.log("chats---> ", message.chats)

  const handleSelectImage = async (e) => {
    setLoading(true)
    console.log("handle Select Image....")
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl)
    setLoading(false);

  }

  const handelCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage
    };
    dispatch(createMessage({ message, sendMessageToServer }))
  }




  // use to connect to backend
  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws")
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onErr);

  }, [])

  const onConnect = () => {
    console.log("webScoket connected");
  }
  const onErr = (error) => {
    console.log("webScoket eroor", error);
  }

  //subscribe stomp client
  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      console.log("inside");
      const subscription = stompClient.subscribe(
        `/user/${currentChat?.id}/private`,
        onMessageReceive
      );
      console.log("outside");
    }
  }, [stompClient, auth.user, currentChat]);


  // on subscribing sending msg to server
  const sendMessageToServer = async (newMessage) => {
    if (stompClient && newMessage) {
      try {
        const response = await stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(newMessage));
        console.log("Message sent successfully:", response); // Log for debugging
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };


  const onMessageReceive = (payload) => {
    const messageContent = payload.body;
    if (messageContent) {
      try {
        const recivedMessage = JSON.parse(messageContent);
        console.log("message receive from WebSocket", recivedMessage);
        setMessages([...messages, recivedMessage]);
      } catch (error) {
        console.error("Error parsing message content:", error);
      }
    } else {
      console.warn("Received message with undefined content.");
    }
  };


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrolTop = chatContainerRef.current.scrolHeight;
    }
  }, [messages])
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>

        <Grid item xs={3} className='px-5'>
          <div className='flex h-full justify-between space-x-2'>

            <div className='w-full'>

              <Link to="/" className='flex space-x-4 items-center py-5'>
                <WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>
              </Link>

              <div className='h-[83vh]'>

                <div className=''>
                  <SearchUser />
                </div>

                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>

                  {
                    message.chats.map((item) => {
                      //     console.log({ item })
                      return <div onClick={() => {
                        console.log(item)
                        setCurrentChat(item)
                        setMessages(item.message)
                      }}>
                        <UserChatCard chat={item} />
                      </div>
                    })
                  }

                </div>

              </div>

            </div>

          </div>
        </Grid>

        <Grid item xs={9} className='h-full'>

          {currentChat ? <div>

            <div className='flex justify-between items-center border-1 p-5'>

              <div className='flex items-centre space-x-3'>
                <Avatar src='https://images.pexels.com/photos/16884194/pexels-photo-16884194/free-photo-of-blonde-with-dog-by-blue-door.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' />
                <p>{auth.user?.id === currentChat.user[0]?.id ? currentChat.user[1].firstName + " " + currentChat.user[1].lastName
                  : currentChat.user[0].firstName + " " + currentChat.user[0].lastName}</p>
              </div>

              <div className='flex space-x-3'>
                <IconButton>
                  <CallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>

            <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
              {messages.map((item) => <ChatMessage message={item} />)}
            </div>

            <div className='sticky bottom-0 border-1'>

              {
                selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt='' />
              }


              <div className='py-5 flex items-center justify-centre space-x-5'>



                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handelCreateMessage(e.target.value)
                      setSelectedImage(null)
                    }
                  }}
                  className='bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5'
                  placeholder='Type message...' type='text' />

                <div>
                  <input type='file' accept='image/*'
                    onChange={handleSelectImage} className='hidden' id='image-input' />
                  <label htmlFor='image-input'>
                    <AddPhotoAlternateIcon />
                  </label>
                </div>

              </div>
            </div>

          </div> : <div className='h-full space-y-5 flex flex-col justify-centre items-center'>
            <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
            <p className='text-xl font-semibold'>No Chat Selected</p>
          </div>

          }

        </Grid>

      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  )
}

export default Message
