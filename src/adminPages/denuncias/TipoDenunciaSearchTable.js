import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import TipoDenunciaServices from "../../services/admin/TipoDenuncia.services";
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { useTranslation } from "react-i18next";

const TipoDenunciaSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
    const { idDisplay, linguaDisplay, tipoDenunciaDisplay, linguaAbreviacaoDisplay,
        statusDisplay,
        actionsButtonDisplaySelect,
        actionsButtonDisplayEditDelete,
        pageSize, rowPerPage } = props;

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

    const getGetAllData = (abreviationLangue, sedeID) => {
        TipoDenunciaServices.getAll(abreviationLangue, sedeID)
            // TipoDenunciaServices.getAll(abreviationLangue, sedeID)
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const columns = [
        idDisplay ?

            { field: 'id', headerName: 'ID', flex: 1, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, headerClassName: classes.paper },

        tipoDenunciaDisplay ?
            { field: 'tipoDenuncia', headerName: t('tipo_denuncia'), flex: 3, headerClassName: classes.paper } :
            { field: 'tipoDenuncia', headerName: t('tipo_denuncia'), hide: { tipoDenunciaDisplay }, headerClassName: classes.paper },


        linguaDisplay ?
            { field: 'lingua', headerName: t('language'), flex: 1, headerClassName: classes.paper } :
            { field: 'lingua', headerName: t('language'), hide: { linguaDisplay }, headerClassName: classes.paper },

        linguaAbreviacaoDisplay ?
            { field: 'abreviationLangue', headerName: t('lingua'), flex: 1, headerClassName: classes.paper } :
            { field: 'abreviationLangue', headerName: t('lingua'), hide: { linguaAbreviacaoDisplay }, headerClassName: classes.paper },


        statusDisplay ?
            {
                field: 'status', headerName: t('status'), width: 80, headerClassName: classes.paper,
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
                            </button>
                        </>

                    )
                }
            } : { field: 'status', headerName: t('status'), flex: 1, hide: { statusDisplay }, headerClassName: classes.gridHeader },

        actionsButtonDisplaySelect ?
            {
                field: 'action', headerName: t('action'), width: 80, headerClassName: classes.paper,
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
                field: 'action1', headerName: t('action'), width: 110, headerClassName: classes.paper,
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

export default TipoDenunciaSearchTable;