import React, { useState, useEffect, useRef, useContext } from 'react';
import "./funcao.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import FuncaoSearchTable from './FuncaoSearchTable';

import { useTranslation } from "react-i18next";
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';
import AgenciaSearchTable from '../agencias/AgenciaSeachTable';
import SedeUtilizadorSearchTable from '../utilisador/SedeUtilizadorSearchTable';
import AgenciaUtilizadorSearchTable from '../utilisador/AgenciaUtilizadorSearchTable';
import { UserLoggedContext } from '../utilisador/UserLoggedContext';

const ListagemFuncao = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [sede, setSede] = useState("");
    const [agencia, setAgencia] = useState("");

    const [sedeID, setSedeID] = useState(0);
    const [agenciaID, setAgenciaID] = useState(0);
    const [userID, setUserID] = useState(0);

    const [count, setCount] = useState(0);

    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefFuncao = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");

    const [nivelAcesso, setNivelAcesso] = useState(0);

    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen();
    }, [t]);

    const updateValuesOnOpen = () => {
        let testEdit  = 0;
        let sedeIDP = 0;
        let sedeIDP_text = "";
        let agenciaIDP = 0; 
        let agenciaIDP_text = ""; 

        userSavedValue.map(item => (
            setSedeID(item.sedeID),
            setUserID(item.id),
            setSede(item.sede),
            setNivelAcesso(item.nivelAcesso),

            testEdit = item.provenienciaFormulario,
            sedeIDP = item.sedeID_pesquisas,
            agenciaIDP = item.agenciaID_pesquisa,
            sedeIDP_text = item.sede_pesquisa,
            agenciaIDP_text = item.agencia_pesquisa
        ));

        if(testEdit ==="EditFuncao")
        {
            setSedeID(sedeIDP);
            setAgenciaID(agenciaIDP);
            setSede(sedeIDP_text);
            setAgencia(agenciaIDP_text);

            childRef.current.getGetAllData(sedeIDP, agenciaIDP) // saveImage() = method called
        }
    }
    
    const onclicSedePopup = () => {
        childRef.current.getGetAllData(0, 0) // saveImage() = method called

        if (Number(nivelAcesso) !== 101) {
            setCount(1);
        } else {
            setCount(3);
        }
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        if (Number(nivelAcesso) !== 101) {
            setCount(2);
        } else {
            setCount(4);
        }
        setPpupTitle(t('lista_agencia'));
        setOpenPopup(true);
    }


    const tableFuncaooUpdateData1 = (sedeID1, agenciaID1) => {
        if (sedeID1 > 0 && agenciaID1 > 0) {
            childRef.current.getGetAllData(sedeID1, agenciaID1);  // saveImage() = method called
        }
    }

    return (
        <div className="utilisateurList">
            <div>
            <h3 style={{ marginLeft: '15px', textTransform: "uppercase" }}>{t('listagem_funcao_menu')}</h3>

            <div style={{ marginBottom: "-5px" }}>
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

            <div style={{ marginBottom: "20px" }}>
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
                <FuncaoSearchTable ref={childRef}
                    idDisplay={true}
                    codeDisplay={true}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={13}
                    rowPerPage={13}
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                />
            </div>

            {
                count === 1 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        width="800px"
                        height="580px"
                        marginTop="10px"
                        title={popupTitle}>
                        <SedeUtilizadorSearchTable
                            idDisplay={true}
                            codeDisplay={false}
                            statusDisplay={true}
                            actionsButtonSelectDisplay={true} // monstrar o campo = true
                            actionsButtonDisplayEditDelete={false}
                            pageSize={9}
                            rowPerPage={9}
                            backGroundColor="darkBlue"
                            color="white"
                            userID={userID}
                            sedeID={sedeID}
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id)
                                setOpenPopup(false);
                                setAgencia("");
                                setAgenciaID(0)
                                tableFuncaooUpdateData1(sedeID, id)

                                // tableAgenciaUpdateData(id);
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
                        width="800px"
                        height="580px"
                        marginTop="10px"
                    >
                        <AgenciaUtilizadorSearchTable ref={childRefAgence}
                            idDisplay={false}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor="darkBlue"
                            color="white"
                            sedeID={sedeID}
                            userID={userID}
                            pageSize={9}
                            rowPerPage={9}
                            agenciaData={(id, code, agencia) => {
                                setAgencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                                tableFuncaooUpdateData1(sedeID, id)
                            }}
                        />
                    </Popup> : null
            }
            {
                count === 3 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="800px"
                        height="580px"
                        marginTop="10px"
                    >
                        <SedeSearchTable
                            idDisplay={false}
                            codeDisplay={true}
                            statusDisplay={true}
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={9}
                            rowPerPage={9}
                            backGroundColor="darkBlue"
                            color="white"
                            // userID={userID2}
                            // sedeID={sedeID}
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id)
                                setOpenPopup(false);
                                // tableAgenciaUpdateData(id);
                                setAgencia("");
                                //tableDepartamentoUpdateData(id);
                            }
                            }
                        />
                    </Popup> : null
            }

            {
                count === 4 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="800px"
                        height="580px"
                        marginTop="10px"
                    >
                        <AgenciaSearchTable ref={childRefAgence}
                            idDisplay={false}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDisplay={true}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor="" darkBlue
                            idSede={sedeID}
                            userID={userID}
                            color="white"
                            pageSize={9}
                            rowPerPage={9}
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
export default ListagemFuncao;
