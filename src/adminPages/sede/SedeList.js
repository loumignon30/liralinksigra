import { useState, useEffect, useRef } from 'react';
import "./sede.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';

import { useTranslation } from "react-i18next";
import SedeSearchTable from './SedeSearchTable';
import { InputAdornment } from '@mui/material';
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';

const SedeList = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);

    const [sede, setSede] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const sedeSearchToToDataGrid = (e) => {
        setSede(e.target.value);
        childRef.current.sedSearch(e.target.value); // search the firstname
    }

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_sede')}</h3>

            <div style={{ marginBottom: "10px" }}>
                <label className="userLabel">{t('Recherche')}</label>
                <Controls.Input
                    name="sede"
                    type="text"
                    value={sede}
                    placeHolder={t('sede')}
                    width="35%"
                    marginLeft="-20px"
                    onChange={sedeSearchToToDataGrid}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'>
                            <Search />
                        </InputAdornment>)
                    }}
                />
                </div>

            <div style={{ height: 400, width: '100%' }}>
                <SedeSearchTable ref={childRef}
                    idDisplay={true}
                    codeDisplay={true}
                    ciadadeDisplay={true}
                    paisDiplay={true}
                    statusDisplay={true}
                    actionsButtonSelectDisplay={false}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={13}
                    rowPerPage={13}
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
