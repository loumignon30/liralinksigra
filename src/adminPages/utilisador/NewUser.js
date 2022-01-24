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
    status: 'Active',
    country: ''
}

export default function NewUSerForm() {

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageSRC, setImageSRC] = useState();
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");

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

        if ('gender' in fieldValues)
            validationErrorM.gender = fieldValues.gender ? "" : " "

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
        setImageSRC("https://media-exp1.licdn.com/dms/image/C4E03AQFsD7qKHQJzYA/profile-displayphoto-shrink_800_800/0/1624105018084?e=1642032000&v=beta&t=HTny2PpWRl0YOFcXgDMAx2rXIE7XU2lbDjzFm4T2g5o");
    }, []);

    const genderItems = [
        { id: t('sexo_masculino'), title: t('sexo_masculino') },
        { id: t('sexo_feminino'), title: t('sexo_feminino') },
        { id: t('sexo_outros'), title: t('sexo_outros') },
    ];

      const getRole = [
        {id: t('role_administrador'), title: t('role_administrador')},
        {id: t('role_Funcionario'), title: t('role_Funcionario')},
        {id: t('role_utilizador'), title: t('role_utilizador')}
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

        if (validate()) {
            saveUniversity(); // save new user
            ResetForm();
        }
    }

    const ResetForm = () => {
        setValues(initialFValues);
        imageReset();
        setErrors({})

        setNotify({
            isOpen: false,
            message: '',
            type: ''
        })
    }

    const saveUniversity = () => {
        saveImageFromImageUpload();
        UserService.create(values).then(response => {
            setNotify({
                isOpen: true,
                message: t('mensagem_Gravar_Nova_Agencia'),
                type: 'success'
            });

        })
            .catch(e => {
                console.log(e)
            });
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


                <Form onSubmit={handleSubmit}>

                    <div className="newUserContainer">

                        <div className="newUser">
                            <div>
                                <label className="userLabel">{t('nome')}</label>
                                <Controls.Input
                                    name="firstname"
                                    placeHolder={t('nome')}
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    className='textField-TextLarge'
                                    type="text"
                                    error={errors.firstname}
                                />
                                {/* <span style={{marginTop:'5px', marginLeft:'2px', color:'red'}}>{errors.firstName}</span> */}
                            </div>
                            <div>
                                <label className="userLabel">{t('apelido')}</label>
                                <Controls.Input
                                    name="lastname"
                                    placeHolder={t('apelido')}
                                    value={values.lastname}
                                    onChange={handleInputChange}
                                    type="text"
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
                            <div>
                                <label className="userLabel">{t('data_nascimento')}</label>
                                <Controls.Input
                                    name="dateofbirth"
                                    placeHolder={t('data_nascimento')}
                                    value={values.dateofbirth}
                                    onChange={handleInputChange}
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
                                    className={"select-buttonLarge11"}
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
                                    className={"select-buttonLarge11"}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('senha')}</label>
                                <Controls.Input
                                    name="password"
                                    placeHolder={t('senha')}
                                    value={values.password}
                                    onChange={handleInputChange}
                                    with="300px"
                                    type="password"
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

                        <div className="buttonContainer1">
                            <div >
                                <Controls.Buttons
                                    type="submit"
                                    text={t('button_gravar')}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_limpar')}
                                    color="secondary"
                                    onClick={ResetForm} />
                            </div>
                        </div>
                    </div>

                </Form>
            </div>

            <Notifications
                notify={notify}
                setNotify={setNotify}
            />

        </>
    )
}
