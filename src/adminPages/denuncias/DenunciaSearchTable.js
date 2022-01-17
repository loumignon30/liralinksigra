import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import DenunciaService from "../../services/admin/Denuncias.services";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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
        actionsButtonDisplayEditDelete,
        pageSize, rowPerPage } = props;

    const [data, setData] = useState([]);
    const [url, setUrl] = useState("");  // backend image  URL
    const classes = useStyles();


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

    const getGetAllData = () => {
        DenunciaService.getAll()
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
        { field: 'data', headerName: 'DATA', width:100, headerClassName: classes.paper }:
        { field: 'data', headerName: 'DATA', hide: { dataDisplay }, headerClassName: classes.paper },
        
        horaDisplay?
        { field: 'hora', headerName: 'HORA', width:80, headerClassName: classes.paper }:
        { field: 'hora', headerName: 'HORA', hide: { horaDisplay }, headerClassName: classes.paper },
        
        nomeDisplay?
        { field: 'nome', headerName: 'Nome do Denunciante', flex: 2, headerClassName: classes.paper }:
        { field: 'nome', headerName: 'Nome', hide: { nomeDisplay }, headerClassName: classes.paper },
        
        
        tipoDenunciaDisplay ?
        { field: 'tipodenuncia', headerName: 'Tipo Denúncia',  flex: 1, headerClassName: classes.paper }:
        { field: 'tipodenuncia', headerName: 'Tipo Denúncia', hide: { tipoDenunciaDisplay }, headerClassName: classes.paper },

        emailDisplay ?
        { field: 'email', headerName: 'Email',  flex: 1, headerClassName: classes.paper }:
        { field: 'email', headerName: 'Email', hide: { emailDisplay }, headerClassName: classes.paper },

        telefoneDislay ?
        { field: 'telefone', headerName: 'Telefone',  flex: 1, headerClassName: classes.paper }:
        { field: 'telefone', headerName: 'Telefone', hide: { telefoneDislay }, headerClassName: classes.paper },

        queixaDisplay ?
        { field: 'queixa', headerName: 'Queixa',  flex: 2, headerClassName: classes.paper }:
        { field: 'queixa', headerName: 'Queixa', hide: { queixaDisplay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: 'Status', width:80, headerClassName: classes.paper,
                renderCell: (type) => {
                    return (
                        <>
                            <button className={"ButtonStatutDataGrid " + type.row.status}>{type.row.status}</button>
                        </>
                    )
                }
            } : { field: 'status', headerName: 'Status', flex: 1, hide: { statusDisplay }, headerClassName: classes.gridHeader },

        actionsButtonDisplaySelect ?
            {
                field: 'action', headerName: 'Action', width:80, headerClassName: classes.paper,
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
            } : { field: 'action', headerName: 'Action', hide: { actionsButtonDisplaySelect }, flex: 1, headerClassName: classes.paper },
        ,
        actionsButtonDisplayEditDelete ?
            {
                field: 'action1', headerName: 'Ação', width:110, headerClassName: classes.paper,
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
            } : { field: 'action1', headerName: 'Action', hide: { actionsButtonDisplayEditDelete }, flex: 1, headerClassName: classes.paper },

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