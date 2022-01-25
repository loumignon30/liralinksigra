import { useState, useEffect, useRef } from 'react';
import "./denuncia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import DenunciaSearchTable from './DenunciaSearchTable';

import { useTranslation } from "react-i18next";
import cookies from 'js-cookie'

const ListagemDenuncia = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        tableDenunciaLinguaUpdateData();
    }, [currentLanguageCode]);

    const tableDenunciaLinguaUpdateData = () => {
        childRef.current.getGetAllData(currentLanguageCode);  // saveImage() = method called
    }
    
    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_denuncia')}</h3>

            <div style={{ height: 400, width: '100%' }}>
                <DenunciaSearchTable ref={childRef}
                    idDisplay={false}
                    nomeDisplay={true}
                    tipoDenunciaDisplay={true}
                    linguaQueixa={true}
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
        </div>
    )
}
export default ListagemDenuncia;
