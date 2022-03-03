import "./newUser.css"
import '../../App.css'
import Notifications from '../../components/reusableComponents/Notifications';
import { House, Search } from '@mui/icons-material';
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import SedeSearchTable from '../sede/SedeSearchTable';
import SedeUtilizador from "../../services/admin/SedeUtilizador.services";
import AgenciaUtilizador from "../../services/admin/AgenciaUtilizador.service";

import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import urlImage from '../../http-common-images';
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import SideMenuData2 from "../../menuData/admin/SideMenuData2"

import AgenciaSearchTable from "../agencias/AgenciaSeachTable";

import { useTranslation } from "react-i18next";
import Popup from "../../components/reusableComponents/Popup";

import SedeUtilizadorSearchTable from "./SedeUtilizadorSearchTable";
import AgenciaUtilizadorSearchTable from "./AgenciaUtilizadorSearchTable";
import { Button, InputAdornment } from "@mui/material";


const AfetacaoSedeAgencia = (props) => {

    const { t } = useTranslation();

    const initialFValues = {
        id: 0,
        sedeID: 0,
        userID: 0,
        agenciaID: 0,
        userID_creation: 1
    }

    const getRole = [
        { id: 1, title: t('role_administrador') },
        { id: 2, title: t('role_Funcionario') },
        { id: 3, title: t('role_utilizador') }
    ]
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    // notification with SnackBar
    const [url, setUrl] = useState(urlImage);  // backend image  URL
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileName, setImageFileName] = useState("");
    const [savedData, setSavedData] = useState(0);
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRef2 = useRef(null);
    const [notificatinoShow, setNotificationShow] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const [id, setID] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [popupTitle, setPpupTitle] = useState("");
    const [count, setCount] = useState(0);
    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [agencia, setAgencia] = useState("");
    const [agenciaID, setAgenciaID] = useState(0);
    const [userID2, setUserID2] = useState(0);

    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefAgence2 = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [agenciaPesquisa, setAgenciaPesquisa] = useState("");


    const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
    const location = useLocation();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    let imageDisplay;
    let logoCheck = "";

    const childRefMenu = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    // function to call the click from ImageUpLoad.js


    const updateValuesOnOpen = () => {

        // userSavedValue.map(item => (
        //     setID(item.sedeID),
        //     values.id = item.sedeID,
        //     values.code = item.codeSede,
        //     values.sede = item.nomeSede,
        //     values.email = item.emailSede,
        //     values.contacto = item.sedeContacto,
        //     values.endereco = item.sedeEndereco,
        //     values.cidade = item.sedeCidade,
        //     values.pais = item.sedePais,
        //     imageDisplay = "https://s3.amazonaws.com/liralink.sigra/" + item.sedeImageFile,
        //     values.imageName = item.sedeImageFile,
        //     logoCheck = item.sedeImageFile
        // ));

    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen();

        setFirstname(location.state.firstname);
        setLastname(location.state.lastname);
        setEmail(location.state.email);
        setUserID2(location.state.id);
        setSedeID(location.state.sedeID)
        values.sedeID = location.state.sedeID;
        values.userID = location.state.id;
        setSede(location.state.sede);

        tableSedeData(location.state.sedeID, location.state.id);
        tableAgenciaData(location.state.sedeID, location.state.id);

        sedeUtilizadorFindOne("tipoPesquisa", location.state.sedeID,
            location.state.id);


        getRole.map((info) => {

            if (Number(info.id) === Number(location.state.role)) {
                setRole(info.title);
            }
        })
        setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);


    }, [location.state.firstname]);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}

        if ('sede')
            validationErrorM.sede = sede ? "" : " "   // This field is Required

        setErrors({
            ...validationErrorM
        })

        return Object.values(validationErrorM).every(x => x === "")  // it will return true if x==""
    }
    const validateAgencia = (fieldValues = values) => {
        let validationErrorM = {}

        if ('agencia')
            validationErrorM.agencia = agencia ? "" : " "   // This field is Required

        setErrors({
            ...validationErrorM
        })

        return Object.values(validationErrorM).every(x => x === "")  // it will return true if x==""
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange } = useForm(initialFValues, true, validate);  // useForm = useForm.js. We defined - validateOnChange=false

    const saveImageFromImageUpload = () => {

        setImageFileName(childRef.current.fileName);
        values.imageName = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
        logoCheck = (childRef.current.fileName);
    }

    const tableSedeData = (sedeID1, userID) => {

        childRef2.current.userGetAll(sedeID1, userID);  // saveImage() = method called
    }
    const tableAgenciaData = (sedeID1, userID) => {
        childRefAgence2.current.getGetAllData(sedeID1, userID);  // saveImage() = method called
    }

    const handleDelete = (id) => {
        //setSlideImgCategory(universityDaya.filter((item) => item.id !== id));
    }

    const ResetForm = () => {

        //setValues(initialFValues);
        setNotificationShow(false);

        //setUserSavedValue({});

        //navigate('/');
        // setOpenPopup(false);
    }

    const gavarSede = () => {

        SedeUtilizador.create(values).then(response => {
            tableSedeData(sedeID, userID2); // update DataGrid Table used form universitySearchTable.js
            setNotify({
                isOpen: true,
                message: t('mensagem_Gravar_Nova_Agencia'),
                type: 'success'
            });
            setNotificationShow(true);

        })
            .catch(e => {
                console.log(e)
            });
    }

    const gavarAgencia = () => {
        AgenciaUtilizador.create(values).then(response => {
            tableAgenciaData(sedeID, userID2);
            setNotify({
                isOpen: true,
                message: t('mensagem_Gravar_Nova_Agencia'),
                type: 'success'
            });
            setNotificationShow(true);

        })
            .catch(e => {
                console.log(e)
            });
    }

    const handleSubmitSede = (e) => {
        e.preventDefault();

        if (validate()) {
            gavarSede(); // call save university
            ResetForm();
        }
    }

    const handleSubmitAgencia = (e) => {
        e.preventDefault();

        if (validateAgencia()) {
            gavarAgencia(); // call save university
            ResetForm();

        }
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

    const sedeUtilizadorFindOne = (sedePEsquisa, sedeID, userID2) => {
        SedeUtilizador.getID("sedePEsquisa", sedeID, userID2).then(response => {
            if (response.data.length === 0) {
                // adicionar utilisator na table virtual de sede : sedeUtilisador
                SedeUtilizador.create(values).then(response => {
                    tableSedeData(sedeID, userID2); // update DataGrid Table used form universitySearchTable.js
                })
                    .catch(e => {
                        console.log(e)
                    });
            }
            // fim adicionar utilisator na table virtual de sede : sedeUtilisador
        })
            .catch(e => {
                console.log(e)
            });
    }

    const AgenciaSearchToToDataGrid = (e) => {
        setAgenciaPesquisa(e.target.value)
        childRefAgence.current.agenciaSearchData(e.target.value); // search the firstname
    }

    return (
        <div className="universityContainer">
            <PageHeader
                title={t('header_title_AfectacaoSede_Agencia')}
                subTitle={t('header_subTitle_AfectacaoSede_Agencia')}
                backGroundColor="blue"
                color="white"
                icon={<House />}>
            </PageHeader>

            <div style={{ borderStyle: "solid", borderColor: "blue", height: "50px" }}>
                <div className="utilisateurAfichageTop"> {/* pour afficher Titre et photo */}
                    <img className="utilisateurAfficherTopImg"
                        src={imageChangeFromOutSideURL}
                        alt=""
                    />
                    <div className="utilisateurAfficherTopTitre">  {/* titre du nom et fonction  */}
                        <span className="utilisateurAffichageNom">{firstname + " " + lastname}</span>
                        <span className="utilisateurAffichageFonction">{role}</span>
                    </div>
                </div>
            </div>

            <Form onSubmit={handleSubmitSede} autoComplete="off">

                <div className="unversityItemContainer">

                    <div className="newUniversity" style={{ height: "350px" }}>

                        <div style={{ marginBottom: "5px" }}>
                            <label className="inputLabel"
                                style={{ marginRight: "0px" }}>{t('sede')}</label>
                            <Controls.Input
                                name="sede"
                                placeHolder={t('sede')}
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.sede}
                                width="75%"
                            />
                            {/* <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclicSedePopup}
                            /> */}
                            {/* <Button variant="contained"
                                onClick={handleSubmitSede}
                                size="small"
                                color="primary">{t('button_gravar')}
                                </Button> */}
                        </div>
                        <div>
                            <SedeUtilizadorSearchTable
                                ref={childRef2}
                                idDisplay={false}
                                codeDisplay={false}
                                ciadadeDisplay={false}
                                paisDiplay={false}
                                statusDisplay={true}
                                sedeID={sedeID}
                                userID={userID2}
                                actionsButtonSelectDisplay={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                pageSize={4}
                                rowPerPage={4}
                                backGroundColor="blue"
                                color="white"
                                sedeID={sedeID}
                            />
                        </div>

                    </div>


                    <div className="newUniversity">
                        <div>
                            {/* <div style={{ marginBottom: "5px" }}>
                                <label className="inputLabel"
                                    style={{ marginRight: "0px" }}>{t('sede')}</label>
                                <Controls.Input
                                    name="sede"
                                    placeHolder={t('sede')}
                                    value={sede}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="55%"
                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    onClick={onclicSedePopup}
                                />
                            </div> */}
                            <div style={{ marginBottom: "5px" }}>
                                <label className="inputLabel"
                                    style={{ marginRight: "-30px" }}>{t('agencia')}</label>
                                <Controls.Input
                                    name="agencia"
                                    placeHolder={t('agencia')}
                                    value={agencia}
                                    onChange={handleInputChange}
                                    type="text"
                                    error={errors.agencia}
                                    width="50%"
                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    onClick={onclickAgenciaPopup}
                                />
                                <Controls.Buttons
                                    onClick={handleSubmitAgencia}
                                    type="button"
                                    size="small"
                                    text={t('button_gravar')}
                                    color="primary"
                                />
                            </div>
                            <AgenciaUtilizadorSearchTable
                                ref={childRefAgence2}
                                idDisplay={true}
                                codeDisplay={false}
                                actionsButtonSelectDisplay={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                sedeID={sedeID}
                                userID={userID2}
                                pageSize={4}
                                rowPerPage={4}
                                backGroundColor="blue"
                                color="white"
                            />
                        </div>
                    </div>
                </div>

                <div className="unversityItemContainer">

                    {/* <div className="newUniversity">
                        <div >
                            <Controls.Buttons
                                type="submit"
                                text={t('button_gravar')}
                                className="button"
                            />
                            <Controls.Buttons
                                type="button"
                                text={t('button_limpar')}
                                color="secondary"
                                className="button"
                                onClick={ResetForm}
                            // onClick={close}
                            />
                        </div>
                    </div> */}

                </div>

            </Form>

            {notificatinoShow ?
                <Notifications
                    notify={notify}
                    setNotify={setNotify}
                /> : null
            }

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <SideMenuData2
                ref={childRefMenu}
            />

            {
                count === 1 ?
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
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={5}
                            rowPerPage={5}
                            backGroundColor={backGroundColor}
                            color={color}
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id)
                                values.sedeID = id
                                setOpenPopup(false);
                                setAgencia("");
                                tableAgenciaData(id, userID2);

                                //tableDepartamentoUpdateData(id);
                            }
                            }
                        />
                    </Popup> : null
            }

            {
                count === 2 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="770px"
                        height="550px"
                        marginTop="10px"
                    >

                        <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
                            <label className="userLabel">{t('Recherche')}</label>
                            <Controls.Input
                                name="agenciaPesquisa"
                                type="text"
                                value={agenciaPesquisa}
                                placeHolder={t('agencia')}
                                width="55%"
                                marginLeft="-20px"
                                onChange={AgenciaSearchToToDataGrid}
                                InputProps={{
                                    startAdornment: (<InputAdornment position='start'>
                                        <Search />
                                    </InputAdornment>)
                                }}
                            />
                        </div>
                        <AgenciaSearchTable ref={childRefAgence}
                            idDisplay={false}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor={backGroundColor}
                            idSede={sedeID}
                            color={color}
                            pageSize={5}
                            rowPerPage={5}
                            agenciaData={(id, code, agencia) => {
                                values.agenciaID = id;
                                setAgencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                                setAgenciaPesquisa("");
                            }}
                        />
                    </Popup> : null
            }

        </div>

    )
}
export default AfetacaoSedeAgencia;
