import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import SedeService from "../../services/admin/Sede.services";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

const SedeSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
    const { idDisplay, codeDisplay, ciadadeDisplay, paisDiplay,
        actionsButtonSelectDisplay,
        actionsButtonDisplayEditDelete, statusDisplay,
        pageSize, rowPerPage } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL

    const [sedeSearch, setSedeSearch] = useState("");
    const [campoPesquisa, setCampoPesquisa] = useState("");

    const isMounted = useRef(true);


    const { t } = useTranslation();

    useEffect(() => {
        // alert("33");
        //isMounted.current = true;
        getGetAllData();
        setUrl(urlImage());
        // return () => { // This code runs when component is unmounted
        //     isMounted.current = false; // (4) set it to false when we leave the page
        // }

    }, []);

    useImperativeHandle(ref, () => (
        {
            getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
            sedSearch: sedSearch
        }
    ));

    const getSedeData = (id, code, sede) => {
        props.sedeData(id, code, sede);
        setOpenPopup(false);
    }

    const getGetAllData = () => {

        try{
            SedeService.getAll()
            .then(response => {
                setData(response.data)
            })
        }catch(err) {
            //console.log(err)
        }
       
    }

    const sedSearch = (sedeToSearch) => {
        setCampoPesquisa("sede");
        setSedeSearch(sedeToSearch);
    }

    const columns = [
        idDisplay ?
            { field: 'id', headerName: 'ID', width: 50, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, headerClassName: classes.paper },

        codeDisplay ?
            { field: 'code', headerName: t('code'), flex: 1, headerClassName: classes.paper } :
            { field: 'code', headerName: 'Code', hide: { codeDisplay }, headerClassName: classes.paper },

        {
            field: 'sede', headerName: t('sede'), flex: 2.5, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <div className={classes.image}>
                            <img className={classes.imageList}
                                // src={url + "/images/" + params.row.imageName}
                                src={params.row.imageName !== "" ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}

                                //src="http://localhost:5001/api/images/Captura%20de%20Ecr%C3%A3%20(379).png"

                                //src={params.row.imageName}
                                alt="" />
                            {params.row.sede}
                        </div>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },

        ciadadeDisplay ?
            { field: 'cidade', headerName: t('cidade'), flex: 1, headerClassName: classes.paper } :
            { field: 'cidade', headerName: 'cidade', hide: { ciadadeDisplay }, headerClassName: classes.paper },

        paisDiplay ?
            { field: 'pais', headerName: t('pais'), flex: 1, headerClassName: classes.paper } :
            { field: 'pais', headerName: 'pais', hide: { paisDiplay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 0.5, headerClassName: classes.paper,
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
                            <Link to={"/sedeEdit/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    sede: params.row.sede,
                                    email: params.row.email,
                                    contacto: params.row.contacto,
                                    endereco: params.row.endereco,
                                    cidade: params.row.cidade,
                                    pais: params.row.pais,
                                    status: params.row.status,
                                    imageChangeFromOutSideURL: params.row.imageName !== "" ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"

                                }}>
                                <button className={classes.editButton}>{t('edit')}</button>
                            </Link>

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
                firstNameSearch={sedeSearch}
                campoPesquisa={campoPesquisa}
            />
        </>
    )
});

export default SedeSearchTable;