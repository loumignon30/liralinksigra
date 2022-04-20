import React, { useState, useEffect, useRef, useContext } from 'react';

import "./denuncia.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import DenunciaSearchTable from './DenunciaSearchTable';

import { useTranslation } from "react-i18next";
import cookies from 'js-cookie'
import Controls from '../../components/reusableComponents/Controls';
import { useForm } from '../../components/reusableComponents/useForm';
import { House, Search } from '@mui/icons-material';
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';
import { UserLoggedContext } from '../utilisador/UserLoggedContext';
import PageHeader from '../../components/reusableComponents/PageHeader';
import AgenciaUtilizadorSearchTable from '../utilisador/AgenciaUtilizadorSearchTable';
import SedeUtilizadorSearchTable from '../utilisador/SedeUtilizadorSearchTable';
import AgenciaSearchTable from '../agencias/AgenciaSeachTable';

const initialFValues = {
    lingua: ''
}
const ListagemAvaliacoes = () => {

    const { t } = useTranslation();

    const linguasList = [
        { id: t('pt'), title: t('Português') },
        { id: t('fr'), title: t('Français') },
        { id: t('en'), title: t('English') },
        { id: t('ar'), title: t('عربى') },
    ];

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [openPopup, setOpenPopup] = useState(false);
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefAgenciaUtilizador = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefAgenciaCriador = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const [lingua, setLingua] = useState("");

    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState("");

    const [popupTitle, setPpupTitle] = useState("");

    const [sedePesquisa, setSedePesquisa] = useState("");
    const childRefSede = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const [role, setRole] = useState(0);
    const [count, setCount] = useState(0);
    const [agencia, setAgencia] = useState("");
    const [agenciaID, setAgenciaID] = useState(0);
    const [userID, setUserID] = useState(0);
    const [nivelAcesso, setNivelAcesso] = useState(0);


    const {
        values,
        setValues,
        handleInputChange } = useForm(initialFValues, true);  // useForm = useForm.js. We defined - validateOnChange=false

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        //tableDenunciaLinguaUpdateData();

        getUserContext();

    }, [currentLanguageCode]);

    const getUserContext = () => {
        userSavedValue.map(item => {
            setRole((item.nivelAcesso));
            setSedeID(item.sedeID);
            setSede(item.sede);
            setUserID(item.id);
            setNivelAcesso(item.nivelAcesso);

        })
    }

    const tableDenunciaLinguaUpdateData = (sedeID1, agenciaID1) => {
        setLingua(currentLanguageCode)
        childRef.current.getGetAllData(currentLanguageCode, sedeID1, agenciaID1, 2);  // saveImage() = method called
    }
    
    const onclickSedePopup = () => {
    if (Number(nivelAcesso) !== 101) {
        setCount(1);
    } else {
        setCount(5);
    }
    setPpupTitle(t('lista_sede'));
    setOpenPopup(true);
}
const onclickAgenciaPopup = () => {
    if (Number(nivelAcesso) !== 101) {
        setCount(2);
    } else {
        setCount(6);
    }
    setPpupTitle(t('lista_agencia'));
    setOpenPopup(true);
}

    const tableAgenciaUpdateDataUtilizador = (sedeID1) => {
       childRefAgenciaUtilizador.current.getGetAllData(sedeID1);  // saveImage() = method called
    }
    const tableAgenciaUpdateDataCriador = (sedeID1) => {
        childRefAgenciaCriador.current.getGetAllData(sedeID1);  // saveImage() = method called
     }

    return (
        <>
        <div className="utilisateurList">
            {/* <h3 style={{ marginLeft: '15px' }}>{t('lista_denuncia')}</h3> */}

            <div className="universityContainer">
                <PageHeader
                    title={t('LISTAGEM DE AVALIAÇÕES')}
                    subTitle={t('Formulário de Listagem de Avaliações')}
                    backGroundColor="#189ab4"
                    color="black"
                    icon={<House />}>
                </PageHeader>
            </div>


            <div className="universityContainer">

             <div style={{ marginLeft: "5px", marginBottom: "5px", marginTop: "-15px" }}> 
                 <label className="inputLabel">{t('sede')}</label>
                <Controls.Input
                    name="sede"
                    placeHolder={t('sede')}
                    value={sede}
                    width="45%"
                    type="text"
                    disabled="true"
                />
                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickSedePopup}
                /> 
           </div>

            

            <div style={{ marginLeft: "5px", marginTop: "-5px" }}>
                <label className="inputLabel">{t('agencia')}</label>
                <Controls.Input
                    name="agencia"
                    placeHolder={t('agencia')}
                    value={agencia}
                    type="text"
                    width="45%"
                />
                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickAgenciaPopup}
                />
            </div>
            </div>

            <div className="universityContainer">

                
            </div>


            <div style={{ height: 400, width: '100%', marginTop:"25px"}}>
                <DenunciaSearchTable ref={childRef}
                    idDisplay={false}
                    nomeDisplay={true}
                    tipoDenunciaDisplay={true}
                    linguaQueixa={true}
                    dataDisplay={true}
                    horaDisplay={true}
                    emailDisplay={false}
                    telefoneDislay={false}
                    statusDisplay={true}
                    queixaDisplay={false}
                    actionsButtonDisplaySelect={false}
                    actionsButtonDisplayEditDelete={false}
                    backGroundColor="#189ab4"
                    color="black"
                    abreviationLangue={currentLanguageCode}
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    tipoMovimento={2}
                    pageSize={10}
                    rowPerPage={10}
                />
            </div>
            </div>


            {
                count === 1 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="800px"
                        height="520px"
                        marginTop="10px"
                    >
                        <SedeUtilizadorSearchTable
                            idDisplay={true}
                            codeDisplay={false}
                            statusDisplay={true}
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={10}
                            rowPerPage={10}
                            backGroundColor="#189ab4"
                            color="black"
                            sedeID={sedeID}
                            userID={userID}
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id);
                                setOpenPopup(false);
                                setAgencia("");
                                tableDenunciaLinguaUpdateData(sedeID, 0)
                            }
                            }
                        />
                    </Popup> : ""
            }

            {
                count === 2 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="800px"
                        height="550px"
                        marginTop="10px"
                    >
                        <AgenciaUtilizadorSearchTable
                            idDisplay={true}
                            codeDisplay={true}
                            statusDisplay={true}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor="#189ab4"
                            color="black"
                            pageSize={10}
                            rowPerPage={10}
                            sedeID={sedeID}
                            userID={userID}
                            agenciaData={(id, code, agencia) => {
                                setAgencia(agencia);
                                setAgenciaID(id);
                                setOpenPopup(false);
                                tableDenunciaLinguaUpdateData(sedeID, id)

                            }}
                        />
                    </Popup> : ""
            }

            {
                count === 5 ?
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
                            idDisplay={true}
                            codeDisplay={true}
                            statusDisplay={true}
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={10}
                            rowPerPage={10}
                            backGroundColor="#189ab4"
                            color="black"
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id)
                                setOpenPopup(false);
                                setAgencia("");
                                tableDenunciaLinguaUpdateData(sedeID, 0)
                            }
                            }
                        />
                    </Popup> : null
            }

            {
                count === 6 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="800px"
                        height="550px"
                        marginTop="10px"
                    >
                        <AgenciaSearchTable
                            idDisplay={true}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDisplay={true}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            idSede={sedeID}
                            userID={userID}
                            backGroundColor="#189ab4"
                            color="black"
                            pageSize={10}
                            rowPerPage={10}
                            agenciaData={(id, code, agencia) => {
                                setAgencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                                tableDenunciaLinguaUpdateData(sedeID, id)

                            }}
                        />
                    </Popup> : null
            }

</>
    )
}
export default ListagemAvaliacoes;
