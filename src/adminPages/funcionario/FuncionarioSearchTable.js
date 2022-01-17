import { Delete, Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import FuncionarioService from "../../services/admin/Funcionario.services";
import urlImage from '../../http-common-images';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const FuncionarioSearchTable = forwardRef((props, ref) => { // forwardRef is used to update method from this file from ather files

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
    const { idDisplay, codeDisplay, primeiroNomeDisplay, ultimonomeDisplay,
        emailDisplay,telefoneDislay, statusDisplay,
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
        FuncionarioService.getAll()
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
        
        {
            field: 'nomeCompleto', headerName: 'Nome Completo', flex: 3, headerClassName: classes.paper,
            renderCell: (params) => {
                return (
                    <>
                        <div className="UtilisateurListPlusPhoto">
                            <img className="UtilisateurListImage"
                                src={url + "/images/" + params.row.imageName}
                                //src="http://localhost:5001/api/images/Captura%20de%20Ecr%C3%A3%20(379).png"

                                //src={params.row.imageName}
                                alt="" />
                            {params.row.primeironome + " " + params.row.ultimonome}
                        </div>
                    </>
                )

                // C:\React app\world-university-backend\public\images
            }
        },
        primeiroNomeDisplay ?
        { field: 'primeironome', headerName: 'Primeiro Nome',  flex: 1, headerClassName: classes.paper }:
        { field: 'primeironome', headerName: 'Primeiro Nome', hide: { primeiroNomeDisplay }, headerClassName: classes.paper },

        ultimonomeDisplay ?
        { field: 'ultimonome', headerName: 'Ultimo Nome',  flex: 1, headerClassName: classes.paper }:
        { field: 'ultimonome', headerName: 'Ultimo Nome', hide: { ultimonomeDisplay }, headerClassName: classes.paper },

        emailDisplay ?
        { field: 'email', headerName: 'Email',  flex: 1, headerClassName: classes.paper }:
        { field: 'email', headerName: 'Email', hide: { emailDisplay }, headerClassName: classes.paper },

        telefoneDislay ?
        { field: 'telefone', headerName: 'Telefone',  flex: 1, headerClassName: classes.paper }:
        { field: 'telefone', headerName: 'Telefone', hide: { telefoneDislay }, headerClassName: classes.paper },

        statusDisplay ?
            {
                field: 'status', headerName: 'Status', flex: 1, headerClassName: classes.paper,
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
                field: 'action', headerName: 'Action', flex: 1, headerClassName: classes.paper,
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
                field: 'action1', headerName: 'Ação', flex:1, headerClassName: classes.paper,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/funcionario/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    code: params.row.code,
                                    primeironome: params.row.primeironome,
                                    ultimonome: params.row.ultimonome,
                                    endereco: params.row.endereco,
                                    email: params.row.email,
                                    telefone: params.row.telefone,
                                    status: params.row.status,
                                    imageChangeFromOutSideURL: url + "/images/" + params.row.imageName,
                                    sedeID: params.row.sedeFuncionario.id,
                                    sede: params.row.sedeFuncionario.sede,
                                    agenciaId: params.row.agenciaFuncionario.id,
                                    agencia: params.row.agenciaFuncionario.nome,
                                    departamentoID: params.row.departamentoFuncionario.id,
                                    departamento: params.row.departamentoFuncionario.departamento,
                                    funcaoID: params.row.funcaoFuncionario.id,
                                    funcao: params.row.funcaoFuncionario.funcao,
                                }}>
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

export default FuncionarioSearchTable;