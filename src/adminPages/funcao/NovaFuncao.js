import "./funcao.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { House, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import AgenciaService from "../../services/admin/Agencia.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import FuncaoService from "../../services/admin/Funcao.services";
import FuncaoSearchTable from "./FuncaoSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation, useNavigate } from "react-router-dom";
import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";

import { useTranslation } from "react-i18next";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";
const initialFValues = {
  id: 0,
  code: "",
  funcao: "",
  observacao: "",
  sedeID: 0,
  agenciaID: 0,
  status: "1",
};

const NovaFuncao = () => {
  const { t } = useTranslation();

  const getStatus = [
    { id: "1", title: t("status_actif") },
    { id: "2", title: t("status_inactive") },
    { id: "3", title: t("status_pendente") },
    { id: "4", title: t("status_apagado") },
  ];

  // notification with SnackBar
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");
  const childRef2 = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const childRefAgence = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState(0);
  const [agenciaID, setAgenciaID] = useState(0);
  const [agencia, setAgencia] = useState("");
  const [userID, setUserID] = useState(0);

  const [notificatinoShow, setNotificationShow] = useState(false);

  const [count, setCount] = useState(0);
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const location = useLocation();

  const [backGroundColor, setBackGroundColor] = useState("");
  const [color, setColor] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubTitle, setHeaderSubTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [textReset, setTextReset] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState(0);

  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen(); // // update Usecontext
    getStateValuesFromSearchTable();
  }, [t("header_title_funcao_modificar"), location.state]);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("funcao" in fieldValues)
      validationErrorM.funcao = fieldValues.funcao ? "" : " "; // This field is Required

    if ("sede") validationErrorM.sede = sede ? "" : " ";

    if ("agencia") validationErrorM.agencia = agencia ? "" : " ";

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

  const updateValuesOnOpen = () => {
    userSavedValue.map(
      (item) => (
        (values.userID = item.id),
        setUserID(item.id),
        setSedeID(item.sedeID),
        setSede(item.sede),
        (values.sedeID = item.sedeID),
        setNivelAcesso(item.nivelAcesso)
      )
    );
  };

  const getStateValuesFromSearchTable = () => {
    if (location.state !== null) {
      setBackGroundColor("darkBlue");
      setColor("white");
      setHeaderTitle(t("header_title_funcao_modificar"));
      setHeaderSubTitle(t("header_subTitle_funcao_modificar"));
      setButtonTitle(t("button_modificar"));
      setTextReset(t("button_modificar"));

      setValues(location.state);
      setSede(location.state.sede);
      setAgencia(location.state.agencia);
      setSedeID(location.state.sedeID);
      setAgenciaID(location.state.agenciaID);

      tableFuncaoUpdateData1(location.state.sedeID, location.state.agenciaID);
    } else {
      ResetForm();
      // setBackGroundColor("darkGreen");
      // setColor("white");
      // setHeaderTitle(t('header_title_funcao_novo'));
      // setHeaderSubTitle(t('header_subTitle_funcao_novo'));
      // setButtonTitle(t('button_gravar'));
      // setTextReset(t('button_limpar'));
    }
  };

  const ResetForm = () => {
    //setValues(initialFValues);
    //setNotificationShow(false);

    values.id = 0;
    values.code = "";
    values.funcao = "";
    values.observacao = "";

    tableFuncaoUpdateData1(sedeID, agenciaID);

    setBackGroundColor("darkGreen");
    setColor("white");
    setHeaderTitle(t("header_title_funcao_novo"));
    setHeaderSubTitle(t("header_subTitle_funcao_novo"));
    setButtonTitle(t("button_gravar"));
    setTextReset(t("button_limpar"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveFaculty(); // call save university

      if (location.state === null) {
        // reset quando é um novo funcionario
        ResetForm();
      }
    }
  };

  const onclicSedePopup = () => {
    if (Number(nivelAcesso) !== 101) {
      setCount(1);
    } else {
      setCount(3);
    }
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };
  const onclickAgenciaPopup = () => {
    if (Number(nivelAcesso) !== 101) {
      setCount(2);
    } else {
      setCount(4);
    }
    setPpupTitle(t("lista_agencia"));
    setOpenPopup(true);
  };

  const saveFaculty = () => {
    if (values.id > 0) {
      FuncaoService.update(values.id, values)
        .then((response) => {
          values.code = "";
          values.funcao = "";
          values.observacao = "";

          tableFuncaoUpdateData1(sedeID, agenciaID); // update Faculty Data on FacultySearchTable.js

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
    } else {
      // if (values.agenciaID === 0 && agenciaID > 0) {
      //     values.agenciaID = agenciaID;
      // }

      FuncaoService.create(values)
        .then((response) => {
          values.code = "";
          values.funcao = "";
          values.observacao = "";

          tableFuncaoUpdateData1(sedeID, agenciaID); // update Faculty Data on FacultySearchTable.js

          setNotify({
            isOpen: true,
            message: t("mensagem_Gravar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const tableFuncaoUpdateData1 = (sedeID1, agenciaID1) => {
    if (sedeID1 > 0 && agenciaID1 > 0) {
      childRef2.current.getGetAllData(sedeID1, agenciaID1); // saveImage() = method called
    }
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
                title={headerTitle}
                subTitle={headerSubTitle}
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
                  height: "14vh",
                  maxHeight: "17vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div style={{ marginLeft: "5px" }}>
                  <div>
                    <label className="inputLabel">{t("sede")}</label>
                    <Controls.Input
                      name={t("sede")}
                      placeHolder={t("sede")}
                      value={sede}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.sede}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclicSedePopup}
                    />
                  </div>
                  <div>
                    <label className="inputLabel">{t("agencia")}</label>
                    <Controls.Input
                      name="agencia"
                      placeHolder={t("agencia")}
                      value={agencia}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.agencia}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickAgenciaPopup}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Grid item xs={12}>
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    height: "4vh",
                    maxHeight: "4vh",
                    overflowY: "auto",
                    overflow: "auto",
                    // overflowX: "hidden",
                    margin: "5px",
                    backgroundColor: "#f0efeb",
                    textAlign: "center",
                  }}
                >
                  <div style={{ marginTop: "0px", fontWeight: 600 }}>
                    <span>DADOS DA FUNÇÃO</span>
                  </div>
                </div>

                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    height: "34vh",
                    maxHeight: "34vh",
                    overflowY: "auto",
                    overflow: "auto",
                    overflowX: "hidden",
                    margin: "5px",
                  }}
                >
                  <div style={{ marginLeft: "5px" }}>
                    <div>
                      <label className="inputLabel">{t("code")}</label>
                      <Controls.Input
                        name="code"
                        placeHolder={t("code")}
                        value={values.code}
                        onChange={handleInputChange}
                        type="text"
                        width="65%"
                        error={errors.code}
                      />
                    </div>
                    <div>
                      <label className="inputLabel">{t("funcao")}</label>
                      <Controls.Input
                        name="funcao"
                        placeHolder={t("funcao")}
                        value={values.funcao}
                        onChange={handleInputChange}
                        type="text"
                        width="65%"
                        error={errors.funcao}
                      />
                    </div>

                    <div>
                      <label className="inputLabel">{t("observacao")}</label>
                      <Controls.Input
                        name="observacao"
                        placeHolder={t("observacao")}
                        value={values.observacao}
                        onChange={handleInputChange}
                        type="text"
                        width="65%"
                        multiline
                        rows={3}
                        height="100px"
                        // width="290px"
                      />
                    </div>
                    {location.state !== null ? (
                      <div>
                        <label className="userLabel" htmlFor="status">
                          {t("status")}
                        </label>
                        <Controls.Select
                          name="status"
                          label="status"
                          value={values.status}
                          onChange={handleInputChange}
                          options={getStatus}
                          typeOfSelect={1}
                          width="65%"
                          height="40px"
                          // error={errors.status}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Grid>
            </Form>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0.2}>
                <Grid item xs={6}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      height: "8vh",
                      maxHeight: "8vh",
                      overflowY: "auto",
                      overflow: "auto",
                      overflowX: "hidden",
                      margin: "5px",
                      justifyContent: "center",
                      justifyItems: "center",
                      backgroundColor: "#f0efeb",

                    }}
                  >
                    <div>

                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      height: "8vh",
                      maxHeight: "8vh",
                      overflowY: "auto",
                      overflow: "auto",
                      overflowX: "hidden",
                      margin: "5px",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <div>
                      {location.state === null ? (
                        <Controls.Buttons
                          type="button"
                          text={t("button_gravar")}
                          size="small"
                          width="40%"
                          onClick={handleSubmit}
                        />
                      ) : (
                        <Controls.Buttons
                          type="button"
                          text={t("button_modificar")}
                          size="small"
                          width="40%"
                          onClick={handleSubmit}
                        />
                      )}

                      {location.state === null ? (
                        <Controls.Buttons
                          type="button"
                          text={t("button_limpar")}
                          color="secondary"
                          size="small"
                          width="40%"
                          onClick={ResetForm}
                        />
                      ) : (
                        <Controls.Buttons
                          type="button"
                          text={t("button_pagina_anterior")}
                          color="secondary"
                          size="small"
                          width="40%"
                          onClick={() => {
                            setUserSavedValue((prevState) => {
                              prevState[0].sedeID_pesquisas = sedeID;
                              prevState[0].sede_pesquisa = sede;
                              prevState[0].agenciaID_pesquisa = agenciaID;
                              prevState[0].agencia_pesquisa = agencia;
                              prevState[0].provenienciaFormulario =
                                "EditFuncao";
                              return [...prevState];
                            });

                            navigate(-1);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
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
                  <span>FUNÇÕES GUARDADAS</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "63.5vh",
                  maxHeight: "63.5vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  backgroundColor: "#f0efeb",
                  textAlign: "center",
                }}
              >
                <div>
                  <FuncaoSearchTable
                    ref={childRef2}
                    idDisplay={false}
                    codeDisplay={true}
                    actionsButtonDisplay={false}
                    actionsButtonDisplayEditDelete={false}
                    pageSize={12}
                    rowPerPage={12}
                    backGroundColor="#f0efeb"
                    color="black"
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    departamentoData={(id, code, departamento) => {
                      //setSede(sede);
                      values.sedeID = id;
                      setOpenPopup(false);
                      // tableFuncaoUpdateData1(agenciaID);
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/*
       

        // <div className="facultyContainer">
        //     <PageHeader
        //         title={headerTitle}
        //         subTitle={headerSubTitle}
        //         backGroundColor={backGroundColor}
        //         color={color}
        //         icon={<House />}>
        //     </PageHeader>

        //     <Form onSubmit={handleSubmit} autoComplete="off">

        //         <div className="facultyItemContainer">

        //             <div className="newFaculty">
        //                 <div>
        //                     <label className="inputLabel">{t('sede')}</label>
        //                     <Controls.Input
        //                         name={t('sede')}
        //                         placeHolder={t('sede')}
        //                         value={sede}
        //                         onChange={handleInputChange}
        //                         type="text"
        //                         width="65%"
        //                         error={errors.sede}
        //                     />
        //                     <Search style={{ marginTop: "10px", cursor: "pointer" }}
        //                         onClick={onclicSedePopup}
        //                     />
        //                 </div>
        //                 <div>
        //                     <label className="inputLabel">{t('agencia')}</label>
        //                     <Controls.Input
        //                         name="agencia"
        //                         placeHolder={t('agencia')}
        //                         value={agencia}
        //                         onChange={handleInputChange}
        //                         type="text"
        //                         width="65%"
        //                         error={errors.agencia}
        //                     />
        //                     <Search style={{ marginTop: "10px", cursor: "pointer" }}
        //                         onClick={onclickAgenciaPopup}
        //                     />
        //                 </div>

        //                 <div>
        //                     <label className="inputLabel">{t('code')}</label>
        //                     <Controls.Input
        //                         name="code"
        //                         placeHolder={t('code')}
        //                         value={values.code}
        //                         onChange={handleInputChange}
        //                         type="text"
        //                         width="65%"
        //                         error={errors.code}
        //                     />
        //                 </div>
        //                 <div>
        //                     <label className="inputLabel">{t('funcao')}</label>
        //                     <Controls.Input
        //                         name="funcao"
        //                         placeHolder={t('funcao')}
        //                         value={values.funcao}
        //                         onChange={handleInputChange}
        //                         type="text"
        //                         width="65%"
        //                         error={errors.funcao}
        //                     />
        //                 </div>

        //                 <div>
        //                     <label className="inputLabel">{t('observacao')}</label>
        //                     <Controls.Input
        //                         name="observacao"
        //                         placeHolder={t('observacao')}
        //                         value={values.observacao}
        //                         onChange={handleInputChange}
        //                         type="text"
        //                         width="65%"
        //                         multiline
        //                         rows={5}
        //                         height="140px"
        //                     // width="290px"
        //                     />
        //                 </div>
        //                 {location.state !== null ?
        //                     <div style={{ marginTop: "5px" }}>
        //                         <label className="userLabel" htmlFor="status">{t('status')}</label>
        //                         <Controls.Select
        //                             name="status"
        //                             label="status"
        //                             value={values.status}
        //                             onChange={handleInputChange}
        //                             options={getStatus}
        //                             typeOfSelect={1}
        //                             width="65%"
        //                             height="40px"
        //                         // error={errors.status}
        //                         />
        //                     </div> : null
        //                 }

        //             </div>
        //             {
        //                 deviceWidth > 820 ?
        //                     <div className="newFaculty" style={{ marginTop: "-10px" }}>
        //                         <FuncaoSearchTable ref={childRef2}
        //                             idDisplay={false}
        //                             codeDisplay={true}
        //                             actionsButtonDisplay={false}
        //                             actionsButtonDisplayEditDelete={false}
        //                             pageSize={5}
        //                             rowPerPage={5}
        //                             backGroundColor={backGroundColor}
        //                             color={color}
        //                             sedeID={sedeID}
        //                             agenciaID={agenciaID}
        //                             departamentoData={(id, code, departamento) => {
        //                                 //setSede(sede);
        //                                 values.sedeID = id
        //                                 setOpenPopup(false);
        //                                 // tableFuncaoUpdateData1(agenciaID);
        //                             }
        //                             }
        //                         />
        //                     </div> : null
        //             }

        //         </div>

        //         <div className="facultyItemContainer">

        //             <div className="newFaculty">

        //             </div>

        //             <div className="newFaculty">

        //             {((location.state) === null) ?
        //                 <Controls.Buttons
        //                     type="submit"
        //                     text={t('button_gravar')}
        //                     className="button"
        //                 />:
        //                 <Controls.Buttons
        //                     type="submit"
        //                     text={t('button_modificar')}
        //                     className="button"
        //                 />}

        //                 {((location.state) === null) ?
        //                 <Controls.Buttons
        //                     type="button"
        //                     text={t('button_limpar')}
        //                     color="secondary"
        //                     className="button"
        //                     onClick={ResetForm}
        //                 />:
        //                 <Controls.Buttons
        //                     type="button"
        //                     text={t('button_pagina_anterior')}
        //                     color="secondary"
        //                     className="button"
        //                     onClick={() => {

        //                         setUserSavedValue(prevState => {
        //                             prevState[0].sedeID_pesquisas = sedeID
        //                             prevState[0].sede_pesquisa = sede
        //                             prevState[0].agenciaID_pesquisa = agenciaID
        //                             prevState[0].agencia_pesquisa = agencia
        //                             prevState[0].provenienciaFormulario = "EditFuncao"
        //                             return [...prevState]
        //                         })

        //                         navigate(-1)
        //                     }}
        //                 />
        //             }
        //             </div>

        //         </div>

        //     </Form>

                */}

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}
      {count === 1 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          title={popupTitle}
          width="700px"
          height="480px"
          marginTop="10px"
        >
          <SedeUtilizadorSearchTable
            idDisplay={true}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={5}
            rowPerPage={5}
            backGroundColor={backGroundColor}
            color={color}
            userID={userID}
            sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              setAgencia("");
            }}
          />
        </Popup>
      ) : null}

      {count === 2 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          title={popupTitle}
          width="670px"
          height="580px"
          marginTop="10px"
        >
          <AgenciaUtilizadorSearchTable
            idDisplay={false}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor={backGroundColor}
            color={color}
            pageSize={6}
            rowPerPage={6}
            sedeID={sedeID}
            userID={userID}
            agenciaData={(id, code, agencia) => {
              values.agenciaID = id;
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableFuncaoUpdateData1(sedeID, id);
            }}
          />
        </Popup>
      ) : null}

      {count === 3 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          title={popupTitle}
          width="600px"
          height="480px"
          marginTop="10px"
        >
          <SedeSearchTable
            idDisplay={false}
            codeDisplay={true}
            statusDisplay={true}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={7}
            rowPerPage={7}
            backGroundColor={backGroundColor}
            color={color}
            // userID={userID2}
            // sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              //tableAgenciaUpdateData(id);
              setAgencia("");
              //tableDepartamentoUpdateData(id);
            }}
          />
        </Popup>
      ) : null}

      {count === 4 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          title={popupTitle}
          width="770px"
          height="550px"
          marginTop="10px"
        >
          <AgenciaSearchTable
            ref={childRefAgence}
            idDisplay={false}
            codeDisplay={true}
            emailDisplay={false}
            statusDisplay={true}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor={backGroundColor}
            idSede={sedeID}
            userID={userID}
            color={color}
            pageSize={5}
            rowPerPage={5}
            agenciaData={(id, code, agencia) => {
              values.agenciaID = id;
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableFuncaoUpdateData1(sedeID, id);
            }}
          />
        </Popup>
      ) : null}
    </>
  );
};

export default NovaFuncao;
