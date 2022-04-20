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
import React, { useEffect, useRef, useState } from "react";
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

const initialFValues = {
  id: 0,
  codigoTrabalhador: "",
  primeironomeTrabalhador: "",
  ultimonomeTrabalhador: "",
  telepfoneTrabalhador: "",
  emailTrabalhador: "",

  telepfoneDenunciante: "",
  emailDenunciante: "",
  queixa: "",
  status: "1",
  hora: "",
  data: null,
  funcionarioID: null,
  sedeID: 0,
  agenciaID: 0,
  agencia: "",
  tipodenunciaID: "",
  tipodenuncia: "",
  abreviationLangue: "",
  rating: 0,
  ratingID: "",
  ratingMotivoID: "",
  tipoReclamacao: "",
  tipoMovimento: 1, // 1 = reclamacao, 2 = Sugestão, 3 = Avaliação
  agenciaIDReclamacao: null,
  nomeDenunciante: "",
  emailDenunciante: "",
  telefoneDenunciante: "",
  queixa: "",
  mensagemNotificacaoTrabalhador: "",
};

const TratamentoReclamacoes = (props) => {
  const currentLanguageCode = cookies.get("i18next") || "en";

  const { t } = useTranslation();

  const [sede, setSede] = useState("BAI - Congo");
  const [sedeID, setSedeID] = useState(1);
  const [agenciaID, setAgenciaID] = useState(0);
  const [agencia, setAgencia] = useState("");

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
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

  const [state, setState] = useState({
    enviarSMS: false,
    envisrNotificacao: false,
    envisrEmail: false,
  });

  const { enviarSMS, envisrNotificacao, envisrEmail } = state;

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
    setValues(location.state);
    setImageFuncionario(location.state.imageChangeFromOutSideURL);

    getGetAllDataFuncionario(
      location.state.sedeID,
      location.state.agenciaID,
      location.state.funcionarioID
    );
  }, []);

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

  const getGetAllDataFuncionario = (sedeID1, agenciaID1, funcionarioID1) => {
    childRef.current.getGetAllDataFuncionario(
      sedeID1,
      agenciaID1,
      1,
      funcionarioID1
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <ItemMainTitlo>
              <PageHeader
                title={t("TRATAMENTO DE RECLAMAÇÕES ")}
                subTitle={t("Formulário de Tratamento de Reclamações")}
                backGroundColor="lightblue"
                color="black"
                icon={<House />}
              ></PageHeader>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={2}>
            <ItemMainTitlo
              style={{
                boxShadow: "none",
                backgroundColor: "lightblue",
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
              }}
            >
              Total Denuncias
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "lightgray",
              }}
            >
              2
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item style={{ borderStyle: "solid", borderColor: "black" }}>
              Total Avaliações
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "lightgray",
              }}
            >
              4
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item style={{ borderStyle: "solid", borderColor: "black" }}>
              Total Sugestões
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                backgroundColor: "lightgray",
              }}
            >
             1
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <ItemTitulo
                style={{
                  backgroundColor: "lightblue",
                  fontWeight: "600",
                  borderStyle: "solid",
                  borderColor: "black",
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
                height: "81%",
                borderStyle: "solid",
                borderColor: "black",
              }}
            >
              <div style={{ marginTop: "0px" }}>
                <label style={{ marginTop: "5px" }} className="userLabel">
                  Código
                </label>
                <Controls.Input
                  name="codigoTrabalhador"
                  placeHolder={t("denunciaNumeroPlaceOrder")}
                  value={values.codigoTrabalhador}
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
                  value={values.primeironomeTrabalhador}
                  type="text"
                  width="70%"
                  error={errors.primeironomeTrabalhador}
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
                  value={values.ultimonomeTrabalhador}
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
                  value={values.sede}
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
                  value={values.agencia}
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
                  value={values.emailTrabalhador}
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
                  value={values.telepfoneTrabalhador}
                  width="70%"
                  type="text"
                  error={errors.telepfoneTrabalhador}
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Grid item xs={12}>
              <ItemTitulo
                style={{ backgroundColor: "lightblue", fontWeight: "600" }}
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
                height: "81%",
                borderStyle: "solid",
                borderColor: "black",
              }}
            >
              <div>
                <label className="userLabel">{t("denunciante")}</label>
                <Controls.Input
                  name="nome"
                  placeHolder={t("denunciante")}
                  value={values.nomeDenunciante}
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
                  value={values.telefoneDenunciante}
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
                  value={values.emailDenunciante}
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
                  value={values.queixa}
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
            style={{ borderStyle: "solid", borderColor: "black" }}
          >
            <Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Enviar SMS" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Enviar Notificação"
                />
                <FormControlLabel control={<Checkbox />} label="Enviar Email" />
              </FormGroup>
            </Item>
          </Grid>

          <Grid
            item
            xs={4}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              boxShadow: "none",
            }}
          >
            <ItemTitulo
              style={{
                backgroundColor: "lightblue",
                fontWeight: "600",
                boxShadow: "none",
              }}
            >
              <span style={{ fontSize: "10", color: "black" }}>
                MENSAGEM DE NOTIFICAÇÃO
              </span>
            </ItemTitulo>
            {/* <Item>Mensagem de Notificação */}
            <div>
              <Input
                style={{ fontFamily: "Times New Roman" }}
                name="mensagemNotificacaoTrabalhador"
                disableUnderline={true}
                variant="standard"
                autoFocus
                onChange={handleInputChange}
                value={values.mensagemNotificacaoTrabalhador}
                placeholder={t("Mensagem de Notificação")}
                fullWidth
                multiline
              />
            </div>
            {/* </Item> */}
          </Grid>

          <Grid
            item
            xs={6}
            style={{ borderStyle: "solid", borderColor: "black" }}
          >
            <ItemTitulo
              style={{ backgroundColor: "lightblue", fontWeight: "600" }}
            >
              <span
                style={{ fontSize: "12", fontWeight: "600", color: "black" }}
              >
                LISTAGEM DE RECLAMAÇÕES
              </span>
            </ItemTitulo>

            {/* <Item> */}
            <div style={{ marginTop: "5px" }}>
              <DenunciaSearchTable
                ref={childRef}
                idDisplay={true}
                nomeDisplay={true}
                tipoDenunciaDisplay={false}
                linguaQueixa={false}
                dataDisplay={true}
                horaDisplay={true}
                emailDisplay={false}
                telefoneDislay={false}
                statusDisplay={false}
                queixaDisplay={false}
                actionsButtonDisplaySelect={false}
                actionsButtonDisplayEditDelete={false}
                backGroundColor="darkblue"
                color="white"
                abreviationLangue={currentLanguageCode}
                sedeID={sedeID}
                tipoMovimento={1}
                tipoImpressao="normal"
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
