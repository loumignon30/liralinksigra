import { useState, useEffect, useRef } from 'react';
import "./agencia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import AgenciaSearchTable from './AgenciaSeachTable';
import { useTranslation } from "react-i18next";
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import { useForm } from '../../components/reusableComponents/useForm';
import SedeSearchTable from '../sede/SedeSearchTable';
import Popup from '../../components/reusableComponents/Popup';

const ListagemAgencias = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [sede, setSede] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    
    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const onclickAgenciaPopup = () => {
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const tableAgenciaUpdateData = (sedeID) => {
        childRef.current.getGetAllData(sedeID);  // saveImage() = method called
    }


    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px', textTransform: "uppercase" }}>{t('lista_agencia')}</h3>

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
                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickAgenciaPopup}
                />
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <AgenciaSearchTable ref={childRef}
                    idDisplay={false}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={true}
                    emailDisplay={false}
                    telefoneDislay={true}
                    cidadeDisplay={true}
                    paisDisplay={false}
                    statusDisplay={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={15}
                    rowPerPage={15} />
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
export default ListagemAgencias;
