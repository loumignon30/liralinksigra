import React, { useState, useEffect, useRef } from 'react'
import './newUser.css'
import '../../App.css'
import ArticleIcon from '@mui/icons-material/Article';
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import Notifications from '../../components/reusableComponents/Notifications';
import * as userRole from "../../services/admin/RoleData";
import * as userGender from "../../services/admin/GenderData";
import PageHeader from '../../components/reusableComponents/PageHeader';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import UserService from '../../services/admin/User.service';
import { useTranslation } from "react-i18next";
import { Search } from '@mui/icons-material';
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';
import { Button, InputAdornment } from '@mui/material';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    dateofbirth: '',
    gender: '',
    role: '',
    password: '',
    photofilename: '',
    status: '1',
    country: '',
    sedeID: 0
}

export default function NewUSerForm(props) {

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        ResetForm();

    }, []);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageSRC, setImageSRC] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");

    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [count, setCount] = useState(0);
    const [popupTitle, setPpupTitle] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [notificatinoShow, setNotificationShow] = useState(false);
    const [sedePesquisa, setSedePesquisa] = useState("");
    const childRefSede = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const navigate = useNavigate();

    const { t } = useTranslation();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageSRC(URL.createObjectURL(event.target.files[0]));
        }
    }
    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('firstname' in fieldValues)
            validationErrorM.firstname = fieldValues.firstname ? "" : " "  // This field is Required
        if ('lastname' in fieldValues)
            validationErrorM.lastname = fieldValues.lastname ? "" : " "   // This field is Required
        if ('email' in fieldValues)
            validationErrorM.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : ""
        if ('telephone' in fieldValues)
            validationErrorM.telephone = fieldValues.telephone.length > 8 ? "" : "Minimum 9 caracters"

        // if ('dateofbirth' in fieldValues)
        // validationErrorM.dateofbirth = "yyyy-mm-dd" ? "" : " "

        if ('gender' in fieldValues)
            validationErrorM.gender = fieldValues.gender ? "" : " "

        if ('role' in fieldValues)
            validationErrorM.role = fieldValues.role ? "" : " "

        if ('password' in fieldValues)
            validationErrorM.password = fieldValues.password.length > 3 ? "" : "Minimum 3 caracters"

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

    useEffect(() => {
       
        values.email= "";
        values.password= "";

    }, []);

    const genderItems = [
        { id: 1, title: t('sexo_masculino') },
        { id: 2, title: t('sexo_feminino') },
        { id: 3, title: t('sexo_outros') },
    ];

    const getRole = [
        { id: 1, title: t('role_administrador') },
        { id: 2, title: t('role_Funcionario') },
        { id: 3, title: t('role_utilizador') },
        { id: 101, title: t('role_super_user') }
    ]

    const saveImageFromImageUpload = () => {
        setImageFileName(childRef.current.fileName);
        values.photofilename = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
    }
    const imageReset = () => {
        childRef.current.imageReset()
    }

    const handleSubmit = e => {
        e.preventDefault();

        UserService.getAll(sedeID, "emailPesquisa", values.email)
            .then(response => {

                if (response.data.length > 0 && values.id == 0) {  // tester si le code exist
                    return (swal(t('mensagem_erro_menu_atencao'), t('Email_Existe_do_usuario_na_base_de_dasos'), "warning"));
                } else {

                    if (validate()) {
                        saveUniversity(); // save new user
                        ResetForm();
                    }
                }
            })
    }

    const ResetForm = () => {
        
        setValues(initialFValues);
        imageReset();
        setErrors({})

        values.sedeID = sedeID;
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const saveUniversity = () => {
        saveImageFromImageUpload();
        UserService.create(values).then(response => {
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

    const testEmailExist = () => {
        alert("je suis ici");

        UserService.getAll(sedeID, "emailPesquisa", values.email)
            .then(response => {

                if (response.data.length > 0 && values.id == 0) {  // tester si le code exist
                    return (swal(t('mensagem_erro_menu_atencao'), t('Email_Existe_do_usuario_na_base_de_dasos'), "warning"));
                }
            })
    }

    const sedeSearchToToDataGrid = (e) => {
        setSedePesquisa(e.target.value)
        childRefSede.current.sedSearch(e.target.value); // search the firstname
    }

    return (
        <>
            <div className="newUserMainContainer">

                <PageHeader
                    title={t('header_title_utilisador_novo')}
                    subTitle={t('header_subTitle_utilisador_novo')}
                    backGroundColor="#50394c"
                    color="white"
                    icon={<ArticleIcon />}>
                </PageHeader>

                {/* <div>
                    <Button variant="contained"
                        onClick={testEmailExist}
                        size="small"
                        color="primary">{t('button_gravar')}</Button>
                </div> */}


                <Form onSubmit={handleSubmit}>

                    <div className="newUserContainer">

                        <div className="newUser">
                            <div>
                                <label className="inputLabel">{t('sede')}</label>
                                <Controls.Input
                                    name={t('sede')}
                                    placeHolder={t('sede')}
                                    value={sede}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="65%"
                                    error={errors.sede}
                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    onClick={onclicSedePopup}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('nome')}</label>
                                <Controls.Input
                                    name="firstname"
                                    placeHolder={t('nome')}
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    width="33%"
                                    type="text"
                                    error={errors.firstname}
                                />
                                {/* <span style={{marginTop:'5px', marginLeft:'2px', color:'red'}}>{errors.firstName}</span> */}

                                <Controls.Input
                                    name="lastname"
                                    placeHolder={t('apelido')}
                                    value={values.lastname}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="32%"
                                    error={errors.lastname}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('email')}</label>
                                <Controls.Input
                                    name="email"
                                    placeHolder={t('email')}
                                    value={values.email}
                                    onChange={handleInputChange}
                                    type="text"
                                    error={errors.email}
                                    autoComplete="new-password"
                                    autofill="off"
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('contacto')}</label>
                                <Controls.Input
                                    name="telephone"
                                    placeHolder={t('contacto')}
                                    value={values.telephone}
                                    onChange={handleInputChange}
                                    type="text"
                                    error={errors.telephone}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('endereco')}</label>
                                <Controls.Input
                                    name="address"
                                    placeHolder={t('endereco')}
                                    value={values.address}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('cidade')}</label>
                                <Controls.Input
                                    name="city"
                                    placeHolder={t('cidade')}
                                    value={values.city}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="userLabel">{t('pais')}</label>
                                <Controls.Input
                                    name="country"
                                    placeHolder={t('pais')}
                                    value={values.country}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                        </div>

                        <div className="newUser2">
                            <div style={{ marginBottom: "10px" }}>
                                <label className="userLabel">{t('data_nascimento')}</label>
                                <Controls.Input
                                    name="dateofbirth"
                                    placeHolder={t('data_nascimento')}
                                    value={values.dateofbirth}
                                    onChange={handleInputChange}
                                    width="55%"
                                    type="date"
                                />
                            </div>

                            <div >
                                <label className="userLabel">{t('sexo')}</label>
                                <Controls.Select
                                    name="gender"
                                    label="gender"
                                    value={values.gender}
                                    onChange={handleInputChange}
                                    options={genderItems}
                                    width="55%"
                                    height="40px"
                                    typeOfSelect={1}
                                    error={errors.gender}
                                />
                            </div>

                            <div style={{ paddingTop: "5px", }}>
                                <label className="userLabel" htmlFor="role">{t('nivel_accesso')}</label>
                                <Controls.Select
                                    name="role"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleInputChange}
                                    options={getRole}
                                    typeOfSelect={1}
                                    error={errors.role}
                                    width="55%"
                                    height="40px"
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('senha')}</label>
                                <Controls.Input
                                    name="password"
                                    placeHolder={t('senha')}
                                    value={values.password}
                                    onChange={handleInputChange}
                                    width="55%"
                                    type="password"
                                    autoComplete="new-password"
                                    error={errors.password}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('confirmar_senha')}</label>
                                <Controls.Input
                                    name="password"
                                    placeHolder={t('confirmar_senha')}
                                    value={values.password}
                                    onChange={handleInputChange}
                                    type="password"
                                    autoComplete="new-password"
                                    width="55%"
                                    error={errors.password}
                                />
                            </div>


                            <div>
                                <div style={{ marginTop: "10px" }}>
                                    <ImageUpLoad
                                        ref={childRef}
                                        fotoTitulo={t('foto')}
                                        margnLeft="0px"
                                        uploadDisplay={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="newUserContainer">

                        <div className="newUser">
                            <div style={{ marginTop: "-20px" }}>
                                <Controls.Buttons
                                    type="submit"
                                    text={t('button_gravar')}
                                />
                                
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_limpar')}
                                    color="secondary"
                                onClick={ResetForm}
                                 />
                                 {/* <Controls.Buttons
                                    type="button"
                                    text={t('sair')}
                                    color="secondary"
                                    onClick={close} 
                                 /> */}

                                
                            </div>
                        </div>
                    </div>

                </Form>
            </div>

            {
                notificatinoShow ?
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
                        width="650px"
                        height="520px"
                    >
                        <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
                            <label className="userLabel">{t('Recherche')}</label>
                            <Controls.Input
                                name="sedePesquisa"
                                type="text"
                                value={sedePesquisa}
                                placeHolder={t('sede')}
                                width="55%"
                                marginLeft="-20px"
                                onChange={sedeSearchToToDataGrid}
                                InputProps={{
                                    startAdornment: (<InputAdornment position='start'>
                                        <Search />
                                    </InputAdornment>)
                                }}
                            />
                        </div>
                        <SedeSearchTable ref={childRefSede}
                            idDisplay={true}
                            codeDisplay={false}
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            statusDisplay={true}
                            pageSize={7}
                            rowPerPage={7}
                            backGroundColor="#50394c"
                            color="white"
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                setSedeID(id)
                                values.sedeID = id
                                setOpenPopup(false);
                                setSedePesquisa("");
                            }
                            }
                        />
                    </Popup> : null
            }

            {
            }

        </>
    )
}
