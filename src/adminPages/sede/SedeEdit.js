import React, { useEffect, useRef, useState } from 'react'
import "./sedeEdit.css"
import {
    PermIdentity, CalendarViewDayTwoTone, Phone,
    Email, House, Publish
} from '@mui/icons-material';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useForm } from '../../components/reusableComponents/useForm';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import Controls from '../../components/reusableComponents/Controls';
import * as statusData from "../../services/admin/StatusData";
import SedeService from '../../services/admin/Sede.services';
import Notifications from '../../components/reusableComponents/Notifications';

import { useTranslation } from "react-i18next";


const initialFValues = {
    id: 0,
    code: '',
    sede: '',
    email: '',
    contacto: '',
    endereco: '',
    cidade: '',
    pais: '',
    imageName: '',
    status: '1'
}

const SedeEdit = (props) => {

    const { t } = useTranslation();


    const getStatus = [
        { id: '1', title: t('status_actif') },
        { id: '2', title: t('status_inactive') },
        { id: '3', title: t('status_pendente') },
        { id: '4', title: t('status_apagado') }
    ]

    const location = useLocation();

    const { id, code, sede, email, contacto, endereco,
        cidade, pais, estatus, imageName,
        imageChangeFromOutSideURL } = location.state; // getting data from Edit link from UserSearchTable.js

    const { values, setValues, handleInputChange } = useForm(initialFValues)  // useForm = useForm.js

    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageFileName, setImageFileName] = useState("");

    const [codeEdit, setCode] = useState(location.state.code);
    const [sedeEdit, setSede] = useState(location.state.sede);
    const [emailEdit, setEmail] = useState(location.state.email);
    const [contactoEdit, setContacto] = useState(location.state.contacto);
    const [enderecoEdi, setEndereco] = useState(location.state.endereco);
    const [cidadeEdit, setCidade] = useState(location.state.cidade);
    const [paisEdit, setPais] = useState(location.state.pais);
    const [notificatinoShow, setNotificationShow] = useState(false);
    const navigate = useNavigate();

    const saveImageFromImageUpload = () => {
        childRef.current.imageChangeFromOutSide(imageChangeFromOutSideURL);  // saveImage() = method called
    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        getStateValuesFromUSerSearchTable();

        //values.firstname= fname;

    }, []);

    const getStateValuesFromUSerSearchTable = () => {
        try {
            setValues(location.state);
            saveImageFromImageUpload();
        } catch (err) {

        }
    }

    const edituser = () => {
        saveImageFromImageUploadEdit();
        SedeService.update(values.id, values).then(response => {
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

    const saveImageFromImageUploadEdit = () => {

        if (childRef.current.fileName !== "") {
            setImageFileName(childRef.current.fileName);
            values.photofilename = (childRef.current.fileName);
            childRef.current.saveImage();  // saveImage() = method called
        }
    }

    return (
        <div className="utilisateur">
            <div className="utilisateurTitreContainer">
                <h1 className="UtilisateurTitre">{t('sedeEdit_editarDados_text')}</h1>
            </div>

            <div className="utilisateurContainer">

                <div className="utilisateurAfficher">  {/* debut coté gauche - pour afficher les données de l'utilisateur  */}

                    <div className="utilisateurAfichageTop"> {/* pour afficher Titre et photo */}
                        <img className="utilisateurAfficherTopImg"
                            src={imageChangeFromOutSideURL}
                            alt=""
                        />
                        <div className="utilisateurAfficherTopTitre">  {/* titre du nom et fonction  */}
                            <span className="utilisateurAffichageNom">{codeEdit}</span>
                            <span className="utilisateurAffichageFonction">{sedeEdit}</span>
                        </div>
                    </div>


                    <div className="utilisateurAfficherBasPage1">

                        <span className="utilisateurAfficherTitre">{t('sedeEdit_informacaoSede_text')}</span>

                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('code')}:</strong> {codeEdit}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('sede')}:</strong> {sedeEdit}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <CalendarViewDayTwoTone className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('email')}:</strong> {emailEdit}</span>
                        </div>

                        <span className="utilisateurAfficherTitre">{t('sedeEdit_contactSede_text')}</span>

                        <div className="utilisateurInfo">
                            <Phone className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('contacto')}: </strong> {contactoEdit}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <Email className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('endereco')}:</strong> {enderecoEdi}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('cidade')}:</strong> {cidadeEdit}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>{t('pais')}: </strong> {paisEdit}</span>
                        </div>


                    </div>
                </div>

                <div className="userEdit">  {/* debut coté droit du fichier: modifier */}

                    {/* <span className="utilisateurUpdateTitre">Edit</span> */}
                    <form className="utilisateurUpdateFormulaire">

                        <div className="utilisateurUpdateCoteGauche">  {/* div reprenant les données à modifier  */}


                            <div style={{ marginTop: "-20px" }}>
                                <label className="inputLabel">{t('code')}</label>
                                <Controls.Input
                                    name="code"
                                    placeHolder={t('code')}
                                    value={values.code}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('sede')}</label>
                                <Controls.Input
                                    name="sede"
                                    placeHolder={t('sede')}
                                    value={values.sede}
                                    onChange={handleInputChange}
                                    type="text"
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
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('contacto')}</label>
                                <Controls.Input
                                    name="contacto"
                                    placeHolder={t('contacto')}
                                    value={values.contacto}
                                    onChange={handleInputChange}
                                    type="text"
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
                                />
                            </div>

                            <div>
                                <label className="inputLabel">{t('pais')}</label>
                                <Controls.Input
                                    name="pais"
                                    placeHolder={t('pais')}
                                    value={values.pais}
                                    onChange={handleInputChange}
                                    type="text"
                                />
                            </div>

                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel" htmlFor="status">{t('status')}</label>
                                <Controls.Select
                                    name="status"
                                    label="status"
                                    value={values.status}
                                    onChange={handleInputChange}
                                    options={getStatus}
                                    typeOfSelect={1}
                                    width="65%"
                                    height="40px"
                                />
                            </div>

                            <div className='userphoto'>
                                <ImageUpLoad ref={childRef}
                                    margnLeft="0px"
                                    fotoTitulo={t('foto')}
                                    uploadDisplay={true} />
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

        </div>
    )
}

export default SedeEdit;
