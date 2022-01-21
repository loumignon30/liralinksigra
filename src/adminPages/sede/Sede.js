import "./sede.css"
import '../../App.css'
import Notifications from '../../components/reusableComponents/Notifications';
import { House } from '@mui/icons-material';
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import SedeSearchTable from '../sede/SedeSearchTable';
import SedeService from "../../services/admin/Sede.services";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import urlImage from '../../http-common-images';
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";

const Sede = (props) => {

    const initialFValues = {
        id: 0,
        code: '',
        sede: '',
        email: '',
        contacto: '',
        endereco: '',
        cidade: '',
        pais: '',
        status: 'Active',
        imageName: ''
    }
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    // notification with SnackBar
    const [url, setUrl] = useState(urlImage);  // backend image  URL
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();
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

    let imageDisplay;
    let logoCheck = "";
    // function to call the click from ImageUpLoad.js
    const updateValuesOnOpen = () => {

        userSavedValue.map(item => (
            setID(item.sedeID),
            values.id = item.sedeID,
            values.code = item.codeSede,
            values.sede = item.nomeSede,
            values.email = item.emailSede,
            values.contacto = item.sedeContacto,
            values.endereco = item.sedeEndereco,
            values.cidade = item.sedeCidade,
            values.pais = item.sedePais,
            imageDisplay = "https://s3.amazonaws.com/liralink.sigra/" + item.sedeImageFile,
            values.imageName = item.sedeImageFile,
            logoCheck = item.sedeImageFile
        ));

    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        updateValuesOnOpen();

        if (values.id > 0) {
            imaSedeDisplay(imageDisplay);
        }

    }, [id]);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('code' in fieldValues)
            validationErrorM.code = fieldValues.code ? "" : " "  // This field is Required
        if ('sede' in fieldValues)
            validationErrorM.sede = fieldValues.sede ? "" : " "   // This field is Required

        if ('endereco' in fieldValues)
            validationErrorM.endereco = fieldValues.endereco ? "" : " "

        if ('nomeRepresentante' in fieldValues)
            validationErrorM.nomeRepresentante = fieldValues.nomeRepresentante ? "" : " "

        if ('cidade' in fieldValues)
            validationErrorM.cidade = fieldValues.cidade ? "" : " "
        if ('pais' in fieldValues)
            validationErrorM.pais = fieldValues.pais ? "" : " "

        if ('contacto' in fieldValues)
            validationErrorM.contacto = fieldValues.contacto.length > 8 ? "" : "Minimum 9 caracters"


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

    const saveImageFromImageUpload = () => {

        setImageFileName(childRef.current.fileName);
        values.imageName = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
        logoCheck = (childRef.current.fileName);
    }

    const tableSedeData = () => {
        childRef2.current.getGetAllData();  // saveImage() = method called
    }
    const imaSedeDisplay = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
    }

    const imageReset = () => {
        childRef.current.imageReset()
    }

    const handleDelete = (id) => {
        //setSlideImgCategory(universityDaya.filter((item) => item.id !== id));
    }

    const ResetForm = () => {

        // setConfirmDialog({
        //     isOpen: true,
        //     title: 'O Sistema vai reiniciar para atualizar os dados da Sede!',
        //     subTitle: "Informação"
        // });

        imageReset();
        setValues(initialFValues);
        setNotificationShow(false);

        setUserSavedValue({});
        navigate('/');
        // setOpenPopup(false);
    }

    const gavarSede = () => {

        if (values.id > 0) {
            SedeService.update(values.id, values).then(response => {
                alert("A Sede foi Alterada com Sucesso!!. O programa vai fechar para atualização da Sede");
                tableSedeData(); // update DataGrid Table used form universitySearchTable.js
                setNotificationShow(true);
                setNotify({
                    isOpen: true,
                    message: 'Nova Sede Gravada com Sucesso!',
                    type: 'success'
                });

            })
                .catch(e => {
                    console.log(e)
                });

        } else {
            SedeService.create(values).then(response => {
                alert("A Sede foi gravada com Sucesso!!. O programa vai fechar para atualização da Sede");
                tableSedeData(); // update DataGrid Table used form universitySearchTable.js
                setNotificationShow(true);
                setNotify({
                    isOpen: true,
                    message: 'Nova Sede Gravada com Sucesso!',
                    type: 'success'
                })

            })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {

            if (childRef.current.imageSelected) {  // if (childRef.current.imageSelected) {
                saveImageFromImageUpload();
            }
            if (logoCheck === "") {
                alert("Falta do Logo da Sede", "Atenção");
                return;
            }

            gavarSede(); // call save university
            ResetForm();
            // close();
        }
    }

    const close = () => {
        navigate('/Home');
        setOpenPopup(false);
        props.yearGetData();
    }

    return (
        <div className="universityContainer">
            <PageHeader
                title="Nova Sede"
                subTitle="Cadastrar uma nova Sede"
                backGroundColor="darkBlue"
                color="white"
                icon={<House />}>
            </PageHeader>

            {/* <button onClick={testImage}>Test call image select</button>  */}

            {/* <button onClick={buttonclick}> Button</button> */}

            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="unversityItemContainer">

                    <div className="newUniversity">
                        <div>
                            <label className="inputLabel">Code</label>
                            <Controls.Input
                                name="code"
                                placeHolder="Code"
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.code}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Sede</label>
                            <Controls.Input
                                name="sede"
                                placeHolder="Nome da Sede"
                                value={values.sede}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.sede}

                            />
                        </div>

                        <div>
                            <label className="inputLabel">Email</label>
                            <Controls.Input
                                name="email"
                                placeHolder="Email da Sede"
                                value={values.email}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.email}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Contacto</label>
                            <Controls.Input
                                name="contacto"
                                placeHolder="Contact of da Sede"
                                value={values.contacto}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.contacto}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Endereço</label>
                            <Controls.Input
                                name="endereco"
                                placeHolder="Endereço da Sede"
                                value={values.endereco}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.endereco}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Cidade</label>
                            <Controls.Input
                                name="cidade"
                                placeHolder="Cidade da Sede"
                                value={values.cidade}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.cidade}
                            />
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <label className="inputLabel">País</label>
                            <Controls.Input
                                name="pais"
                                placeHolder="País"
                                value={values.pais}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.pais}
                            />
                        </div>

                    </div>

                    <div className="newUniversity">
                        <div>

                            <SedeSearchTable
                                ref={childRef2}
                                idDisplay={true}
                                codeDisplay={false}
                                actionsButtonSelectDisplay={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                pageSize={4}
                                rowPerPage={4}
                            />

                        </div>
                    </div>

                </div>

                <div className="unversityItemContainer">

                    <div className="newUniversity">
                        <ImageUpLoad
                            ref={childRef}
                            margnLeft="0px"
                            fotoTitulo="Logo"
                            uploadDisplay={true}
                        />
                    </div>

                    <div className="newUniversity">
                        <div >
                            <Controls.Buttons
                                type="submit"
                                text="Gravar"
                                className="button"
                            />
                            <Controls.Buttons
                                type="button"
                                text="Sair"
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

        </div>
    )
}
export default Sede;
