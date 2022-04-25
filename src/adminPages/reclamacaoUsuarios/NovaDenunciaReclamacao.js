import "./DenunciaReclamacao.css";
import { styled } from "@mui/material/styles";
import { Button, Checkbox, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

import { Box, color, textAlign } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import { useTranslation } from "react-i18next";
import { House, Search } from "@mui/icons-material";
import Controls from "../../components/reusableComponents/Controls";
import { Form, useForm } from "../../components/reusableComponents/useForm";
import FuncionarioServices from "../../services/admin/Funcionario.services";
import TipoDenunciaServices from "../../services/admin/TipoDenuncia.services";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import DenunciaTempoSearchTable from "../reclamacaoUsuarios/DenunciaTempoSearchTable";
import FuncionarioSearchTable from "../funcionario/FuncionarioSearchTable";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import Popup from "../../components/reusableComponents/Popup";
import DenunciaTempo from "../../services/admin/DenunciaTempo.service";
import DenunciaService from "../../services/admin/Denuncias.services";

import SedeService from "../../services/admin/Sede.services";
import RatingMotivoService from "../../services/admin/RatingMotivo.service";
import { useNavigate } from "react-router-dom";

import { UserLoggedContext } from "../utilisador/UserLoggedContext";
// import { PublicUserContext } from "../../App";
import { PublicUserContext } from "../../adminPages/reclamacaoUsuarios/PublicUserContext";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectUser } from "../../reducFeatures/userSlice";
import DenunciaTempoService from "../../services/admin/DenunciaTempo.service";
import RatingServices from "../../services/admin/RatingServices";

import swal from "sweetalert";
import sigraLetrasImagem from "../../assets/images/sigraLetrasImagem.png";

