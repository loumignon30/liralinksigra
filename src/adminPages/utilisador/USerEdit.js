import React, { useEffect, useRef, useState } from 'react'
import "./userEdit.css"
import {
    PermIdentity, CalendarViewDayTwoTone, Phone,
    Email, House, Publish, Search
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from '../../components/reusableComponents/useForm';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import Controls from '../../components/reusableComponents/Controls';
import * as userRole from "../../services/admin/RoleData";
import * as statusData from "../../services/admin/StatusData";
import UserService from '../../services/admin/User.service';
import Notifications from '../../components/reusableComponents/Notifications';
import { useTranslation } from "react-i18next";
import Popup from '../../components/reusableComponents/Popup';
import SedeSearchTable from '../sede/SedeSearchTable';


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
    country: '',
    sedeID: 0
}

export default function Utilisateur(props) {

    const location = useLocation();
    // const { id, firstname, lastname, email, telephone, address,
    //     city, dateofbirth, gender, role, password, status, country,
    //     imageChangeFromOutSideURL } = location.state; // getting data from Edit link from UserSearchTable.js

    const [fname, setFname] = useState();

    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageFileName, setImageFileName] = useState("");
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [telephone, setTelephone] = useState();
    const [address, setaddress] = useState();
    const [role, setRole] = useState();

    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [count, setCount] = useState();
    const [popupTitle, setPpupTitle] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [notificatinoShow, setNotificationShow] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        setSede(location.state.sede);
        setSedeID(location.state.sedeID);

        setFirstname(location.state.firstname);
        setLastname(location.state.lastname);
        setEmail(location.state.email);
        setTelephone(location.state.telephone);
        setaddress(location.state.address);
        setRole(location.state.role);
        setCity(location.state.city);
        setCountry(location.state.country);
        setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);

        getStateValuesFromUSerSearchTable();

    }, []);

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}

        if ('sede')
            validationErrorM.sede = sede ? "" : " "  // This field is Required

        if ('firstname' in fieldValues)
            validationErrorM.firstname = fieldValues.firstname ? "" : " "  // This field is Required

        if ('lastname' in fieldValues)
            validationErrorM.lastname = fieldValues.lastname ? "" : " "   // This field is Required

        if ('email' in fieldValues)
            validationErrorM.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : ""

        if ('telephone' in fieldValues)
            validationErrorM.telephone = fieldValues.telephone.length > 8 ? "" : "Minimum 9 caracters"

        if ('role' in fieldValues)
            validationErrorM.role = fieldValues.role ? "" : " "  // This field is Required

        if ('gender' in fieldValues)
            validationErrorM.gender = fieldValues.gender ? "" : " "

        if ('status' in fieldValues)
            validationErrorM.status = fieldValues.status ? "" : " "

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


    //     city, dateofbirth, gender, role, password, status, country
    const saveImageFromImageUpload = () => {
        childRef.current.imageChangeFromOutSide(location.state.imageChangeFromOutSideURL);  // saveImage() = method called
    }

    const getStateValuesFromUSerSearchTable = () => {
        setValues(location.state);
        saveImageFromImageUpload();
    }

    const edituser = () => {
        if (validate()) {
            saveImageFromImageUploadEdit();
            UserService.update(values.id, values).then(response => {
                // imageReset();
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
        }
    }

    const saveImageFromImageUploadEdit = () => {

        if (childRef.current.fileName !== "") {
            setImageFileName(childRef.current.fileName);
            values.photofilename = (childRef.current.fileName);
            childRef.current.saveImage();  // saveImage() = method called
        }
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }


    return (
        <div className="utilisateur">
            <div className="utilisateurTitreContainer">
                <h3 className="UtilisateurTitre">{t('userEdit_editarDados_text')}</h3>
            </div>

            <div className="utilisateurContainer">

                <div className="utilisateurAfficher">  {/* debut coté gauche - pour afficher les données de l'utilisateur  */}

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


                    <div className="utilisateurAfficherBasPage1">

                        <span className="utilisateurAfficherTitre">{t('user_informstion')}</span>

                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{firstname}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{lastname}</span>
                        </div>
                        <span className="utilisateurAfficherTitre">{t('user_contact')}</span>

                        <div className="utilisateurInfo">
                            <Phone className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{telephone}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <Email className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{email}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{city}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{country}</span>
                        </div>
                    </div>
                </div>

                <div className="userEdit">  {/* debut coté droit du fichier: modifier */}

                    {/* <span className="utilisateurUpdateTitre">Edit</span> */}
                    <form className="utilisateurUpdateFormulaire">

                        <div className="utilisateurUpdateCoteGauche">  {/* div reprenant les données à modifier  */}

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

                            <div >
                                <label className="inputLabel">{t('nome')}</label>
                                <Controls.Input
                                    name="firstname"
                                    placeHolder={t('nome')}
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="32%"
                                    error={errors.firstname}
                                />

                                <Controls.Input
                                    name="lastname"
                                    placeHolder={t('apelido')}
                                    value={values.lastname}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="33%"
                                    error={errors.lastname}
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

                                <Controls.Input
                                    name="telephone"
                                    placeHolder={t('contacto')}
                                    value={values.telephone}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="25%"
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('endereco')}</label>
                                <Controls.Input
                                    name="address"
                                    placeHolder={t('endereco')}
                                    value={values.address}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('cidade')}</label>
                                <Controls.Input
                                    name="city"
                                    placeHolder={t('cidade')}
                                    value={values.city}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('pais')}</label>
                                <Controls.Input
                                    name="country"
                                    placeHolder={t('pais')}
                                    value={values.country}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>
                            <div style={{ paddingTop: "5px", }}>
                                <label className="userLabel" htmlFor="role">{t('nivel_accesso')}</label>
                                <Controls.Select
                                    name="role"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleInputChange}
                                    options={userRole.getRole()}
                                    className={"select-buttonLarge11"}
                                    error={errors.role}

                                />
                            </div>
                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel" htmlFor="status">{t('status')}</label>
                                <Controls.Select
                                    name="status"
                                    label="status"
                                    value={values.status}
                                    onChange={handleInputChange}
                                    options={statusData.getStatus()}
                                    typeOfSelect={2}
                                    className={"select-buttonLarge11"}
                                    // error={errors.status}
                                />
                            </div>

                            <div className='userphoto'>
                                <ImageUpLoad ref={childRef}
                                    fotoTitulo={t('foto')}
                                    uploadDisplay={true}
                                />

                            </div>

                            <div>
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_gravar')}
                                    className="button"
                                    onClick={edituser}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_pagina_anterior')}
                                    color="secondary"
                                    className="button"
                                    onClick={(e) => {
                                        navigate(-1)
                                    }}
                                />
                            </div>
                        </div>

                    </form>
                </div>

            </div>

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
                            backGroundColor="#50394c"
                            color="white"
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
            }

        </div>
    )
}
