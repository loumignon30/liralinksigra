import React, { useEffect, useRef, useState } from 'react'
import "./sedeEdit.css"
import {
    PermIdentity, CalendarViewDayTwoTone, Phone,
    Email, House, Publish
} from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom"
import { useForm } from '../../components/reusableComponents/useForm';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import Controls from '../../components/reusableComponents/Controls';
import * as statusData from "../../services/admin/StatusData";
import SedeService from '../../services/admin/Sede.services';
import Notifications from '../../components/reusableComponents/Notifications';

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
    status: 'Active'
}

const AgenciaEdit = (props) =>{
  

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


    const saveImageFromImageUpload = () => {
        childRef.current.imageChangeFromOutSide(imageChangeFromOutSideURL);  // saveImage() = method called
    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        getStateValuesFromUSerSearchTable();

        //values.firstname= fname;

    }, []);

    const getStateValuesFromUSerSearchTable = () => {
        try{
            setValues(location.state);
            saveImageFromImageUpload();
        }catch(err) {

        }
        
    }

    const edituser = () => {

        saveImageFromImageUploadEdit();
        SedeService.update(values.id, values).then(response => {
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
                <h1 className="UtilisateurTitre">Editar a Sede</h1>
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

                        <span className="utilisateurAfficherTitre">Informação da Sede</span>

                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Código:</strong> {codeEdit}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Sede:</strong> {sedeEdit}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <CalendarViewDayTwoTone className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Email:</strong> {emailEdit}</span>
                        </div>

                        <span className="utilisateurAfficherTitre">Contactos</span>

                        <div className="utilisateurInfo">
                            <Phone className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Contacto: </strong> {contactoEdit}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <Email className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Endereço:</strong> {enderecoEdi}</span>
                        </div>

                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>Cidade:</strong> {cidadeEdit}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <House className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre"><strong>País: </strong> {paisEdit}</span>
                        </div>


                    </div>
                </div>

                <div className="userEdit">  {/* debut coté droit du fichier: modifier */}

                    {/* <span className="utilisateurUpdateTitre">Edit</span> */}
                    <form className="utilisateurUpdateFormulaire">

                        <div className="utilisateurUpdateCoteGauche">  {/* div reprenant les données à modifier  */}


                            <div style={{ marginTop: "-20px" }}>
                                <label className="inputLabel">Código</label>
                                <Controls.Input
                                    name="code"
                                    placeHolder="Código da Sede"
                                    value={values.code}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Nome da Sede</label>
                                <Controls.Input
                                    name="sede"
                                    placeHolder="Nome da Sede"
                                    value={values.sede}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Email</label>
                                <Controls.Input
                                    name="email"
                                    placeHolder="Email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Contacto</label>
                                <Controls.Input
                                    name="contacto"
                                    placeHolder="contacto"
                                    value={values.contacto}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
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
                                    className={'textField-TextLarge'}
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
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">País</label>
                                <Controls.Input
                                    name="pais"
                                    placeHolder="País"
                                    value={values.pais}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge-2'}
                                />
                            </div>
                            
                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel" htmlFor="status">Estato</label>
                                <Controls.Select
                                    name="status"
                                    label="status"
                                    value={values.status}
                                    onChange={handleInputChange}
                                    options={statusData.getStatus()}
                                    className={"select-buttonLarge2"}
                                    typeOfSelect={2}
                                />
                            </div>

                            <div className='userphoto'>
                                <ImageUpLoad ref={childRef} 
                                margnLeft="0px"
                                fotoTitulo="Logo"
                                uploadDisplay={true}
                                />
                            </div>

                            <div>
                                <Controls.Buttons
                                    type="button"
                                    text="Submit"
                                    className="button"
                                    onClick={edituser}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text="Reset"
                                    color="secondary"
                                    className="button"
                                />
                            </div>
                        </div>

                    </form>
                </div>

            </div>

            {
                notificatinoShow ?
                    <Notifications
                        notify={notify}
                        setNotify={setNotify}
                    />
                    : null
            }

        </div>
    )
}

export default AgenciaEdit;
