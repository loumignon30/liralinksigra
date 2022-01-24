import { useState, useEffect } from 'react';
import "./departamento.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import DepartamentoSearchTable from './DepartamentoSearchTable';

import { useTranslation } from "react-i18next";

const ListagemDepartamento = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('listagem_departemento_menu')}</h3>

            <div style={{ height: 400, width: '100%' }}>
                <DepartamentoSearchTable
                    idDisplay={true}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
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
export default ListagemDepartamento;
