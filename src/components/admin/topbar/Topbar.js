import "./topbar.css"
import { Divider } from '@mui/material';
import { useContext, useEffect, useRef, useState } from "react";
import MenuItems from '../../reusableComponents/MenuItems';
import { menuItemsNotifications } from "../../../menuData/admin/menuItemsNotifications"
import { menuItemsSettings } from "../../../menuData/admin/topBarMenuSettingData"
import { NotificationsNone, Settings, Menu, Close } from '@mui/icons-material';
import { UserLoggedContext } from '../../../adminPages/utilisador/UserLoggedContext';
import { useNavigate } from "react-router-dom";
import urlImage from '../../../http-common-images';
import { Icons } from "../../../components/reusableComponents/Icons";
import liralinkLogo from "../../../assets/images/liralink.jpg";

export default function Topbar() {

    const [show, setShow] = useState(false);
    const [showSettings, setShowSetting] = useState(false);
    const componentRefNotification = useRef();
    const componentRefSettings = useRef();
    const navigate = useNavigate();
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();
    const [url, setUrl] = useState(urlImage);  // backend image  URL

    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userPhoto, setUserPhoto] = useState(null);

    const [exampleState, setExampleState] = useState();

    useEffect(() => {

        userSavedValue.map(item => (
            setfirstName(item.firstname),
            setLastName(item.lastname),
            setUserPhoto(item.photofilename),
            setImageChangeFromOutSideURL(url + "/images/" + item.photofilename)
        ));

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e) {

            if (componentRefNotification && componentRefNotification.current) {
                const ref = componentRefNotification.current
                if (!ref.contains(e.target)) {
                    setShow(false);  // close the popup after clicking outside
                }
            }

            if (componentRefSettings && componentRefSettings.current) {
                const ref = componentRefSettings.current
                if (!ref.contains(e.target)) {
                    setShowSetting(false);  // close the popup after clicking outside
                }
            }
        }
    }, []);

    const clickNotification = () => {
        setShow(!show);
    }
    const clickSettings = () => {
        setShowSetting(!showSettings);
    }

    const closeButton = () => {
        setUserSavedValue({});
        navigate('/login');
    }

    return (
        <div className="topbar">
            <div className="topbarwrapper">
                <div className="topLeft">
                    <img alt="" src={liralinkLogo}
                        className="imageLogo" />
                    <span className="logo">SIGRA </span>

                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <Menu size={25} />
                    </div>
                    <div className="topbarIconContainer">
                        <NotificationsNone size={25} />
                        <span className="topIconBag"
                            onClick={clickNotification}
                            ref={componentRefNotification}>5</span>
                        {show ?
                            <div className="index-front">{
                                menuItemsNotifications.map((menuItem, index) => (
                                    <MenuItems
                                        key={index}
                                        name={menuItem.name}
                                        to={menuItem.to}
                                        icon={menuItem.icon}
                                        expanded={menuItem.expanded}
                                        className="a-style-popup"
                                        subMenus={menuItem.subMenus || []}
                                    />
                                ))}
                            </div>
                            : ""}
                    </div>
                    <div className="topbarIconContainer">
                        <Settings size={25}
                            onClick={clickSettings}
                            ref={componentRefSettings} />
                        {showSettings ?
                            <div className="index-front">{
                                menuItemsSettings.map((menuItem, index) => (
                                    <MenuItems
                                        key={index}
                                        name={menuItem.name}
                                        to={menuItem.to}
                                        icon={menuItem.icon}
                                        expanded={menuItem.expanded}
                                        className="a-style-popup"
                                        subMenus={menuItem.subMenus || []}
                                    />
                                ))}
                            </div>
                            : ""}
                    </div>

                    <img alt="" src={imageChangeFromOutSideURL}
                        className="topAvatar" />

                    < Icons.fa.FaWindowClose size={25} style={{ cursor: 'pointer', color: 'red', marginLeft:"10px" }}
                        onClick={closeButton}
                    />
                </div>

            </div>
            <br />
            <Divider style={{ marginTop: '-17px', marginBottom: '-8px', borderStyle: 'solid', borderWidth: '1px', borderColor: 'black' }}
            />
        </div>
    )
}


