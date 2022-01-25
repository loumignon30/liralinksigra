import { useState, useEffect, useRef } from 'react';
import "./funcionario.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import FuncionarioSearchTable from './FuncionarioSearchTable';

import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';

import { useTranslation } from "react-i18next";
import AgenciaSearchTable from '../agencias/AgenciaSeachTable';

const ListagemFuncionarios = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
   
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");

    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [agencia, setAgencia] = useState("");
    const [agenciaID, setAgenciaID] = useState(0);

    const [count, setCount] = useState(0);  

    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefFuncao = useRef(null);  // it's using a reference of a method from ImageUpLoad.js


    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

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

    const tableFuncaooUpdateData1 = (sedeID1, agenciaID1) => {
        if(sedeID1 > 0  && agenciaID1 > 0){
            childRef.current.getGetAllData(sedeID1, agenciaID1);  // saveImage() = method called
        }

    }

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_funcionario')}</h3>

            <div style={{ marginBottom: "5px" }}>
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
            </div>

            <div style={{ marginTop: "-5px", marginBottom:"5px"}}>
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

            <div style={{ height: 400, width: '100%' }}>
                <FuncionarioSearchTable ref={childRef}
                    idDisplay={false}
                    codeDisplay={true}
                    primeiroNomeDisplay={false}
                    ultimonomeDisplay={false}
                    emailDisplay={true}
                    actionsButtonDisplaySelect={false}
                    emailDisplay={true}
                    telefoneDislay={true}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    color="white"
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
                                setAgencia("")
                                tableFuncaooUpdateData1(0, 0)
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
                                setAgencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                                tableFuncaooUpdateData1(sedeID, id)
                            }}
                        />
                    </Popup> : null
            }

        </div>
    )
}
export default ListagemFuncionarios;
