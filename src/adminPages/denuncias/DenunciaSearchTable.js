import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import DenunciaService from "../../services/admin/Denuncias.services";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { useTranslation } from "react-i18next";


const DenunciaSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
    const { idDisplay, nomeDisplay, tipoDenunciaDisplay, dataDisplay,
        horaDisplay, emailDisplay,telefoneDislay, statusDisplay, queixaDisplay,
        actionsButtonDisplaySelect,
        actionsButtonDisplayEditDelete, linguaQueixa,
        pageSize, rowPerPage } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL
    const classes = useStyles();

    const { t } = useTranslation();

    useEffect(() => {
        getGetAllData();
        setUrl(urlImage());

    }, []);

    useImperativeHandle(ref, () => (
        {
            getGetAllData: getGetAllData // it's calling the method : unversityGetAll()
            // test3: test,
        }
    ));

    const getFuncionarioData = (id, code, agencia) => {
        props.agenciaData(id, code, agencia);
        setOpenPopup(false);
    }

    const getGetAllData = (abreviationLangue) => {
        DenunciaService.getAll(abreviationLangue)
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const columns = [
        idDisplay ?

        { field: 'id', headerName: 'ID', flex:1, headerClassName: classes.paper }:
        { field: 'id', headerName: 'ID', hide: { idDisplay }, headerClassName: classes.paper },
        
        dataDisplay?
        { field: 'data', headerName: t('data'), width:100, headerClassName: classes.paper }:
        { field: 'data', headerName: t('data'), hide: { dataDisplay }, headerClassName: classes.paper },
        
        horaDisplay?
        { field: 'hora', headerName: t('hora'), width:80, headerClassName: classes.paper }:
        { field: 'hora', headerName: t('hora'), hide: { horaDisplay }, headerClassName: classes.paper },
        
        nomeDisplay?
        { field: 'nome', headerName: t('denunciante'), flex: 2, headerClassName: classes.paper }:
        { field: 'nome', headerName: t('denunciante'), hide: { nomeDisplay }, headerClassName: classes.paper },
        
        
        tipoDenunciaDisplay ?
        {
            field: 'tipodenuncia', headerName: t('tipo_denuncia'), flex: 1.5, headerClassName: classes.paper,
            renderCell: (type) => {
                return (
                    <>
                        {type.row.denunciaTipodenuncia.tipoDenuncia}
                    </>
                )
            }
        }:
        { field: 'tipodenuncia', headerName: t('tipo_denuncia'), hide: { tipoDenunciaDisplay }, headerClassName: classes.paper },

        linguaQueixa ?
        {
            field: 'linguaqueixa', headerName: t('language'), flex: 1, headerClassName: classes.paper,
            renderCell: (type) => {
                return (
                    <>
                        {type.row.denunciaTipodenuncia.lingua}
                    </>
                )
            }
        }:
        
        { field: 'linguaqueixa', headerName: t('tipo_denuncia'), hide: { linguaQueixa }, headerClassName: classes.paper },


        emailDisplay ?
        { field: 'email', headerName: t('email'),  flex: 1, headerClassName: classes.paper }:
        { field: 'email', headerName: t('email'), hide: { emailDisplay }, headerClassName: classes.paper },

        telefoneDislay ?
        { field: 'telefone', headerName: t('contacto'),  flex: 1, headerClassName: classes.paper }:
        { field: 'telefone', headerName: t('contacto'), hide: { telefoneDislay }, headerClassName: classes.paper },

        queixaDisplay ?
        { field: 'queixa', headerName: t('queixa'),  flex: 2, headerClassName: classes.paper }:
        { field: 'queixa', headerName: t('queixa'), hide: { queixaDisplay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: t('status'), width:80, headerClassName: classes.paper,
                renderCell: (type) => {
                    return (
                        <>
                            <button className={"ButtonStatutDataGrid " + type.row.status}>{type.row.status}</button>
                        </>
                    )
                }
            } : { field: 'status', headerName: t('status'), flex: 1, hide: { statusDisplay }, headerClassName: classes.gridHeader },

        actionsButtonDisplaySelect ?
            {
                field: 'action', headerName: t('action'), width:80, headerClassName: classes.paper,
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
                field: 'action1', headerName: t('action'), width:110, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/Home"}
                                // state={{
                                //     id: params.row.id,
                                //     code: params.row.code,
                                //     primeironome: params.row.primeironome,
                                //     ultimonome: params.row.ultimonome,
                                //     endereco: params.row.endereco,
                                //     email: params.row.email,
                                //     telefone: params.row.telefone,
                                //     status: params.row.status,
                                //     imageChangeFromOutSideURL: url + "/images/" + params.row.imageName,
                                //     sedeID: params.row.sedeFuncionario.id,
                                //     sede: params.row.sedeFuncionario.sede,
                                //     agenciaId: params.row.agenciaFuncionario.id,
                                //     agencia: params.row.agenciaFuncionario.nome,
                                //     departamentoID: params.row.departamentoFuncionario.id,
                                //     departamento: params.row.departamentoFuncionario.departamento,
                                //     funcaoID: params.row.funcaoFuncionario.id,
                                //     funcao: params.row.funcaoFuncionario.funcao,
                                // }}
                                >
                                <button className="utilisateurButtonEdit">Edit</button>
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
            />
        </>
    )
});

export default DenunciaSearchTable;