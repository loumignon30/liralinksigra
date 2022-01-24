import { Icons } from "../../components/reusableComponents/Icons";
import { useTranslation } from "react-i18next";


function Test (){
    const { t } = useTranslation();
    console.log({t})

    return { t } ;

}


const sideMenuItems = [
    {
        name: "Dashboard",
        to: "/Home",
        icon: <Icons.ai.AiFillDashboard />
    },
    {
        name: "Definições",
        to: "/Home",
        expanded: false,
        icon: <Icons.ai.AiFillSetting />,
        subMenus: [
            {
                name: "Sede da Empresa",
                to: "/sede",
                icon: <Icons.Bs.BsFillHouseFill />
            },
            {
                name: "Agência",
                to: "/Agencia",
                expanded: false,
                icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />
            },
            {
                name: "Listagem Agências",
                to: "/listaAgencias",
                expanded: false,
                icon: <Icons.Bs.BsHouse className="a-menuItem-icon" />
            },
            {
                name: "Provincias",
                to: "/listFaculty",
                icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
            },

            {
                name: "Novos usúarios",
                to: "/newUser",
                icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
            },
            {
                name: "Lista de Usúarios",
                to: "/userList",
                icon: <Icons.md.MdListAlt className="a-menuItem-icon" />
            },

        ]
    },
    {
        name: "Departamentos",
        to: "/Home",
        expanded: false,
        icon: <Icons.fc.FcDepartment />,
        subMenus: [{
            name: "Novo Departamento",
            to: "/departamento",
            icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />
        },
        {
            name: "Listagem de Departamentos",
            to: "/listagemDepartamento",
            icon: <Icons.cg.CgViewList className="a-menuItem-icon" />
        }
        ]
    },
    {
        name: "Funções",
        to: "/Home",
        expanded: false,
        icon: <Icons.fc.FcDepartment />,
        subMenus: [{
            name: "Nova Função",
            to: "/funcao",
            icon: <Icons.md.MdFeaturedPlayList className="a-menuItem-icon" />
        },
        {
            name: "Listagem Funções",
            to: "/listagemFuncao",
            icon: <Icons.cg.CgViewList className="a-menuItem-icon" />
        }
        ]
    },
    ,
    {
        name: "Funcionários",
        to: "/Home",
        expanded: false,
        icon: <Icons.fa.FaAccusoft />,
        subMenus: [{
            name: "Novo Funcionário",
            to: "/funcionario",
            expanded: false,
            icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />
        },
        {
            name: "Listagem de Funcionários",
            to: "/listagemFuncionario",
            expanded: false,
            icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />
        },
        ]
    },

    {
        name: "Cadastrar denúncias",
        to: "/Home",
        expanded: true,
        icon: <Icons.fc.FcCalendar />,
        subMenus: [
            {
                name: "Tipo de denúncia",
                to: "/",
                icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
            },
            {
                name: "Nova Denúncia",
                to: "/denuncia",
                icon: <Icons.md.MdOutlineEditCalendar className="a-menuItem-icon" />
            },
            {
                name: "Listagem de Denúncias",
                to: "/listagemDenuncia",
                icon: <Icons.go.GoCalendar className="a-menuItem-icon" />
            },

        ]
    },
    {
        name: "Tratamento de Denúncias",
        to: "/Home",
        expanded: false,
        icon: <Icons.fa.FaAccusoft />,
        subMenus: [{
            name: "Tratamento",
            to: "/courses",
            expanded: false,
            icon: <Icons.fa.FaBuffer className="a-menuItem-icon" />
        },
        {
            name: "Denúncias Tratadas",
            to: "/coursList",
            expanded: false,
            icon: <Icons.fa.FaAlignJustify className="a-menuItem-icon" />
        },
        ]
    },

    {
        name: "Analíse de Denúncias",
        to: "/Home",
        expanded: false,
        icon: <Icons.fa.FaMoneyCheckAlt />,
        subMenus: [{
            name: "Relatório de Analíses",
            to: "/FeeConfig",
            expanded: false,
            icon: <Icons.md.MdPayments className="a-menuItem-icon" />
        },
        {
            name: "Elogios",
            to: "/FeeList",
            expanded: false,
            icon: <Icons.fc.FcMoneyTransfer className="a-menuItem-icon" />
        },
        {
            name: "Resposatas de Funcionários",
            to: "/Home",
            expanded: false,
            icon: <Icons.Bs.BsFillPersonFill className="a-menuItem-icon" />
        },
        {
            name: "Denúncias por Zona",
            to: "/",
            expanded: false,
            icon: <Icons.ri.RiSecurePaymentFill className="a-menuItem-icon" />
        },

        ]

    }
];


 export default sideMenuItems;