import { useState, useEffect, useRef, useContext } from 'react';
import "./funcionario.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import FuncionarioSearchTable from './FuncionarioSearchTable';
import FuncionarioResumoSearchTable from './FuncionarioResumoSearchTable';

import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';
import { InputAdornment } from '@mui/material';

import { useTranslation } from "react-i18next";
import AgenciaSearchTable from '../agencias/AgenciaSeachTable';
import SedeUtilizadorSearchTable from '../utilisador/SedeUtilizadorSearchTable';
import AgenciaUtilizadorSearchTable from '../utilisador/AgenciaUtilizadorSearchTable';
import { UserLoggedContext } from '../utilisador/UserLoggedContext';

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
    const [userID, setUserID] = useState(0);

    const [count, setCount] = useState(0);

    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefFuncao = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const childRef_resumo = useRef(null);

    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const [searchNome, setSearchNome] = useState("");
    const [searchApelido, setSearchApelido] = useState("");

    const [nivelAcesso, setNivelAcesso] = useState(0);


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
            // console.log(item),
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

        if(testEdit ==="EditFuncionario")
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
    //if (sedeID1 > 0 && agenciaID1 > 0) {
    childRef.current.getGetAllData(sedeID1, agenciaID1);  // saveImage() = method called
    //}
}
const nameSearchToToDataGrid = (e) => {
    setSearchNome(e.target.value);
    setSearchApelido("");
    childRef.current.getFirstnameSearch(e.target.value); // search the firstname
}
const lastNameSearchSearchToToDataGrid = (e) => {
    setSearchApelido(e.target.value);
    setSearchNome("");
    childRef.current.getLasttnameSearch(e.target.value); // search the firstname
}

const onclickAllDataPopup = () => {
    setAgencia("");
    setCount(5);
    try {
        childRef_resumo.current.getGetAllDataFuncionarioAgencia(); // search the firstname

    } catch (err) {
        // console.log(err)
    }
}

return (
    <div className="utilisateurList">
        <h3 style={{ marginLeft: '15px' }}>{t('lista_funcionario')}</h3>

        <div style={{ marginBottom: "5px", marginLeft: "5px" }}>
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

            {(Number(nivelAcesso) === 101) ?
                <Controls.Buttons
                    type="submit"
                    text={t('resumo')}
                    size="small"
                    onClick={onclickAllDataPopup}
                /> :
                <div style={{ marginTop: "20px" }}>

                </div>
            }

        </div>

        <div style={{ marginTop: "-25px", marginBottom: "0px", marginLeft: "5px" }}>
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
        <div style={{ marginBottom: "10px", marginLeft: "5px" }}>
            <label className="userLabel">{t('Recherche')}</label>
            <Controls.Input
                name="searchNome"
                type="text"
                value={searchNome}
                placeHolder={t('nome')}
                width="20%"
                marginLeft="-20px"
                onChange={nameSearchToToDataGrid}
                InputProps={{
                    startAdornment: (<InputAdornment position='start'>
                        <Search />
                    </InputAdornment>)
                }}
            />
            <Controls.Input
                name="searchApelido"
                type="text"
                value={searchApelido}
                placeHolder={t('apelido')}
                width="15%"
                marginLeft="-20px"
                onChange={lastNameSearchSearchToToDataGrid}
                InputProps={{
                    startAdornment: (<InputAdornment position='start'>
                        <Search />
                    </InputAdornment>)
                }}
            />

        </div>

        {count === 5 && (Number(nivelAcesso) === 101) ?

            <div style={{ height: 400, width: '100%' }}>
                <FuncionarioResumoSearchTable ref={childRef_resumo}
                    // idDisplay={false}
                    // agenciaDisplay={false}
                    // codeDisplay={true}
                    // primeiroNomeDisplay={false}
                    // ultimonomeDisplay={false}
                    // emailDisplay={true}
                    // actionsButtonDisplaySelect={false}
                    // emailDisplay={true}
                    // telefoneDislay={true}
                    // statusDisplay={true}
                    // actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={9}
                    rowPerPage={9} />
            </div> :

            <div style={{ height: 400, width: '100%' }}>

                <FuncionarioSearchTable ref={childRef}
                    idDisplay={false}
                    agenciaDisplay={false}
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
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    color="white"
                    pageSize={9}
                    rowPerPage={9} />
            </div>
        }

        {
            count === 1 ?
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    //pageHeader={PopupHeaderUniversity()}
                    buttonColor="secondary"
                    width="550px"
                    height="520px"
                    marginTop="10px"
                    title={popupTitle}>
                    <SedeUtilizadorSearchTable
                        idDisplay={true}
                        codeDisplay={false}
                        statusDisplay={true}
                        actionsButtonSelectDisplay={true} // monstrar o campo = true
                        actionsButtonDisplayEditDelete={false}
                        pageSize={5}
                        rowPerPage={5}
                        backGroundColor="darkBlue"
                        color="white"
                        userID={userID}
                        sedeID={sedeID}
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
        {
            count === 3 ?
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    buttonColor="secondary"
                    title={popupTitle}
                    width="600px"
                    height="480px"
                    marginTop="10px"
                >
                    <SedeSearchTable
                        idDisplay={false}
                        codeDisplay={true}
                        statusDisplay={true}
                        actionsButtonSelectDisplay={true}
                        actionsButtonDisplayEditDelete={false}
                        pageSize={7}
                        rowPerPage={7}
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
                            tableFuncaooUpdateData1(0, 0)
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
                    width="770px"
                    height="550px"
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
