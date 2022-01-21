import "./funcao.css";
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
import FuncaoService from "../../services/admin/Funcao.services";
import FuncaoSearchTable from "./FuncaoSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation } from "react-router-dom";

const initialFValues = {
    id: 0,
    code: '',
    funcao: '',
    observacao: '',
    sedeID: 0,
    agenciaID: 0,
    status: "Active"
}

const NovaFuncao = () => {

    // notification with SnackBar
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' });
    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const childRef2 = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [agenciaID, setAgenciaID] = useState(0);
    const [agencia, setAgencia] = useState();

    const [notificatinoShow, setNotificationShow] = useState(false);

    const [count, setCount] = useState();
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const location = useLocation();

    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const [headerSubTitle, setHeaderSubTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState();
    const [textReset, setTextReset] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen(); // // update Usecontext

        getStateValuesFromSearchTable();

    }, []);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('code' in fieldValues)
            validationErrorM.code = fieldValues.code ? "" : " "  // This field is Required
        if ('funcao' in fieldValues)
            validationErrorM.funcao = fieldValues.funcao ? "" : " "   // This field is Required

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

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => (
            values.sedeID = item.sedeID,
            setSede(item.nomeSede)
        ));
    }

    const getStateValuesFromSearchTable = () => {

        if ((location.state) !== null) {

            setBackGroundColor("darkBlue");
            setColor("white");
            setHeaderTitle("Modificar Função");
            setHeaderSubTitle("Modificar os dados da Função");
            setButtonTitle("Modificar");
            setTextReset("Novos dados");

            setValues(location.state);
            setSede(location.state.sede);
            setAgencia(location.state.agencia)

            setSedeID(location.state.sedeID)
            setAgenciaID(location.state.agenciaID)

        } else {
            setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle("Cadastrar Nova Função");
            setHeaderSubTitle("Guardar os dados do nova Função");
            setButtonTitle("Guardar");
            setTextReset("Limpar");
        }
    }

    const ResetForm = () => {
        setValues(initialFValues);
        setNotificationShow(false);

        values.sedeID = sedeID;
        values.agenciaID = agenciaID;

        setBackGroundColor("darkGreen");
        setColor("white");
        setHeaderTitle("Cadastrar Nova Função");
        setHeaderSubTitle("Guardar os dados do nova Função");
        setButtonTitle("Guardar");
        setTextReset("Limpar");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            saveFaculty(); // call save university
            ResetForm();
        }
    }

    const tableFuncaoUpdateData = () => {
        //childRef2.current.test3();
        childRef2.current.getGetAllData();  // saveImage() = method called
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle("Listagem de Sedes Cadastradas");
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        setCount(2);
        setPpupTitle("Listagem de Agências");
        setOpenPopup(true);
    }

    const saveFaculty = () => {

        if (values.id > 0) {
            FuncaoService.update(values.id, values).then(response => {
                setNotificationShow(true);
                tableFuncaoUpdateData(); // update Faculty Data on FacultySearchTable.js
                values.code = "";
                values.funcao = "";
                values.observacao = "";

                setNotify({
                    isOpen: true,
                    message: 'Função Modificado com Sucesso!',
                    type: 'success'
                })

            })
                .catch(e => {
                    console.log(e)
                });

        } else {

            if (values.agenciaID === 0 && agenciaID > 0) {
                values.agenciaID = agenciaID;
            }

            FuncaoService.create(values).then(response => {

                setNotificationShow(true);
                tableFuncaoUpdateData(); // update Faculty Data on FacultySearchTable.js

                setNotify({
                    isOpen: true,
                    message: 'Nova Função guarda com Sucesso!',
                    type: 'success'
                })

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
                            <label className="inputLabel">Sede</label>
                            <Controls.Input
                                name="sede"
                                placeHolder="Sede da Empresa"
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
                            <label className="inputLabel">Agência</label>
                            <Controls.Input
                                name="agencia"
                                placeHolder="Agencia da Empresa"
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
                            <label className="inputLabel">Código</label>
                            <Controls.Input
                                name="code"
                                placeHolder="Código da Função"
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.code}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Função</label>
                            <Controls.Input
                                name="funcao"
                                placeHolder="Designação da Função"
                                value={values.funcao}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.funcao}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Observação</label>
                            <Controls.Input
                                name="observacao"
                                placeHolder="Observação"
                                value={values.observacao}
                                onChange={handleInputChange}
                                type="text"
                                multiline
                                rows={5}
                                height="140px"
                                width="290px"
                            />
                        </div>

                    </div>
                    <div className="newFaculty" style={{ marginTop: "-10px" }}>
                        <FuncaoSearchTable ref={childRef2}
                            idDisplay={false}
                            codeDisplay={true}
                            actionsButtonDisplay={false}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={3}
                            rowPerPage={3}
                            backGroundColor={backGroundColor}
                            color={color}
                            departamentoData={(id, code, departamento) => {
                                //setSede(sede);
                                values.sedeID = id
                                setOpenPopup(false);
                                tableFuncaoUpdateData(id);
                            }
                            }
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
                            idDisplay={true}
                            codeDisplay={false}
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
                        width="670px"
                        height="580px"
                    >

                        <AgenciaSearchTable
                            idDisplay={false}
                            codeDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor={backGroundColor}
                            color={color}
                            pageSize={5}
                            rowPerPage={5}
                            agenciaData={(id, code, agencia) => {
                                values.agenciaID = id;
                                setAgencia(agencia);
                                setAgenciaID(id)
                                setOpenPopup(false);
                            }}
                        />
                    </Popup> : null
            }

        </div>
    )
}

export default NovaFuncao;
