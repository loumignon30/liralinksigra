import "./login.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Controls from "../../components/reusableComponents/Controls";
import { Form, useForm } from "../../components/reusableComponents/useForm";
import UserLoginService from "../../services/admin/UserLogin.services";
import { UserLoggedContext } from "./UserLoggedContext";
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  House,
  InfoRounded,
  Language,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import SedeService from "../../services/admin/Sede.services";
import { Button, Grid } from "@mui/material";
import landingPage1 from "../../assets/images/landingPage1.png";
import liralink from "../../assets/images/liralink.jpg";
import sugestoesImagem from "../../assets/images/sugestoesImagem.png";
import reclamacoesImagem from "../../assets/images/reclamacoesImagem.png";
import avaliacoesImagem from "../../assets/images/avaliacoesImagem.png";
import sigraLetrasImagem from "../../assets/images/sigraLetrasImagem.png";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { borderColor, Box } from "@mui/system";

import * as languagesFile from "../../services/admin/Languages";
import { useTranslation } from "react-i18next";
import "flag-icon-css/css/flag-icons.min.css";
import i18next from "i18next";
import cookies from "js-cookie";
import NovaDenunciaReclamacao from "../reclamacaoUsuarios/NovaDenunciaReclamacao";

// import { PublicUserContext } from "../../App";
import { PublicUserContext } from "../../adminPages/reclamacaoUsuarios/PublicUserContext";

import { useDispatch } from "react-redux";
import { dadosSede } from "../../reducFeatures/userSlice"

const initialValues = {
  email: "",
  password: "",
};

