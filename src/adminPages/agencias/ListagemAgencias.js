import { useState, useEffect } from 'react';
import "./agencia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import AgenciaSearchTable from './AgenciaSeachTable';

const ListagemAgencias = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>LISTA DE AGÊNCIAS</h3>

            <div style={{ height: 400, width: '100%' }}>
                <AgenciaSearchTable
                    idDisplay={false}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
                    emailDisplay={false}
                    telefoneDislay={true}
                    cidadeDisplay={true}
                    paisDisplay={false}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={15}
                    rowPerPage={15} />
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
export default ListagemAgencias;
