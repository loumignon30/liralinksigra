import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { InputAdornment } from '@mui/material';
import { UserLoggedContext } from '../utilisador/UserLoggedContext';

const ListagemAgencias = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [sede, setSede] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefSede = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [sedePesquisa, setSedePesquisa] = useState("");    
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);


    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen();
    }, []);

    const updateValuesOnOpen = () => {

        let testEdit  = 0;
        let sedeIDP = 0;
        let sedeIDP_text = "";
    
        userSavedValue.map(item => (
            setSedeID(item.sedeID),
            setSede(item.sede),

            testEdit = item.provenienciaFormulario,
            sedeIDP = item.sedeID_pesquisas,
            sedeIDP_text = item.sede_pesquisa
        ));

        if(testEdit ==="EditAgencia")
        {
            setSedeID(sedeIDP);
            setSede(sedeIDP_text);
            childRef.current.getGetAllData(sedeIDP);  // saveImage() = method called
        }
    }


    const onclickAgenciaPopup = () => {
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const tableAgenciaUpdateData = (sedeID) => {
        childRef.current.getGetAllData(sedeID);  // saveImage() = method called
    }

    const sedeSearchToToDataGrid = (e) => {
        setSedePesquisa(e.target.value)
        childRefSede.current.sedSearch(e.target.value); // search the firstname
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
                    actionsButtonDisplaySelect={false}
                    actionsButtonDisplayEditDelete={true}
                    emailDisplay={false}
                    telefoneDislay={true}
                    cidadeDisplay={true}
                    paisDisplay={true}
                    statusDisplay={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={10}
                    rowPerPage={10} />
            </div>

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                //pageHeader={PopupHeaderUniversity()}
                buttonColor="secondary"
                width="650px"
                height="520px"
                marginTop="10px"
                title={popupTitle}>

                <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
                    <label className="userLabel">{t('Recherche')}</label>
                    <Controls.Input
                        name="sedePesquisa"
                        type="text"
                        value={sedePesquisa}
                        placeHolder={t('sede')}
                        width="55%"
                        marginLeft="-20px"
                        onChange={sedeSearchToToDataGrid}
                        InputProps={{
                            startAdornment: (<InputAdornment position='start'>
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                </div>
                <SedeSearchTable ref={childRefSede} 
                    idDisplay={true}
                    codeDisplay={false}
                    statusDisplay={true}
                    actionsButtonSelectDisplay={true} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={false}
                    pageSize={7}
                    rowPerPage={7}
                    backGroundColor="darkBlue"
                    color="white"
                    sedeData={(id, code, sede) => {
                        setSede(sede);
                        setSedeID(id);
                        setOpenPopup(false);
                        tableAgenciaUpdateData(id);
                        setSedePesquisa("")

                    }
                    }
                />

            </Popup>

        </div>
    )
}
export default ListagemAgencias;
