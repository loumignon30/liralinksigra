import React, { useContext, useEffect, useState }  from 'react'
import "./sidebar.css"
import MenuItems from '../../reusableComponents/MenuItems';
import sideMenuItems from '../../../menuData/admin/SideMenuData'
import { makeStyles } from '@mui/styles';
import { UserLoggedContext } from '../../../adminPages/utilisador/UserLoggedContext';
import urlImage from '../../../http-common-images';


const Sidebar = (props) => {

    const useStyles = makeStyles({
        mainContenair: {
            flex: 1,
            height: "160hv",
            background: props.backGroundColor || "rgb(15, 15, 66)",
            position: "sticky",
            top: "0px",
            textAlign: "left",
            width: "240px",
            position: "relative"
        }
    });

    const classes = useStyles();
    const {userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [url, setUrl] = useState(urlImage);  // backend image  URL
    const [userPhoto, setUserPhoto] = useState(null);
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();

    useEffect(() => {

        userSavedValue.map(item => (
            setfirstName(item.firstname),
            setLastName(item.lastname),
            setUserPhoto(item.photofilename),
            setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename)
        ));
       
    },
        []);
    return (
        // <div className="sidebar">  
        <div className={classes.mainContenair}>
            <div className="sidebarWrapper">

                <div className="sidebarMenu">
                <div style={{marginLeft:"50px", backgroundOrigin:"white"}}>
                        <img alt="" src={imageChangeFromOutSideURL}
                            className="topAvatarSideBar" />
                        <div className='userTextSideBar'>
                            <span>{firstName} </span>
                            <span>{lastName}</span>
                        </div>
                        
                    </div>
                    <hr style={{borderWidth: '1px', borderColor: 'white'}}/>
                    <h4 className="sidebarTitle">SIGRA - LIRA LINK</h4>
                    {
                        sideMenuItems.map((menuItem, index) => (
                            <MenuItems
                                key={index}
                                name={menuItem.name}
                                to={menuItem.to}
                                icon={menuItem.icon}
                                expanded={menuItem.expanded}
                                className="a-style"
                                subMenus={menuItem.subMenus || []}
                            />
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default  Sidebar;
