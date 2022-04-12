import React, { useContext, useEffect, useRef, useState } from "react";
import "./userEdit.css";
import {
  PermIdentity,
  CalendarViewDayTwoTone,
  Phone,
  Email,
  House,
  Publish,
  Search,
  AddBox,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../components/reusableComponents/useForm";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import Controls from "../../components/reusableComponents/Controls";
import * as userRole from "../../services/admin/RoleData";
import * as statusData from "../../services/admin/StatusData";
import UserService from "../../services/admin/User.service";
import Notifications from "../../components/reusableComponents/Notifications";
import { useTranslation } from "react-i18next";
import Popup from "../../components/reusableComponents/Popup";
import SedeSearchTable from "../sede/SedeSearchTable";
import { UserLoggedContext } from "./UserLoggedContext";
import semfoto from "../../assets/images/semfoto.png";
import StatusDataInfo from "../../services/admin/StatusData";
import RoleData from "../../services/admin/RoleData";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";

const initialFValues = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  telephone: "",
  address: "",
  cidadeID: "",
  paisID: "",
  gender: "",
  role: "",
  // photofilename: '',
  status: 1,
  sedeID: 0,
};

export default function Utilisateur(props) {
  const location = useLocation();
  // const { id, firstname, lastname, email, telephone, address,
  //     city, dateofbirth, gender, role, password, status, country,
  //     imageChangeFromOutSideURL } = location.state; // getting data from Edit link from UserSearchTable.js

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [imageFileName, setImageFileName] = useState("");
  const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();

  const [firstnameV, setFirstnameV] = useState("");
  const [lastnameV, setLastnameV] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setaddress] = useState("");
  const [role, setRole] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState(0);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [popupTitle, setPpupTitle] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [notificatinoShow, setNotificationShow] = useState(false);

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
  const [roleInfo, setRoleInfo] = useState(RoleData());

  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  // const getStatus = [
  //     { id: '1', title: t('status_actif') },
  //     { id: '2', title: t('status_inactive') },
  //     { id: '3', title: t('status_pendente') },
  //     { id: '4', title: t('status_apagado') }
  // ]

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    getPaises(); //Dados dos paises

    if (props.topbar === "topbar") {
      userDataFromContext();
    } else {
      setValues(location.state);
      setSede(location.state.sede);
      setSedeID(location.state.sedeID);

      setFirstnameV(location.state.firstname);
      setLastnameV(location.state.lastname);
      setEmail(location.state.email);
      setTelephone(location.state.telephone);
      setaddress(location.state.address);
      // setRole(location.state.role);
      setCity(location.state.cidade);
      setCountry(location.state.pais);
      setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);

      getCidade(location.state.paisID)

      getStateValuesFromUSerSearchTable(
        location.state.imageChangeFromOutSideURL
      );

      roleInfo.map((info) => {
        if (Number(info.id) === Number(location.state.role)) {
          setRole(info.title);
        }
      });
    }
  }, []);

  const userDataFromContext = () => {
    userSavedValue.map((item) => {
      setFirstnameV(item.firstname);
      setLastnameV(item.lastname);
      setSede(item.sede);
      setSedeID(item.sedeID);
      setEmail(item.email);
      setTelephone(item.contacto);
      setCity(item.cidade);
      setCountry(item.pais);
      values.sedeID = item.sedeID;
      values.id = item.id;
      values.firstname = item.firstname;
      values.lastname = item.lastname;
      values.gender = item.sexo;
      values.email = item.email;
      values.telephone = item.contacto;
      values.address = item.endereco;
      values.status = item.status;
      values.city = item.cidade;
      values.country = item.pais;
      values.role = item.nivelAcesso;
      values.photofilename = item.photofilename;
      setImageChangeFromOutSideURL(
        "https://s3.amazonaws.com/liralink.sigra/" + item.photofilename
      );
      getStateValuesFromUSerSearchTable(
        "https://s3.amazonaws.com/liralink.sigra/" + item.photofilename
      );

      //  setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename),
      // childRef.current.imageChangeFromOutSide("https://s3.amazonaws.com/liralink.sigra/" + item.photofilename),
      roleInfo.map((info) => {
        if (Number(info.id) === Number(item.nivelAcesso)) {
          setRole(info.title);
        }
      });
    });
  };
  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};

    if ("sede") validationErrorM.sede = sede ? "" : " "; // This field is Required

    if ("firstname" in fieldValues)
      validationErrorM.firstname = fieldValues.firstname ? "" : " "; // This field is Required

    if ("lastname" in fieldValues)
      validationErrorM.lastname = fieldValues.lastname ? "" : " "; // This field is Required

    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : "";

    if ("telephone" in fieldValues)
      validationErrorM.telephone =
        fieldValues.telephone.length > 8 ? "" : "Minimum 9 caracters";

    if ("role" in fieldValues)
      validationErrorM.role = fieldValues.role ? "" : " "; // This field is Required

    if ("gender" in fieldValues)
      validationErrorM.gender = fieldValues.gender ? "" : " ";

    if ("status" in fieldValues)
      validationErrorM.status = fieldValues.status ? "" : " ";

    // if ('password' in fieldValues)
    //     validationErrorM.password = fieldValues.password.length > 3 ? "" : "Minimum 3 caracters"

    setErrors({
      ...validationErrorM,
    });

    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  ); // useForm = useForm.js. We defined - validateOnChange=false

  //     city, dateofbirth, gender, role, password, status, country
  const saveImageFromImageUpload = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const getStateValuesFromUSerSearchTable = (image) => {
    saveImageFromImageUpload(image);
  };

  const sendImageFromImageUpload = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const edituserData = (e) => {
    e.preventDefault();

    if (validate()) {
      if (childRef.current.imageSelected) {
        // save image only if selected
        childRef.current.getFuncionarioCode(values.firstname, "code"); // saveImage() = method called
        saveImageFromImageUpload();
      } else {
        if (values.id === 0) {
          sendImageFromImageUpload(semfoto); // enviar a imagem de sem foto
          childRef.current.getFuncionarioCode(values.firstname, "code"); // saveImage() = method called
          saveImageFromImageUpload();
        }
      }

      saveImageFromImageUploadEdit();
      UserService.update(values.id, values)
        .then((response) => {
          // imageReset();
          setNotify({
            isOpen: true,
            message: t("mensagem_modificar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const saveImageFromImageUploadEdit = () => {
    if (childRef.current.fileName !== "") {
      setImageFileName(childRef.current.fileName);
      values.photofilename = childRef.current.fileName;
      childRef.current.saveImage(); // saveImage() = method called
    }
  };

  const onclicSedePopup = () => {
    if (props.topbar !== "topbar") {
      setCount(1);
      setPpupTitle(t("lista_sede"));
      setOpenPopup(true);
    }
  };

  const close = () => {
    // navigate('/Home');
    setOpenPopup(false);
    props.closeUSer();
  };

  const getPaises = () => {
    PaisService.getAll()
      .then((response) => {
        setPaisesTable(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const paisHandleChange = (e) => {
    values.cidadeID = "";
    handleInputChange(e);
    getCidade(e.target.value);
  };

  const getCidade = (paisID) => {
    values.cidadeID = "";
    CidadeService.getAll(1, paisID)
      .then((response) => {
        setCidadeTable(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const novoPaisclickPopup = () => {
    values.paisID = "";
    values.cidadeID = "";
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const novaCidadeclickPopup = () => {
    values.paisID = "";
    values.cidadeID = "";
    setCount(2);
    setPpupTitle(t("Listar Cidades"));
    setOpenPopup(true);
  };

  return (
    <div className="utilisateur">
      <div className="utilisateurTitreContainer">
        <h3 className="UtilisateurTitre">{t("userEdit_editarDados_text")}</h3>
      </div>

      <div className="utilisateurContainer">
        <div className="utilisateurAfficher">
          {" "}
          {/* debut coté gauche - pour afficher les données de l'utilisateur  */}
          <div className="utilisateurAfichageTop">
            {" "}
            {/* pour afficher Titre et photo */}
            <img
              className="utilisateurAfficherTopImg"
              src={imageChangeFromOutSideURL}
              alt=""
            />
            <div className="utilisateurAfficherTopTitre">
              {" "}
              {/* titre du nom et fonction  */}
              <span className="utilisateurAffichageNom">
                {firstnameV + " " + lastnameV}
              </span>
              <span className="utilisateurAffichageFonction">{role}</span>
            </div>
          </div>
          <div className="utilisateurAfficherBasPage1">
            <span className="utilisateurAfficherTitre">
              {t("user_informstion")}
            </span>

            <div className="utilisateurInfo">
              <PermIdentity className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{firstnameV}</span>
            </div>
            <div className="utilisateurInfo">
              <PermIdentity className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{lastnameV}</span>
            </div>
            <span className="utilisateurAfficherTitre">
              {t("user_contact")}
            </span>

            <div className="utilisateurInfo">
              <Phone className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{telephone}</span>
            </div>

            <div className="utilisateurInfo">
              <Email className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{email}</span>
            </div>

            <div className="utilisateurInfo">
              <House className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{city}</span>
            </div>
            <div className="utilisateurInfo">
              <House className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">{country}</span>
            </div>
          </div>
        </div>

        <div className="userEdit">
          {" "}
          {/* debut coté droit du fichier: modifier */}
          {/* <span className="utilisateurUpdateTitre">Edit</span> */}
          <form className="utilisateurUpdateFormulaire">
            <div className="utilisateurUpdateCoteGauche">
              {" "}
              {/* div reprenant les données à modifier  */}
              <div>
                <label className="inputLabel">{t("sede")}</label>
                <Controls.Input
                  name={t("sede")}
                  placeHolder={t("sede")}
                  value={sede}
                  onChange={handleInputChange}
                  type="text"
                  width="65%"
                  // error={errors.sede}
                />
                <Search
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={onclicSedePopup}
                />
              </div>
              <div>
                <label className="inputLabel">{t("nome")}</label>
                <Controls.Input
                  name="firstname"
                  placeHolder={t("nome")}
                  value={values.firstname}
                  onChange={handleInputChange}
                  type="text"
                  width="32%"
                  //error={errors.firstname}
                />

                <Controls.Input
                  name="lastname"
                  placeHolder={t("apelido")}
                  value={values.lastname}
                  onChange={handleInputChange}
                  type="text"
                  width="33%"
                  // error={errors.lastname}
                />
              </div>
              <div>
                <label className="inputLabel">{t("email")}</label>
                <Controls.Input
                  name="email"
                  placeHolder={t("email")}
                  value={values.email}
                  onChange={handleInputChange}
                  type="text"
                  width="40%"
                  //error={errors.email}
                />

                <Controls.Input
                  name="telephone"
                  placeHolder={t("contacto")}
                  value={values.telephone}
                  onChange={handleInputChange}
                  type="text"
                  width="25%"
                  //error={errors.telephone}
                />
              </div>
              <div>
                <label className="inputLabel">{t("endereco")}</label>
                <Controls.Input
                  name="address"
                  placeHolder={t("endereco")}
                  value={values.address}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div style={{ marginTop: "5px" }}>
                <label className="inputLabel">{t("pais")}</label>
                <Controls.Select
                  name="paisID"
                  label="paisID"
                  value={values.paisID}
                  onChange={paisHandleChange}
                  options={paisesTable}
                  typeOfSelect={6}
                  error={errors.paisID}
                  width="65%"
                  height="40px"
                />
                <AddBox
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={novoPaisclickPopup}
                />
              </div>
              <div style={{ marginTop: "3px", marginBottom: "2px" }}>
                <label className="inputLabel">{t("cidade")}</label>

                <Controls.Select
                  name="cidadeID"
                  label="cidadeID"
                  value={values.cidadeID}
                  onChange={handleInputChange}
                  options={cidadeTable}
                  typeOfSelect={7}
                  error={errors.cidadeID}
                  width="65%"
                  height="40px"
                />
                <AddBox
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={novaCidadeclickPopup}
                />
              </div>
              {/* <div>
                                <label className="inputLabel">{t('cidade')}</label>
                                <Controls.Input
                                    name="city"
                                    placeHolder={t('cidade')}
                                    value={values.city}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="40%"
                                />

                                <Controls.Input
                                    name="country"
                                    placeHolder={t('pais')}
                                    value={values.country}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="25%"

                                />
                            </div> */}
              {props.topbar !== "topbar" ? (
                <div style={{ paddingTop: "5px" }}>
                  <label className="userLabel" htmlFor="role">
                    {t("nivel_accesso")}
                  </label>
                  <Controls.Select
                    name="role"
                    label="Role"
                    value={values.role}
                    onChange={handleInputChange}
                    options={roleInfo}
                    typeOfSelect={1}
                    width="65%"
                    height="40px"
                    // error={errors.role}
                  />
                </div>
              ) : null}
              {props.topbar !== "topbar" ? (
                <div style={{ marginTop: "5px" }}>
                  <label className="userLabel" htmlFor="status">
                    {t("status")}
                  </label>
                  <Controls.Select
                    name="status"
                    label="status"
                    value={values.status}
                    onChange={handleInputChange}
                    options={StatusDataInfo()}
                    typeOfSelect={1}
                    width="65%"
                    height="40px"
                    // error={errors.status}
                  />
                </div>
              ) : null}
              <div className="userphoto">
                <ImageUpLoad
                  ref={childRef}
                  fotoTitulo={t("foto")}
                  uploadDisplay={true}
                />
              </div>
              <div>
                <Controls.Buttons
                  type="submit"
                  text={t("button_modificar")}
                  className="button"
                  onClick={edituserData}
                />
                {props.topbar !== "topbar" ? (
                  <Controls.Buttons
                    type="button"
                    text={t("button_pagina_anterior")}
                    color="secondary"
                    className="button"
                    onClick={() => {
                      setUserSavedValue((prevState) => {
                        prevState[0].sedeID_pesquisas = sedeID;
                        prevState[0].sede_pesquisa = sede;
                        prevState[0].provenienciaFormulario = "EditUser";
                        return [...prevState];
                      });

                      navigate(-1);
                    }}
                  />
                ) : (
                  <Controls.Buttons
                    type="button"
                    text={t("sair")}
                    color="secondary"
                    className="button"
                    onClick={close}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      {count === 1 ? (
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
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
            }}
          />
        </Popup>
      ) : null}

      {}
    </div>
  );
}
