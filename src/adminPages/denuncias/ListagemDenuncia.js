import { useState, useEffect } from 'react';
import "./denuncia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import DenunciaSearchTable from './DenunciaSearchTable';

const ListagemDenuncia = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>LISTA DE DENÚNCIAS</h3>

            <div style={{ height: 400, width: '100%' }}>
                <DenunciaSearchTable
                    idDisplay={false}
                    nomeDisplay={true}
                    tipoDenunciaDisplay={true}
                    dataDisplay={true}
                    horaDisplay={true}
                    dataDisplay={true}
                    emailDisplay={false}
                    telefoneDislay={false}
                    statusDisplay={true}
                    queixaDisplay={true}
                    actionsButtonDisplaySelect={false}
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
export default ListagemDenuncia;
