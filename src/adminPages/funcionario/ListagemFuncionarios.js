import { useState, useEffect } from 'react';
import "./funcionario.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import FuncionarioSearchTable from './FuncionarioSearchTable';

const ListagemFuncionarios = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>LISTA DE FUNCIONÁRIOS</h3>

            <div style={{ height: 400, width: '100%' }}>
                <FuncionarioSearchTable
                    idDisplay={false}
                    codeDisplay={true}
                    primeiroNomeDisplay={true}
                    ultimonomeDisplay={true}
                    emailDisplay={true}
                    actionsButtonDisplaySelect={true}
                    emailDisplay={true}
                    telefoneDislay={true}
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
export default ListagemFuncionarios;
