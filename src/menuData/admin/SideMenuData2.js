import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Icons } from "../../components/reusableComponents/Icons";
import { useTranslation } from "react-i18next";

const SedeSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

    const { t } = useTranslation();

    useEffect(() => {

/*     sideMenuItems;
 */

    }, [ t('agencia')]);

    useImperativeHandle(ref, () => (
        {
           sideMenuItems: sideMenuItems, // it's calling the method : unversityGetAll()
        }
    ));


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
                name:  t('listagem_departamento_menu'),
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
                    to: "/",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
                },
                {
                    name: t('nova_denuncia_menu'),
                    to: "/denuncia",
                    icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
                },
                {
                    name:  t('listagem_denuncia_menu'),
                    to: "/listagemDenuncia",
                    icon: <Icons.go.GoCalendar className="a-menuItem-icon" />
                },
    
            ]
        },
        {
            name:  t('tratamento_denuncia_menu'),
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
                name:  t('relatorio_analise_menu'),
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
    return (
        <>  
        </>
        )
});

export default SedeSearchTable;