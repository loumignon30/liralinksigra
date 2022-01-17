import React, { useEffect, useRef, useState } from 'react'
import "./userEdit.css"
import {
    PermIdentity, CalendarViewDayTwoTone, Phone,
    Email, House, Publish
} from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom"
import { useForm } from '../../components/reusableComponents/useForm';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import Controls from '../../components/reusableComponents/Controls';
import * as userRole from "../../services/admin/RoleData";
import * as statusData from "../../services/admin/StatusData";
import UserService from '../../services/admin/User.service';
import Notifications from '../../components/reusableComponents/Notifications';


const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    dateofbirth: '',
    gender: 'male',
    role: '',
    password: '',
    photofilename: '',
    status: 'Active',
    country: '',
}

export default function Utilisateur(props) {

    const location = useLocation();
    // const { id, firstname, lastname, email, telephone, address,
    //     city, dateofbirth, gender, role, password, status, country,
    //     imageChangeFromOutSideURL } = location.state; // getting data from Edit link from UserSearchTable.js

    const [fname, setFname] = useState();
    const { values, setValues, handleInputChange } = useForm(initialFValues)  // useForm = useForm.js

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

    //     city, dateofbirth, gender, role, password, status, country
    const saveImageFromImageUpload = () => {
        childRef.current.imageChangeFromOutSide(location.state.imageChangeFromOutSideURL);  // saveImage() = method called
    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        getStateValuesFromUSerSearchTable();

        setFirstname(location.state.firstname);
        setLastname(location.state.lastname);
        setEmail(location.state.email);
        setTelephone(location.state.telephone);
        setaddress(location.state.address);
        setRole(location.state.role);
        setCity(location.state.city);
        setCountry(location.state.country);
        setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);

    }, []);

    const getStateValuesFromUSerSearchTable = () => {
        setValues(location.state);
        saveImageFromImageUpload();
    }

    const edituser = () => {

        saveImageFromImageUploadEdit();
        UserService.update(values.id, values).then(response => {
            // imageReset();
            setNotify({
                isOpen: true,
                message: 'USer was Edited succefully',
                type: 'success'
            })
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
                <h1 className="UtilisateurTitre">Edit User Information</h1>
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

                        <span className="utilisateurAfficherTitre">User Information</span>

                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{firstname}</span>
                        </div>
                        <div className="utilisateurInfo">
                            <PermIdentity className="utilisateurAfficherIcon" />  {/* icon de material*/}
                            <span className="userAfficherInfoTitre">{lastname}</span>
                        </div>
                        <span className="utilisateurAfficherTitre">User Contacts</span>

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


                            <div style={{ marginTop: "-20px" }}>
                                <label className="inputLabel">First Name</label>
                                <Controls.Input
                                    name="firstname"
                                    placeHolder="First Name"
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Last Name</label>
                                <Controls.Input
                                    name="lastname"
                                    placeHolder="Last Name"
                                    value={values.lastname}
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
                                <label className="inputLabel">Telephone</label>
                                <Controls.Input
                                    name="telephone"
                                    placeHolder="Telephone"
                                    value={values.telephone}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Address</label>
                                <Controls.Input
                                    name="address"
                                    placeHolder="Address"
                                    value={values.address}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">City</label>
                                <Controls.Input
                                    name="city"
                                    placeHolder="City"
                                    value={values.city}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge'}
                                />
                            </div>

                            <div>
                                <label className="inputLabel">Country</label>
                                <Controls.Input
                                    name="country"
                                    placeHolder="Country"
                                    value={values.country}
                                    onChange={handleInputChange}
                                    type="text"
                                    className={'textField-TextLarge-2'}
                                />
                            </div>
                            <div style={{ paddingTop: "5px", }}>
                                <label className="userLabel" htmlFor="role">Role</label>
                                <Controls.Select
                                    name="role"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleInputChange}
                                    options={userRole.getRole()}
                                    className={"select-buttonLarge2"}
                                />
                            </div>
                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel" htmlFor="status">Status</label>
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
                                <ImageUpLoad ref={childRef} />
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

            <Notifications
                notify={notify}
                setNotify={setNotify}
            />

        </div>
    )
}
