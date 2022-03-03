import { Delete, Done } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import AgenciaUtilizador from "../../services/admin/AgenciaUtilizador.service";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

const AgenciaUtilizadorSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

    const useStyles = makeStyles({
        paper: {
            background: props.backGroundColor || "darkBlue",
            color: props.color || "white",
            fontSize: "16px",
            fontFamily: "Times New Roman', Times, serif",
            textAlign: "center",
            // width: "100%"
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
    const { idDisplay, codeDisplay, actionsButtonDisplaySelect,
        actionsButtonDisplayEditDelete, emailDisplay, telefoneDislay,
        cidadeDisplay, paisDisplay, statusDisplay, backGroundColor, color,
        pageSize, rowPerPage, sedeID, userID } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL
    const classes = useStyles();

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color
    }
    const classes2 = useStylesSearchTable(propsTableGrid);

    const { t } = useTranslation();


    useEffect(() => {

        getGetAllData(sedeID, userID);

        setUrl(urlImage());

    }, []);

    useImperativeHandle(ref, () => (
        {
            getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
            editCliqued: editCliqued
        }
    ));

    const getAgenciaData = (id, code, agencia) => {
        props.agenciaData(id, code, agencia);
        setOpenPopup(false);
    }

    const getGetAllData = (sedeID, userID) => {
        AgenciaUtilizador.getAll(sedeID, userID)
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleDelete = (id) => {

        AgenciaUtilizador.delete(id, userID)
            .then(response => {
                getGetAllData(sedeID, userID);
            })
            .catch(e => {
                console.log(e);
            });

        // props.getPaymentDelete(id);
        setOpenPopup(false);
    }

    const editCliqued = (id, code, nome, endereco, email, telefone, cidade,
        pais, nomeRepresentante, status, imageChangeFromOutSideURL,
        imageName) => {

        props.editClick(id, code, nome, endereco, email, telefone, cidade,
            pais, nomeRepresentante, status, imageChangeFromOutSideURL,
            imageName);
    }

    const columns = [
        idDisplay ?
            {
                field: 'id', headerName: 'ID', flex: 0.2, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.id}
                        </>
                    )
                },

            } : { field: 'id', headerName: 'id', hide: { idDisplay }, headerClassName: classes.gridHeader },

        codeDisplay ?
            {
                field: 'code', headerName: 'CODE', flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.code}
                        </>
                    )
                },

            } : { field: 'code', headerName: 'code', hide: { codeDisplay }, headerClassName: classes.gridHeader },

        {
            field: 'nome', headerName: t('nome_Agencia'), flex: 3, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.agenciaUtilizadorAfetacao.nome}
                    </>
                )
            },
        },

        emailDisplay ?
            {
                field: 'email', headerName: t('email'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.email}
                        </>
                    )
                },

            } : { field: 'email', headerName: 'email', hide: { emailDisplay }, headerClassName: classes.gridHeader },

        telefoneDislay ?
            {
                field: 'telefone', headerName: t('contacto'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.telefone}
                        </>
                    )
                },

            } : { field: 'telefone', headerName: 'telefone', hide: { telefoneDislay }, headerClassName: classes.gridHeader },

        cidadeDisplay ?
            {
                field: 'cidade', headerName: t('cidade'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.cidade}
                        </>
                    )
                },

            } : { field: 'cidade', headerName: 'cidade', hide: { cidadeDisplay }, headerClassName: classes.gridHeader },

        paisDisplay ?
            {
                field: 'pais', headerName: t('pais'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.agenciaUtilizadorAfetacao.pais}
                        </>
                    )
                },

            } : { field: 'pais', headerName: 'pais', hide: { paisDisplay }, headerClassName: classes.gridHeader },


        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 1, headerClassName: classes.paper,
                renderCell: (type) => {
                    return (
                        <>
                            <button className={type.row.agenciaUtilizadorAfetacao.status == "1" ?
                                classes2.ButtonStatutDataGrid_actif :
                                type.row.agenciaUtilizadorAfetacao.status == "2" ?
                                    classes2.ButtonStatutDataGrid_inactif :
                                    type.row.agenciaUtilizadorAfetacao.status == "3" ?
                                        classes2.ButtonStatutDataGrid_pendent :
                                        type.row.agenciaUtilizadorAfetacao.status == "4" ?
                                            classes2.ButtonStatutDataGrid_deleted : ""}
                            >
                                {type.row.agenciaUtilizadorAfetacao.status == "1" ? t('status_actif') :
                                    type.row.agenciaUtilizadorAfetacao.status == "2" ? t('status_inactive') :
                                        type.row.agenciaUtilizadorAfetacao.status == "3" ? t('status_pendente') :
                                            type.row.agenciaUtilizadorAfetacao.status == "4" ? t('status_apagado') :
                                                ""}
                            </button>                        
                            </>
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
                                    getAgenciaData(params.row.agenciaUtilizadorAfetacao.id, 
                                        params.row.agenciaUtilizadorAfetacao.code, 
                                        params.row.agenciaUtilizadorAfetacao.nome)
                                }
                                }
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), flex: 1, hide: { actionsButtonDisplaySelect }, headerClassName: classes.paper },
        ,

        actionsButtonDisplayEditDelete ?
            {
                field: 'action2', headerName: t('action'), flex: 0.3, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Delete className="utilisateurButtonDelete"
                                onClick={() => handleDelete(
                                    params.row.id
                                )} />
                        </>
                    )
                }
            } : { field: 'action2', headerName: t('action'), flex: 1, hide: { actionsButtonDisplayEditDelete }, headerClassName: classes.paper },
        ,

    ];
    return (
        <>
            <UsableTable
                records={data}
                columns={columns}
                pageSize={pageSize}
                rowPerPage={rowPerPage}
            />
        </>
    )
});

export default AgenciaUtilizadorSearchTable;