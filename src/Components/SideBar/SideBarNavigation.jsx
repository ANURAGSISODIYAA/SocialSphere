import { useSelector } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListIcon from '@mui/icons-material/List';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const navigationMenu = [
    {
        title: "Home",
        icon: <HomeIcon />,
        path: "/"
    },
    {
        title: "Reels",
        icon: <ExploreIcon />,
        path: "/reels"
    },
    {
        title: "Create Reels",
        icon: <ControlPointIcon />,
        path: "/create-reels"
    },
    {
        title: "Notification",
        icon: <NotificationsIcon />,
        path: "/notification"
    },
    {
        title: "Message",
        icon: <MessageIcon />,
        path: "/message"
    },
    {
        title: "List",
        icon: <ListIcon />,
        path: "/list"
    },
    {
        title: "Communities",
        icon: <GroupsIcon />,
        path: "/community"
    },
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        path: "/profile"
    }
]