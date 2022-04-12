import React, { useContext, useEffect, useState, useRef } from 'react';

import "./sidebar.css"
import MenuItems from '../../reusableComponents/MenuItems';
//import sideMenuItems from '../../../menuData/admin/SideMenuData'
import { makeStyles } from '@mui/styles';
import { UserLoggedContext } from '../../../adminPages/utilisador/UserLoggedContext';
import urlImage from '../../../http-common-images';
import SideMenuData2 from "../../../menuData/admin/SideMenuData2"
import { Icons } from '../../reusableComponents/Icons';
import useStylesSearchTable from '../../../components/reusableComponents/SearchTableStyle';

import { useTranslation } from "react-i18next";
import { IconContext } from 'react-icons'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Popup from '../../reusableComponents/Popup';

import USerEdit from '../../../adminPages/utilisador/USerEdit'


const Sidebar = (props) => {

    const { t } = useTranslation();
    const [popupTitle, setPpupTitle] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [count, setCount] = useState(0);

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
            id: 1,
            subMenus: [
                {
                    name: t('sedeMenu_menu'),
                    to: "/sede",
                    icon: <Icons.Bs.BsFillHouseFill />,
                    id_subMenu: 0,
                },
                {
                    name: t('lista_sede'),
                    to: "/sedeList",
                    icon: <Icons.Bs.BsFillHouseFill />,
                    id_subMenu: 0,
                },
                {
                    name: t('agencia_menu'),
                    to: "/Agencia",
                    expanded: false,
                    icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                {
                    name: t('listagem_agencia_menu'),
                    to: "/listaAgencias",
                    expanded: false,
                    icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                // {
                //     name: t('provincias_menu'),
                //     to: "/listFaculty",
                //     icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
                // },

                {
                    name: t('novo_usuario_menu'),
                    to: "/newUser",
                    icon: <Icons.md.MdListAlt className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                // {
                //     name: t('utilizador_afectacao_sede_agencia'),
                //     to: "/afetacaoSedeAgencia",
                //     icon: <Icons.md.MdListAlt className="a-menuItem-icon" />,
                //     id_subMenu: 0,
                // },
                {
                    name: t('listagem_usuario_menu'),
                    to: "/userList",
                    icon: <Icons.md.MdListAlt className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },

            ]
        },
        {
            name: t('departamentos_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fc.FcDepartment />,
            id: 0,
            subMenus: [{
                name: t('Novo_departamento_menu'),
                to: "/departamento",
                icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('listagem_departamento_menu'),
                to: "/listagemDepartamento",
                icon: <Icons.cg.CgViewList className="a-menuItem-icon" />,
                id_subMenu: 0,
            }
            ]
        },
        {
            name: t('funcoes_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fc.FcDepartment />,
            id: 0,
            subMenus: [{
                name: t('nova_funcao_menu'),
                to: "/funcao",
                icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('listagem_funcao_menu'),
                to: "/listagemFuncao",
                icon: <Icons.cg.CgViewList className="a-menuItem-icon" />,
                id_subMenu: 0,
            }
            ]
        },
        ,
        {
            name: t('funcionarios_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaAccusoft />,
            id: 0,
            subMenus: [{
                name: t('novo_funcionario_menu'),
                to: "/funcionario",
                expanded: false,
                icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('listagem_funcionario_menu'),
                to: "/listagemFuncionario",
                expanded: false,
                icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            ]
        },

        {
            name: t('cadastrar_denuncias_menu'),
            to: "/Home",
            expanded: true,
            icon: <Icons.fc.FcCalendar />,
            id: 0,
            subMenus: [
                {
                    name: t('tipo_denuncias_menu'),
                    to: "/tipoDenuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                {
                    name: t('tipo_denuncia_menu'),
                    to: "/listagemTipoDenuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                // {
                //     name: t('nova_denuncia_menu'),
                //     to: "/denuncia",
                //     icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />,
                //     id_subMenu: 0,
                // },
                {
                    name: t('listagem_denuncia_menu'),
                    to: "/listagemDenuncia",
                    icon: <Icons.go.GoCalendar className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                {
                    name: t('Listagem Avaliações'),
                    to: "/listagemAvaliacoes",
                    icon: <Icons.go.GoCalendar className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                {
                    name: t('Listagem Sugestões'),
                    to: "/ListagemSugestoes",
                    icon: <Icons.go.GoCalendar className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },
                {
                    name: t('grafique_plaine_sidebar_menu'),
                    to: "/gestaoDenuncias",
                    expanded: false,
                    icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />,
                    id_subMenu: 0,
                },

            ]
        },
        {
            name: t('tratamento_denuncia_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaAccusoft />,
            id: 0,
            subMenus: [
                {
                name: t('tratamento_menu'),
                to: "/gestaoDenuncias",
                expanded: false,
                icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('denuncia_tratadas_menu'),
                to: "/coursList",
                expanded: false,
                icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            ]
        },

        {
            name: t('analise_denuncia_menu'),
            to: "/Home",
            expanded: false,
            icon: <Icons.fa.FaMoneyCheckAlt />,
            id: 0,
            subMenus: [{
                name: t('relatorio_analise_menu'),
                to: "/FeeConfig",
                expanded: false,
                icon: <Icons.md.MdPayments className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('elogoios_menu'),
                to: "/FeeList",
                expanded: false,
                icon: <Icons.fc.FcMoneyTransfer className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('respostas_funcionario_menu'),
                to: "/Home",
                expanded: false,
                icon: <Icons.Bs.BsFillPersonFill className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            {
                name: t('denucia_por_agencia_menu'),
                to: "/",
                expanded: false,
                icon: <Icons.ri.RiSecurePaymentFill className="a-menuItem-icon" />,
                id_subMenu: 0,
            },
            ]
        }
    ];

    const [width1, setWidth] = useState("240px");
    const [showMenuText, setShowMenuText] = useState(true);


    const useStyles = makeStyles({
        mainContenair: {
            //flex: 1,
            height: "160hv",
            background: props.backGroundColor || "rgb(15, 15, 66)",
            // background: props.backGroundColor || "rgb(15, 15, 66)",
            position: "sticky",
            top: "0px",
            left: "0",
            transition: "350ms",
            textAlign: "left",
            width: width1,
            // width: "40px",
            position: "relative"
        }
    });

    // const classes = useStyles();

    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [url, setUrl] = useState(urlImage);  // backend image  URL
    const [userPhoto, setUserPhoto] = useState(null);
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState("");

    const { name, subMenus, icon, to, expanded, className } = props;
    const [expand, setExpande] = useState(expanded);
    const childRefMenu = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [menuItemChangeForceIT, setMenuItemChangeForceIT] = useState("");
    const [sideMenuItems2, setsideMenuItems2] = useState(sideMenuItems);

    const [sidebar, setSidebar] = useState(true);
    const [marginLeftMenu, setMarginLeftMenu] = useState("40px");
    const [showSidebarParam, setShowSidebarParam] = useState(true);
    const [role, setRole] = useState(0);

    const navigate = useNavigate();
    let statusTestBloqueio = 0;


    const propsInput = {  // grid style: SearchTableStyle.js
        width1: width1,
    }
    const classes = useStylesSearchTable(propsInput);

    useEffect(() => {

        setsideMenuItems2(sideMenuItems);

        userSavedValue.map(item => (
            setfirstName(item.firstname),
            setLastName(item.lastname),
            setUserPhoto(item.photofilename),
            setRole((item.nivelAcesso)),
            setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename),
            statusTestBloqueio = Number(item.status)
        ));

    },
        [t, sidebar, showMenuText, marginLeftMenu]);

    const showSidebar = () => {
        setSidebar(!sidebar);

        if (sidebar) {
            setShowSidebarParam(true);
            setShowMenuText(false);
            setWidth("60px");
            setMarginLeftMenu("150px");
            setShowSidebarParam(false);

        } else {
            setShowSidebarParam(false)
            setShowMenuText(true);
            setWidth("240px");
            setMarginLeftMenu("40px");
            setShowSidebarParam(true)
        }
    }

    const addItemsToMenuItem = () => {
        setsideMenuItems2(sideMenuItems);
    }

    const useContextMethod = () => {

    }

    const clickSettings = () => {
        // setShowSetting(!showSettings);
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }
    return (
        <>
            <IconContext.Provider value={{ color: "red" }}>

                <div className={classes.sideBarmainContenair}>

                    {showSidebarParam ?
                        <FaIcons.FaArrowLeft onClick={showSidebar}
                            style={{
                                cursor: "pointer", marginLeft: "215px",
                                marginTop: "0px", width: "30px", height: "20px"
                            }}
                        />
                        :
                        <FaIcons.FaArrowRight onClick={showSidebar}
                            style={{
                                cursor: "pointer", marginLeft:
                                    "17px", marginTop: "0px",
                                width: "30px", height: "20px"
                            }}
                        />
                    }

                    <div className="sidebarWrapper">

                        <div className="sidebarMenu">
                            {showMenuText ?
                                <div>
                                    <div style={{ marginLeft: "50px", backgroundOrigin: "white" }}>
                                        <img alt="" src={imageChangeFromOutSideURL}
                                            className="topAvatarSideBar"
                                            onClick={clickSettings}
                                            />
                                        <div className='userTextSideBar'>
                                            <span>{firstName} </span>
                                            <span>{lastName}</span>
                                        </div>

                                    </div>

                                    <hr style={{ borderWidth: '1px', borderColor: 'white' }} />
                                    <h4 className="sidebarTitle">SIGRA - LIRA LINK</h4>

                                </div> : null
                            }
                            {
                                sideMenuItems2.map((menuItem, index) => (
                                    <MenuItems
                                        key={index}
                                        to={menuItem.to}
                                        name={menuItem.name}
                                        icon={menuItem.icon}
                                        expanded={menuItem.expanded}
                                        className="a-style"
                                        subMenus={menuItem.subMenus || []}
                                        showMenuText={showMenuText}
                                        role={role}
                                        id={menuItem.id}
                                    />
                                )
                                )
                            }
                        </div>

                    </div>

                    {/* </nav> */}

                    <SideMenuData2
                        ref={childRefMenu}
                    />

                </div>
            </IconContext.Provider>

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

export default Sidebar;
