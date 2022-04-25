import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import DepartamentoServices from "../../services/admin/Departamento.services";

import { useTranslation } from "react-i18next";


const DepartamentoSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

    const useStyles = makeStyles({
        paper: {
            background: props.backGroundColor || "darkBlue",
            color: props.color || "white",
            fontSize: "16px",
            fontFamily: "Times New Roman', Times, serif",
            textAlign: "center",
            width: "100%"
        },
        editButton: {
            border: "none",
            borderRadius: "10px",
            padding: "5px 10px",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
            marginRight: "20px"
        },
        deleleButton: {
            color: "red",
            cursor: "pointer"
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
        image: {
            display: "flex",
            alignItems: "center"
        },
        imageList: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px"
        }
    });

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color
    }
    const classes2 = useStylesSearchTable(propsTableGrid);

    const classes = useStyles();
    const { t } = useTranslation();


    const [openPopup, setOpenPopup] = useState(false);
    const { idDisplay, codeDisplay, actionsButtonDisplay,
        actionsButtonDisplayEditDelete, statusDisplay,
        pageSize, rowPerPage,
        sedeID, agenciaID,
        departamentoPesquisa } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL

    useEffect(() => {

       getGetAllData(sedeID, agenciaID, departamentoPesquisa);
        setUrl(urlImage());

    }, []);
    useImperativeHandle(ref, () => (
        {
            getGetAllData: getGetAllData // it's calling the method : unversityGetAll()
            // test3: test,
        }
    ));
    const getDepartamentoData = (id, code, departamento) => {
        props.departamentoData(id, code, departamento);
        setOpenPopup(false);
    }

    const getGetAllData = (sedeID1, agenciaID1, departamentoPesquisa) => {

        DepartamentoServices.getAll(sedeID1, agenciaID1, "geral", departamentoPesquisa)
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    const columns = [
        idDisplay ?
            { field: 'id', headerName: 'ID', width: 100, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, width: 100, headerClassName: classes.paper },

        codeDisplay ?
            { field: 'code', headerName: t('code'), flex: 1, headerClassName: classes.paper } :
            { field: 'code', headerName: t('code'), hide: { codeDisplay }, headerClassName: classes.paper },


        { field: 'departamento', headerName: t('departamento'), flex: 3, headerClassName: classes.paper },

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


        actionsButtonDisplay ?
            {
                field: 'action', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getDepartamentoData(params.row.id, params.row.code, params.row.departamento)
                                }
                                }
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), hide: { actionsButtonDisplay }, flex: 1, headerClassName: classes.paper },
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action2', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/departamento/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    departamento: params.row.departamento,
                                    observacao: params.row.observacao,
                                    sedeID: params.row.sedeDepartamento.id,
                                    sede: params.row.sedeDepartamento.sede,
                                    agenciaID: params.row.agenciaDepsrtamento.id,
                                    agencia: params.row.agenciaDepsrtamento.nome,
                                    status: params.row.status,

                                }}>
                                <button className={classes.editButton}>{t('edit')}</button>
                            </Link>

                            <Delete className={classes.deleleButton}
                            />
                        </>
                    )
                }
            } : { field: 'action2', headerName: t('action'), hide: { actionsButtonDisplayEditDelete }, flex: 1, headerClassName: classes.paper },

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

export default DepartamentoSearchTable;