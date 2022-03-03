import { Delete, Done, Search } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import DepartamentoServices from "../../services/admin/Departamento.services";
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import semfoto from "../../assets/images/semfoto.png"

import { useTranslation } from "react-i18next";

const DepartamentoResumoSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
        getGetAllDataFuncionarioDepartamento(sedeID, 0);
    }, []);

    useImperativeHandle(ref, () => (
        {
            getGetAllDataFuncionarioDepartamento: getGetAllDataFuncionarioDepartamento
        }
    ));

    const getGetAllDataFuncionarioDepartamento = (sedeID1) => {

        DepartamentoServices.getAll(sedeID1, 0, "resumo").then(response => {

            setData(response.data)
        })
            .catch(e => {
                //console.log(e);
            });
    }

    const columns = [

        { field: 'id', headerName: "ID", flex: 0.2, headerClassName: classes.paper },

        {
            field: 'sede', headerName: t('sede'), flex: 1, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.sedeFuncionario.sede}
                    </>
                )
            }
        },
        {
            field: 'agencia', headerName: t('agencia'), flex: 1, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.agenciaFuncionario.nome}
                    </>
                )
            }
        },
        {
            field: 'departamento', headerName: t('departamento'), flex: 1, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.departamentoFuncionario.departamento}
                    </>
                )
            }
        },

        {
            field: 'total_funcionarios', headerName: t('total_employes'), flex: 0.4, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <h4 style={{fontWeight:"bold", textAlign :"center", margin: "0 auto"}}>
                            {params.row.total_funcionarios}</h4>
                    </>
                )
            }
        },
        
                {field: 'action1', headerName: t('action'), flex: 0.1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/funcionario/" + params.row.id}
                                state={{
                                     id: params.row.id,
                                //     code: params.row.code,
                                //     primeironome: params.row.primeironome,
                                //     ultimonome: params.row.ultimonome,
                                //     endereco: params.row.endereco,
                                //     email: params.row.email,
                                //     telefone: params.row.telefone,
                                //     status: params.row.status,
                                //     imageChangeFromOutSideURL: params.row.imageName ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png",
                                //     sedeID: params.row.sedeFuncionario.id,
                                //     sede: params.row.sedeFuncionario.sede,
                                //     agenciaId: params.row.agenciaFuncionario.id,
                                //     agencia: params.row.agenciaFuncionario.nome,
                                //     departamentoID: params.row.departamentoFuncionario.id,
                                //     departamento: params.row.departamentoFuncionario.departamento,
                                //     funcaoID: params.row.funcaoFuncionario.id,
                                //     funcao: params.row.funcaoFuncionario.funcao,
                                 }}
                                >
                            </Link>

                            <Search className="utilisateurButtonDelete"
                            />
                        </>
                    )
                }
            }

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

export default DepartamentoResumoSearchTable;