import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import FuncaoService from "../../services/admin/Funcao.services";

const FuncaoSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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

    const classes = useStyles();

    const [openPopup, setOpenPopup] = useState(false);
    const { idDisplay, codeDisplay, actionsButtonDisplay,
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

    const getFuncaoData = (id, code, funcao) => {
        props.funcaoData(id, code, funcao);
        setOpenPopup(false);
    }

    const getGetAllData = () => {
        FuncaoService.getAll()
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
        
        codeDisplay?
        { field: 'code', headerName: 'Code', flex: 1, headerClassName: classes.paper }:
        { field: 'code', headerName: 'Code', hide: { codeDisplay }, flex: 1, headerClassName: classes.paper },
        
        { field: 'funcao', headerName: 'Função',  flex: 3, headerClassName: classes.paper },

        actionsButtonDisplay ?
            {
                field: 'action', headerName: 'Action', flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Done className={classes.searchButton}
                                onClick={() => {
                                    getFuncaoData(params.row.id, params.row.code, params.row.funcao)
                                }
                                }
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: 'Action', hide: { actionsButtonDisplay }, flex: 1, headerClassName: classes.paper }
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action2', headerName: 'Ação', flex: 1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/funcao/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    funcao: params.row.funcao,
                                    observacao: params.row.observacao,
                                    status: params.row.status,
                                    sedeID: params.row.sedeFuncao.id,
                                    sede: params.row.sedeFuncao.sede,
                                    agenciaID : params.row.agenciaFuncao.id,
                                    agencia: params.row.agenciaFuncao.nome,
                                }}>
                                <button className={classes.editButton}>Edit</button>
                            </Link>

                            <Delete className={classes.deleleButton}
                            />
                        </>
                    )
                }
            } : { field: 'action2', headerName: 'Action', hide: { actionsButtonDisplayEditDelete }, flex: 1, headerClassName: classes.paper },

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

export default FuncaoSearchTable;