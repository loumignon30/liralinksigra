import { useState, useEffect, useRef } from 'react';
import "./denuncia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';

import { useTranslation } from "react-i18next";
import cookies from 'js-cookie'

import TipoDenunciaSearchTable from './TipoDenunciaSearchTable';
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import SedeSearchTable from '../sede/SedeSearchTable';
import Popup from '../../components/reusableComponents/Popup';


const ListagemDenuncia = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);
    const [sede, setSede] = useState("");
    const [popupTitle, setPpupTitle] = useState("");

    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
       
       // tableTipoDenunciaUpdateData();
        
    }, [currentLanguageCode]);

    const tableTipoDenunciaUpdateData = () => {
       // childRef.current.getGetAllData(currentLanguageCode, currentLanguageCode);  // saveImage() = method called
    }

    const onclickAgenciaPopup = () => {
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const tableAgenciaUpdateData = (sedeID) => {
        childRef.current.getGetAllData(currentLanguageCode, sedeID);  // saveImage() = method called
    }
    

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_tipoDenuncia')}</h3>

            <div style={{ marginBottom: "5px", padding: "6px" }}>
                <label className="inputLabel">{t('sede')}</label>
                <Controls.Input
                    name="sede"
                    placeHolder={t('sede')}
                    value={sede}
                    width="35%"
                    type="text"
                    disabled="true"
                />
                <Controls.Input
                    name="sede"
                    placeHolder={currentLanguageCode}
                    value={currentLanguageCode}
                    width="15%"
                    type="text"
                    disabled="true"
               
                />
                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickAgenciaPopup}
                />
            </div>
            
            <div style={{ height: 400, width: '100%' }}>
                <TipoDenunciaSearchTable ref={childRef}
                    idDisplay={true}
                    linguaDisplay={true}
                    tipoDenunciaDisplay={true}
                    linguaAbreviacaoDisplay={false}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={false} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={true}
                    pageSize={10}
                    rowPerPage={10}
                />
            </div>

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                //pageHeader={PopupHeaderUniversity()}
                buttonColor="secondary"
                width="550px"
                height="520px"
                title={popupTitle}>
                <SedeSearchTable
                    idDisplay={true}
                    codeDisplay={false}
                    actionsButtonSelectDisplay={true} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={false}
                    pageSize={5}
                    rowPerPage={5}
                    backGroundColor="darkBlue"
                    color="white"
                    sedeData={(id, code, sede) => {
                        setSede(sede);
                        setOpenPopup(false);
                        tableAgenciaUpdateData(id);
                    }
                    }
                />

            </Popup>
        </div>
    )
}
export default ListagemDenuncia;
