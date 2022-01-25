import "./agencia.css";
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
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialFValues = {
    id: 0,
    code: '',
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
    cidade: "",
    pais: "",
    nomeRepresentante: '',
    status: 'Active',
    imageName: '',
    sedeID: 0,
}

const Agencia = () => {

    // notification with SnackBar
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' });
    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRef2 = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");

    //const [slideImgCategory, setSlideImgCategory] = useState();
    const [sede, setSede] = useState("");
    const [notificatinoShow, setNotificationShow] = useState(false);
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const location = useLocation();

    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const [headerSubTitle, setHeaderSubTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState();
    const [textReset, setTextReset] = useState();

    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        // setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");

        getStateValuesFromSearchTable();
        updateValuesOnOpen();  // useContext

    }, [t('sede')]);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('code' in fieldValues)
            validationErrorM.code = fieldValues.code ? "" : " "  // This field is Required
        if ('nome' in fieldValues)
            validationErrorM.nome = fieldValues.nome ? "" : " "   // This field is Required

        if ('endereco' in fieldValues)
            validationErrorM.endereco = fieldValues.endereco ? "" : " "

        if ('nomeRepresentante' in fieldValues)
            validationErrorM.nomeRepresentante = fieldValues.nomeRepresentante ? "" : " "

        if ('cidade' in fieldValues)
            validationErrorM.cidade = fieldValues.cidade ? "" : " "
        if ('pais' in fieldValues)
            validationErrorM.pais = fieldValues.pais ? "" : " "

        if ('telefone' in fieldValues)
            validationErrorM.telefone = fieldValues.telefone.length > 8 ? "" : "Minimum 9 caracters"


        if ('email' in fieldValues)
            validationErrorM.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : " "

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
            setHeaderTitle(t('header_title_agence_modificar'));
            setHeaderSubTitle(t('header_subTitle_agence_modificar'));
            setButtonTitle(t('button_modificar'));
            setTextReset(t('button_novo'));

            setValues(location.state);

            //setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);
            //sendImageFromImageUpload(location.state.imageChangeFromOutSideURL);


        } else {
            setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle(t('header_title_agence_novo'));
            setHeaderSubTitle(t('header_subTitle_agence_novo'));
            setButtonTitle(t('button_gravar'));
            setTextReset("Limpar");
            setTextReset(t('button_limpar'));
        }
    }

    const sendImageFromImageUpload = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
    }

    const updateValuesOnOpen = () => {
        // userSavedValue.map(item => (
        //     values.sedeID = item.sedeID,
        //     setSede(item.nomeSede)
        // ));
    }

    // const saveImageFromImageUpload = () => {
    //     setImageFileName(childRef.current.fileName);
    //     values.imageName = (childRef.current.fileName);
    //     childRef.current.saveImage();  // saveImage() = method called
    // }

    // const imageReset = () => {
    //     childRef.current.imageReset();
    // }

    // const onImageChange = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setSlideImgCategory(URL.createObjectURL(event.target.files[0]));
    //     }
    // }

    const ResetForm = () => {
        setSede("");
        //imageReset();
        setValues(initialFValues);

        updateValuesOnOpen();  // useContext

        setBackGroundColor("darkGreen");
        setColor("white");
        setHeaderTitle(t('header_title_agence_novo'));
        setHeaderSubTitle(t('header_subTitle_agence_novo'));
        setButtonTitle(t('button_gravar'));
        setTextReset("Limpar");
        setTextReset(t('button_limpar'));

        //setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");
        setNotificationShow(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            saveAgencia(); // call save university
            ResetForm();
        }

    }

    const tableAgenciaUpdateData = () => {
        //childRef2.current.test3();
        childRef2.current.getGetAllData(values.sedeID);  // saveImage() = method called
    }

    const onclickUniversityPopup = () => {
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const saveAgencia = () => {
        // if (childRef.current.imageSelected) {  // save image only if selected
        //     saveImageFromImageUpload();
        // }

        if (values.id > 0) {
            AgenciaService.update(values.id, values).then(response => {
                tableAgenciaUpdateData(); // update Faculty Data on FacultySearchTable.js
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
            AgenciaService.create(values).then(response => {
                tableAgenciaUpdateData(); // update Faculty Data on FacultySearchTable.js
                setNotify({
                    isOpen: true,
                    message: t('mensagem_Gravar_Nova_Agencia'),
                    type: 'success'
                })
                setNotificationShow(true);
            })
                .catch(e => {
                    console.log(e)
                });
        }

    }

    const editCliqued = () => {
        getStateValuesFromSearchTable();
    }

    const reserClick = () => {
        values.code = -""
    }
    const imageAgenciaDisplay = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
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
                                width="65%"
                                type="text"
                                disabled="true"
                                error={errors.sede}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickUniversityPopup}
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
                                width="65%"
                                error={errors.code}

                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('nome_Agencia')}</label>
                            <Controls.Input
                                name="nome"
                                placeHolder={t('nome_Agencia')}
                                value={values.nome}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.nome}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('nome_representante')}</label>
                            <Controls.Input
                                name="nomeRepresentante"
                                placeHolder={t('nome_representante')}
                                value={values.nomeRepresentante}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.nomeRepresentante}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('endereco')}</label>
                            <Controls.Input
                                name="endereco"
                                placeHolder={t('endereco')}
                                value={values.endereco}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.endereco}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('email')}</label>
                            <Controls.Input
                                name="email"
                                placeHolder={t('email')}
                                value={values.email}
                                onChange={handleInputChange}
                                type="text"
                                width="40%"
                                error={errors.email}
                            />
                        
                            {/* <label className="inputLabel">{t('contacto')}</label> */}
                            <Controls.Input
                                name="telefone"
                                placeHolder={t('contacto')}
                                value={values.telefone}
                                onChange={handleInputChange}
                                type="text"
                                width="25%"
                                error={errors.telefone}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('cidade')}</label>
                            <Controls.Input
                                name="cidade"
                                placeHolder={t('cidade')}
                                value={values.cidade}
                                onChange={handleInputChange}
                                type="text"
                                width="33%"
                                error={errors.cidade}
                            />
                        
                            {/* <label className="inputLabel">{t('pais')}</label> */}
                            <Controls.Input
                                name="pais"
                                placeHolder={t('pais')}
                                value={values.pais}
                                onChange={handleInputChange}
                                type="text"
                                width="32%"
                                error={errors.pais}
                            />
                        </div>

                    </div>
                    <div className="newFaculty">
                        <AgenciaSearchTable ref={childRef2}
                            idDisplay={true}
                            codeDisplay={true}
                            emailDisplay={false}
                            statusDiplay={false}
                            actionsButtonDisplaySelect={false}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor={backGroundColor}
                            color={color}
                            pageSize={5}
                            rowPerPage={5}
                            editClick={(id, code, nome, endereco, email, telefone, cidade,
                                pais, nomeRepresentante, status, imageChangeFromOutSideURL,
                                imageName
                            ) => {
                                values.id = id
                                values.code = code
                                values.nome = nome
                                values.endereco = endereco
                                values.email = email
                                values.telefone = telefone
                                values.cidade = cidade
                                values.pais = pais
                                values.nomeRepresentante = nomeRepresentante
                                values.status = status
                                values.imageName = imageName

                                setImageFileName(imageName)
                                imageAgenciaDisplay(imageChangeFromOutSideURL)
                                setOpenPopup(false);
                                tableAgenciaUpdateData(id);

                                editCliqued();  // color 
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
                    backGroundColor={backGroundColor}
                    color={color}
                    sedeData={(id, code, sede) => {
                        setSede(sede);
                        values.sedeID = id
                        setOpenPopup(false);
                        tableAgenciaUpdateData(id);
                    }
                    }
                />

            </Popup>

        </div>
    )
}

export default Agencia;
