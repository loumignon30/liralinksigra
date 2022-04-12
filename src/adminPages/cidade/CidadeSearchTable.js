import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import CidadeServices from "../../services/admin/Cidade.service";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";
import { Rating } from '@mui/material';

const CidadeSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

    const useStyles = makeStyles({
        paper: {
            background: props.backGroundColor || "darkBlue",
            color: props.color || "white",
            fontSize: "16px",
            fontFamily: "Times New Roman', Times, serif",
            textAlign: "center"
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

    const classes = useStyles();

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color
    }
    const classes2 = useStylesSearchTable(propsTableGrid);

    const [openPopup, setOpenPopup] = useState(false);
    const { idDisplay, descricaoDisplay,
        actionsButtonSelectDisplay,
        actionsButtonDisplayEditDelete, statusDisplay,
        pageSize, rowPerPage, paisID } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL

    const [campoPesquisa, setCampoPesquisa] = useState("");

    const isMounted = useRef(true);


    const { t } = useTranslation();

    useEffect(() => {
        //isMounted.current = true;
        getGetAllData(paisID);
        // return () => { // This code runs when component is unmounted
        //     isMounted.current = false; // (4) set it to false when we leave the page
        // }

    }, []);

    useImperativeHandle(ref, () => (
        {
            getGetAllData: getGetAllData // it's calling the method : unversityGetAll()
        }
    ));

    const getSedeData = (id, code, sede) => {
        props.sedeData(id, code, sede);
        setOpenPopup(false);
    }

    const getGetAllData = (tipoPesquisa, paisID) => {
        try{
            CidadeServices.getAll(tipoPesquisa, paisID)
            .then(response => {
                setData(response.data)
            })
        }catch(err) {
            console.log(err)
        }
       
    }

    const columns = [
        idDisplay ?
            { field: 'id', headerName: 'ID', width: 50, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, headerClassName: classes.paper },
        {
            field: 'code', headerName: t('code'), flex: 1, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <span style={{ fontSize: "11px" }}>
                        {params.row.code}
                            
                        </span>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },
        {
            field: 'pais', headerName: t('cidade'), flex: 3, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <span style={{ fontSize: "11px" }}>
                        {params.row.cidade}
                            
                        </span>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },
        actionsButtonSelectDisplay ?
            {
                field: 'action1', headerName: t('selecione'), flex: 0.8, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>

                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getSedeData(params.row.id, params.row.code, params.row.sede)
                                }
                                }
                            />
                        </>
                    )
                }
            } :
            { field: 'action1', headerName: t('selecione'), flex: 1, hide: { actionsButtonSelectDisplay }, headerClassName: classes.paper }
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            { <Link to={"/sedeEdit/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    pais: params.row.pais,

                                }}>
                                <button className={classes.editButton}>{t('edit')}</button>
                            </Link> }

                            <Delete className={classes.deleleButton}
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), flex: 1, hide: { actionsButtonDisplayEditDelete }, headerClassName: classes.paper }
    ];
    return (
        <>
            <UsableTable
                records={data}
                columns={columns}
                pageSize={pageSize}
                rowPerPage={rowPerPage}
                //firstNameSearch={sedeSearch}
                //campoPesquisa={campoPesquisa}
            />
        </>
    )
});

export default CidadeSearchTable;