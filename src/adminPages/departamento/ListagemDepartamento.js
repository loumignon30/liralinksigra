import { useState, useEffect, useRef } from 'react';
import "./departamento.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import DepartamentoSearchTable from './DepartamentoSearchTable';

import { useTranslation } from "react-i18next";
import SedeSearchTable from '../sede/SedeSearchTable';
import Popup from '../../components/reusableComponents/Popup';
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import AgenciaSearchTable from '../agencias/AgenciaSeachTable';

const ListagemDepartamento = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [sede, setSede] = useState("");
    const [agencia, setagencia] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [count, setCount] = useState(0);
    const [agenciaID, setAgenciaID] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");

    const [sedeID, setSedeID] = useState(0);
    const childRefDepartement = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js


    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const tableAgenciaUpdateData = (sedeID) => {
        childRef.current.getGetAllData(sedeID);  // saveImage() = method called
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        setCount(2);
        setPpupTitle(t('lista_agencia'));
        setOpenPopup(true);
    }

    const tableDepartamentoUpdateData1 = (sedeID1, agenciaID1) => {
        if(sedeID1 > 0  && agenciaID1 > 0){
            childRefDepartement.current.getGetAllData(sedeID1, agenciaID1);  // saveImage() = method called
        }

    }

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('listagem_departemento_menu')}</h3>

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
                    onClick={onclicSedePopup}
                />

                <div>
                    <label className="inputLabel">{t('nome_Agencia')}</label>
                    <Controls.Input
                        name="agencia"
                        placeHolder={t('nome_Agencia')}
                        value={agencia}
                        type="text"
                        width="35%"
                    />
                    <Search style={{ marginTop: "10px", cursor: "pointer" }}
                        onClick={onclickAgenciaPopup}
                    />
                </div>

            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DepartamentoSearchTable ref={childRefDepartement}
                    idDisplay={true}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    color="white"
                    sedeID = {sedeID}
                    agenciaID = {agenciaID}
                    pageSize={8}
                    rowPerPage={8} />
            </div>

            {
                count === 1 ?
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
                                setSedeID(id)
                                setOpenPopup(false);
                                tableAgenciaUpdateData(id);
                            }
                            }
                        />

                    </Popup>
                    : ""
            }

            {
                count === 2 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="770px"
                        height="580px"
                    >
                        <AgenciaSearchTable ref={childRefAgence}
                            idDisplay={false}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor="darkBlue"
                            color="white"
                            //idSede={sedeID}
                            idSede={sedeID}
                            pageSize={5}
                            rowPerPage={5}
                            agenciaData={(id, code, agencia) => {
                                setagencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                                tableDepartamentoUpdateData1(sedeID, id);
                            }}
                        />
                    </Popup> : null
            }



        </div>
    )
}
export default ListagemDepartamento;
