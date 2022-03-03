import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import FuncionarioService from "../../services/admin/Funcionario.services";
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import semfoto from "../../assets/images/semfoto.png"

import { useTranslation } from "react-i18next";

const FuncionarioSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

    const useStyles = makeStyles({
        paper: {
            background: props.backGroundColor || "darkBlue",
            color: props.color || "white",
            fontSize: "16px",
            fontFamily: "Times New Roman', Times, serif",
            textAlign: "center",
            width: "100%"
        },
        searchButton: {
            border: "none",
            borderRadius: "10px",
            padding: "5px 10px",
            backgroundColor: "white",
            color: "green",
            cursor: "pointer",
            marginRight: "20px"
        },
    });

    const [openPopup, setOpenPopup] = useState(false);
    const { idDisplay, codeDisplay, primeiroNomeDisplay, ultimonomeDisplay,
        emailDisplay, telefoneDislay, statusDisplay,
        actionsButtonDisplaySelect,
        actionsButtonDisplayEditDelete,
        pageSize, rowPerPage,
        sedeID, agenciaID, agenciaDisplay } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL
    const [firstNameSearch, setFirstNameSearch] = useState("");
    const [campoPesquisa, setCampoPesquisa] = useState("");

    

    const classes = useStyles();


    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color
    }
    const classes2 = useStylesSearchTable(propsTableGrid);

    const { t } = useTranslation();

    useEffect(() => {
       // getGetAllData(sedeID, agenciaID);
        setUrl(urlImage());

    }, []);

    useImperativeHandle(ref, () => (
        {
            getFirstnameSearch: getFirstnameSearch,
            getLasttnameSearch: getLasttnameSearch,
            getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
            getGetAllDataFuncionarioAgencia : getGetAllDataFuncionarioAgencia       }
    ));

    const getFuncionarioData = (id, code, agencia) => {
        props.agenciaData(id, code, agencia);
        setOpenPopup(false);
    }

    const getGetAllData = (sedeID, agenciaID) => {

        FuncionarioService.getAll(sedeID, agenciaID, "codigoPesquisa2", "")
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    const getGetAllDataFuncionarioAgencia = (sedeID) => {
        FuncionarioService.getAll(sedeID, 0, "TodasAsAgencia", "")
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const getFirstnameSearch = (firstNameToSearch) => {
        setCampoPesquisa("primeironome");
        setFirstNameSearch(firstNameToSearch);
    }
    const getLasttnameSearch = (lastNameToSearch) => {
        setCampoPesquisa("ultimonome");
        setFirstNameSearch(lastNameToSearch)
    }

    const columns = [
        idDisplay ?

            { field: 'id', headerName: 'ID', flex: 1, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, headerClassName: classes.paper },

            agenciaDisplay ?
            {field: 'agencia', headerName: t('agencia'), flex: 1.5, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                            {params.row.agenciaFuncionario.nome}
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        }: { field: 'agencia', headerName: t('agencia'), flex: 1, hide: { agenciaDisplay }, headerClassName: classes.gridHeader },,

        codeDisplay ?
            { field: 'code', headerName: t('code'), flex: 0.5, headerClassName: classes.paper } :
            { field: 'code', headerName: t('code'), hide: { codeDisplay }, flex: 1, headerClassName: classes.paper },

        {
            field: 'nomeCompleto', headerName: t('nome_completo'), flex: 3, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <div className="UtilisateurListPlusPhoto">
                            <img className="UtilisateurListImage"
                                src={params.row.imageName !== "" ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}
                                // src={params.row.imageName !== "" ? url + "/images/" + params.row.imageName : url + "/images/" + "semfoto.png"}
                                //src="http://localhost:5001/api/images/Captura%20de%20Ecr%C3%A3%20(379).png"

                                //src={params.row.imageName}
                                alt="" />
                            {params.row.primeironome + " " + params.row.ultimonome}
                        </div>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },
        primeiroNomeDisplay ?
            { field: 'primeironome', headerName: t('nome'), flex: 1, headerClassName: classes.paper } :
            { field: 'primeironome', headerName: t('apelido'), hide: { primeiroNomeDisplay }, headerClassName: classes.paper },

        ultimonomeDisplay ?
            { field: 'ultimonome', headerName: t('nome'), flex: 1, headerClassName: classes.paper } :
            { field: 'ultimonome', headerName: t('apelido'), hide: { ultimonomeDisplay }, headerClassName: classes.paper },

        emailDisplay ?
            { field: 'email', headerName: t('email'), flex: 1, headerClassName: classes.paper } :
            { field: 'email', headerName: t('email'), hide: { emailDisplay }, headerClassName: classes.paper },

        telefoneDislay ?
            { field: 'telefone', headerName: t('contacto'), flex: 1, headerClassName: classes.paper } :
            { field: 'telefone', headerName: t('contacto'), hide: { telefoneDislay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 1, headerClassName: classes.paper,
                renderCell: (type) => {
                    return (
                        <>
                            <button className={type.row.status == "1" ?
                                classes2.ButtonStatutDataGrid_actif :
                                type.row.status == "2" ?
                                    classes2.ButtonStatutDataGrid_inactif :
                                    type.row.status == "3" ?
                                        classes2.ButtonStatutDataGrid_pendent :
                                        type.row.status == "4" ?
                                            classes2.ButtonStatutDataGrid_deleted : ""}
                            >
                                {type.row.status == "1" ? t('status_actif') :
                                    type.row.status == "2" ? t('status_inactive') :
                                        type.row.status == "3" ? t('status_pendente') :
                                            type.row.status == "4" ? t('status_apagado') :
                                                ""}
                            </button>                        </>
                    )
                }
            } : { field: 'status', headerName: t('status'), flex: 1, hide: { statusDisplay }, headerClassName: classes.gridHeader },

        actionsButtonDisplaySelect ?
            {
                field: 'action', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getFuncionarioData(params.row.id, params.row.code, params.row.primeironome)
                                }
                                }
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), hide: { actionsButtonDisplaySelect }, flex: 1, headerClassName: classes.paper },
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action1', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/funcionario/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    primeironome: params.row.primeironome,
                                    ultimonome: params.row.ultimonome,
                                    endereco: params.row.endereco,
                                    email: params.row.email,
                                    telefone: params.row.telefone,
                                    status: params.row.status,
                                    imageChangeFromOutSideURL: params.row.imageName ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png",
                                    sedeID: params.row.sedeFuncionario.id,
                                    sede: params.row.sedeFuncionario.sede,
                                    agenciaId: params.row.agenciaFuncionario.id,
                                    agencia: params.row.agenciaFuncionario.nome,
                                    departamentoID: params.row.departamentoFuncionario.id,
                                    departamento: params.row.departamentoFuncionario.departamento,
                                    funcaoID: params.row.funcaoFuncionario.id,
                                    funcao: params.row.funcaoFuncionario.funcao,
                                }}>
                                <button className="utilisateurButtonEdit">{t('edit')}</button>
                            </Link>

                            <Delete className="utilisateurButtonDelete"
                            />
                        </>
                    )
                }
            } : { field: 'action1', headerName: t('action'), hide: { actionsButtonDisplayEditDelete }, flex: 1, headerClassName: classes.paper },

    ];
    return (
        <>
            <UsableTable
                records={data}
                columns={columns}
                pageSize={pageSize}
                rowPerPage={rowPerPage}
                firstNameSearch={firstNameSearch}
                campoPesquisa={campoPesquisa}
            />
        </>
    )
});

export default FuncionarioSearchTable;