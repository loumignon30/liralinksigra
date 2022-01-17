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
    const { values, setValues, handleInputChange } = useForm(initialFValues)  // useForm = useForm.js
    const [slideImgCategory, setSlideImgCategory] = useState();
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

    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");

        getStateValuesFromSearchTable();
        updateValuesOnOpen();  // useContext

    }, []);

    const getStateValuesFromSearchTable = () => {

        if ((location.state) !== null) {

            setBackGroundColor("darkBlue");
            setColor("white");
            setHeaderTitle("Modificar Agencia");
            setHeaderSubTitle("Modificar os dados da Agência");
            setButtonTitle("Modificar");
            setTextReset("Nova Agência");

            setValues(location.state);

            setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);
           sendImageFromImageUpload(location.state.imageChangeFromOutSideURL);


        } else {
            setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle("Cadastrar Nova Agência");
            setHeaderSubTitle("Guardar os dados da nova Agência");
            setButtonTitle("Guardar");
            setTextReset("Limpar");
        }
    }

    const sendImageFromImageUpload = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
    }

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => (
            values.sedeID = item.sedeID,
            setSede(item.nomeSede)
        ));
    }

    const saveImageFromImageUpload = () => {
        setImageFileName(childRef.current.fileName);
        values.imageName = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
    }

    const imageReset = () => {
        childRef.current.imageReset();
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSlideImgCategory(URL.createObjectURL(event.target.files[0]));
        }
    }

    const ResetForm = () => {
        setSede("");
        imageReset();
        setValues(initialFValues);

        updateValuesOnOpen();  // useContext

        setBackGroundColor("darkGreen");
        setColor("white");
        setHeaderTitle("Cadastrar Nova Agência");
        setHeaderSubTitle("Guardar os dados da nova Agência");
        setButtonTitle("Save");
        setTextReset("Limpar");

        setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");
        setNotificationShow(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveAgencia(); // call save university
        ResetForm();
        // if (validate()) {

        // }
    }

    const tableAgenciaUpdateData = () => {
        //childRef2.current.test3();
        childRef2.current.getGetAllData(values.sedeID);  // saveImage() = method called
    }

    const onclickUniversityPopup = () => {
        setPpupTitle("Listagem de Sedes");
        setOpenPopup(true);
    }

    const saveAgencia = () => {
        if (childRef.current.imageSelected) {  // save image only if selected
            saveImageFromImageUpload();
        }

        if (values.id > 0) {
            AgenciaService.update(values.id, values).then(response => {
                setNotificationShow(true);
                tableAgenciaUpdateData(); // update Faculty Data on FacultySearchTable.js
                setNotify({
                    isOpen: true,
                    message: 'Dados da Agencia Modificadas com Sucesso!',
                    type: 'success'
                })
            })
                .catch(e => {
                    console.log(e)
                });
        } else {
            AgenciaService.create(values).then(response => {
                setNotificationShow(true);
                tableAgenciaUpdateData(); // update Faculty Data on FacultySearchTable.js
                setNotify({
                    isOpen: true,
                    message: 'Nova Agencia guarda com Sucesso!',
                    type: 'success'
                })
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
        alert("null values")
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
                            <label className="inputLabel">Sede</label>
                            <Controls.Input
                                name="sede"
                                placeHolder="Sede da Empresa"
                                value={sede}
                                onChange={handleInputChange}
                                width="290px"
                                type="text"
                                disabled="true"
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickUniversityPopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Code</label>
                            <Controls.Input
                                name="code"
                                placeHolder="Code"
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Nome Agencia</label>
                            <Controls.Input
                                name="nome"
                                placeHolder="Nome da Agencia"
                                value={values.nome}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Representante</label>
                            <Controls.Input
                                name="nomeRepresentante"
                                placeHolder="Nome do(a) Representante"
                                value={values.nomeRepresentante}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Endereço</label>
                            <Controls.Input
                                name="endereco"
                                placeHolder="Endereço da Agencia"
                                value={values.endereco}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Email</label>
                            <Controls.Input
                                name="email"
                                placeHolder="Email da Egencia"
                                value={values.email}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"

                            />
                        </div>

                        <div>
                            <label className="inputLabel">Nº Telefone</label>
                            <Controls.Input
                                name="telefone"
                                placeHolder="Número de Telefone da Agencia"
                                value={values.telefone}
                                onChange={handleInputChange}
                                type="text"
                                width="290px"
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Cidade</label>
                            <Controls.Input
                                name="cidade"
                                placeHolder="Cidade"
                                value={values.cidade}
                                onChange={handleInputChange}
                                type="text"
                                width="145px"
                            />

                            <Controls.Input
                                name="pais"
                                placeHolder="País"
                                value={values.pais}
                                onChange={handleInputChange}
                                type="text"
                                width="145px"
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

                        <div className="newUniversity">
                            <ImageUpLoad
                                ref={childRef}
                                fotoTitulo="Logo"
                            />
                        </div>

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
