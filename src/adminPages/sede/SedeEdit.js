import React, { useEffect, useRef, useState } from "react";
import "./sedeEdit.css";
import {
  PermIdentity,
  CalendarViewDayTwoTone,
  Phone,
  Email,
  House,
  Publish,
  AddBox,
} from "@mui/icons-material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../components/reusableComponents/useForm";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import Controls from "../../components/reusableComponents/Controls";
import * as statusData from "../../services/admin/StatusData";
import SedeService from "../../services/admin/Sede.services";
import Notifications from "../../components/reusableComponents/Notifications";
import { useTranslation } from "react-i18next";

import PaisService from "../../services/admin/Pais.service";
import Pais from "../../adminPages/paises/Pais";
import CidadeService from "../../services/admin/Cidade.service";
import Cidade from "../cidade/cidade";
import StatusDataInfo from "../../services/admin/StatusData";


import swal from "sweetalert";

const initialFValues = {
  id: 0,
  code: "",
  sedeID: "",
  sede: "",
  email: "",
  contacto: "",
  endereco: "",
  imageName: "",
  status: 1,
  paisID: "",
  cidadeID: "",
};

const SedeEdit = (props) => {
  const { t } = useTranslation(); 

  const location = useLocation();

  const {
    id,
    code,
    sede,
    email,
    contacto,
    endereco,
    cidade,
    pais,
    estatus,
    imageName,
    imageChangeFromOutSideURL,
  } = location.state; // getting data from Edit link from UserSearchTable.js

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
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

  const [openPopup, setOpenPopup] = useState(false);
  const [count, setCount] = useState(0);
  const [popupTitle, setPpupTitle] = useState("");

  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const saveImageFromImageUpload = () => {
    childRef.current.imageChangeFromOutSide(imageChangeFromOutSideURL); // saveImage() = method called
  };

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    getPaises(); //Dados dos paises
    getStateValuesFromUSerSearchTable();

    //values.firstname= fname;
  }, []);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("sede" in fieldValues)
      validationErrorM.sede = fieldValues.sede ? "" : " "; // This field is Required

    if ("endereco" in fieldValues)
      validationErrorM.endereco = fieldValues.endereco ? "" : " ";

    // if ("nomeRepresentante" in fieldValues)
    //   validationErrorM.nomeRepresentante = fieldValues.nomeRepresentante
    //     ? ""
    //     : " ";

    if ("paisID" in fieldValues)
      validationErrorM.paisID = fieldValues.paisID ? "" : " ";

    if ("cidadeID" in fieldValues)
      validationErrorM.cidadeID = fieldValues.cidadeID ? "" : " ";

    if ("contacto" in fieldValues)
      validationErrorM.contacto =
        fieldValues.contacto.length > 8 ? "" : "Minimum 9 caracters";

    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : " ";

    setErrors({
      ...validationErrorM,
    });
    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    register,
  } = useForm(initialFValues, true, validate); // useForm = useForm.js. We defined - validateOnChange=false

  const getStateValuesFromUSerSearchTable = () => {
    try {
      setValues(location.state);
      getCidade(location.state.paisID)

      saveImageFromImageUpload();
    } catch (err) {}
  };

  const editSede = () => {
    saveImageFromImageUploadEdit();

    values.status = Number(values.status);

    SedeService.update(values.id, values)
      .then((response) => {
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
  };

  const saveImageFromImageUploadEdit = () => {

    if (childRef.current.fileName !== "") {

      setImageFileName(childRef.current.fileName);
      values.imageName = childRef.current.fileName;
      childRef.current.saveImage(); // saveImage() = method called
    }
  };

  const novoPaisclickPopup = () => {
    values.paisID = "";
    values.cidadeID = "";
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const novaCidadeclickPopup = () => {
    values.cidadeID = "";
    setCount(2);
    setPpupTitle(t("Listar Cidades"));
    setOpenPopup(true);
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

  const paisHandleChange = (e) => {
    values.cidadeID = "";
    handleInputChange(e);
    getCidade(e.target.value);
  };

  return (
    <div className="utilisateur">
      <div className="utilisateurTitreContainer">
        <h1 className="UtilisateurTitre">{t("sedeEdit_editarDados_text")}</h1>
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
              <span className="utilisateurAffichageNom">{codeEdit}</span>
              <span className="utilisateurAffichageFonction">{sedeEdit}</span>
            </div>
          </div>
          <div className="utilisateurAfficherBasPage1">
            <span className="utilisateurAfficherTitre">
              {t("sedeEdit_informacaoSede_text")}
            </span>

            <div className="utilisateurInfo">
              <PermIdentity className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("code")}:</strong> {codeEdit}
              </span>
            </div>
            <div className="utilisateurInfo">
              <PermIdentity className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("sede")}:</strong> {sedeEdit}
              </span>
            </div>

            <div className="utilisateurInfo">
              <CalendarViewDayTwoTone className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("email")}:</strong> {emailEdit}
              </span>
            </div>

            <span className="utilisateurAfficherTitre">
              {t("sedeEdit_contactSede_text")}
            </span>

            <div className="utilisateurInfo">
              <Phone className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("contacto")}: </strong> {contactoEdit}
              </span>
            </div>

            <div className="utilisateurInfo">
              <Email className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("endereco")}:</strong> {enderecoEdi}
              </span>
            </div>

            <div className="utilisateurInfo">
              <House className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("cidade")}:</strong> {cidadeEdit}
              </span>
            </div>
            <div className="utilisateurInfo">
              <House className="utilisateurAfficherIcon" />{" "}
              {/* icon de material*/}
              <span className="userAfficherInfoTitre">
                <strong>{t("pais")}: </strong> {paisEdit}
              </span>
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
              <div style={{ marginTop: "-20px" }}>
                <label className="inputLabel">{t("code")}</label>
                <Controls.Input
                  name="code"
                  placeHolder={t("code")}
                  value={values.code}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div>
                <label className="inputLabel">{t("sede")}</label>
                <Controls.Input
                  name="sede"
                  placeHolder={t("sede")}
                  value={values.sede}
                  onChange={handleInputChange}
                  type="text"
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
                />
              </div>
              <div>
                <label className="inputLabel">{t("contacto")}</label>
                <Controls.Input
                  name="contacto"
                  placeHolder={t("contacto")}
                  value={values.contacto}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div>
                <label className="inputLabel">{t("endereco")}</label>
                <Controls.Input
                  name="endereco"
                  placeHolder={t("endereco")}
                  value={values.endereco}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div style={{ marginBottom: "0px", marginTop: "5px" }}>
                <label className="inputLabel">{t("pais")}</label>
                <Controls.Select
                  name="paisID"
                  label="paisID"
                  value={values.paisID}
                  onChange={paisHandleChange}
                  options={paisesTable}
                  typeOfSelect={6}
                  error={errors.pais} 
                  width="63%"
                  height="40px"
                />
                <AddBox
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={novoPaisclickPopup}
                />
              </div>
              <div style={{ marginTop: "3px", marginBottom: "20px" }}>
                <label className="inputLabel">{t("cidade")}</label>

                <Controls.Select
                  name="cidadeID"
                  label="cidadeID"
                  value={values.cidadeID}
                  onChange={handleInputChange}
                  options={cidadeTable}
                  typeOfSelect={7}
                  error={errors.cidadeID}
                  width="63%"
                  height="40px"
                />
                <AddBox
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={novaCidadeclickPopup}
                />
              </div>
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
                />
              </div>
              <div className="userphoto">
                <ImageUpLoad
                  ref={childRef}
                  margnLeft="0px"
                  fotoTitulo={t("foto")}
                  uploadDisplay={true}
                />
              </div>
              <div>
                <Controls.Buttons
                  type="button"
                  text={t("button_gravar")}
                  className="button"
                  onClick={editSede}
                />
                <Controls.Buttons
                  type="button"
                  text={t("button_pagina_anterior")}
                  color="secondary"
                  className="button"
                  onClick={(e) => {
                    navigate(-1);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}
    </div>
  );
};

export default SedeEdit;
