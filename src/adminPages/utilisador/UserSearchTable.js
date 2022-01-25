import { Done } from '@mui/icons-material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import UsableTable from '../../components/reusableComponents/UsableTable';
import UserService from "../../services/admin/User.service";
import { Link } from "react-router-dom";
import { Delete } from '@mui/icons-material';
import urlImage from '../../http-common-images';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';
import { useTranslation } from "react-i18next";


const UserSearchTable = forwardRef((props, ref) => {

    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [userDataParam, setUserDataParam] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [url, setUrl] = useState(urlImage());  // backend image URL

    const { t } = useTranslation();


    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color
    }
    const classes = useStylesSearchTable(propsTableGrid);

    const { idDisplay, userNameDisplay, emailDisplay, roleDisplay,
        statusDisplay, actionsButtonDisplaySelect, actionsButtonDisplayEditDelete,
        pageSize, rowPerPage } = props;

    const getUser = (id, firstname) => {
        props.userData(id, firstname);
        setOpenPopup(false);
    }

    useEffect(() => {
        userGetAll();
    }, []);

    useImperativeHandle(ref, () => (
        {
            userGetAll: userGetAll // it's calling the method : unversityGetAll()
        }
    ));

    const handleDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure you want to delete this record?',
            subTitle: "You can't undo this operation",
            onConfirm: () => { onDelete(id) }
            //onConfirm: () => { setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id)) }

            //confirm: () =>{onDelete(id)}
        });

        // setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id));
    }
    const onDelete = id => {
        setUserDataParam(UserService.filter((item) => item.id !== id));
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
    const userGetAll = (sedeID) => {

        UserService.getAll(sedeID)
            .then(response => {
                setUserDataParam(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    }
    const columns = [
        idDisplay ?
            { field: 'id', headerName: 'ID', flex: 1, headerClassName: classes.gridHeader } :
            { field: 'id', headerName: 'ID', flex: 1, hide: { idDisplay }, headerClassName: classes.gridHeader },

        userNameDisplay ?
            {
                field: 'firstname', headerName: t('nome'), flex:3, headerClassName: classes.gridHeader,
                renderCell: (params) => {
                    return (
                        <>
                            <div className="UtilisateurListPlusPhoto">
                                <img className="UtilisateurListImage"
                                   // src={params.row.photofilename !==""? url + "/images/" + params.row.photofilename:  url + "/images/" +"semfoto.png"}
                                    src={params.row.photofilename !== "" ?"https://s3.amazonaws.com/liralink.sigra/" + params.row.photofilename : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}

                                   alt="" />
                                <span>{params.row.firstname} {params.row.lastname}</span>
                            </div>
                        </>
                    )
                }
            } : "",
        emailDisplay ?
            { field: 'email', headerName: t('email'), flex: 2, headerClassName: classes.gridHeader } :
            { field: 'email', headerName: t('email'), flex: 2, hide: { emailDisplay }, headerClassName: classes.gridHeader },
        roleDisplay ?
            { field: 'role', headerName: t('nivel_accesso'), flex: 1, headerClassName: classes.gridHeader } :
            { field: 'role', headerName: t('nivel_accesso'), flex: 1, hide: { roleDisplay }, headerClassName: classes.gridHeader },

        statusDisplay ?
            {
                field: 'status', headerName: t('status'), flex: 1, headerClassName: classes.gridHeader,
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
                field: 'action', headerName: t('action'), flex: 1, headerClassName: classes.gridHeader,
                renderCell: (params) => {
                    return (
                        <>
                            <Done className={classes.seachButton}
                                onClick={() => {
                                    getUser(params.row.id, params.row.firstname)
                                }
                                }
                            />
                        </>
                    )
                }
            } : { field: 'action', headerName: t('action'), flex: 1, hide:{actionsButtonDisplaySelect}, headerClassName: classes.gridHeader },
        
            actionsButtonDisplayEditDelete ?
            {
                field: 'action2', headerName: t('action'), flex: 1, headerClassName: classes.gridHeader,
                renderCell: (params) => {
                    return (
                        <>
                            <Link to={"/userEdit/" + params.row.id}
                                state={{
                                    id: params.row.id,
                                    firstname: params.row.firstname,
                                    lastname: params.row.lastname,
                                    email: params.row.email,
                                    telephone: params.row.telephone,
                                    address: params.row.address,
                                    city: params.row.city,
                                    dateofbirth: params.row.dateofbirth,
                                    gender: params.row.gender,
                                    role: params.row.role,
                                    password: params.row.password,
                                    status: params.row.status,
                                    country: params.row.country,
                                    imageChangeFromOutSideURL: params.row.photofilename !==""? "https://s3.amazonaws.com/liralink.sigra/"  + params.row.photofilename:  "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png" ,
                                    sedeID: params.row.userSede.id,
                                    sede: params.row.userSede.sede
                                }}
                            >
                                <button className="utilisateurButtonEdit">Edit</button>
                            </Link>

                            <Delete className={classes.deleteSearchButton}
                                onClick={() => handleDelete(params.row.id)} />
                        </>
                    )
                }
            } : {field: 'action2', headerName: t('action'), flex: 1, hide:{actionsButtonDisplayEditDelete}, headerClassName: classes.gridHeader},

    ];
    return (
        <>
            <UsableTable
                records={userDataParam}
                columns={columns}
                pageSize={pageSize}
                rowPerPage={rowPerPage}
            />
        </>
    )
});

export default UserSearchTable;
