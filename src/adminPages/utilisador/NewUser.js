import React, { useState, useEffect, useRef } from "react";
import "./newUser.css";
import "../../App.css";
import ArticleIcon from "@mui/icons-material/Article";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import Notifications from "../../components/reusableComponents/Notifications";
import * as userRole from "../../services/admin/RoleData";
import * as userGender from "../../services/admin/GenderData";
import PageHeader from "../../components/reusableComponents/PageHeader";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import UserService from "../../services/admin/User.service";
import { useTranslation } from "react-i18next";
import { AddBox, House, Search } from "@mui/icons-material";
import Popup from "../../components/reusableComponents/Popup";
import SedeSearchTable from "../sede/SedeSearchTable";
import { Button, Grid, InputAdornment, Box, Paper } from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";
import Pais from "../paises/Pais";
import Cidade from "../cidade/cidade";
import { styled } from "@mui/material/styles";
import UserSearchTable from "./UserSearchTable";

const initialFValues = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  telephone: "",
  address: "",
  paisID: "",
  cidadeID: "",
  dateofbirth: "",
  gender: "",
  role: "",
  password: "",
  photofilename: "",
  status: "1",
  sedeID: 0,
};

export default function NewUSerForm(props) {
  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    ResetForm();
  }, []);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [imageSRC, setImageSRC] = useState("");
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [imageFileName, setImageFileName] = useState("");

  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState(0);
  const [count, setCount] = useState(0);
  const [popupTitle, setPpupTitle] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [notificatinoShow, setNotificationShow] = useState(false);
  const [sedePesquisa, setSedePesquisa] = useState("");
  const childRefSede = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const navigate = useNavigate();
  const childRefUtilizador = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const [emailExiste, setEmailExiste] = useState(0);

  const { t } = useTranslation();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSRC(URL.createObjectURL(event.target.files[0]));
    }
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

    // if ('dateofbirth' in fieldValues)
    // validationErrorM.dateofbirth = "yyyy-mm-dd" ? "" : " "

    if ("gender" in fieldValues)
      validationErrorM.gender = fieldValues.gender ? "" : " ";

    if ("role" in fieldValues)
      validationErrorM.role = fieldValues.role ? "" : " ";

    if ("password" in fieldValues)
      validationErrorM.password =
        fieldValues.password.length > 3 ? "" : "Minimum 3 caracters";

    if ("paisID" in fieldValues)
      validationErrorM.paisID = fieldValues.paisID ? "" : " "; // This field is Required

    if ("cidadeID" in fieldValues)
      validationErrorM.cidadeID = fieldValues.cidadeID ? "" : " "; // This field is Required

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

  useEffect(() => {
    values.email = "";
    values.password = "";
    getPaises(); //Dados dos paises
  }, []);

  const genderItems = [
    { id: 1, title: t("sexo_masculino") },
    { id: 2, title: t("sexo_feminino") },
    { id: 3, title: t("sexo_outros") },
  ];

  const getRole = [
    { id: 1, title: t("role_administrador") },
    { id: 2, title: t("role_Funcionario") },
    { id: 3, title: t("role_utilizador") },
    { id: 101, title: t("role_super_user") },
  ];

  const saveImageFromImageUpload = () => {
    setImageFileName(childRef.current.fileName);
    values.photofilename = childRef.current.fileName;
    childRef.current.saveImage(); // saveImage() = method called
  };
  const imageReset = () => {
    childRef.current.imageReset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await UserService.getAll(
      sedeID,
      "emailPesquisa",
      values.email
    );
    let emailCheck = response.data.length;

    if (validate()) {
      if (emailCheck === 1) {
        testEmailExistMessage();
        return;
      }
      saveUser(); // save new user
      ResetForm();
    }
  };

  const ResetForm = () => {
    setValues(initialFValues);
    imageReset();
    setErrors({});

    values.sedeID = sedeID;
  };

  const onclicSedePopup = () => {
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const saveUser = () => {
    saveImageFromImageUpload();
    UserService.create(values)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: t("mensagem_Gravar_Nova_Agencia"),
          type: "success",
        });
        setNotificationShow(true);
        childRefUtilizador.current.userGetAll(values.sedeID); // saveImage() = method called

      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function testEmailExist() {
    let emailExiste1 = 0;

    const response = await UserService.getAll(
      sedeID,
      "emailPesquisa",
      values.email
    );

    //console.log(response.data);

    if (response.data.length > 0 && values.id == 0) {
      emailExiste1 = 1;
    } else {
      emailExiste1 = 0;
    }

    return emailExiste;
  }

  function testEmailExistMessage() {
    return swal(
      t("mensagem_erro_menu_atencao"),
      t("Email_Existe_do_usuario_na_base_de_dasos"),
      "warning"
    );
  }

  const sedeSearchToToDataGrid = (e) => {
    setSedePesquisa(e.target.value);
    childRefSede.current.sedSearch(e.target.value); // search the firstname
  };

  const novoPaisclickPopup = () => {
    setCount(2);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
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

  const novaCidadeclickPopup = () => {
    values.cidadeID = "";
    setCount(3);
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
                title={t("header_title_utilisador_novo")}
                subTitle={t("header_subTitle_utilisador_novo")}
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
                  height: "7vh",
                  maxHeight: "7vh",
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
                      width="74%"
                      error={errors.sede}
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclicSedePopup}
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
                  <span>DADOS DO UTILIZADOR</span>
                </div>
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "63vh",
                  maxHeight: "63vh",
                  overflowY: "auto",
                  overflow: "auto",
                  overflowX: "hidden",
                  margin: "5px",
                }}
              >
                <div style={{ marginLeft: "5px" }}>
                  <div>
                    <label className="userLabel">{t("nome")}</label>
                    <Controls.Input
                      name="firstname"
                      placeHolder={t("nome")}
                      value={values.firstname}
                      onChange={handleInputChange}
                      width="78%"
                      type="text"
                      error={errors.firstname}
                    />
                  </div>
                  <div>
                    <label className="userLabel">{t("apelido")}</label>
                    <Controls.Input
                      name="lastname"
                      placeHolder={t("apelido")}
                      value={values.lastname}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.lastname}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("email")}</label>
                    <Controls.Input
                      name="email"
                      placeHolder={t("email")}
                      value={values.email}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.email}
                      autoComplete="new-password"
                      autofill="off"
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("contacto")}</label>
                    <Controls.Input
                      name="telephone"
                      placeHolder={t("contacto")}
                      value={values.telephone}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
                      error={errors.telephone}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("endereco")}</label>
                    <Controls.Input
                      name="address"
                      placeHolder={t("endereco")}
                      value={values.address}
                      onChange={handleInputChange}
                      type="text"
                      width="78%"
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
                      width="74%"
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
                      width="74%"
                      height="40px"
                    />
                    <AddBox
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={novaCidadeclickPopup}
                    />
                  </div>

                  <div style={{ marginTop: "-10px" }}>
                    <ImageUpLoad
                      ref={childRef}
                      fotoTitulo={t("foto")}
                      margnLeft="0px"
                      uploadDisplay={true}
                      marginTop= "10px"
                      iconMarginTop = "15px"

                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={6}>
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
                <span>OUTROS DADOS</span>
              </div>
            </div>

            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "32vh",
                maxHeight: "32vh",
                overflowY: "auto",
                overflow: "auto",
                // overflowX: "hidden",
                margin: "5px",
              }}
            >
              <div style={{ marginLeft: "5px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label className="userLabel">{t("data_nascimento")}</label>
                  <Controls.Input
                    name="dateofbirth"
                    placeHolder={t("data_nascimento")}
                    value={values.dateofbirth}
                    onChange={handleInputChange}
                    width="78%"
                    type="date"
                  />
                </div>

                <div>
                  <label className="userLabel">{t("sexo")}</label>
                  <Controls.Select
                    name="gender"
                    label="gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    options={genderItems}
                    width="78%"
                    height="40px"
                    typeOfSelect={1}
                    error={errors.gender}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <label className="userLabel" htmlFor="role">
                    {t("nivel_accesso")}
                  </label>
                  <Controls.Select
                    name="role"
                    label="Role"
                    value={values.role}
                    onChange={handleInputChange}
                    options={getRole}
                    typeOfSelect={1}
                    error={errors.role}
                    width="78%"
                    height="40px"
                  />
                </div>

                <div>
                  <label className="userLabel">{t("senha")}</label>
                  <Controls.Input
                    name="password"
                    placeHolder={t("senha")}
                    value={values.password}
                    onChange={handleInputChange}
                    width="78%"
                    type="password"
                    autoComplete="new-password"
                    error={errors.password}
                  />
                </div>

                <div>
                  <label className="userLabel">{t("confirmar_senha")}</label>
                  <Controls.Input
                    name="password"
                    placeHolder={t("confirmar_senha")}
                    value={values.password}
                    onChange={handleInputChange}
                    type="password"
                    autoComplete="new-password"
                    width="78%"
                    error={errors.password}
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
                      height: "5vh",
                      maxHeight: "5vh",
                      overflowY: "auto",
                      overflow: "auto",
                      // overflowX: "hidden",
                      margin: "5px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{marginTop: "-10px"}}>
                    <Controls.Buttons 
                    type="button" 
                    text={t("button_gravar")} 
                    // className="button"
                    width="40%"
                    size="small"
                    onClick={handleSubmit}

                    />

                    <Controls.Buttons
                      type="button"
                      text={t("button_limpar")}
                      color="secondary"
                      onClick={ResetForm}
                      width="40%"
                      size="small"
                      // className="button"

                    />
                    {/* <Controls.Buttons
                                    type="button"
                                    text={t('sair')}
                                    color="secondary"
                                    onClick={close} 
                   */}
                    </div>


                  </div>
                </Grid>

              

                

                <Grid item xs={6}>
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
                  ></div>
                </Grid>

                <Grid item xs={12}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      height: "36vh",
                      maxHeight: "36vh",
                      overflowY: "auto",
                      overflow: "auto",
                      // overflowX: "hidden",
                      margin: "5px",
                      backgroundColor: "#f0efeb",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <UserSearchTable
                        ref={childRefUtilizador}
                        idDisplay={false}
                        codeDisplay={false}
                        userNameDisplay={true}
                        firstnameDisplay={true}
                        lastnameDisplay={true}
                        emailDisplay={false}
                        sexoDisplay={false}
                        cidadeDisplay={false}
                        paisDisplay={false}
                        roleDisplay={false}
                        statusDisplay={true}
                        affectacaoDisplay={false}

                        actionsButtonDisplaySelect={false}
                        actionsButtonDisplayEditDelete={true}
                        backGroundColor="blue"
                        sedeID={sedeID}
                        color="white"
                        pageSize={4}
                        rowPerPage={4}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>

         
        </Grid>
        
      </Box>

      {/* <Grid
        // spacing={2}
        container
        direction="column"
        justifyContent="space-between"
        // style={{ height: "100vh" }}
      >
        <div className="newUserMainContainer">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <PageHeader
              title={t("header_title_utilisador_novo")}
              subTitle={t("header_subTitle_utilisador_novo")}
              backGroundColor="#50394c"
              color="white"
              icon={<ArticleIcon />}
            ></PageHeader>
          </Grid>

          <Form onSubmit={handleSubmit}>
            <div className="newUserContainer">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>

              <div className="newUser">
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
                      onClick={onclicSedePopup}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("nome")}</label>
                    <Controls.Input
                      name="firstname"
                      placeHolder={t("nome")}
                      value={values.firstname}
                      onChange={handleInputChange}
                      width="65%"
                      type="text"
                      error={errors.firstname}
                    />
                  </div>
                  <div>
                  <label className="userLabel">{t("apelido")}</label>
                    <Controls.Input
                      name="lastname"
                      placeHolder={t("apelido")}
                      value={values.lastname}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.lastname}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("email")}</label>
                    <Controls.Input
                      name="email"
                      placeHolder={t("email")}
                      value={values.email}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.email}
                      autoComplete="new-password"
                      autofill="off"
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("contacto")}</label>
                    <Controls.Input
                      name="telephone"
                      placeHolder={t("contacto")}
                      value={values.telephone}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
                      error={errors.telephone}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("endereco")}</label>
                    <Controls.Input
                      name="address"
                      placeHolder={t("endereco")}
                      value={values.address}
                      onChange={handleInputChange}
                      type="text"
                      width="65%"
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
                      width="65%"
                      height="40px"
                    />
                    <AddBox
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={novaCidadeclickPopup}
                    />
                  </div>

                 
               
              </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>

              <div className="newUser">
                  <div style={{ marginBottom: "10px" }}>
                    <label className="userLabel">{t("data_nascimento")}</label>
                    <Controls.Input
                      name="dateofbirth"
                      placeHolder={t("data_nascimento")}
                      value={values.dateofbirth}
                      onChange={handleInputChange}
                      width="65%"
                      type="date"
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("sexo")}</label>
                    <Controls.Select
                      name="gender"
                      label="gender"
                      value={values.gender}
                      onChange={handleInputChange}
                      options={genderItems}
                      width="65%"
                      height="40px"
                      typeOfSelect={1}
                      error={errors.gender}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <label className="userLabel" htmlFor="role">
                      {t("nivel_accesso")}
                    </label>
                    <Controls.Select
                      name="role"
                      label="Role"
                      value={values.role}
                      onChange={handleInputChange}
                      options={getRole}
                      typeOfSelect={1}
                      error={errors.role}
                      width="65%"
                      height="40px"
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("senha")}</label>
                    <Controls.Input
                      name="password"
                      placeHolder={t("senha")}
                      value={values.password}
                      onChange={handleInputChange}
                      width="65%"
                      type="password"
                      autoComplete="new-password"
                      error={errors.password}
                    />
                  </div>

                  <div>
                    <label className="userLabel">{t("confirmar_senha")}</label>
                    <Controls.Input
                      name="password"
                      placeHolder={t("confirmar_senha")}
                      value={values.password}
                      onChange={handleInputChange}
                      type="password"
                      autoComplete="new-password"
                      width="65%"
                      error={errors.password}
                    />
                  </div>

                  <div>
                    <div style={{ marginTop: "10px", marginBottom:"35px" }}>
                      <ImageUpLoad
                        ref={childRef}
                        fotoTitulo={t("foto")}
                        margnLeft="0px"
                        uploadDisplay={true}
                      />
                    </div>
                  </div>
              </div>
              </Grid>

            </div>

            <div className="newUserContainer">
              <div className="newUser">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{ marginTop: "0px", marginLeft: "10px" }}>
                    
                    <Controls.Buttons 
                    type="submit" 
                    text={t("button_gravar")} 
                    className="button"
                    />

                    <Controls.Buttons
                      type="button"
                      text={t("button_limpar")}
                      color="secondary"
                      onClick={ResetForm}
                      className="button"

                    />
                    {/* <Controls.Buttons
                                    type="button"
                                    text={t('sair')}
                                    color="secondary"
                                    onClick={close} 
                   */}

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      {count === 1 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          // title={popupTitle}
          width="800px"
          height="580px"
          closeButtonDisplay={false}
          marginTop="-20px"
        >
          {/* <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
            <label className="userLabel">{t("Recherche")}</label>
            <Controls.Input
              name="sedePesquisa"
              type="text"
              value={sedePesquisa}
              placeHolder={t("sede")}
              width="55%"
              marginLeft="-20px"
              onChange={sedeSearchToToDataGrid}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div> */}
          <SedeSearchTable
            ref={childRefSede}
            idDisplay={true}
            codeDisplay={false}
            actionsButtonSelectDisplay={true}
            actionsButtonDisplayEditDelete={false}
            statusDisplay={true}
            pageSize={9}
            rowPerPage={9}
            backGroundColor="#50394c"
            color="white"
            listarGrid = {true}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              setSedePesquisa("");

              childRefUtilizador.current.userGetAll(id, "SedeID"); // saveImage() = method called

            }}
          />
        </Popup>
      ) : null}

      {Number(count) === 2 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          width="850px"
          height="700px"
          closeButtonDisplay={false}
          marginTop="-10px"
          // title={popupTitle}
        >
          <Pais
            //ref={childRePais}
            // idDisplay={true}
            // codeDisplay={false}
            // statusDisplay={true}
            // actionsButtonSelectDisplay={true} // monstrar o campo = true
            // actionsButtonDisplayEditDelete={false}
            // pageSize={7}
            // rowPerPage={7}
            backGroundColor="darkBlue"
            color="white"
            paisData={(id, code, sede) => {
              // setSede(sede);
              // setSedeID(id);
              // values.sedeID = id
              setOpenPopup(false);
              getPaises();
              // tableAgenciaUpdateData(id);
              // setSedePesquisa("")
            }}
          />
        </Popup>
      ) : Number(count) === 3 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          width="850px"
          height="700px"
          closeButtonDisplay={false}
          marginTop="-10px"
          // title={popupTitle}
        >
          <Cidade
            //ref={childRePais}
            // idDisplay={true}
            // codeDisplay={false}
            // statusDisplay={true}
            // actionsButtonSelectDisplay={true} // monstrar o campo = true
            // actionsButtonDisplayEditDelete={false}
            // pageSize={7}
            // rowPerPage={7}
            backGroundColor="darkBlue"
            color="white"
            cidadeData={(id, code, sede) => {
              // setSede(sede);
              // setSedeID(id);
              // values.sedeID = id
              setOpenPopup(false);
              getPaises();
              // tableAgenciaUpdateData(id);
              // setSedePesquisa("")
            }}
          />
        </Popup>
      ) : null}
    </>
  );
}
