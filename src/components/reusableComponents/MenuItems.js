import {Link} from "react-router-dom"
import React, { useState } from 'react'
import "../../App.css"

const MenuItems = (props) => {
    const { name, subMenus, icon, to, expanded, className } = props;
    const [expand, setExpande] = useState(expanded)
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
                            <li className="sidebarListItem" key={index}>
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
