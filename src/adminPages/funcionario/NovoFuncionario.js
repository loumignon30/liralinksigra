import "./funcionario.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { House, Image, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import AgenciaService from "../../services/admin/Agencia.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import FuncionarioService from "../../services/admin/Funcionario.services";
import FuncionarioSearchTable from "../funcionario/FuncionarioSearchTable";
import DepartamentoSearchTable from "../departamento/DepartamentoSearchTable";
import FuncaoSearchTable from "../funcao/FuncaoSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import semfoto from "../../assets/images/semfoto.png";
import { v4 as uuidv4 } from "uuid";

import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";

import { useTranslation } from "react-i18next";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import { Button, Grid, InputAdornment, Box, Paper } from "@mui/material";

import { styled } from "@mui/material/styles";

import swal from "sweetalert";

const initialFValues = {
  id: 0,
  code: "",
  qr: "",
  primeironome: "",
  ultimonome: "",
  email: "",
  telefone: "",
  funcao: "",
  departmento: "",
  dataamissao: null,
  status: "1",
  imageName: "",
  observacao: "",
  sedeID: 0,
  agenciaID: 0,
  departamentoID: 0,
  funcaoID: 0,
};

const NovoFuncionario = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRef2 = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefSideBar = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [imageFileName, setImageFileName] = useState("");
  const [slideImgCategory, setSlideImgCategory] = useState("");
  const [sede, setSede] = useState("");
  const [agencia, setAgencia] = useState("");
  const [count, setCount] = useState(0);
  const [notificatinoShow, setNotificationShow] = useState(false);
  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const [agenciaID, setAgenciaID] = useState(0);
  const [sedeID, setSedeID] = useState(0);

  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);

  const [backGroundColor, setBackGroundColor] = useState("");
  const [color, setColor] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubTitle, setHeaderSubTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [textReset, setTextReset] = useState("");
  const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState(
    ""
  );
  const [userID, setUserID] = useState(0);

  const [nivelAcesso, setNivelAcesso] = useState(0);

  const [testExistCode, setExistCode] = useState(0);
  const [provenienciaEdit, setProvenienciaEdit] = useState(0);

  const location = useLocation();

  const saveImageFromImageUpload = () => {
    setImageFileName(childRef.current.fileName);
    values.imageName = childRef.current.fileName;
    childRef.current.saveImage(); // saveImage() = method called
  };

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

  const imageReset = () => {
    childRef.current.imageReset();
  };

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    setSlideImgCategory(
      "https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg"
    );

    updateValuesOnOpen();
    getStateValuesFromSearchTable();
  }, [t("header_title_funcionario_modificar"), location.state]);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("primeironome" in fieldValues)
      validationErrorM.primeironome = fieldValues.primeironome ? "" : " "; // This field is Required
    if ("ultimonome" in fieldValues)
      validationErrorM.ultimonome = fieldValues.ultimonome ? "" : " "; // This field is Required
    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : "";
    if ("telefone" in fieldValues)
      validationErrorM.telefone =
        fieldValues.telefone.length > 8 ? "" : "Minimum 9 caracters";

    if ("funcao") validationErrorM.funcao = funcao ? "" : " ";

    if ("departamento") validationErrorM.departamento = departamento ? "" : " ";

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

  const getStateValuesFromSearchTable = () => {
    if (location.state !== null) {
      setProvenienciaEdit(1);

      setBackGroundColor("darkBlue");
      setColor("white");
      setHeaderTitle(t("header_title_funcionario_modificar"));
      setHeaderSubTitle(t("header_subTitle_funcionario_modificar"));
      setButtonTitle(t("button_modificar"));
      setTextReset(t("button_novo"));

      setValues(location.state);
      setSede(location.state.sede);
      setAgencia(location.state.agencia);
      setSedeID(location.state.sedeID);
      setAgenciaID(location.state.agenciaId);

      setFuncao(location.state.funcao);
      setDepartamento(location.state.departamento);

      tableDepartamentoUpdateData1(
        location.state.sedeID,
        location.state.agenciaId,
        "",
        ""
      );

      setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);
      sendImageFromImageUpload(location.state.imageChangeFromOutSideURL);
    } else {
      ResetForm();
      // setBackGroundColor("darkGreen");
      // setColor("white");
      // setHeaderTitle(t('header_title_funcionario_novo'));
      // setHeaderSubTitle(t('header_subTitle_funcionario_novo'));
      // setButtonTitle(t('button_gravar'));
      // setTextReset(t('button_novo'));
    }
  };

  const sendImageFromImageUpload = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const ResetForm = () => {
    setDepartamento("");
    setFuncao("");
    imageReset();
    setValues(initialFValues);

    setBackGroundColor("darkGreen");
    setColor("white");

    setHeaderTitle(t("header_title_funcionario_novo"));
    setHeaderSubTitle(t("header_subTitle_funcionario_novo"));
    setButtonTitle(t("button_gravar"));
    setTextReset(t("button_novo"));

    values.sedeID = sedeID;
    values.agenciaID = agenciaID;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    FuncionarioService.getAll(
      sedeID,
      userID,
      "codigoPesquisa",
      values.code
    ).then((response) => {
      if (response.data.length > 0 && values.id == 0) {
        // tester si le code exist
        return swal(
          t("mensagem_erro_menu_atencao"),
          t("codeExiste_do_trabalhador_na_base_de_dasos"),
          "warning"
        );
      } else {
        if (validate()) {
          if (values.sedeID === 0) {
            values.sedeID = sedeID;
          }
          if (values.agenciaID === 0) {
            values.agenciaID = agenciaID;
          }

          saveFuncionario(); // call save university

          if (location.state === null) {
            // reset quando é um novo funcionario
            ResetForm();
          }
        }
      }
    });
  };

  const tableFuncionarioUpdateData = () => {
    childRef2.current.getGetAllData(values.sedeID); // saveImage() = method called
  };

  const onclickSedePopup = () => {
    if (Number(nivelAcesso) !== 101) {
      setCount(1);
    } else {
      setCount(5);
    }
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };
  const onclickAgenciaPopup = () => {
    if (Number(nivelAcesso) !== 101) {
      setCount(2);
    } else {
      setCount(6);
    }
    setPpupTitle(t("lista_agencia"));
    setOpenPopup(true);
  };
  const onclickDepartamentoPopup = () => {
    setCount(3);
    setPpupTitle(t("listagem_departamento_menu"));
    setOpenPopup(true);
  };
  const onclickFuncaoPopup = () => {
    setCount(4);
    setPpupTitle(t("listagem_funcao_menu"));
    setOpenPopup(true);
  };

  const saveFuncionario = () => {
    if (childRef.current.imageSelected) {
      // save image only if selected
      childRef.current.getFuncionarioCode(values.code, "code"); // saveImage() = method called
      saveImageFromImageUpload();
    } else {
      if (values.id === 0) {
        sendImageFromImageUpload(semfoto); // enviar a imagem de sem foto
        childRef.current.getFuncionarioCode(values.code, "code"); // saveImage() = method called
        saveImageFromImageUpload();
      }
    }

    if (values.id > 0) {
      FuncionarioService.update(values.id, values)
        .then((response) => {
          tableDepartamentoUpdateData1(sedeID, agenciaID, "", "");
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
      FuncionarioService.create(values)
        .then((response) => {
          tableDepartamentoUpdateData1(sedeID, agenciaID);
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

      //setExistCode(response.data.length);
      // testCode(response.data.length)
      //}
    }
  };

  const tableDepartamentoUpdateData1 = (sedeID1, agenciaID1,nome, apelido) => {
    if (sedeID1 > 0 && agenciaID1 > 0) {
      childRef2.current.getGetAllData(sedeID1, agenciaID1, nome, apelido); // saveImage() = method called
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
                  height: "12vh",
                  maxHeight: "12vh",
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
                      name="sede"
                      placeHolder={t("sede")}
                      value={sede}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.sede}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickSedePopup}
                    />
                  </div>
                  <div>
                    <label style={{ marginTop: "-7px" }} className="inputLabel">
                      {t("agencia")}
                    </label>
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
                  <span>DADOS DO FUNCIONÁRIO</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "55vh",
                  maxHeight: "55vh",
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
                      width="78%"
                      error={errors.code}
                    />
                  </div>

                  <div>
                    <label className="inputLabel">{t("nome")}</label>
                    <Controls.Input
                      name="primeironome"
                      placeHolder={t("nome")}
                      value={values.primeironome}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.primeironome}
                    />
                  </div>
                  <div>
                    <label className="inputLabel">{t("apelido")}</label>
                    <Controls.Input
                      name="ultimonome"
                      placeHolder={t("apelido")}
                      value={values.ultimonome}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.ultimonome}
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
                      width="78%"
                      error={errors.email}
                    />
                  </div>
                  <div>
                    <label className="inputLabel">{t("contacto")}</label>
                    <Controls.Input
                      name="telefone"
                      placeHolder={t("contacto")}
                      value={values.telefone}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.telefone}
                    />
                  </div>

                  <div>
                    <label className="inputLabel">{t("departamento")}</label>
                    <Controls.Input
                      name="departamento"
                      placeHolder={t("departamento")}
                      value={departamento}
                      onChange={handleInputChange}
                      type="text"
                      width="74%"
                      error={errors.departamento}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickDepartamentoPopup}
                    />
                  </div>
                  <div>
                    <label className="inputLabel">{t("funcao")}</label>
                    <Controls.Input
                      name="funcao"
                      placeHolder={t("funcao")}
                      value={funcao}
                      onChange={handleInputChange}
                      type="text"
                      width="74%"
                      error={errors.funcao}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickFuncaoPopup}
                    />
                  </div>

                  <div style={{marginTop: "10px"}}>
                    <ImageUpLoad
                      ref={childRef}
                      fotoTitulo={t("foto")}
                      margnLeft="0px"
                      uploadDisplay={true}
                      marginTop= "20px"
                      marginTopTexto= "-40px"
                    />
                  </div>
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
                  <span>FUNCIONÁRIOS GRAVADOS</span>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
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
                  <div >
                    <FuncionarioSearchTable
                      ref={childRef2}
                      idDisplay={false}
                      codeDisplay={true}
                      facultyDisplay={true}
                      emailDisplay={false}
                      deanDisplay={false}
                      statusDiplay={false}
                      actionsButtonDisplaySelect={false}
                      actionsButtonDisplayEditDelete={false}
                      backGroundColor="2#f0efeb"
                      sedeID={sedeID}
                      agenciaID={agenciaID}
                      color="black"
                      fotoDisplay={false}
                      pageSize={10}
                      rowPerPage={10}
                    />
                  </div>
                </div>
              </div>

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
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
                        backgroundColor: "#f0efeb",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <Controls.Buttons
                          type="button"
                          text={t("button_gravar")}
                          width="40%"
                          size="small"
                          onClick={handleSubmit}
                        />
                        {location.state !== null ? (
                          <Controls.Buttons
                            type="button"
                            text={t("button_pagina_anterior")}
                            color="secondary"
                            width="40%"
                            size="small"
                            onClick={() => {
                              setUserSavedValue((prevState) => {
                                prevState[0].sedeID_pesquisas = sedeID;
                                prevState[0].sede_pesquisa = sede;
                                prevState[0].agenciaID_pesquisa = agenciaID;
                                prevState[0].agencia_pesquisa = agencia;
                                prevState[0].provenienciaFormulario =
                                  "EditFuncionario";
                                return [...prevState];
                              });

                              // setUserSavedValue([
                              //     ...userSavedValue,
                              //     {
                              //         sedeID_pesquisas: sedeID,
                              //         sede_pesquisa: sede,
                              //         agenciaID_pesquisa: agenciaID,
                              //         agencia_pesquisa: agencia
                              //     }
                              // ]);
                              navigate(-1);
                            }}
                          />
                        ) : (
                          <Controls.Buttons
                            type="button"
                            text={t("button_limpar")}
                            color="secondary"
                            width="40%"
                            size="small"
                            onClick={ResetForm}
                          />
                        )}
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
                        // overflowX: "hidden",
                        margin: "5px",
                        backgroundColor: "#f0efeb",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ marginTop: "0px", fontWeight: 600 }}></div>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/*

        <div className="facultyContainer">
            <PageHeader
                title={headerTitle}
                subTitle={headerSubTitle}
                backGroundColor={backGroundColor}
                color={color}>
            </PageHeader>

            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="facultyItemContainer">

                    <div className="newFaculty">
                        <div>
                            <label className="inputLabel">{t('sede')}</label>
                            <Controls.Input
                                name="sede"
                                placeHolder={t('sede')}
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.sede}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickSedePopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('agencia')}</label>
                            <Controls.Input
                                name="agencia"
                                placeHolder={t('agencia')}
                                value={agencia}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.agencia}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickAgenciaPopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('code')}</label>
                            <Controls.Input
                                name="code"
                                placeHolder={t('code')}
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.code}
                            />
                        </div>

                        <div >
                            <label className="inputLabel">{t('nome')}</label>
                            <Controls.Input
                                name="primeironome"
                                placeHolder={t('nome')}
                                value={values.primeironome}
                                onChange={handleInputChange}
                                type="text"
                                width="33%"
                                error={errors.primeironome}
                            />

                            <Controls.Input
                                name="ultimonome"
                                placeHolder={t('apelido')}
                                value={values.ultimonome}
                                onChange={handleInputChange}
                                type="text"
                                width="32%"
                                error={errors.ultimonome}
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
                                name="telefone"
                                placeHolder={t('contacto')}
                                value={values.telefone}
                                onChange={handleInputChange}
                                type="text"
                                width="25%"
                                error={errors.telefone}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">{t('departamento')}</label>
                            <Controls.Input
                                name="departamento"
                                placeHolder={t('departamento')}
                                value={departamento}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.departamento}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickDepartamentoPopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">{t('funcao')}</label>
                            <Controls.Input
                                name="funcao"
                                placeHolder={t('funcao')}
                                value={funcao}
                                onChange={handleInputChange}
                                type="text"
                                width="65%"
                                error={errors.funcao}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickFuncaoPopup}
                            />
                        </div>

                        <div>
                            {location.state !== null ?
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
                                    // error={errors.status}
                                    />
                                </div> : null
                            }

                        </div>

                    </div>
                    {
                        deviceWidth > 820 ?
                            <div className="newFaculty">
                                <FuncionarioSearchTable ref={childRef2}
                                    idDisplay={false}
                                    codeDisplay={true}
                                    facultyDisplay={true}
                                    emailDisplay={false}
                                    deanDisplay={false}
                                    statusDiplay={false}
                                    actionsButtonDisplaySelect={false}
                                    actionsButtonDisplayEditDelete={false}
                                    backGroundColor={backGroundColor}
                                    sedeID={sedeID}
                                    agenciaID={agenciaID}
                                    color={color}
                                    fotoDisplay={false}
                                    pageSize={5}
                                    rowPerPage={5}
                                />
                            </div> : null
                    }

                </div>

                <div className="facultyItemContainer">

                    <div className="newFaculty">

                        <div className="newUniversity">
                            <ImageUpLoad ref={childRef}
                                fotoTitulo={t('foto')}
                                margnLeft="0px"
                                uploadDisplay={true} />
                        </div>

                    </div>

                    <div className="newFaculty">
                        <Controls.Buttons
                            type="submit"
                            text={t('button_gravar')}
                            className="button"
                        />
                        {location.state !== null ?
                            <Controls.Buttons
                                type="button"
                                text={t('button_pagina_anterior')}
                                color="secondary"
                                className="button"
                                onClick={() => {

                                    setUserSavedValue(prevState => {
                                        prevState[0].sedeID_pesquisas = sedeID
                                        prevState[0].sede_pesquisa = sede
                                        prevState[0].agenciaID_pesquisa = agenciaID
                                        prevState[0].agencia_pesquisa = agencia
                                        prevState[0].provenienciaFormulario = "EditFuncionario"
                                        return [...prevState]
                                    })

                                    // setUserSavedValue([
                                    //     ...userSavedValue,
                                    //     {
                                    //         sedeID_pesquisas: sedeID,
                                    //         sede_pesquisa: sede,
                                    //         agenciaID_pesquisa: agenciaID,
                                    //         agencia_pesquisa: agencia
                                    //     }
                                    // ]);
                                    navigate(-1)
                                }}
                            /> :

                            <Controls.Buttons
                                type="button"
                                text={t('button_limpar')}
                                color="secondary"
                                className="button"
                                onClick={ResetForm}
                            />
                        }
                    </div>

                </div>

            </Form>


                    */}

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      {count === 1 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          //pageHeader={PopupHeaderUniversity()}
          buttonColor="secondary"
          title={popupTitle}
          width="800px"
          height="580px"
          marginTop="10px"
        >
          <SedeUtilizadorSearchTable
            idDisplay="true"
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={9}
            rowPerPage={9}
            backGroundColor="#f0efeb"
            color="black"
            sedeID={sedeID}
            userID={userID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              values.sedeID = id;
              setSedeID(id);
              setOpenPopup(false);
              setAgencia("");
              setDepartamento("");
              setFuncao("");
              tableFuncionarioUpdateData(id);
            }}
          />
        </Popup>
      ) : (
        ""
      )}

      {count === 2 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          //pageHeader={PopupHeaderUniversity()}
          buttonColor="secondary"
          title={popupTitle}
          width="800px"
          height="580px"
          marginTop="10px"
        >
          <AgenciaUtilizadorSearchTable
            idDisplay={true}
            codeDisplay={true}
            statusDisplay={true}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor="#f0efeb"
            color="black"
            pageSize={9}
            rowPerPage={9}
            sedeID={sedeID}
            userID={userID}
            agenciaData={(id, code, agencia) => {
              values.agenciaID = id;
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              setDepartamento("");
              setFuncao("");
              tableDepartamentoUpdateData1(sedeID, id);
            }}
          />
        </Popup>
      ) : (
        ""
      )}

      {count === 3 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          //pageHeader={PopupHeaderUniversity()}
          buttonColor="secondary"
        //   title={popupTitle}
          width="800px"
          height="580px"
          closeButtonDisplay={false}
          marginTop="-20px"
        >
          <DepartamentoSearchTable
            idDisplay={true}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={9}
            rowPerPage={9}
            sedeID={sedeID}
            agenciaID={agenciaID}
            departamentoPesquisa=""
            backGroundColor="#f0efeb"
            color="black"
            listarGrid = {true}
            departamentoData={(id, code, departamento) => {
              setDepartamento(departamento);
              values.departamentoID = id;
              setOpenPopup(false);
            }}
          />
        </Popup>
      ) : (
        ""
      )}

      {count === 4 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          //pageHeader={PopupHeaderUniversity()}
          buttonColor="secondary"
        //   title={popupTitle}
          width="800px"
          height="580px"
          closeButtonDisplay={false}
          marginTop="-20px"
        >
          <FuncaoSearchTable
            idDisplay={false}
            codeDisplay={true}
            statusDisplay={true}
            actionsButtonDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={9}
            rowPerPage={9}
            backGroundColor="#f0efeb"
            color="black"
            sedeID={sedeID}
            agenciaID={agenciaID}
            funcaoPesquisa=""
            listarGrid = {true}
            funcaoData={(id, code, funcao) => {
              setFuncao(funcao);
              values.funcaoID = id;
              setOpenPopup(false);
            }}
          />
        </Popup>
      ) : (
        ""
      )}

      {count === 5 ? (
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
            statusDisplay={true}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={9}
            rowPerPage={9}
            backGroundColor="#f0efeb"
            color="black"
            listarGrid={true}
            // userID={userID2}
            // sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              // tableFuncionarioUpdateData(id);
              setAgencia("");
              //tableDepartamentoUpdateData(id);
            }}
          />
        </Popup>
      ) : null}

      {count === 6 ? (
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
          <AgenciaSearchTable
            idDisplay={false}
            codeDisplay={true}
            emailDisplay={false}
            statusDisplay={true}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor="#f0efeb"
            idSede={sedeID}
            userID={userID}
            color="black"
            pageSize={9}
            rowPerPage={9}
            listarGrid={true}
            agenciaData={(id, code, agencia) => {
              values.agenciaID = id;
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableDepartamentoUpdateData1(sedeID, id, "", "");
            }}
          />
        </Popup>
      ) : null}
    </>
  );
};
export default NovoFuncionario;
