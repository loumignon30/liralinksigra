import { Delete, Done } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
//import { UniversityData, headerCells } from "../../services/admin/UniversityDataNew";
import AgenciaService from "../../services/admin/Agencia.service";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

const AgenciaSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
            getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
            editCliqued: editCliqued
        }
    ));

    const getAgenciaData = (id, code, agencia) => {
        props.agenciaData(id, code, agencia);
        setOpenPopup(false);
    }

    const getGetAllData = () => {
        AgenciaService.getAll()
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
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
            { field: 'id', headerName: 'ID', flex: 0.5, headerClassName: classes.paper } :
            { field: 'id', headerName: 'ID', hide: { idDisplay }, width: 50, headerClassName: classes.paper },

        codeDisplay ?
            { field: 'code', headerName: t('code'), flex: 1, headerClassName: classes.paper } :
            { field: 'code', headerName: t('code'), hide: { codeDisplay }, flex: 1, headerClassName: classes.paper },

        {
            field: 'nome', headerName: t('nome_Agencia'), flex: 3, headerClassName: classes.paper,
            // renderCell: (params) => {
            //     return (
            //         <>
            //             <div className="UtilisateurListPlusPhoto">
            //                 <img className="UtilisateurListImage"
            //                     src={url + "/images/" + params.row.imageName}
            //                     //src="http://localhost:5001/api/images/Captura%20de%20Ecr%C3%A3%20(379).png"

            //                     //src={params.row.imageName}
            //                     alt="" />
            //                 {params.row.nome}
            //             </div>
            //         </>
            //     )

            //     // C:\React app\world-university-backend\public\images
            // }
        },
        emailDisplay ?
            { field: 'email', headerName: t('email'), flex: 1, headerClassName: classes.paper } :
            { field: 'email', headerName: t('email'), hide: { emailDisplay }, flex: 1, headerClassName: classes.paper },

        telefoneDislay ?
            { field: 'telefone', headerName: t('contacto'), flex: 1, headerClassName: classes.paper } :
            { field: 'telefone', headerName: t('contacto'), hide: { telefoneDislay }, headerClassName: classes.paper },

        cidadeDisplay ?
            { field: 'cidade', headerName: t('cidade'), flex: 1, headerClassName: classes.paper } :
            { field: 'cidade', headerName: t('cidade'), hide: { cidadeDisplay }, headerClassName: classes.paper },

        paisDisplay ?
            { field: 'pais', headerName: t('pais'), flex: 1, headerClassName: classes.paper } :
            { field: 'pais', headerName: t('pais'), hide: { paisDisplay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 1, headerClassName: classes.paper,
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
                field: 'action', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getAgenciaData(params.row.id, params.row.code, params.row.nome)
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
                field: 'action2', headerName: t('action'), flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/agencia/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    nome: params.row.nome,
                                    endereco: params.row.endereco,
                                    email: params.row.email,
                                    telefone: params.row.telefone,
                                    cidade: params.row.cidade,
                                    pais: params.row.pais,
                                    nomeRepresentante: params.row.nomeRepresentante,
                                    status: params.row.status
                                    // imageChangeFromOutSideURL: url + "/images/" + params.row.imageName
                                }}
                            >
                                <button className="utilisateurButtonEdit">Edit</button>

                                {/* <button type='button' className="utilisateurButtonEdit"
                                onClick={() => {
                                    editCliqued(params.row.id,
                                        params.row.code,
                                        params.row.nome,
                                        params.row.endereco,
                                        params.row.email,
                                        params.row.telefone,
                                        params.row.cidade,
                                        params.row.pais,
                                        params.row.nomeRepresentante,
                                        params.row.status,
                                        url + "/images/" + params.row.imageName,
                                        params.row.imageName
                                    )
                                }
                                } 
                            >Edit</button>
                            */}

                            </Link>

                            <Delete className="utilisateurButtonDelete"
                            />
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

export default AgenciaSearchTable;