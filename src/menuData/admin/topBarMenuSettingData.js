import { NotificationsNone, Language, Settings, Menu, House,
    List, Collections, Speed, FaceOutlined, Close, Message, 
    SettingsApplications, PowerOffOutlined, TrackChanges, 
    Comment, Fingerprint, Face} from '@mui/icons-material';
    
    import { FaBeer } from 'react-icons/fa';

    export const menuItemsSettings = [
        {
            name: "Definições",
            to: "#",
            expanded: true,
            icon: < SettingsApplications/>,
            subMenus: [{
                name: "Tracar de Senha",
                to: "/newCategory",
                expanded: true,
                icon: <Fingerprint className="a-menuItem-icon" />
            },
            {
                name: "Profile do Usúario",
                to: "#",
                icon: <Face className="a-menuItem-icon" />
            },
            {
                name: "Analíse de conexões",
                to: "#",
                icon: <FaBeer className="a-menuItem-icon" />
            }

            ]
        },

        {
            name: "Logout",
            to: "/login",
            icon: <Close/>
        },
    ];

