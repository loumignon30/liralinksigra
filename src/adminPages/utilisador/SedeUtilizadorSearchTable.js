import { Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import SedeUtilizador from "../../services/admin/SedeUtilizador.services";
import { Link } from "react-router-dom";
import { Delete } from '@mui/icons-material';
import urlImage from '../../http-common-images';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import useId from '@mui/material/utils/useId';


const SedeUtilizadorSearchTable = forwardRef((props, ref) => {

    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [userDataParam, setUserDataParam] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [url, setUrl] = useState(urlImage());  // backend image URL

    const { t } = useTranslation();


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


    const { idDisplay, codeDisplay, ciadadeDisplay, paisDiplay,
        actionsButtonSelectDisplay,
        actionsButtonDisplayEditDelete, statusDisplay,
        pageSize, rowPerPage, sedeID, userID,sedeDisplay } = props;

        const [sedeSearch, setSedeSearch] = useState("");
        const [campoPesquisa, setCampoPesquisa] = useState("");

    const getUser = (id, firstname) => {
        props.userData(id, firstname);
        setOpenPopup(false);
    }

    useEffect(() => {

        userGetAll(sedeID, userID);
    }, []);

    useImperativeHandle(ref, () => (
        {
            userGetAll: userGetAll, // it's calling the method : unversityGetAll()
            sedSearch: sedSearch
        }
    ));

    // const handleDelete = (id) => {
    //     setConfirmDialog({
    //         isOpen: true,
    //         title: 'Are you sure you want to delete this record?',
    //         subTitle: "You can't undo this operation",
    //         onConfirm: () => { onDelete(id) }
    //         //onConfirm: () => { setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id)) }

    //         //confirm: () =>{onDelete(id)}
    //     });

    //     // setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id));
    // }
    const onDelete = id => {
        setUserDataParam(SedeUtilizador.filter((item) => item.id !== id));
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        setNotify({
            isOpen: true,
            message: 'New Faculty was Submitted!',
            type: 'success'
        })
    }
    const userGetAll = (sedeID, userID) => {

        SedeUtilizador.getAll(sedeID, userID)
            .then(response => {
                setUserDataParam(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    }

    const getSedeData = (id, code, sede) => {
        props.sedeData(id, code, sede);
        setOpenPopup(false);
    }

    const handleDelete = (id) => {

        SedeUtilizador.delete(id)
            .then(response => {
                userGetAll(sedeID);
            })
            .catch(e => {
                console.log(e);
            });

        // props.getPaymentDelete(id);
        setOpenPopup(false);
    }
    const sedSearch = (sedeToSearch) => {
        setCampoPesquisa("sede");
        setSedeSearch(sedeToSearch);
    }

    const columns = [
        idDisplay ?
            {
                field: 'id', headerName: 'ID', flex: 0.2, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.sedeSedeUtilizador.id}
                        </>
                    )
                },

            } : { field: 'id', headerName: 'id', hide: { idDisplay }, headerClassName: classes.gridHeader },

        codeDisplay ?
            {
                field: 'code', headerName: t('code'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.sedeSedeUtilizador.code}
                        </>
                    )
                }
            } : { field: 'code', headerName: 'code', flex: 1, hide: { codeDisplay }, headerClassName: classes.gridHeader },

        {
            field: 'sede', headerName: t('sede'), flex: 2.5, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <div className={classes.image}>
                            <img className={classes.imageList}
                                // src={url + "/images/" + params.row.imageName}
                                src={params.row.sedeSedeUtilizador.imageName !== "" ? "https://s3.amazonaws.com/liralink.sigra/" + params.row.sedeSedeUtilizador.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}

                                //src="http://localhost:5001/api/images/Captura%20de%20Ecr%C3%A3%20(379).png"

                                //src={params.row.imageName}
                                alt="" />
                            {params.row.sedeSedeUtilizador.sede}
                        </div>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },

        ciadadeDisplay ?

            {
                field: 'cidade', headerName: t('cidade'), flex: 0.4, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.sedeSedeUtilizador.cidade}
                        </>
                    )
                }
            } : { field: 'cidade', headerName: 'cidade', flex: 1, hide: { codeDisplay }, headerClassName: classes.gridHeader },

        paisDiplay ?
            {
                field: 'pais', headerName: t('pais'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            {params.row.sedeSedeUtilizador.pais}
                        </>
                    )
                }
            } : { field: 'pais', headerName: 'pais', flex: 1, hide: { codeDisplay }, headerClassName: classes.gridHeader },


        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 1, headerClassName: classes.paper,
                renderCell: (type) => {
                    return (
                        <>
                            <button className={type.row.sedeSedeUtilizador.status == "1" ?
                                classes2.ButtonStatutDataGrid_actif :
                                type.row.sedeSedeUtilizador.status == "2" ?
                                    classes2.ButtonStatutDataGrid_inactif :
                                    type.row.sedeSedeUtilizador.status == "3" ?
                                        classes2.ButtonStatutDataGrid_pendent :
                                        type.row.sedeSedeUtilizador.status == "4" ?
                                            classes2.ButtonStatutDataGrid_deleted : ""}
                            >
                                {type.row.sedeSedeUtilizador.status == "1" ? t('status_actif') :
                                    type.row.sedeSedeUtilizador.status == "2" ? t('status_inactive') :
                                        type.row.sedeSedeUtilizador.status == "3" ? t('status_pendente') :
                                            type.row.sedeSedeUtilizador.status == "4" ? t('status_apagado') :
                                                ""}
                            </button>

                        </>
                    )
                }
            } : { field: 'status', headerName: 'statusDisplay', flex: 1, hide: { statusDisplay }, headerClassName: classes.gridHeader },

        actionsButtonSelectDisplay ?
            {
                field: 'action1', headerName: t('selecione'), flex: 0.8, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>

                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getSedeData(params.row.sedeSedeUtilizador.id,
                                        params.row.sedeSedeUtilizador.code,
                                        params.row.sedeSedeUtilizador.sede)
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
                field: 'action', headerName: t('action'), flex: 0.3, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Delete className={classes.deleleButton}
                                onClick={() => handleDelete(
                                    params.row.id
                                )}
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), flex: 1, hide: { actionsButtonDisplayEditDelete }, headerClassName: classes.paper }
    ];
    return (
        <>
            <UsableTable
                records={userDataParam}
                columns={columns}
                pageSize={pageSize}
                rowPerPage={rowPerPage}
                firstNameSearch={sedeSearch}
                campoPesquisa={campoPesquisa}
            />
        </>
    )
});

export default SedeUtilizadorSearchTable;
