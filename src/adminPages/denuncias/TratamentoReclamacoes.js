import { House } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { borderColor, Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Controls from "../../components/reusableComponents/Controls";
import { useForm } from "../../components/reusableComponents/useForm";
import { pink } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import DenunciaSearchTable from "./DenunciaSearchTable";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import DenunciasServices from "../../services/admin/Denuncias.services";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";

import { NotificationsNone, Settings, Language } from "@mui/icons-material";

import NotificaoService from "../../services/admin/Notificao.service";
import swal from "sweetalert";

import NotificacaoSearchTable from "../notificacoes/NotificacaoSearchTable";




const initialFValues = {
  id: 0,
  data: null,
  hora: "",
  mensagem: "",
  status: '2',
  tipoMovimento: "1",
  sedeID: "",
  tiponotificao: "App-Sigra",
  funcionarioID: 0,
  userID: 0,
  sms: false,
  emai: false,
  notificacao:false
};


const TratamentoReclamacoes = (props) => {
  const currentLanguageCode = cookies.get("i18next") || "en";

  const { t } = useTranslation();

  const [sede, setSede] = useState("BAI - Congo");
  const [sedeID, setSedeID] = useState(1);
  const [agenciaID, setAgenciaID] = useState(0);
  const [agencia, setAgencia] = useState("");

  const [idTrabalhador, setIDTrabalhador] = useState(0);
  const [codigoTrabalhador, setCodigoTrabalhador] = useState("");

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [telefoneTrabalhador, setTelefoneTrabalhador] = useState("");
  const [emailTrabalhador, setEmailTrabalhador] = useState("");

  const [nomeDenunciante, setNomeDenunciante] = useState("");
  const [emailDenunciante, setEmailDenunciante] = useState("");
  const [telefoneDenunciante, setTelefoneDenunciante] = useState("");
  const [queixa, setQueixa] = useState("");
  const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState("");


  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [tipoDenunciaList, setSipoDenunciaList] = useState([]);
  const [starValue, setStarValue] = useState(1);
  const [rating, setRating] = useState(0); // initial rating value
  const [Ratingdata, setRatingData] = useState([]);
  const [RatingMotivodata, setRatingMotivoData] = useState([]);

  const [countOneStar, setCountOneStar] = useState(1);
  const [value, setValue] = useState("");

  const [tipoReclamacaoSelecionada, setTipoReclamacaoSelecionada] = useState(0);

  const [codigoPesquisa, setCodigoPesquisa] = useState("Código");
  const [labelPesquisa, setLabelPesquisa] = useState("#Funcionários");

  const [nomePlaceHolder, setNomePlaceHolder] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [imageFuncionario, setImageFuncionario] = useState("");
  const location = useLocation();

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const navigate = useNavigate();

  const [checkedSMS, setCheckedSMS] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedNotificacao, setCheckedNotificacao] = useState(false);



  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const [state, setState] = useState({
    enviarSMS: false,
    envisrNotificacao: false,
    envisrEmail: false,
  });

  const { enviarSMS, envisrNotificacao, envisrEmail } = state;

  const [
    total_ReclamacaoFuncionario,
    settotal_ReclamacaoFuncionario,
  ] = useState(0);

  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("primeiroNome") validationErrorM.primeiroNome = primeiroNome ? "" : " "; // This field is Required
    if ("apelido") validationErrorM.apelido = apelido ? "" : " "; // This field is Required

    if ("nome" in fieldValues)
      validationErrorM.nome = fieldValues.nome ? "" : " ";

    // if ('tipodenunciaID' in fieldValues)
    //     validationErrorM.tipodenunciaID = fieldValues.tipodenunciaID ? "" : " "

    // if ('queixa' in fieldValues)
    //     validationErrorM.queixa = fieldValues.queixa ? "" : " "

    if ("emailDenunciante" in fieldValues)
      validationErrorM.emailDenunciante = /$^|.+@.+..+/.test(
        fieldValues.emailDenunciante
      )
        ? ""
        : " ";

    setErrors({
      ...validationErrorM,
    });

    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  ); // use

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    // // setValues(location.state);

    getTime(); // get time and Date

    setIDTrabalhador(location.state.id);
    setCodigoTrabalhador(location.state.codigoTrabalhador);
    setPrimeiroNome(location.state.primeironomeTrabalhador);
    setApelido(location.state.ultimonomeTrabalhador);
    setTelefoneTrabalhador(location.state.telepfoneTrabalhador);
    setEmailTrabalhador(location.state.emailTrabalhador);

    setNomeDenunciante(location.state.nomeDenunciante);
    setEmailDenunciante(location.state.emailDenunciante);
    setTelefoneDenunciante(location.state.telefoneDenunciante);
    setQueixa(location.state.queixa);
    setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);
    setSedeID(location.state.sedeID);
    setSede(location.state.sede);
    setAgenciaID(location.state.agenciaID);
    setAgencia(location.state.agencia);

    setImageFuncionario(location.state.imageChangeFromOutSideURL);

    values.funcionarioID = (location.state.funcionarioID);
    values.sedeID = (location.state.sedeID);


    getNotificacoesDoFuncionario(
      "normal",
      location.state.sedeID,
      location.state.funcionarioID,
      1
    );

    totalDenunciaFuncionario(location.state.funcionarioID);

    updateValuesOnOpen(); // get user ID que vai envisr a mensagem
  }, []);

  const updateValuesOnOpen = () => {
    userSavedValue.map(item => {
        values.userID = item.id
    });
  }

  const getTime = () => {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    values.hora = time;
    let today2 = new Date().toLocaleDateString();
    values.data = today2;
  };

  const ItemTitulo = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: "12px",
  }));

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const ItemMainTitlo = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    marginBottom: "-20px",
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const getNotificacoesDoFuncionario = (tipoPesquisa1, sedeID1, funcionarioID1, tipoMovimento1) => {
    childRef.current.getGetAllData(
      tipoPesquisa1,
      sedeID1,
      funcionarioID1,
      tipoMovimento1
    ); // saveImage() = method called
  };

  const styles = {
    underline: {
      "&:after": {
        borderBottomColor: "rgb(70, 197, 29)",
        borderWidth: "1px",
      },
    },
  };

  const totalDenunciaFuncionario = (funcionarioID) => {
    DenunciasServices.getAll(
      "countDenunciasTrabalhador",
      location.state.sedeID,
      agenciaID,
      "countDenunciasTrabalhador",
      funcionarioID
    )
      .then((response) => {
        response.data.map((total) => {
          settotal_ReclamacaoFuncionario(total.total_ReclamacaoFuncionario);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sair = () => {
    navigate("/Home");
  };

  const notificaoGravar = (e) => {
    e.preventDefault();

    NotificaoService.create(values).then((response) => {
      
        swal(t("Notificação enviada com Sucesso!"), {
          icon: "success",
        });

        getNotificacoesDoFuncionario(
          "normal",
          location.state.sedeID,
          location.state.funcionarioID,
          1
        );
    
      
    });
  };

  const getNotificaoSMS = (event) => {
    event.preventDefault();

    if (event.target.checked) {
      values.tiponotificao = "SMS";
      values.sms = true;
      setCheckedSMS(event.target.checked);
    }else {
      values.sms = false;
      setCheckedSMS(false);

    }
  };

  const getNotificaoEmail = (event) => {
    event.preventDefault();

    if (event.target.checked) {
      values.tiponotificao = "EMail";
      values.emai = true
      setCheckedEmail(event.target.checked);
    }else {
      values.emai = false
      setCheckedEmail(false);
    }
  };

  const getNotificaoNotificapApp = (event) => {
    event.preventDefault();

    if (event.target.checked) {
      values.tiponotificao = "App-Sigra";
      values.notificacao = true
      setCheckedNotificacao(event.target.checked);
    }else {
      values.notificacao = false
      setCheckedNotificacao(false);
    }
  };


  return (
    <>
    
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <ItemMainTitlo>
              <PageHeader
                title={t("TRATAMENTO DE RECLAMAÇÕES ")}
                subTitle={t("Formulário de Tratamento de Reclamações")}
                backGroundColor="#f0efeb"
                color="black"
                icon={<House />}
              ></PageHeader>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={2}>
            <ItemMainTitlo
              style={{
                boxShadow: "none",
                backgroundColor: "#f0efeb",
                marginTop: "25px",
                boxShadow: "none",
              }}
            >
              <div style={{ marginTop: "-20px" }}>
                <img
                  className="ImageContainer"
                  style={{
                    borderRadius: "50%",
                    height: "60px",
                    width: "80px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    boxShadow: "none",
                  }}
                  src={imageFuncionario}
                  alt=""
                  // onClick={funcionarioImageClick}
                />
              </div>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={3}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "thin",
              }}
            >
              Total Reclamações
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "white",
                borderWidth: "thin",
              }}
            >
              <div style={{ textAlign: "center", borderWidth: "thin" }}>
                {/* {total_ReclamacaoFuncionario} */}
                {/* <NotificationsNone size={25} /> */}
                {/* <span className="topIconBag"> */}
                {total_ReclamacaoFuncionario}
                {/*                 </span>
                 */}{" "}
              </div>
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "thin",
              }}
            >
              Total Avaliações
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "white",
                borderWidth: "thin",
              }}
            >
              0
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "thin",
              }}
            >
              Total Sugestões
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "white",
                borderWidth: "thin",
              }}
            >
              0
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <ItemTitulo
                style={{
                  backgroundColor: "#f0efeb",
                  fontWeight: "600",
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "thin",
                }}
              >
                <span
                  style={{ fontSize: "12", fontWeight: "600", color: "black" }}
                >
                  DADOS DO TRABALHADOR
                </span>
              </ItemTitulo>
            </Grid>

            <Item
              style={{
                height: "83%",
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "thin",
              }}
            >
              <div style={{ marginTop: "-10px" }}>
                <label style={{ marginTop: "5px" }} className="userLabel">
                  Código
                </label>
                <Controls.Input
                  name="codigoTrabalhador"
                  placeHolder={t("denunciaNumeroPlaceOrder")}
                  value={codigoTrabalhador}
                  onChange={handleInputChange}
                  width="70%"
                  type="text"
                />
              </div>
              <div>
                <label
                  style={{ marginTop: "5px", fontSize: "14px" }}
                  className="userLabel"
                >
                  Nome
                </label>
                <Controls.Input
                  name="primeironomeTrabalhador"
                  placeHolder="Nome"
                  value={primeiroNome}
                  type="text"
                  width="70%"
                  error={errors.primeiroNome}
                />
              </div>
              <div>
                <label
                  style={{ marginTop: "5px", fontSize: "14px" }}
                  className="userLabel"
                >
                  Apelido
                </label>
                <Controls.Input
                  name="ultimonomeTrabalhador"
                  placeHolder="ultimo nome"
                  value={apelido}
                  type="text"
                  width="70%"
                  error={errors.ultimonomeTrabalhador}
                />
              </div>
              <div>
                <label className="inputLabel">{t("sede")}</label>
                <Controls.Input
                  name="sede"
                  placeHolder="Sede"
                  value={sede}
                  onChange={handleInputChange}
                  type="text"
                  width="70%"
                  disabled="true"
                />
              </div>
              <div>
                <label style={{ fontSize: "11px" }} className="inputLabel">
                  {t("agencia")}
                </label>
                <Controls.Input
                  name="agencia"
                  placeHolder="Centro de Trabalho"
                  value={agencia}
                  onChange={handleInputChange}
                  type="text"
                  width="70%"
                  disabled="true"
                />
              </div>

              <div>
                <label style={{ marginTop: "5px" }} className="userLabel">
                  {t("email")}
                </label>
                <Controls.Input
                  name="emailTrabalhador"
                  placeHolder={t("email")}
                  value={emailTrabalhador}
                  width="70%"
                  type="text"
                  error={errors.emailTrabalhador}
                />
              </div>
              <div>
                <label style={{ marginTop: "5px" }} className="userLabel">
                  {t("contacto")}
                </label>
                <Controls.Input
                  name="telepfoneTrabalhador"
                  placeHolder={t("contacto")}
                  value={telefoneTrabalhador}
                  width="70%"
                  type="text"
                  error={errors.telefoneTrabalhador}
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <ItemTitulo
                style={{
                  backgroundColor: "#f0efeb",
                  fontWeight: "600",
                  borderWidth: "thin",
                }}
              >
                <span
                  style={{ fontSize: "12", fontWeight: "600", color: "black" }}
                >
                  DADOS DA DENÚNCIA
                </span>
              </ItemTitulo>
            </Grid>

            <Item
              style={{
                height: "83%",
                borderStyle: "solid",
                borderColor: "black",
                borderWidth: "thin",
              }}
            >
              <div>
                <label className="userLabel">{t("denunciante")}</label>
                <Controls.Input
                  name="nome"
                  placeHolder={t("denunciante")}
                  value={nomeDenunciante}
                  onChange={handleInputChange}
                  width="70%"
                  type="text"
                  error={errors.nomeDenunciante}
                />
              </div>

              <div>
                <label className="userLabel">{t("contacto")}</label>
                <Controls.Input
                  name="telefoneDenunciante"
                  placeHolder={t("contacto")}
                  value={telefoneDenunciante}
                  onChange={handleInputChange}
                  width="70%"
                  type="text"
                />
              </div>
              <div>
                <label style={{ marginTop: "10px" }} className="userLabel">
                  {t("email")}
                </label>
                <Controls.Input
                  name="emailDenunciante"
                  placeHolder={t("email")}
                  value={emailDenunciante}
                  onChange={handleInputChange}
                  width="70%"
                  type="text"
                  error={errors.emailDenunciante}
                />
              </div>

              <div>
                <label className="userLabel">{t("queixa")}</label>
                <Controls.Input
                  name="queixa"
                  placeHolder={t("queixaPlaceOrder")}
                  value={queixa}
                  onChange={handleInputChange}
                  type="text"
                  width="70%"
                  multiline
                  rows={5}
                  height="100px"
                  error={errors.queixa}
                />
              </div>
            </Item>
          </Grid>

          <Grid
            item
            xs={2}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "thin",
              height: "40vh",
            }}
          >
            <div>
            <div style={{ marginTop: "0px" }}>
                <Controls.CheckBox
                   checked={checkedSMS}
                  name="tiponotificaoSMS"
                  label="Enviar SMS"
                  value={values.sms}
                  onChange={getNotificaoSMS}
                />
              </div>

              <div style={{ marginTop: "-15px" }}>
                <Controls.CheckBox
                  checked={checkedEmail}
                  name="tiponotificaoEmail"
                  label="Enviar Email"
                  value={values.emai}
                  onChange={getNotificaoEmail}
                />
              </div>

              <div style={{ marginTop: "-15px" }}>
                <Controls.CheckBox
                  checked={checkedNotificacao}
                  name="tiponotificaoNotificacao"
                  label="Enviar Notificação"
                  value={values.notificacao}
                  onChange={getNotificaoNotificapApp}
                />
              </div>


              {/* <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Enviar SMS" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Enviar Notificação"
                />
                <FormControlLabel control={<Checkbox />} label="Enviar Email" />
              </FormGroup> */}
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              boxShadow: "none",
              height: "28.5vh",
              borderWidth: "thin",
            }}
          >
            <ItemTitulo
              style={{
                backgroundColor: "#f0efeb",
                fontWeight: "600",
                boxShadow: "none",
                borderWidth: "thin",
              }}
            >
              <span style={{ fontSize: "10", color: "black" }}>
                MENSAGEM DE NOTIFICAÇÃO
              </span>
            </ItemTitulo>
            {/* <Item>Mensagem de Notificação */}
            <div style={{ height: "70px", paddingLeft: "5px" }}>
              <Input
                style={{ fontFamily: "Times New Roman" }}
                name="mensagem"
                disableUnderline={true}
                variant="standard"
                autoFocus
                onChange={handleInputChange}
                value={values.mensagem}
                placeholder={t("Mensagem de Notificação")}
                fullWidth
                multiline
              />
            </div>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      borderWidth: "thin",
                      height: "5.8vh",
                      marginTop: "90px",
                      borderWidth: "thin",
                    }}
                  >
                    <div style={{ marginTop: "-10px" }}>
                      <Controls.Buttons
                        type="button"
                        text={t("Enviar Notificação")}
                        color="primary"
                        size="small"
                        width="90%"
                        fullWidth={false}
                        onClick={notificaoGravar}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      borderWidth: "thin",
                      height: "5.2vh",
                    }}
                  >
                    <div style={{ marginTop: "-10px" }}>
                      <Controls.Buttons
                        type="button"
                        text={t("button_pagina_anterior")}
                        color="secondary"
                        size="small"
                        width="90%"
                        fullWidth={false}
                        onClick={() => {
                          setUserSavedValue((prevState) => {
                            prevState[0].sedeID_pesquisas = sedeID;
                            // prevState[0].sede_pesquisa = sede
                            // prevState[0].agenciaID_pesquisa = agenciaID
                            // prevState[0].agencia_pesquisa = agencia
                            prevState[0].provenienciaFormulario = "funcionario";
                            return [...prevState];
                          });

                          navigate(-1);
                        }}
                        // variant="outlined"

                        // onClick={sair}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "thin",
            }}
          >
            <ItemTitulo
              style={{
                backgroundColor: "#f0efeb",
                fontWeight: "600",
                borderWidth: "thin",
              }}
            >
              <span
                style={{ fontSize: "12", fontWeight: "600", color: "black" }}
              >
                LISTAGEM DE NOTIFICAÇÕES
              </span>
            </ItemTitulo>

            {/* <Item> */}
            <div style={{ marginTop: "5px" }}>
              <NotificacaoSearchTable
                ref={childRef}
                idDisplay={false}
                nomeDisplay={false}
                tipoDenunciaDisplay={false}
                dataDisplay={true}
                horaDisplay={true}
                tipoNotificaoDisplay={true}
                userQueRnviouMensagem={true}
                emailDisplay={false}
                telefoneDislay={false}
                statusDisplay={true}
                mensagemDisplay={false}
                actionsButtonDisplaySelect={false}
                actionsButtonDisplayEditDelete={false}
                backGroundColor="#f0efeb"
                color="black"
                sedeID={sedeID}
                tipoMovimento={1}
                agenciaID={agenciaID}
                pageSize={10}
                rowPerPage={10}
              />
            </div>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TratamentoReclamacoes;
