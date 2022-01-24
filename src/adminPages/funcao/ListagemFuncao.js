import { useState, useEffect } from 'react';
import "./funcao.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import FuncaoSearchTable from './FuncaoSearchTable';

import { useTranslation } from "react-i18next";


const ListagemFuncao = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);
    
    return (
        <div className="utilisateurList">
            <h3  style={{ marginLeft: '15px', textTransform: "uppercase" }}>{t('listagem_funcao_menu')}</h3>

            <div style={{ height: 400, width: '100%' }}>
                <FuncaoSearchTable
                    idDisplay={true}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={15}
                    rowPerPage={15}
                    // backGroundColor="darkBlue"
                    // color="white"
                    />
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
export default ListagemFuncao;
