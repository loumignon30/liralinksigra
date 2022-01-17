import { useState, useEffect } from 'react';
import "./userList.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';

const UserList = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>LISTA DOS USUÁRIOS DO SISTEMA</h3>

            <div style={{ height: 400, width: '100%' }}>
                <UserSearchTable
                    idDisplay={true}
                    userNameDisplay={true}
                    emailDisplay={true}
                    roleDisplay={true}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={false}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="#50394c"
                    color="white"
                    pageSize={8}
                    rowPerPage={8} />
            </div>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notifications
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}
export default UserList;
