import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import SedeService from "../../services/admin/Sede.services";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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

    const [openPopup, setOpenPopup] = useState(false);
    const { idDisplay, codeDisplay, actionsButtonSelectDisplay,
        actionsButtonDisplayEditDelete,
        pageSize, rowPerPage } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL

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

    const getSedeData = (id, code, sede) => {
        props.sedeData(id, code, sede);
        setOpenPopup(false);
    }

    const getGetAllData = () => {
        SedeService.getAll()
            .then(response => {
                setData(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const columns = [
        idDisplay?
        { field: 'id', headerName: 'ID', width: 70, headerClassName: classes.paper }:
        { field: 'id', headerName: 'ID',  hide: { idDisplay }, headerClassName: classes.paper },
        
        codeDisplay ?
        { field: 'code', headerName: 'Code', flex: 1, headerClassName: classes.paper }:
        { field: 'code', headerName: 'Code', hide: { codeDisplay }, headerClassName: classes.paper },

        {
            field: 'sede', headerName: 'Nome da Sede', maxWidth: 320, flex: 3, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <div className={classes.image}>
                            <img className={classes.imageList}
                               // src={url + "/images/" + params.row.imageName}
                                src={params.row.imageName !== "" ?"https://s3.amazonaws.com/liralink.sigra/" + params.row.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}

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

        actionsButtonSelectDisplay ?
            {
                field: 'action1', headerName: 'Selecione', flex: 1, headerClassName: classes.paper,
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
            { field: 'action1', headerName: 'Selecione', flex: 1, hide: { actionsButtonSelectDisplay }, headerClassName: classes.paper }
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action', headerName: 'Ação', flex: 1, headerClassName: classes.paper,
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
                                    imageChangeFromOutSideURL: params.row.imageName !==""? "https://s3.amazonaws.com/liralink.sigra/"  + params.row.imageName:  "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png" 

                               }}>
                                <button className={classes.editButton}>Edit</button>
                            </Link>

                            <Delete className={classes.deleleButton}
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: 'Selecione', flex: 1, hide: { actionsButtonDisplayEditDelete }, headerClassName: classes.paper }
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

export default SedeSearchTable;