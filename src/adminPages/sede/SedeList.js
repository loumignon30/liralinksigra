import { useState, useEffect } from 'react';
import "./sede.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';

import { useTranslation } from "react-i18next";
import SedeSearchTable from './SedeSearchTable';

const SedeList = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_sede')}</h3>

            <div style={{ height: 400, width: '100%' }}>
                <SedeSearchTable
                    idDisplay={true}
                    codeDisplay={true}
                    ciadadeDisplay={true}
                    paisDiplay={true}
                    actionsButtonSelectDisplay={false}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={5}
                    rowPerPage={5}
                    backGroundColor="blue"
                    color="white"
                />
            </div>

            {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
             */}
        </div>
    )
}
export default SedeList;
