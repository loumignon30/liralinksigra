import React from 'react';

import { NotificationsNone, Language, Settings, Menu, House,
    List, Collections, Speed, FaceOutlined, Close, Message, 
    SettingsApplications, PowerOffOutlined, TrackChanges, 
    Comment, Fingerprint, Face} from '@mui/icons-material';
export const menuItemsNotifications = [
    {
        name: "Messages dos Usários",
        to: "/Home",
        icon: <Message/>
    },
    {
        name: "Profile",
        to: "/Home",
        icon: <PowerOffOutlined/>
    },

    {
        name: "Tarefas",
        to: "/Home",
        icon: <TrackChanges/>
    },
    {
        name: "Commentários",
        to: "/Home",
        icon: <Comment/>
    },

];
