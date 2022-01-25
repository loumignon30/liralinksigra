import "./departamento.css";
import '../../App.css';
import Notifications from '../../components/reusableComponents/Notifications';
import { House, Search } from '@mui/icons-material';
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import AgenciaService from "../../services/admin/Agencia.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import DepartamentoServices from "../../services/admin/Departamento.services";
import DepartamentoSearchTable from "./DepartamentoSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";


const initialFValues = {
    id: 0,
    code: '',
    departamento: '',
    observacao: '',
    sedeID: 0,
    agenciaID: 0,
    status: "Active"
}

const NovoDepartamento = () => {

    // notification with SnackBar
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' });
    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const childRefDepartement = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [sede, setSede] = useState("");
    const [notificatinoShow, setNotificationShow] = useState(false);
    const [agencia, setAgencia] = useState("");
    const [count, setCount] = useState(0);
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [sedeID, setSedeID] = useState(0);
    const [agenciaID, setAgenciaID] = useState(0);
    const location = useLocation();
    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const [headerSubTitle, setHeaderSubTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState();
    const [textReset, setTextReset] = useState("");

    const childRefAgence = useRef(null);  // it's using a reference of a method from ImageUpLoad.js


    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
       // updateValuesOnOpen(); // update Usecontext
        getStateValuesFromSearchTable();

    }, [(t('header_title_departamento_modificar'))]);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('code' in fieldValues)
            validationErrorM.code = fieldValues.code ? "" : " "  // This field is Required
        if ('departamento' in fieldValues)
            validationErrorM.departamento = fieldValues.departamento ? "" : " "   // This field is Required

        if ('sede')
            validationErrorM.sede = sede ? "" : " "

        if ('agencia')
            validationErrorM.agencia = agencia ? "" : " "

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


    const getStateValuesFromSearchTable = () => {

        if ((location.state) !== null) {

            setBackGroundColor("darkBlue");
            setColor("white");
            setHeaderTitle(t('header_title_departamento_modificar'));
            setHeaderSubTitle(t('header_subTitle_departamento_modificar'));
            setButtonTitle(t('button_modificar'));
            setTextReset(t('button_novo'));

            setValues(location.state);
            setSede(location.state.sede);
            
            setAgencia(location.state.agencia)

            // setSedeID(location.state.sedeID)
            // setAgenciaID(location.state.agenciaID)

        } else {
            setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle(t('header_title_departamento_novo'));
            setHeaderSubTitle(t('header_subTitle_departamento_novo'));
            setButtonTitle(t('button_modificar'));
            setTextReset(t('button_gravar'));
            setTextReset(t('button_limpar'));
        }
    }

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => (
            values.sedeID = item.sedeID,
            setSede(item.nomeSede)
        ));
    }

    const ResetForm = () => {
       // setValues(initialFValues);
        setNotificationShow(false);

        values.code =""
        values.departamento = ""
        values.observacao = "";

       // values.sedeID = sedeID;
       // values.agenciaID = agenciaID;

        tableDepartamentoUpdateData1(sedeID, agenciaID);
        
        setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle(t('header_title_departamento_novo'));
            setHeaderSubTitle(t('header_subTitle_departamento_novo'));
            setButtonTitle(t('button_modificar'));
            setTextReset(t('button_gravar'));
            setTextReset(t('button_limpar'));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            saveFaculty(); // call save university
            ResetForm();
        }

    }

    const tableDepartamentoUpdateData1 = (sedeID1, agenciaID1) => {
        if(sedeID1 > 0  && agenciaID1 > 0){
            childRefDepartement.current.getGetAllData(sedeID1, agenciaID1);  // saveImage() = method called
        }

    }
    const tableAgenciaUpdateData = (sedeID1) => {
        //childRefAgence.current.getGetAllData(sedeID1);  // saveImage() = method called
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

    const saveFaculty = () => {

        if (values.id > 0) {
            DepartamentoServices.update(values.id, values).then(response => {
                tableDepartamentoUpdateData1(); // update Faculty Data on FacultySearchTable.js
                setNotify({
                    isOpen: true,
                    message: t('mensagem_modificar_Nova_Agencia'),
                    type: 'success'
                })
                setNotificationShow(true);
            })
                .catch(e => {
                    console.log(e)
                });
        } else {

            if (values.agenciaID === 0 && agenciaID > 0) {
                values.agenciaID = agenciaID;
            }

            DepartamentoServices.create(values).then(response => {
                tableDepartamentoUpdateData1(); // update Faculty Data on FacultySearchTable.js
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

    return (

        <div className="facultyContainer">
            <PageHeader
                title={headerTitle}
                subTitle={headerSubTitle}
                backGroundColor={backGroundColor}
                color={color}
                icon={<House />}>
            </PageHeader>

            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="facultyItemContainer">

                    <div className="newFaculty">
                        <div>
                            <label className="inputLabel">{t('sede')}</label>
                            <Controls.Input
                                name="sede"
                                placeHolder={t('sede')}
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                disabled="true"
                                error={errors.sede}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclicSedePopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('nome_Agencia')}</label>
                            <Controls.Input
                                name="agencia"
                                placeHolder={t('nome_Agencia')}
                                value={agencia}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.agencia}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickAgenciaPopup}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('code')}</label>
                            <Controls.Input
                                name="code"
                                placeHolder={t('code')}
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.code}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('departamento')}</label>
                            <Controls.Input
                                name="departamento"
                                placeHolder={t('departamento')}
                                value={values.departamento}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.departamento}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('observacao')}</label>
                            <Controls.Input
                                name="observacao"
                                placeHolder={t('observacao')}
                                value={values.observacao}
                                onChange={handleInputChange}
                                type="text"
                                multiline
                                rows={5}
                                height="140px"
                            />
                        </div>

                    </div>
                    <div className="newFaculty" style={{ marginTop: "-10px" }}>
                        <DepartamentoSearchTable ref={childRefDepartement}
                            idDisplay={false}
                            codeDisplay={true}
                            actionsButtonDisplay={false}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={3}
                            rowPerPage={3}
                            backGroundColor={backGroundColor}
                            color={color}
                            sedeID= {values.sedeID}
                            agenciaID= {values.agenciaID}
                            // departamentoData={(id, code, departamento) => {
                            //     //setSede(sede);
                            //     //values.sedeID = id
                            //     setOpenPopup(false);
                            // }
                            // }
                        />
                    </div>

                </div>

                <div className="facultyItemContainer">

                    <div className="newFaculty">

                    </div>

                    <div className="newFaculty">
                        <Controls.Buttons
                            type="submit"
                            text={buttonTitle}
                            className="button"
                        />
                        <Controls.Buttons
                            type="button"
                            text={textReset}
                            color="secondary"
                            className="button"
                            onClick={ResetForm}
                        />
                    </div>

                </div>

            </Form>


            {notificatinoShow ?
                <Notifications
                    notify={notify}
                    setNotify={setNotify}
                /> : null
            }
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
                                setSedeID(id)
                                values.sedeID = id
                                setOpenPopup(false);
                                tableAgenciaUpdateData(id);
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
                        height="580px"
                    >

                        <AgenciaSearchTable ref={childRefAgence}
                            idDisplay={false}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor={backGroundColor}
                            idSede = {values.sedeID}
                            color={color}
                            pageSize={5}
                            rowPerPage={5}
                            agenciaData={(id, code, agencia) => {
                                values.agenciaID = id;
                                setAgencia(agencia);
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

export default NovoDepartamento;
