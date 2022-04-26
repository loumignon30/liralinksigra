import "./denuncia.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { House, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import TipoDenunciaSearchTable from "../denuncias/TipoDenunciaSearchTable";

import SedeSearchTable from "../sede/SedeSearchTable";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import TipoDenunciaServices from "../../services/admin/TipoDenuncia.services";
import RatingServices from "../../services/admin/RatingServices";
import RatingMotivo from "../../services/admin/RatingMotivo.service";

import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { Rating, SvgIcon } from "@mui/material";

// import * as languages from "../../services/admin/Languages";

import Popup from "../../components/reusableComponents/Popup";
import RatingSearchTable from "../rating/RatingSearchTable";
import RatingMotivoSearchTable from "../rating/RatingMotivoSearchTable";

import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";

const TipoDeDeNuncia = (props) => {
  const { t } = useTranslation();

  const initialFValues = {
    id: 0,
    tipoDenuncia: "",
    sedeID: 0,
    status: "1",
    lingua: "",
    abreviationLangue: "",
    rating: 0,
    descricao: "",
    descricao1: "",
    motivo: "",
    ratingID: "",
  };

  const linguasList = [
    { id: t("pt"), title: t("Português") },
    { id: t("fr"), title: t("Français") },
    { id: t("en"), title: t("English") },
    { id: t("ar"), title: t("عربى") },
  ];

  const getclassificacao = [
    { id: 1, title: t("mau") },
    { id: 2, title: t("menos") },
    { id: 3, title: t("bom") },
    { id: 4, title: t("muito bom") },
  ];
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  // notification with SnackBar
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [savedData, setSavedData] = useState(0);
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRef2 = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [notificatinoShow, setNotificationShow] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [idSede, setIDSede] = useState(0);
  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState("");
  const [Ratingdata, setRatingData] = useState([]);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [popupTitle, setPpupTitle] = useState("");
  const [count, setCount] = useState(0);
  const [backGroundColor, setBackGroundColor] = useState("");
  const [color, setColor] = useState("");
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [ratingIDMotivoLocal, setRatingIDMotivoLocal] = useState(0);
  //const currentLanguage = languages.find(l => l.code === currentLanguageCode);

  const [rating, setRating] = useState(0); // initial rating value

  useEffect(() => {
    //values.lingua = currentLanguage["country_code"]

    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen();
    //tableTipoDenunciaUpdateData(currentLanguageCode, sedeID);
    // alert(currentLanguage["country_code"])

    codigoLinguaPesquisa();
  }, [currentLanguageCode]);

  const codigoLinguaPesquisa = () => {
    //let currentCode = currentLanguage["country_code"];

    linguasList.map((info) => {
      if (currentLanguageCode === info.id) {
        values.lingua = info.title;
        values.abreviationLangue = currentLanguageCode;
      }
    });
  };

  const updateValuesOnOpen = () => {
    userSavedValue.map((item) => {
      values.sedeID = item.sedeID;
      setSede(item.sede);
      setSedeID(item.sedeID);
    });
  };

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};

    if ("sede") validationErrorM.sede = sede ? "" : " "; // This field is Required

    if ("lingua" in fieldValues)
      validationErrorM.lingua = fieldValues.lingua ? "" : " ";

    if ("descricao" in fieldValues)
      validationErrorM.descricao = fieldValues.descricao ? "" : " ";
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

  const ResetForm = () => {
    //setValues(initialFValues);
    setNotificationShow(false);
    values.tipoDenuncia = "";
  };

  const gavarTipoDenuncia = () => {
    linguasList.map((info) => {
      if (values.lingua === info.title) {
        values.abreviationLangue = info.id;
      }
    });

    if (values.id > 0) {
      TipoDenunciaServices.update(values.id, values)
        .then((response) => {
          //tableTipoDenunciaUpdateData(currentLanguageCode)
          setNotify({
            isOpen: true,
            message: t("mensagem_modificar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
          values.motivo = "";
          values.descricao = "";
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      TipoDenunciaServices.create(values)
        .then((response) => {
          //tableTipoDenunciaUpdateData(currentLanguageCode)
          setNotify({
            isOpen: true,
            message: t("mensagem_Gravar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
          values.motivo = "";
          values.descricao = "";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const gavarRating = () => {
    if (validate()) {
      if (values.id > 0) {
        RatingServices.update(values.id, values)
          .then((response) => {
            // tableTipoDenunciaUpdateData(currentLanguageCode)
            setNotify({
              isOpen: true,
              message: t("mensagem_modificar_Nova_Agencia"),
              type: "success",
            });
            setNotificationShow(true);
            ratingTable(sedeID, rating);
            values.motivo = "";
            values.descricao = "";
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        RatingServices.create(values)
          .then((response) => {
            //  tableTipoDenunciaUpdateData(currentLanguageCode)
            setNotify({
              isOpen: true,
              message: t("mensagem_Gravar_Nova_Agencia"),
              type: "success",
            });
            setNotificationShow(true);
            ratingTable(sedeID, rating);
            values.motivo = "";
            values.descricao = "";
            ratingDescricaoGet(values.sedeID, rating);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };
  const gavarMotivoRating = () => {
    if (values.id > 0) {
      RatingMotivo.update(values.id, values)
        .then((response) => {
          // tableTipoDenunciaUpdateData(currentLanguageCode)
          setNotify({
            isOpen: true,
            message: t("mensagem_modificar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
          ratingTable(sedeID, rating);
          values.motivo = "";
          ratingMotivoTable(values.sedeID, ratingIDMotivoLocal);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RatingMotivo.create(values)
        .then((response) => {
          //  tableTipoDenunciaUpdateData(currentLanguageCode)
          setNotify({
            isOpen: true,
            message: t("mensagem_Gravar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
          // ratingTable(sedeID, rating);
          values.motivo = "";

          ratingMotivoTable(values.sedeID, ratingIDMotivoLocal);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      gavarTipoDenuncia(); // call save university
      ResetForm();
      //tableTipoDenunciaUpdateData(currentLanguageCode, sedeID);
      // close();
    }
  };

  const close = () => {
    navigate("/Home");
    setOpenPopup(false);
    props.yearGetData();
  };

  const onclicSedePopup = () => {
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const ratingTable = (sedeID1, rating1) => {
    childRef.current.getGetAllData(sedeID1, rating1); // saveImage() = method called
  };
  const ratingMotivoTable = (sedeID1, rating1) => {
    childRef2.current.getGetAllData(sedeID1, rating1); // saveImage() = method called
  };

  const ratingDescricaoGet = (sedeID, rating1) => {
    RatingServices.getAll(sedeID, rating1).then((response) => {
      ratingTable(sedeID, rating1);
      setRatingData(response.data);
    });
  };

  const ratingAvaliacaoDescricaoChange = (e) => {
    let ratingIDLocal = e.target.value;
    handleInputChange(e);
    setRatingIDMotivoLocal(ratingIDLocal);
    ratingMotivoTable(values.sedeID, ratingIDLocal);
  };

  const ItemMainTitlo = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    marginBottom: "-20px",
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ItemMainTitlo>
              <PageHeader
                title={t("header_title_tipo_denuncia_gravar")}
                subTitle={t("header_subTitle_tipo_denuncia_gravar")}
                backGroundColor="#f0efeb"
                color="black"
                icon={<House />}
              ></PageHeader>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "5vh",
                  maxHeight: "5vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div style={{ marginTop: "0px", fontWeight: 600 }}>
                  <span>DADOS DA SEDE</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "8vh",
                  maxHeight: "8vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <label className="inputLabel">{t("sede")}</label>
                  <Controls.Input
                    name="sede"
                    placeHolder={t("sede")}
                    value={sede}
                    onChange={handleInputChange}
                    type="text"
                    error={errors.sede}
                  />
                  <Search
                    style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclicSedePopup}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "5vh",
                  maxHeight: "5vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div style={{ marginTop: "0px", fontWeight: 600 }}>
                  <span>AVALIAÇÃO</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "14vh",
                  maxHeight: "14vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div>
                  <label className="userLabel">{t("rating")}</label>

                  <Rating
                    style={{ width: "70%", marginTop: "4px" }}
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        values.ratingID = "";
                        values.rating = 0;
                        values.motivo = "";
                        values.descricao = "";
                        setRating(0);
                        ratingDescricaoGet(values.sedeID, 0);
                        ratingMotivoTable(values.sedeID, 0);
                      } else {
                        setRating(newValue);
                        values.ratingID = "";
                        values.rating = newValue;
                        values.motivo = "";
                        values.descricao = "";
                        ratingDescricaoGet(values.sedeID, newValue);
                        ratingMotivoTable(values.sedeID, 0);

                      }
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label className="inputLabel">{t("descrição")}</label>
                  <Controls.Input
                    name="descricao"
                    placeHolder={t("descricao")}
                    value={values.descricao}
                    onChange={handleInputChange}
                    type="text"
                    width="70%"
                    error={errors.descricao}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "7vh",
                  maxHeight: "7vh",
                //   overflowY: "auto",
                //   overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                //   backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div>
                  <div >
                    <Controls.Buttons
                      type="button"
                      text={t("button_gravar")}
                      //  className="button"
                      size="small"
                      width="40%"
                      onClick={gavarRating}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "45.5vh",
                  maxHeight: "45.4vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div>
                  <RatingSearchTable
                    ref={childRef}
                    idDisplay={false}
                    descricaoDisplay={true}
                    actionsButtonDisplaySelect={false} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={true}
                    pageSize={3}
                    rowPerPage={3}
                  />
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "5vh",
                  maxHeight: "5vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div style={{ marginTop: "0px", fontWeight: 600 }}>
                  <span>MOTIVO DA AVALIAÇÃO</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "14vh",
                  maxHeight: "14vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div style={{ margin: "5px" }}>
                  <div>
                    <label
                      className="userLabel"
                      style={{ marginTop: "0px" }}
                      htmlFor="classificacao"
                    >
                      {t("Descrição")}
                    </label>
                    <Controls.Select
                      name="ratingID"
                      label="ratingID"
                      value={values.ratingID}
                      onChange={ratingAvaliacaoDescricaoChange}
                      options={Ratingdata}
                      typeOfSelect={3}
                      //error={errors.role}
                      width="65%"
                      height="40px"
                    />
                  </div>

                  <div>
                    <label style={{ marginTop: "-7px" }} className="inputLabel">
                      {t("motivo_avaliacao")}
                    </label>
                    <Controls.Input
                      name="motivo"
                      placeHolder={t("motivo")}
                      value={values.motivo}
                      onChange={handleInputChange}
                      type="text"
                      // error={errors.tipoDenuncia}
                    />
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "7vh",
                  maxHeight: "7vh",
                  //   overflowY: "auto",
                  //   overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div>
                  <Controls.Buttons
                    type="button"
                    text={t("button_gravar")}
                    //  className="button"
                    size="small"
                    width="40%"
                    onClick={gavarMotivoRating}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "60.5vh",
                  maxHeight: "60.5vh",
                  //   overflowY: "auto",
                  //   overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div>
                  <RatingMotivoSearchTable
                    ref={childRef2}
                    idDisplay={false}
                    motivoDisplay={true}
                    actionsButtonDisplaySelect={false} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={true}
                    pageSize={3}
                    rowPerPage={3}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/*
        <div className="universityContainer">
            <PageHeader
                title={t('header_title_tipo_denuncia_gravar')}
                subTitle={t('header_subTitle_tipo_denuncia_gravar')}
                backGroundColor="darkBlue"
                color="white"
                icon={<House />}>
            </PageHeader>



            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="unversityItemContainer">

                    <div className="newUniversity">

                        <div style={{ marginBottom: "5px" }}>
                            <label className="inputLabel">{t('sede')}</label>
                            <Controls.Input
                                name="sede"
                                placeHolder={t('sede')}
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.sede}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclicSedePopup}
                            />
                        </div>
                        
                        <div>
                            <label className="userLabel">{t('rating')}</label>

                            <Rating style={{ width: "200px", marginTop: "4px" }}
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    
                                    if (newValue === null) {
                                        values.ratingID = "";
                                        values.rating = 0;
                                        values.motivo = "";
                                        values.descricao = "";
                                        setRating(0);
                                        ratingDescricaoGet(values.sedeID, 0);
                                        ratingMotivoTable(values.sedeID, 0);
                                    } else {
                                        setRating(newValue);
                                        values.ratingID = "";
                                        values.rating = newValue;
                                        values.motivo = "";
                                        values.descricao = "";
                                        ratingDescricaoGet(values.sedeID, newValue)
                                    }
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label className="inputLabel">{t('descrição')}</label>
                            <Controls.Input
                                name="descricao"
                                placeHolder={t('descricao')}
                                value={values.descricao}
                                onChange={handleInputChange}
                                type="text"
                                error={errors.descricao}
                            />
                        </div>

                        <div style={{ marginLeft: "70%" }}>
                            <Controls.Buttons
                                type="button"
                                text={t('button_gravar')}
                                //  className="button"
                                size="small"
                                onClick={gavarRating}
                            />
                        </div>

                        <div>
                            <RatingSearchTable ref={childRef}
                                idDisplay={false}
                                descricaoDisplay={true}
                                actionsButtonDisplaySelect={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                pageSize={3}
                                rowPerPage={3}
                            />
                        </div>


                    </div>
                    <div className="newUniversity">

                        <div style={{ marginTop: "-5px" }}>
                            <label className="userLabel" style={{ marginTop: "-5px", }}
                                htmlFor="classificacao">{t('descricao_avaliacao')}</label>
                            <Controls.Select
                                name="ratingID"
                                label="ratingID"
                                value={values.ratingID}
                                onChange={ratingAvaliacaoDescricaoChange}
                                options={Ratingdata}
                                typeOfSelect={3}
                                //error={errors.role}
                                width="65%"
                                height="40px"
                            />
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <label className="inputLabel">{t('motivo_avaliacao')}</label>
                            <Controls.Input
                                name="motivo"
                                placeHolder={t('motivo')}
                                value={values.motivo}
                                onChange={handleInputChange}
                                type="text"
                            // error={errors.tipoDenuncia}
                            />
                        </div>
                        <div style={{ marginLeft: "70%" }}>
                            <Controls.Buttons
                                type="button"
                                text={t('button_gravar')}
                                //  className="button"
                                size="small"
                                onClick={gavarMotivoRating}

                            />
                        </div>

                        <div>
                            <RatingMotivoSearchTable ref={childRef2}
                                idDisplay={false}
                                motivoDisplay={true}
                                actionsButtonDisplaySelect={false} // monstrar o campo = true
                                actionsButtonDisplayEditDelete={true}
                                pageSize={3}
                                rowPerPage={3}
                            />
                        </div>
                    </div>



                </div>


               

            </Form>

                            */}

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      {count === 1 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          //   title={popupTitle}
          width="800px"
          height="580px"
          closeButtonDisplay={false}
          marginTop="-20px"
        >
          <SedeSearchTable
            idDisplay={false}
            codeDisplay={true}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={5}
            rowPerPage={5}
            backGroundColor={backGroundColor}
            color={color}
            listarGrid={true}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              //tableTipoDenunciaUpdateData(currentLanguageCode, id);
            }}
          />
        </Popup>
      ) : null}
    </>
  );
};
export default TipoDeDeNuncia;
