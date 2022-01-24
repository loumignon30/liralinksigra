import {Link} from "react-router-dom"
import React, { useState } from 'react'
import "../../App.css";

import { useTranslation } from "react-i18next";
import 'flag-icon-css/css/flag-icons.min.css';
import i18next from 'i18next';
import cookies from 'js-cookie'

const MenuItems = (props) => {
    const { name, subMenus, icon, to, expanded, className } = props;
    const [expand, setExpande] = useState(expanded);
    const { t } = useTranslation();

    return (
        <>
        <li className="menuItemssytle">
            <Link to={to} onClick={() => setExpande(!expand)}
                 className= {className}>
                <i className="icon-menu-item">{icon}</i>
                <span>{name}</span>
            </Link>
            {subMenus && subMenus.length > 0 ?
                <ul className="sub-menus">
                    {expand ?
                        subMenus.map((menu, index) => 
                            <li 
                            key={index} 
                            className="sidebarListItem" >
                                <i>{menu.icon} </i>
                                <Link to={menu.to} className="link">{menu.name}</Link>
                            </li>
                        )
                        : ""}
                </ul> : null
            }
        </li>
        </>
    );
}
export default MenuItems