const initialFValues = {
  computador: "",
  data: null,
  hora: "",
  sedeID: null,
  agenciaID: null,
  funcionarioID: null,
  rating: 0,
  tipoMovimentodenuncia: "",
  ratingID: "",
  ratingMotivoID: "",
  nomeDenunciante: "",
  telepfoneDenunciante: "",
  emailDenunciante: "",
  queixa: "",
  reclamacaoAnonima: false,
  lingua: "",
  tipoMovimento: 1,
  status: 1,
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

function NovaDenunciaReclamacao() {
  const { t } = useTranslation();
  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState(0);

  const [agencia, setAgencia] = useState("");
  const [agenciaID, setAgenciaID] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  const [count, setCount] = useState(0);
  const [popupTitle, setPpupTitle] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState(0);

  const [codigoPesquisa, setCodigoPesquisa] = useState("Código");
  const [labelPesquisa, setLabelPesquisa] = useState("#Funcionários");

  const [nomePlaceHolder, setNomePlaceHolder] = useState("");
  const [checked, setChecked] = useState(false);
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefDadosDenuncia = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefFuncionario = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [notificatinoShow, setNotificationShow] = useState(false);

  const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState(
    ""
  );

  const currentLanguageCode = "pt"; // cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [tipoDenunciaList, setSipoDenunciaList] = useState([]);

  const [tipoReclamacaoSelecionada, setTipoReclamacaoSelecionada] = useState(0);

  const [codeSede, setCodeSede] = useState("");
  const [emailSede, setEmailSede] = useState("");
  const [contactoSede, setcontactoSede] = useState("");

  const { sedeParam, setSedeParam } = useContext(PublicUserContext);

  const [sedaData, setSedaData] = useState([]);
  const [Ratingdata, setRatingData] = useState([]);
  const [RatingMotivodata, setRatingMotivoData] = useState([]);

  const navigate = useNavigate();

  // const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  // const user = useSelector(selectUser); // user.name c'est le nom de l'utilisateur qui affiche dans la page, ça vient de useeSlice.js
  // const dispatch = useDispatch();

  let fotoFuncionario = "";

  const _isMounted = useRef(true);

  let dadosSede = useState({});

  // const sedeParam = useContext(PublicUserContext);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const validate = (fieldValues = values) => {};

  // const validate = (fieldValues = values) => {
  //   let validationErrorM = {};
  //   alert("15");
  //   // if ("primeiroNome") validationErrorM.primeiroNome = primeiroNome ? "" : " "; // This field is Required
  //   // if ("apelido") validationErrorM.apelido = apelido ? "" : " "; // This field is Required

  //   // if ("nome" in fieldValues)
  //   //   validationErrorM.nome = fieldValues.nome ? "" : " ";

  //   // // if ('tipodenunciaID' in fieldValues)
  //   // //     validationErrorM.tipodenunciaID = fieldValues.tipodenunciaID ? "" : " "

  //   // // if ('queixa' in fieldValues)
  //   // //     validationErrorM.queixa = fieldValues.queixa ? "" : " "

  //   // if ("emailDenunciante" in fieldValues)
  //   //   validationErrorM.emailDenunciante = /$^|.+@.+..+/.test(
  //   //     fieldValues.emailDenunciante
  //   //   )
  //   //     ? ""
  //   //     : " ";

  //   setErrors({
  //     ...validationErrorM,
  //   });

  //   return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  // };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  ); // use

  useEffect(() => {
    //     if('caches' in window){
    //       caches.keys().then((names) => {
    //      // Delete all the cache files
    //      names.forEach(name => {
    //          caches.delete(name);
    //      })
    //  });

    // }
    //  // Makes sure the page reloads. Changes are only visible after you refresh.
    //  window.location.reload(true);

    let cancel = false;

    getSedeDados2(5);

    values.computador = getNomeComputador();

    //SedeService.getID(1).then((response) => {
    // if (cancel) return;

    //alert("ici");
    //setSedeID(response.data.id);
    //setSedaData(response.data);
    //values.sedeID = response.data.id;

    // setCodeSede(response.data.code);
    // setEmailSede(response.data.email);
    // setcontactoSede(response.data.contacto);
    // });

    ratingDescricaoGet(values.sedeID, 0);

    // getSedeData();
    return () => {};
  }, []);

  const getNomeComputador = () => {
    return Math.random()
      .toString(36)
      .slice(2, 7);
  };

  const getSedeData = () => {
    let sedeIDL = localStorage.getItem("sedeID");
    let sedelocal = localStorage.getItem("sede");
    let codesedeLocal = localStorage.getItem("codesede");
    let emailSede = localStorage.getItem("emailSede");
    let constactoSede = localStorage.getItem("constactoSede");

    setSede(sedelocal);
    // setSedeID(sedeIDL);
    // values.sedeID = sedeIDL;
    // setCodeSede(codesedeLocal);
    // setEmailSede(emailSede);
    // setcontactoSede(constactoSede);
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

  const TipoDenunciaGetAll = (abreviationLanguem1, sedeID1) => {
    TipoDenunciaServices.getAll(abreviationLanguem1, sedeID1)
      .then((response) => {
        setSipoDenunciaList(response.data);
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

  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.checked) {
      values.nomeDenunciante = "Anônimo";
      values.telepfoneDenunciante = "Anônimo";
      values.emailDenunciante = "anonimo@anonimo.com";
      values.reclamacaoAnonima = true;
    } else {
      values.nome = "";
      values.telepfoneDenunciante = "";
      values.emailDenunciante = "";
      values.reclamacaoAnonima = false;
    }

    setChecked(event.target.checked);
  };

  const onclickFuncionarioPopup = () => {
    setSedeID(values.sedeID);
    setCount(1);
    setPpupTitle(t("lista_funcionario"));
    setOpenPopup(true);
    values.tipoMovimentodenuncia = "Funcionario";
  };

  const onclickAgenciaopup = () => {
    setSedeID(values.sedeID);
    setCount(2);
    setPpupTitle(t("lista_funcionario"));
    setOpenPopup(true);
    values.tipoMovimentodenuncia = "Centro Trabalho";
  };

  const getTime = () => {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    values.hora = time;
    let today2 = new Date().toLocaleDateString();
    values.data = today2;
  };

  const guardarDenunciasTempo = async (e) => {
    //e.preventDefault();
    getTime(); // data e hora da denuncia
    values.abreviationLangue = currentLanguageCode;

    if (values.tipoMovimentodenuncia !== "Funcionario") {
      const count = await DenunciaTempo.getAll(
        values.computador,
        values.tipoMovimentodenuncia
      );

      if (Number(count.data.length) > 0) {
        return swal(
          t("Atenção"),
          t("O Tipo de reclamação já existe na sua Selecção"),
          "warning"
        );
      }
    }

    DenunciaTempo.create(values)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: t("mensagem_Gravar_Nova_Agencia"),
          type: "success",
        });
        setNotificationShow(true);
        getGetAllDataTempo(values.computador);

        //  continueOrNot();getGetAllDataTempo
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGetAllDataTempo = (nomeComputador1) => {
    childRefDadosDenuncia.current.getGetAllData(nomeComputador1);
  };

  async function getReclamacaoTempoExiste(nomeComputador1, tipoDenunciaTempo) {
    const count = await DenunciaTempo.getAll(
      nomeComputador1,
      tipoDenunciaTempo
    );
    return count.data.length;
  }

  const getSedeDados2 = async (sedeIDLo) => {
    await SedeService.getID(sedeIDLo).then((response) => {
      // if (cancel) return;

      //setSedeID(response.data.id);
      setSedaData(response.data);
      values.sedeID = response.data.id;
      ratingDescricaoGet(values.sedeID, 0);
      // const count = await DenunciaTempo.getAll(
      //   nomeComputador1,
      //   tipoDenunciaTempo
      // );
      // return count.data.length;
    });
  };

  // const getReclamacaoTempoExiste = (nomeComputador1, tipoDenunciaTempo) => {

  //   let count = 0;
  //   DenunciaTempo.getAll(nomeComputador1, tipoDenunciaTempo)
  //   .then((response) => {
  //     count = response.data.length;
  //     alert(count)
  //   })

  //   return count;

  // };

  const nomeSedeFind = async (e) => {
    const response = await SedeService.getID(sedeID);

    setSede(response.data.sede);
    setCodeSede(response.data.code);
    setEmailSede(response.data.email);
    setcontactoSede(response.data.contacto);

    getGetAllDataTempo(values.computador);
  };

  const denunciaContraEmpresa = () => {
    values.tipoMovimentodenuncia = "Empresa";

    //values.sedeID = sedeID;
    values.agenciaID = null;
    values.funcionarioID = null;

    guardarDenunciasTempo();
  };
  const denunciaContraProduto = () => {
    values.tipoMovimentodenuncia = "Produto";

    //values.sedeID = sedeID;
    values.agenciaID = null;
    values.funcionarioID = null;

    guardarDenunciasTempo();
  };

  const denunciaContraServico = () => {
    values.tipoMovimentodenuncia = "Servico";

    // values.sedeID = sedeID;
    values.agenciaID = null;
    values.funcionarioID = null;

    guardarDenunciasTempo();
  };

  const denunciaContraOutras = () => {
    values.tipoMovimentodenuncia = "Outras";

    //values.sedeID = sedeID;
    values.agenciaID = null;
    values.funcionarioID = null;

    guardarDenunciasTempo();
  };
  const ratingMotivoGet = (sedeID1, rating1) => {
    RatingMotivoService.getAll(sedeID1, rating1).then((response) => {
      setRatingMotivoData(response.data);
    });
  };
  const ratingAvaliacaoDescricaoChange = (e) => {
    let ratingIDLocal = e.target.value;
    handleInputChange(e);
    ratingMotivoGet(values.sedeID, ratingIDLocal);

    //ratingMotivoTable(values.sedeID, ratingIDLocal);
  };

  const sair = () => {
    navigate("/login");
  };

  const ratingDescricaoGet = (sedeID1, rating1) => {
    RatingServices.getAll(sedeID1, rating1).then((response) => {
      setRatingData(response.data);
    });
  };

  const gravarDenuncias = (e) => {
    e.preventDefault();

    swal({
      title: t("Deseja Gravar a Reclamação? "),
      //  text: message,
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DenunciaService.create(values)
          .then((response) => {
            if (response.data.length > 0) {
              swal(t("Reclamação enviada com Sucesso!"), {
                icon: "success",
              });
            } else {
              swal(t("Nehuma Reclamação foi encontrada"), {
                icon: "error",
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  return (
    <>
      <Form onSubmit={gravarDenuncias} autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0.5}>
            <Grid item xs={11}>
              <ItemMainTitlo
                style={{
                  // borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "thin",
                }}
              >
                <PageHeader
                  title={t("Cadastrar Reclamações")}
                  subTitle={t("header_subTitle_denuncia_novo")}
                  backGroundColor="#5e6472"
                  color="white"
                  icon={<House />}
                ></PageHeader>
              </ItemMainTitlo>
            </Grid>

            <Grid item xs={1}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "thin",
                  height: "9vh",
                }}
              >
                <div>
                  <img
                    style={{
                      height: "9vh",
                      width: "100%",
                      // objectFit: "contain"
                    }}
                    src={sigraLetrasImagem}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderStyle: "solid",
                        borderColor: "black",
                        borderWidth: "thin",
                        height: "5.8vh",
                        backgroundColor: "#f0efeb",
                        color: "black",
                        fontWeight: 600,
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      <div style={{ marginTop: "5px" }}>{sedaData.sede}</div>
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <Item
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "thin",
                  height: "58%",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    Code: {sedaData.code}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    Email: {sedaData.email}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    Contacto: {sedaData.contacto}
                  </span>
                </div>

                {/* </Grid> */}
                {/* </Box> */}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item
                style={{
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderWidth: "thin",
                  height: "3.5vh",
                  backgroundColor: "#f0efeb",
                  color: "black",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                RECLAMAÇÃO CONTRA
              </Item>

              <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <Item
                        style={{
                          borderStyle: "solid",
                          borderColor: "gray",
                          borderWidth: "thin",
                          height: "75%",
                        }}
                      >
                        <div
                          style={{ marginTop: "-18px", marginLeft: "-17px" }}
                        >
                          <div>
                            <Controls.Buttons
                              type="button"
                              text={t("Funcionários")}
                              color="success"
                              size="small"
                              width="90%"
                              fullWidth={false}
                              onClick={onclickFuncionarioPopup}
                            />
                          </div>

                          <div style={{ marginTop: "-20px" }}>
                            <Controls.Buttons
                              type="button"
                              text={t("Centro-Trabalho")}
                              color="secondary"
                              size="small"
                              width="90%"
                              fullWidth={false}
                              // variant="outlined"

                              onClick={onclickAgenciaopup}
                            />
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={4}>
                      <Item
                        style={{
                          borderStyle: "solid",
                          borderColor: "gray",
                          borderWidth: "thin",
                          height: "75%",
                        }}
                      >
                        <div
                          style={{ marginTop: "-15px", marginLeft: "-17px" }}
                        >
                          <div style={{ marginTop: "-20px" }}>
                            <Controls.Buttons
                              type="button"
                              text={t("Empresa")}
                              color="info"
                              size="small"
                              width="90%"
                              fullWidth={false}
                              onClick={denunciaContraEmpresa}
                            />
                          </div>

                          <div
                            style={{ marginTop: "-15px", marginLeft: "-2px" }}
                          >
                            <Controls.Buttons
                              type="button"
                              text={t("Produto")}
                              color="warning"
                              size="small"
                              width="90%"
                              onClick={denunciaContraProduto}
                            />
                          </div>
                        </div>
                      </Item>
                    </Grid>

                    <Grid item xs={4}>
                      <Item
                        style={{
                          borderStyle: "solid",
                          borderColor: "gray",
                          borderWidth: "thin",
                          height: "75%",
                          // marginLeft: "-10px",
                        }}
                      >
                        <div
                          style={{ marginTop: "-20px", marginLeft: "-10px" }}
                        >
                          <Controls.Buttons
                            type="button"
                            text={t("Serviço")}
                            color="primary"
                            size="small"
                            width="90%"
                            onClick={denunciaContraServico}
                          />
                          {/* <Controls.CheckBox
                  name="reclamacaoServico"
                  label="Contra o Serviço"
                  value={values.reclamacaoServico}
                  onChange={handleInputChange}
                /> */}
                        </div>

                        <div
                          style={{ marginTop: "-20px", marginLeft: "-10px" }}
                        >
                          <Controls.Buttons
                            type="button"
                            text={t("Outras...")}
                            color="success"
                            size="small"
                            width="90%"
                            onClick={denunciaContraOutras}
                          />
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderStyle: "solid",
                        borderColor: "gray",
                        height: "5vh",
                        backgroundColor: "#f0efeb",
                        color: "black",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      RECLAMAÇÕES SELECIONADAS
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "gray",
                  height: "52.4vh",
                }}
              >
                <div style={{ marginTop: "5px" }}>
                  <DenunciaTempoSearchTable
                    ref={childRefDadosDenuncia}
                    idDisplay={false}
                    nomeDisplay={true}
                    tipoDenunciaDisplay={false}
                    dataDisplay={false}
                    horaDisplay={false}
                    emailDisplay={false}
                    telefoneDislay={false}
                    statusDisplay={false}
                    queixaDisplay={false}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={false}
                    backGroundColor="#f0efeb"
                    color="black"
                    sedeID={sedeID}
                    nomeComputador={values.computador}
                    tipoMovimento={1}
                    agenciaID={agenciaID}
                    pageSize={7}
                    rowPerPage={7}
                  />
                </div>
              </div>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        borderStyle: "solid",
                        borderColor: "gray",
                        height: "5vh",
                        backgroundColor: "#f0efeb",
                        color: "black",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      DADOS DO CLIENTE
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{ flexGrow: 3 }}
                display="flex"
                flex="1"
                justifyContent="space-around"
              >
                <Grid container spacing={0}>
                  <Grid item xs={9}>
                    <div
                      style={{
                        borderStyle: "solid",
                        borderWidth: "thin",
                        borderColor: "gray",
                        height: "52.5vh",
                        width: "100%",
                        // maxHeight: "100vh",
                        maxHeight: "52.5vh",
                        overflowY: "auto",
                        overflow: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      <div style={{ marginLeft: "5px" }}>
                        <div style={{ marginTop: "0px" }}>
                          <label className="userLabel">{t("nome")}</label>
                          <Controls.Input
                            name="nomeDenunciante"
                            placeHolder={t("denunciante")}
                            value={values.nomeDenunciante}
                            onChange={handleInputChange}
                            width="79%"
                            type="text"
                            error={errors.nome}
                          />
                        </div>

                        <div>
                          <label className="userLabel">{t("contacto")}</label>
                          <Controls.Input
                            name="telepfoneDenunciante"
                            placeHolder={t("contacto")}
                            value={values.telepfoneDenunciante}
                            onChange={handleInputChange}
                            width="79%"
                            type="text"
                          />
                        </div>
                        <div>
                          <label
                            style={{ marginTop: "10px" }}
                            className="userLabel"
                          >
                            {t("email")}
                          </label>
                          <Controls.Input
                            name="emailDenunciante"
                            placeHolder={t("email")}
                            value={values.emailDenunciante}
                            onChange={handleInputChange}
                            width="79%"
                            type="text"
                            error={errors.emailDenunciante}
                          />
                        </div>

                        <div>
                          <label className="userLabel">{t("queixa")}</label>
                          <Controls.Input
                            name="queixa"
                            placeHolder={t("queixaPlaceOrder")}
                            value={values.queixa}
                            onChange={handleInputChange}
                            type="text"
                            width="79%"
                            multiline
                            rows={3}
                            height="100px"
                            error={errors.queixa}
                          />
                        </div>
                      </div>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <div
                              style={{
                                borderStyle: "solid",
                                borderColor: "gray",
                                borderWidth: "thin",
                                height: "5vh",
                                backgroundColor: "#f0efeb",
                                color: "black",
                                fontWeight: 600,
                                textAlign: "center",
                                maxHeight: "5.5vh",
                                // overflowY: "auto",
                                // overflow: "auto",
                              }}
                            >
                              <div>
                                <span>AVALIAÇÃO</span>
                              </div>
                            </div>

                            <Grid item xs={12}>
                              <div
                                style={{
                                  // borderStyle: "solid",
                                  // borderColor: "gray",
                                  // borderWidth: "thin",
                                  height: "20.5vh",
                                }}
                              >
                                <div>
                                  <label
                                    className="userLabel"
                                    // style={{
                                    //   marginTop: "10px",
                                    //   fontSize: "12px",
                                    //   width: "60px",
                                    // }}
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
                                    id="fixInputSize" //Works
                                    //error={errors.role}
                                    width="79%"
                                    height="40px"
                                  />
                                </div>
                                {/* </div> */}
                                {/* </Grid> */}

                                {/* <Grid item xs={6}>
                    <div
                      style={{
                        borderStyle: "solid",
                        borderColor: "gray",
                        borderWidth: "thin",
                        height: "7.5vh",
                      }}
                    > */}
                                <div style={{ marginTop: "3px" }}>
                                  <label
                                    className="userLabel"
                                    // style={{
                                    //   marginTop: "10px",
                                    //   fontSize: "13px",
                                    //   width: "60px",
                                    // }}
                                    htmlFor="classificacao"
                                  >
                                    {t("Motivo")}
                                  </label>
                                  {/* <div style={{ marginLeft: "10px" }}> */}
                                  <Controls.Select
                                    name="ratingMotivoID"
                                    label="ratingMotivoID"
                                    value={values.ratingMotivoID}
                                    onChange={handleInputChange}
                                    options={RatingMotivodata}
                                    typeOfSelect={4}
                                    //error={errors.role}
                                    width="79%"
                                    height="40px"
                                  />
                                  {/* </div> */}
                                </div>
                              </div>
                            </Grid>
                            {/* </div>
                  </Grid> */}
                          </Grid>
                        </Grid>
                      </Box>

                      {/* </Grid>
            </Box> */}
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    direction="column"
                    style={{
                      border: "solid 1px",
                      height: "53vh",
                      overflowY: "auto",
                      overflow: "auto",
                      overflowX: "hidden",
                      // backgroundColor: "#5e6472",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}
                         style={{
                          border: "solid 1px",
                          maxHeight: "100%",
                          height: "100%",
                          overflowY: "auto",
                          overflow: "auto",
                          overflowX: "hidden",
                          backgroundColor: "#5e6472",
                        }}
                        >
                          <Item
                            style={{
                              borderStyle: "solid",
                              // backgroundColor: "#edf2fb",
                              borderWidth: "thin",
                              height: "2%",
                              boxShadow: "none",
                            }}
                          >
                            <div style={{ marginTop: "-15px" }}>
                              <Controls.CheckBox
                                //  checked={checked}
                                name="reclamacaoAnonima"
                                onChange={handleChange}
                                label="Anônima"
                                value={values.reclamacaoAnonima}
                                // onChange={handleInputChange}
                              />
                            </div>
                          </Item>

                          <Grid item xs={12}>
                            {/* <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={12} sm={12}> */}
                            <Item
                              style={{
                                // borderStyle: "solid",
                                // borderWidth: "thin",
                                // backgroundColor: "#5e6472",
                                maxHeight: "75%",
                                boxShadow: "none",
                              }}
                            >
                              <div>
                                <img
                                  style={{ height: "100%", width: "100%" }}
                                  src={sigraLetrasImagem}
                                />
                              </div>
                            </Item>
                          </Grid>

                          <Grid item xs={12}>
                            <Item
                              style={{
                                boxShadow: "none",
                                // height: "45%",
                                // borderStyle: "solid",
                                // borderColor: "gray",
                                // borderWidth: "thin",
                                // backGroundColor: "#f0efeb",
                                maxHeight: "25%",
                                height: "25%",

                                alignContent: "center",
                                textAlign: "center",
                                // backgroundColor: "#5e6472",
                                marginTop: "3px",

                                // msTransform: "translateY(-50%)",
                                // transform: "translateY(-50%)",
                              }}
                            >
                              <div
                                style={{
                                  // marginTop: "12x",
                                  // // marginLeft: "-5px",
                                  // backGroundColor: "#f0efeb",
                                  // // position: "absolute",
                                  // // top: "50%",

                                   marginLeft: "-12px",
                                  // borderStyle: "solid",
                                }}
                              >
                                <div
                                 style={{ marginTop: "0px", marginLeft: "-18px"}}
                                >
                                  <Controls.Buttons
                                    type="submit"
                                    text={t("Gravar")}
                                    color="info"
                                    size="small"
                                    width="100%"
                                    onClick={gravarDenuncias}
                                  />
                                </div>

                                <div
                                  style={{
                                   marginTop: "-18px",
                                    marginLeft: "-18px",
                                  }}
                                >
                                  <Controls.Buttons
                                    type="button"
                                    text={t("Fechar")}
                                    color="warning"
                                    size="small"
                                    width="100%"
                                    onClick={sair}
                                  />
                                </div>
                              </div>
                            </Item>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* </Grid> */}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* </Grid>
          </Grid> */}
        {/* </Box> */}
        {/* </Grid> */}
        {/* </Grid> */}
        {/* </Box> */}
        {/* </Grid> */}
        {/* </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box> */}

        {Number(count) === 1 ? (
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            //pageHeader={PopupHeaderUniversity()}
            buttonColor="secondary"
            // title={popupTitle}
            width="850px"
            height="120vh"
            marginTop="-65px"
            closeButtonDisplay={false}
            setCloseButtonDisplayForHerey={false}
          >
            <FuncionarioSearchTable
              ref={childRefFuncionario}
              idDisplay={false}
              agenciaDisplay={false}
              codeDisplay={false}
              fotoDisplay={true}
              primeiroNomeDisplay={false}
              ultimonomeDisplay={false}
              emailDisplay={false}
              actionsButtonDisplaySelect={true}
              telefoneDislay={false}
              statusDisplay={true}
              actionsButtonDisplayEditDelete={false}
              backGroundColor="darkBlue"
              sedeID={sedeID}
              agenciaID={agenciaID}
              color="white"
              pageSize={9}
              rowPerPage={9}
              funcionariosData={(
                id,
                code,
                primeironome,
                ultimonome,
                telefone,
                agencia,
                agenciaID,
                email,
                endereco,
                imageName
              ) => {
                if (id !== undefined) {
                  values.sedeID = sedeID;
                  values.agenciaID = agenciaID;
                  setAgencia(agencia);

                  // setPrimeiroNome(primeironome);
                  // setApelido(ultimonome);
                  // setTelefone(telefone);
                  // setEmail(email);
                  // setTelefone(telefone);
                  // setEndereco(endereco);
                  values.rating = 0;
                  values.funcionarioID = id;

                  //setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + imageName);
                  //sendImageFromImageUpload(imageName);

                  guardarDenunciasTempo();

                  setOpenPopup(false);
                } else {
                  setOpenPopup(false);
                }
              }}
            />
          </Popup>
        ) : Number(count) === 2 ? (
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            //pageHeader={PopupHeaderUniversity()}
            buttonColor="secondary"
            title="Listagem Agencias"
            width="800px"
            height="650px"
            marginTop="-35px"
          >
            <AgenciaSearchTable
              idDisplay={false}
              codeDisplay={true}
              emailDisplay={false}
              statusDisplay={true}
              actionsButtonDisplaySelect={true}
              actionsButtonDisplayEditDelete={false}
              backGroundColor="#d2e5d0"
              color="black"
              idSede={sedeID}
              // userID={userID}
              pageSize={10}
              rowPerPage={10}
              agenciaData={(id, code, agencia, cidade, email, telefone) => {
                values.sedeID = sedeID;
                values.agenciaID = id;
                setAgencia(agencia);
                setAgenciaID(id);
                values.funcionarioID = null;

                guardarDenunciasTempo();
                getGetAllDataTempo(values.computador);

                setOpenPopup(false);
              }}
            />
          </Popup>
        ) : null}
      </Form>
    </>
  );
}

export default NovaDenunciaReclamacao;
