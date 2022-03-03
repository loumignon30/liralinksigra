import "./denuncia.css"
import '../../App.css'
import Notifications from '../../components/reusableComponents/Notifications';
import { House, Search } from '@mui/icons-material';
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import TipoDenunciaSearchTable from '../denuncias/TipoDenunciaSearchTable';

import SedeSearchTable from "../sede/SedeSearchTable";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import TipoDenunciaServices from "../../services/admin/TipoDenuncia.services";

import { useTranslation } from "react-i18next";
import cookies from 'js-cookie'
// import * as languages from "../../services/admin/Languages";

import Popup from "../../components/reusableComponents/Popup";

const TipoDeDeNuncia = (props) => {

      const { t } = useTranslation();


    const initialFValues = {
        id: 0,
        tipoDenuncia: '',
        sedeID: 0,
        status: '1',
        lingua: '',
        abreviationLangue: ''
    }

    const linguasList = [
        { id: t('pt'), title: t('Português') },
        { id: t('fr'), title: t('Français') },
        { id: t('en'), title: t('English') },
        { id: t('ar'), title: t('عربى') },
    ];
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    // notification with SnackBar
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [savedData, setSavedData] = useState(0);
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [notificatinoShow, setNotificationShow] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const [idSede, setIDSede] = useState(0);
    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState("");

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const [popupTitle, setPpupTitle] = useState("");
    const [count, setCount] = useState(0);
    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const currentLanguageCode = cookies.get('i18next') || 'en';
    //const currentLanguage = languages.find(l => l.code === currentLanguageCode);

    const updateValuesOnOpen = () => {

        // userSavedValue.map(item => (
        //     setIDSede(item.sedeID),
        //     setSede(item.nomeSede)
        //     // imageDisplay = "https://s3.amazonaws.com/liralink.sigra/" + item.sedeImageFile
        // ));

    }

    useEffect(() => {

        //values.lingua = currentLanguage["country_code"]
        
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen();
        tableTipoDenunciaUpdateData(currentLanguageCode, sedeID);
       // alert(currentLanguage["country_code"])

        codigoLinguaPesquisa();

    }, [currentLanguageCode]);

    const codigoLinguaPesquisa = () => {
        //let currentCode = currentLanguage["country_code"];

        linguasList.map((info) => {
            if (currentLanguageCode === info.id) {
                values.lingua = info.title
                values.abreviationLangue = currentLanguageCode;
            }
        })
    }

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}

        if ('sede')
            validationErrorM.sede = sede ? "" : " "   // This field is Required

        if ('lingua' in fieldValues)
            validationErrorM.lingua = fieldValues.lingua ? "" : " "

        if ('tipoDenuncia' in fieldValues)
            validationErrorM.tipoDenuncia = fieldValues.tipoDenuncia ? "" : " "

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

    const ResetForm = () => {

        //setValues(initialFValues);
        setNotificationShow(false);
        values.tipoDenuncia = "";

    }

    const gavarTipoDenuncia = () => {

        linguasList.map((info) => {
            if ((values.lingua === info.title)) {
                values.abreviationLangue = info.id
            }
        })

        if (values.id > 0) {
            TipoDenunciaServices.update(values.id, values).then(response => {
                tableTipoDenunciaUpdateData(currentLanguageCode)
                setNotify({
                    isOpen: true,
                    message: t('mensagem_modificar_Nova_Agencia'),
                    type: 'success'
                });
                setNotificationShow(true);

            })
                .catch(e => {
                    console.log(e)
                });

        } else {
            TipoDenunciaServices.create(values).then(response => {
                tableTipoDenunciaUpdateData(currentLanguageCode)
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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            gavarTipoDenuncia(); // call save university
            ResetForm();
            //tableTipoDenunciaUpdateData(currentLanguageCode, sedeID);
            // close();
        }
    }

    const close = () => {
        navigate('/Home');
        setOpenPopup(false);
        props.yearGetData();
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const tableTipoDenunciaUpdateData = (langue, sedeID1) => {
       
        childRef.current.getGetAllData(langue, sedeID1);  // saveImage() = method called
    }

    return (
        <div className="universityContainer">
            <PageHeader
                title={t('header_title_tipo_denuncia_gravar')}
                subTitle={t('header_subTitle_tipo_denuncia_gravar')}
                backGroundColor="darkBlue"
                color="white"
                icon={<House />}>
            </PageHeader>

            {/* <button onClick={MenuDataDisplay}>Test Menu Data</button> */}

            {/* <button onClick={buttonclick}> Button</button> */}

            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="unversityItemContainer">

                    <div className="newUniversity">

                        <div style={{ marginBottom: "5px" }}>
                            <label className="inputLabel">{t('sede')}</label>
                            <Controls.Input
                                name="sede"
                                placeHolder={t('sede')}
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.sede}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclicSedePopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('language')}</label>
                            <Controls.Select
                                name="lingua"
                                label="lingua"
                                value={values.lingua}
                                onChange={handleInputChange}
                                options={linguasList}
                                width="65%"
                                height="40px"
                                error={errors.lingua}
                            />

                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label className="inputLabel">{t('tipo_denuncia')}</label>
                            <Controls.Input
                                name="tipoDenuncia"
                                placeHolder={t('tipo_denuncia')}
                                value={values.tipoDenuncia}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.tipoDenuncia}
                            />
                        </div>

                    </div>

                    <div className="newUniversity">
                        <div>
                            <TipoDenunciaSearchTable ref={childRef}
                                idDisplay={false}
                                linguaDisplay={true}
                                tipoDenunciaDisplay={true}
                                linguaAbreviacaoDisplay={false}
                                statusDisplay={true}
                                actionsButtonDisplaySelect={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                pageSize={3}
                                rowPerPage={3}
                            />
                        </div>
                    </div>

                </div>

                <div className="unversityItemContainer">

                    <div className="newUniversity">
                        <div >
                            <Controls.Buttons
                                type="submit"
                                text={t('button_gravar')}
                                className="button"
                            />
                            <Controls.Buttons
                                type="button"
                                text={t('sair')}
                                color="secondary"
                                className="button"
                                onClick={close}
                            />
                        </div>
                    </div>

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

            {
                count === 1 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="600px"
                        height="480px"
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
                                setSedeID(id);
                                values.sedeID = id
                                setOpenPopup(false);
                                tableTipoDenunciaUpdateData(currentLanguageCode, id);
                            }
                            }
                        />
                    </Popup> : null
            }



        </div>
    )
}
export default TipoDeDeNuncia;
