import React, { useContext, useEffect, useState, useRef } from 'react'
import "./sidebar.css"
import MenuItems from '../../reusableComponents/MenuItems';
//import sideMenuItems from '../../../menuData/admin/SideMenuData'
import { makeStyles } from '@mui/styles';
import { UserLoggedContext } from '../../../adminPages/utilisador/UserLoggedContext';
import urlImage from '../../../http-common-images';
import SideMenuData2 from "../../../menuData/admin/SideMenuData2"
import { Icons } from '../../reusableComponents/Icons';

import { useTranslation } from "react-i18next";

const Sidebar = (props) => {

    const { t } = useTranslation();


    const sideMenuItems = [
        {
            name: t('dashboard_menu'),
            to: "/Home",
            icon: <Icons.ai.AiFillDashboard />
        },
        {
            name: t('definicoes_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.ai.AiFillSetting />,
            subMenus: [
                {
                    name: t('sedeMenu_menu'),
                    to: "/sede",
                    icon: <Icons.Bs.BsFillHouseFill />
                },
                {
                    name: t('lista_sede'),
                    to: "/sedeList",
                    icon: <Icons.Bs.BsFillHouseFill />
                },
                {
                    name: t('agencia_menu'),
                    to: "/Agencia",
                    expanded: false,
                    icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />
                },
                {
                    name: t('listagem_agencia_menu'),
                    to: "/listaAgencias",
                    expanded: false,
                    icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />
                },
                {
                    name: t('provincias_menu'),
                    to: "/listFaculty",
                    icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
                },

                {
                    name: t('novo_usuario_menu'),
                    to: "/newUser",
                    icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
                },
                {
                    name: t('listagem_usuario_menu'),
                    to: "/userList",
                    icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
                },

            ]
        },
        {
            name: t('departamentos_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fc.FcDepartment />,
            subMenus: [{
                name: t('Novo_departamento_menu'),
                to: "/departamento",
                icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />
            },
            {
                name: t('listagem_departamento_menu'),
                to: "/listagemDepartamento",
                icon: <Icons.cg.CgViewList className="a-menuItem-icon" />
            }
            ]
        },
        {
            name: t('funcoes_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fc.FcDepartment />,
            subMenus: [{
                name: t('nova_funcao_menu'),
                to: "/funcao",
                icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />
            },
            {
                name: t('listagem_funcao_menu'),
                to: "/listagemFuncao",
                icon: <Icons.cg.CgViewList className="a-menuItem-icon" />
            }
            ]
        },
        ,
        {
            name: t('funcionarios_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaAccusoft />,
            subMenus: [{
                name: t('novo_funcionario_menu'),
                to: "/funcionario",
                expanded: false,
                icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />
            },
            {
                name: t('listagem_funcionario_menu'),
                to: "/listagemFuncionario",
                expanded: false,
                icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />
            },
            ]
        },

        {
            name: t('cadastrar_denuncias_menu'),
            to: "/Home",
            expanded: true,
            icon: <Icons.fc.FcCalendar />,
            subMenus: [
                {
                    name: t('tipo_denuncias_menu'),
                    to: "/tipoDenuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
                },
                {
                    name: t('tipo_denuncia_menu'),
                    to: "/listagemTipoDenuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
                },
                {
                    name: t('nova_denuncia_menu'),
                    to: "/denuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
                },
                {
                    name: t('listagem_denuncia_menu'),
                    to: "/listagemDenuncia",
                    icon: <Icons.go.GoCalendar className="a-menuItem-icon" />
                },

            ]
        },
        {
            name: t('tratamento_denuncia_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaAccusoft />,
            subMenus: [{
                name: t('tratamento_menu'),
                to: "/courses",
                expanded: false,
                icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />
            },
            {
                name: t('denuncia_tratadas_menu'),
                to: "/coursList",
                expanded: false,
                icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />
            },
            ]
        },

        {
            name: t('analise_denuncia_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaMoneyCheckAlt />,
            subMenus: [{
                name: t('relatorio_analise_menu'),
                to: "/FeeConfig",
                expanded: false,
                icon: <Icons.md.MdPayments className="a-menuItem-icon" />
            },
            {
                name: t('elogoios_menu'),
                to: "/FeeList",
                expanded: false,
                icon: <Icons.fc.FcMoneyTransfer className="a-menuItem-icon" />
            },
            {
                name: t('respostas_funcionario_menu'),
                to: "/Home",
                expanded: false,
                icon: <Icons.Bs.BsFillPersonFill className="a-menuItem-icon" />
            },
            {
                name: t('denucia_por_agencia_menu'),
                to: "/",
                expanded: false,
                icon: <Icons.ri.RiSecurePaymentFill className="a-menuItem-icon" />
            },
            ]
        }
    ];


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
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [url, setUrl] = useState(urlImage);  // backend image  URL
    const [userPhoto, setUserPhoto] = useState(null);
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();

    const { name, subMenus, icon, to, expanded, className } = props;
    const [expand, setExpande] = useState(expanded);
    const childRefMenu = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [menuItemChangeForceIT, setMenuItemChangeForceIT] = useState("");
    const [sideMenuItems2, setsideMenuItems2] = useState(sideMenuItems);

    useEffect(() => {

        setsideMenuItems2(sideMenuItems);

        userSavedValue.map(item => (
            setfirstName(item.firstname),
            setLastName(item.lastname),
            setUserPhoto(item.photofilename),
            setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename)
        ));

        //addItemsToMenuItem();
    },
        [t]);

    const addItemsToMenuItem = () => {
        setsideMenuItems2(sideMenuItems);
    }

    const useContextMethod = () => {

    }
    return (
        // <div className="sidebar">  
        <div className={classes.mainContenair}>
            <div className="sidebarWrapper">

                <div className="sidebarMenu">
                    <div style={{ marginLeft: "50px", backgroundOrigin: "white" }}>
                        <img alt="" src={imageChangeFromOutSideURL}
                            className="topAvatarSideBar" />
                        <div className='userTextSideBar'>
                            <span>{firstName} </span>
                            <span>{lastName}</span>
                        </div>

                    </div>
                    <hr style={{ borderWidth: '1px', borderColor: 'white' }} />
                    <h4 className="sidebarTitle">SIGRA - LIRA LINK</h4>
                    {
                        sideMenuItems2.map((menuItem, index) => (
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

            <SideMenuData2
                ref={childRefMenu}
            />

        </div>

    )
}

export default Sidebar;