const languages = [
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "pt",
    name: "Português",
    country_code: "pt",
  },

  {
    code: "ar",
    name: "العربية",
    country_code: "sa",
    dir: "rtl",
  },
];
const Login = (props) => {
  // const { values, setValues, handleInputChange } = useForm(initialValues)  // useForm = useForm.js
  const [userData, setUserData] = useState({});
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  //   const { sedeParam, setSedeParam } = useContext(PublicUserContext);

  const { sedeParam, setSedeParam } = useContext(PublicUserContext);

  const [exampleState, setExampleState] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [sedeID, setSedeID] = useState(0);
  const [codeSede, setCodeSede] = useState("");
  const [nomeSede, setNomeSede] = useState("");
  const [emailSede, setEmailSede] = useState("");
  const [sedeContacto, setSedeContacto] = useState("");
  const [sedeEndereco, setSedeEndereco] = useState("");
  const [sedeCidade, setSedeCidade] = useState("");
  const [sedePais, setSedePais] = useState("");
  const [sedeImageFile, setSedeImageFile] = useState("");

  const [message, setMessage] = useState("");

  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const [showLnguage, setShowLnguage] = useState(false);
  const [imageBanner, setImageBanner] = useState(landingPage1);
  const [display, setDisplay] = useState(1);

  const componentRefLanguages = useRef();



  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : " "; // This field is Required
    if ("password" in fieldValues)
      validationErrorM.password = fieldValues.password ? "" : " "; // This field is Required

    setErrors({
      ...validationErrorM,
    });
    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  ); // useForm = useForm.js. We defined - validateOnChange=false

  // const getGetAllData = () => {
  //     SedeService.getAll()
  //         .then(response => {
  //             response.data.map(info => {
  //                 setSedeID(info.id)
  //                 setCodeSede(info.code)
  //                 setNomeSede(info.sede)
  //                 setEmailSede(info.email)
  //                 setSedeContacto(info.contacto)
  //                 setSedeEndereco(info.endereco)
  //                 setSedeCidade(info.cidade)
  //                 setSedePais(info.pais)
  //                 setSedeImageFile(info.imageName)

  //             })
  //         })
  //         .catch(e => {
  //             console.log(e);
  //         });
  // }

  let testData = [];
  let nivelAcessoTest = 0;
  const dispatch = useDispatch();  // pour mettre les données dans le reducer (slices)

  
  useEffect(() => {}, []);


  const getSedeData = () => {

    let cancel = false;


    // SedeService.getID(1).then((response) => {

    //     localStorage.setItem("sede", response.data.sede); // guardar o Token (token) no armazenamento local
    //     localStorage.setItem("sedeID", response.data.id); // guardar o Token (token) no armazenamento local
    //     localStorage.setItem("codesede", response.data.code); // guardar o Token (token) no armazenamento local
    //     localStorage.setItem("emailSede", response.data.email); // guardar o Token (token) no armazenamento local
    //     localStorage.setItem("constactoSede", response.data.contacto); // guardar o Token (token) no armazenamento local

    // })
        
  };

  const userGetEmail = async () => {
    localStorage.removeItem("token"); // Remover  o Token (token) no armazenamento local

    UserLoginService.getUserEmail(values.email, values.password).then(
      (response) => {
        testData = response.data;

        if (testData.error) {
          setUserSavedValue(false);
          setMessage("Usuario é senha incorrectos1!");
          return;
        }

        // test data *************************************************
        if (testData.user.id > 0) {
          localStorage.setItem("token", testData.token); // guardar o Token (token) no armazenamento local
          setUserSavedValue([
            {
              id: testData.user.id,
              firstname: testData.user.firstname,
              lastname: testData.user.lastname,
              sexo: testData.user.gender,
              photofilename: testData.user.photofilename,
              nivelAcesso: testData.user.nivelAcesso,
              status: testData.user.status,
              sedeID: testData.user.sedeID,
              sede: testData.user.sede,
              email: testData.user.email,
              contacto: testData.user.telephone,
              endereco: testData.user.address,
              cidade: testData.user.city,
              pais: testData.user.country,
              sedeID_pesquisas: "",
              sede_pesquisa: "",
              agenciaID_pesquisa: "",
              agencia_pesquisa: "",
              provenienciaFormulario: "",
            },
          ]);
          // })

          navigate("/Home");

          // })
          // .catch(e => {
          //     console.log(e);
          // });
        }
        // else {
        //     setUserSavedValue(false);
        //     setMessage("Usuario é senha incorrectos1!")
        // }
        // end test data *********************************************
      }
    );
    //.then(data => {console.log("User Name or Password Incorrect1!!!")})
    // .then(response  => {console.log("User Name or Password Incorrect2!!!")})
    //  .catch(error => (console.log("Usuario é senha incorrectos2!"))) //setMessage( error.response.data.message));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    userGetEmail(); //

    //ResetForm();
    //tableUpdateData();
    // if (validate()) {
  };
  const resetForm = () => {};
  const clicklanguage = () => {
    setShowLnguage(!showLnguage);
  };

  const reclamacoesClick = () => {
    navigate("/novaDenunciaReclamacao");
  };

  const sugestoesClick = () => {
    navigate("/sugestoes");
  };

  const avaliacoesClick = () => {
    navigate("/avaliacoes");
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const ItemTop = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    backgroundColor: "#03045e",
    color: "white",
  }));

  const ItemSemCor = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    borderStyle: "none",
    // backgroundColor: "white",
  }));

  const commonStyles = {
    bgcolor: "background.paper",
    border: 1,
    // m: 1,
    borderColor: "text.primary",
    width: "5rem",
    height: "3rem",
  };

  return (
    <>
      <div style={{ backgroundColor: "#01372f", color: "#01372f" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} alignItems="stretch">
            <Grid item xs={1}>
              {/* <ItemTop
                style={
                  {
                    // borderStyle: "solid"
                  }
                }
              > */}
              {/* LOGO LIRA LINK */}
              <div
                className="rows"
                style={{
                  marginTop: "0px",
                  height: "55px",
                  backgroundColor: "#03045e",
                  boxShadow: "none",
                }}
              ></div>
              {/* </ItemTop> */}
            </Grid>

            <Grid item xs={1}>
              {/* <ItemTop
                style={
                  {
                    // borderStyle: "solid"
                  }
                }
              > */}
              {/* MEIO */}
              <div
                className="rows"
                style={{
                  marginTop: "0px",
                  height: "55px",
                  backgroundColor: "#03045e",
                  boxShadow: "none",
                }}
              ></div>
              {/* </ItemTop> */}
            </Grid>

            <Grid item xs={10}>
              {/* <ItemTop
                style={
                  {
                    //  borderStyle: "solid",
                    //  borderColor: "black"
                  }
                }
              > */}
              {/* LOGIN */}
              {/* <Form onSubmit={handleSubmit}> */}
              <div
                className="rows"
                style={{
                  marginTop: "0px",
                  backgroundColor: "#03045e",
                  height: "55px",
                  display: "flex",
                  justifyContent: "flex-end",
                  boxShadow: "none",
                }}
              >
                <div className="row" style={{ color: "white" }}>
                  <Controls.Input
                    name="email"
                    placeHolder={t("email")}
                    value={values.email}
                    onChange={handleInputChange}
                    type="text"
                    width="95%"
                    height="35px"
                    error={errors.email}
                    InputProps={{
                      startAdornment: <EmailIcon />, // <== adjusted this
                      // disableUnderline: true, // <== added this
                    }}
                  />
                </div>
                <div className="row">
                  <Controls.Input
                    name="password"
                    placeHolder={t("senha")}
                    value={values.code}
                    onChange={handleInputChange}
                    type="password"
                    width="95%"
                    height="35px"
                    error={errors.password}
                    InputProps={{
                      startAdornment: <KeyIcon />, // <== adjusted this
                      // disableUnderline: true, // <== added this
                    }}
                  />
                </div>

                <div className="row" style={{ marginTop: "-10px" }}>
                  <Button
                    variant="contained"
                    style={{ marginTop: "15px" }}
                    size="small"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                  {/* <Button
                      type="button"
                      text={t("login")}
                      // className="button"
                      onClick={handleSubmit}
                    //   size="small"
                    /> */}
                </div>
              </div>
              {/* </Form> */}
              {/* </ItemTop> */}
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, border: 0 }}>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Item
                style={{
                  height: "100vh",
                  // borderStyle: "solid",
                  // borderColor: "black",
                  backgroundColor: "#01372f",
                  boxShadow: "none",
                }}
              >
                <Grid item xs={4}>
                  <Item
                    style={{
                      height: "10vh",
                      width: "10vh",
                      // borderStyle: "solid",
                      // borderColor: "black",
                      backgroundColor: "#01372f",
                      boxShadow: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "50%",
                        boxShadow: "none",
                      }}
                    >
                      {/* <div>
                        <img
                          style={{ height: "100%", width: "100%",
                          backgroundColor: "#01372f"}}
                          src={liralink}
                        />
                      </div> */}
                    </Box>
                  </Item>
                </Grid>
                {/* CONTEUDO1 */}
                <Grid item xs={8}>
                  <Item
                    style={{
                      height: "78vh",
                      width: "142%",
                      borderStyle: "none",
                      //   borderColor: "white",
                      color: "#01372f",
                      backgroundColor: "#01372f",
                      boxShadow: "none",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        src={sugestoesImagem}
                      />
                    </div>
                  </Item>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item
                style={{
                  height: "90vh",
                  // borderStyle: "solid",
                  // borderColor: "black",
                  backgroundColor: "#01372f",
                  boxShadow: "none",
                }}
              >
                {/* RECLAMACOES - ici */}
                <Grid item xs={8}>
                  <Item
                    style={{
                      height: "40vh",
                      width: "142%",
                      backgroundColor: "#01372f",
                      borderStyle: "none",
                      boxShadow: "none",
                      //   borderColor: "red",
                    }}
                  >
                    <div>
                      <Link to="/novaDenunciaReclamacao">
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#01372f",
                            color: "#01372f",
                            cursor: "pointer",
                            boxShadow: "none",
                          }}
                          src={reclamacoesImagem}
                          onClick={getSedeData}
                        />
                      </Link>
                    </div>
                  </Item>
                </Grid>
              </Item>
            </Grid>

            <Grid item xs={4}>
              <Item
                style={{
                  height: "100vh",
                  backgroundColor: "#01372f",
                  boxShadow: "none",
                  // borderStyle: "solid",
                  // borderColor: "black",
                }}
              >
                {/* CONTEUDO AVALIAÇOES */}
                <Grid item xs={6}>
                  <ItemSemCor
                    style={{
                      height: "30vh",
                      width: "190%",
                      //  borderStyle: "solid",
                      // borderColor: "white",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#01372f",
                      boxShadow: "none",
                    }}
                  >
                    <div>
                      <img
                        style={{ height: "100%", width: "100%" }}
                        src={sigraLetrasImagem}
                      />
                    </div>
                  </ItemSemCor>
                </Grid>

                <Grid item xs={2}>
                  <ItemSemCor
                    style={{
                      height: "10vh",
                      width: "142%",
                      //  borderStyle: "solid",
                      // borderColor: "white",
                      backgroundColor: "#01372f",
                      boxShadow: "none",
                    }}
                  >
                    <div>
                      {/* <img
                      style={{ height: "100%", width: "100%" }}
                      src={avaliacoesImagem}
                    /> */}
                    </div>
                  </ItemSemCor>
                </Grid>

                <Grid item xs={8}>
                  <Item
                    style={{
                      height: "40vh",
                      width: "142%",
                      borderStyle: "none",
                      //   borderColor: "white",
                      backgroundColor: "#01372f",
                      boxShadow: "none",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        src={avaliacoesImagem}
                      />
                    </div>
                  </Item>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>

        {/* <div className="bodyLogin"></div> */}
      </div>
    </>
  );
};

export default Login;
