import "./topbar.css"
import { Divider, Select } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from "react";
import MenuItems from '../../reusableComponents/MenuItems';
import { menuItemsNotifications } from "../../../menuData/admin/menuItemsNotifications"
import { menuItemsSettings } from "../../../menuData/admin/topBarMenuSettingData"
import { NotificationsNone, Settings, Language } from '@mui/icons-material';
import { UserLoggedContext } from '../../../adminPages/utilisador/UserLoggedContext';
import { Link, useNavigate } from "react-router-dom";
import urlImage from '../../../http-common-images';
import { Icons } from "../../../components/reusableComponents/Icons";
import liralinkLogo from "../../../assets/images/liralink.jpg";
import * as languagesFile from "../../../services/admin/Languages";

import USerEdit from '../../../adminPages/utilisador/USerEdit'

import { useTranslation } from "react-i18next";
import 'flag-icon-css/css/flag-icons.min.css';
import i18next from 'i18next';
import cookies from 'js-cookie'
import IconWithTooltip from 'icon-with-tooltip';
import Popup from "../../reusableComponents/Popup";


const languages = [
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    },
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'pt',
        name: 'Português',
        country_code: 'pt'
    },
    {
        code: 'ar',
        name: 'العربية',
        country_code: 'sa',
        dir: 'rtl'
    }
]

export default function Topbar() {

    const [show, setShow] = useState(false);
    const [showSettings, setShowSetting] = useState(false);
    const [showLnguage, setShowLnguage] = useState(false);
    const componentRefNotification = useRef();
    const componentRefSettings = useRef();
    const componentRefLanguages = useRef();
    const navigate = useNavigate();
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState("");
    const [url, setUrl] = useState(urlImage);  // backend image  URL

    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userPhoto, setUserPhoto] = useState(null);

    const [exampleState, setExampleState] = useState("");

    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode);

    const [popupTitle, setPpupTitle] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [count, setCount] = useState(0);
    //const childRefMenu = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    useEffect(() => {

        document.body.dir = currentLanguage.dir || 'ltr' // || 'ltr in case of langue that have left to right direction'
        document.title = t('app_title')

        userSavedValue.map(item => (
            setfirstName(item.firstname),
            setLastName(item.lastname),
            setUserPhoto(item.photofilename),
            setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename)
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

            if (componentRefLanguages && componentRefLanguages.current) {
                const ref = componentRefLanguages.current
                if (!ref.contains(e.target)) {
                    setShowLnguage(false);  // close the popup after clicking outside
                }
            }
        }
    }, [currentLanguage, t]);

    const clickNotification = () => {
        setShow(!show);
    }
    const clickSettings = () => {
        // setShowSetting(!showSettings);
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const closeButton = () => {
        setUserSavedValue({});
        navigate('/login');
    }

    const clicklanguage = () => {
        setShowLnguage(!showLnguage);
    }

    // const MenuDataDisplay = () => {
    //     alert("yes 4");
    //     childRefMenu.current.updateSideMenu();

    // }

    return (
        <>
            <div className="topbar">
                <div className="topbarwrapper">
                    <div className="topLeft">
                        <img alt="" src={liralinkLogo}
                            className="imageLogo" />
                        <span className="logo">SIGRA </span>
                        {/* <button onClick={MenuDataDisplay}>Test Menu Data</button> */}

                    </div>
                    <div className="topRight">
                        <div className="topbarIconContainer">
                            <Language size={25} style={{ color: "blue" }}
                                onClick={clicklanguage}
                                ref={componentRefLanguages}
                                text="Clique to change Language"
                            />

                            {showLnguage ?
                                <div className="index-front-languages">
                                    {
                                        languages.map(({ code, name, country_code }) => (
                                            <ul key={country_code} style={{ listStyle: "none" }}>
                                                <li key={country_code}>
                                                    <button className="dropdown-item-Language"
                                                        onClick={() => {
                                                            i18next.changeLanguage(code);
                                                            // MenuDataDisplay();
                                                        }
                                                        }
                                                        disabled={code === currentLanguageCode}
                                                    >
                                                        <span className={`flag-icon flag-icon-${country_code}`}
                                                            style={{ opacity: code === currentLanguageCode ? 0.5 : 1 }}
                                                        ></span> {/*mx-2 to give some margin */}
                                                        {name}</button>
                                                </li>
                                            </ul>
                                        ))}


                                </div> : null
                            }
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
                                //onClick={clickSettings}
                                ref={componentRefSettings} />
                            {/* {showSettings ?
                                <div className="index-front">
                                </div>
                                : ""} */}
                        </div>

                        <img alt="" src={imageChangeFromOutSideURL}
                        onClick={clickSettings}
                            className="topAvatar" />

                        < Icons.fa.FaWindowClose size={25} style={{ cursor: 'pointer', color: 'red', marginLeft: "10px" }}
                            onClick={closeButton}
                        />
                    </div>

                </div>
                <br />
                <Divider style={{ marginTop: '-17px', marginBottom: '-8px', borderStyle: 'solid', borderWidth: '1px', borderColor: 'black' }}
                />




            </div>
            {/* <Sidebar hideThis={false}
                ref={childRefMenu}

            /> */}

            {
                count === 1 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        closeButtonDisplay={false}
                        marginTop="-35px"
                        // title={popupTitle}
                        width="900px"
                        height="600px"
                    >
                        <USerEdit topbar="topbar"
                            closeUSer={() => {
                                setOpenPopup(false);
                            }
                            }
                        />

                    </Popup> : ""
            }

        </>
    )
}


