import { Link } from "react-router-dom"
import React, { useState } from 'react'
import "../../App.css";
import swal from 'sweetalert';

import { useTranslation } from "react-i18next";
import 'flag-icon-css/css/flag-icons.min.css';

const MenuItems = (props) => {
    const { name, subMenus, icon, to, expanded, className, showMenuText,
        role, id } = props;
    const [expand, setExpande] = useState(expanded);
    const { t } = useTranslation();

    const menuClick = () => {

        if (Number(id) === Number(role)) {
            setExpande(!expand);
        } else {
            return (swal(t('mensagem_erro_menu_atencao'), t('mensagem_erro_menu_administrador'), "warning"));
        }
    }

    return (
        <>
            <li className="menuItemssytle">

                <Link to={to}
                    onClick={() => {

                        if (Number(id) === 0) {
                            setExpande(!expand);
                        }
                        if (Number(id) > 0 && (Number(role) > 1 && Number(role) < 10)) {
                            return (swal(t('mensagem_erro_menu_atencao'), t('mensagem_erro_menu_administrador'), "warning"));
                        } else {
                            setExpande(!expand);
                        }
                    }
                    }
                    className={className}>
                    <i className="icon-menu-item">{icon}
                    </i>
                    {showMenuText ? <span>{name}</span> : null}
                </Link>

                {subMenus && subMenus.length > 0 ?
                    <ul className="sub-menus">
                        {expand ?
                            subMenus.map((menu, index) => (
                                <li
                                    key={index}
                                    className="sidebarListItem" >
                                    {showMenuText ? <i>{menu.icon} </i> : ""}
                                    {showMenuText ? <Link to={menu.to} className="link">{menu.name}</Link> : null}
                                </li>
                            ))
                            : null}
                    </ul> : null
                }
            </li>
        </>
    );
}
export default MenuItems
