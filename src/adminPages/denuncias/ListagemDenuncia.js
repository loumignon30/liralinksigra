import React, { useState, useEffect, useRef, useContext } from "react";

import "./denuncia.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import DenunciaSearchTable from "./DenunciaSearchTable";

import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import Controls from "../../components/reusableComponents/Controls";
import { useForm } from "../../components/reusableComponents/useForm";
import { House, Search } from "@mui/icons-material";
import Popup from "../../components/reusableComponents/Popup";
import SedeSearchTable from "../sede/SedeSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import PageHeader from "../../components/reusableComponents/PageHeader";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DenunciasServices from "../../services/admin/Denuncias.services";

const initialFValues = {
  lingua: "",
  tipoMovimentodenuncia: "",
  reclamacaoFuncionario: false,
  reclamacaoCentroTrabalho: false,
  reclamacaoEmpresa: false,
  reclamacaoProduto: false,
  reclamacaoServico: false,
  reclamacaoOutras: false,
};
const ListagemDenuncia = () => {
  const { t } = useTranslation();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefAgenciaUtilizador = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefAgenciaCriador = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const currentLanguageCode = cookies.get("i18next") || "en";
  const [lingua, setLingua] = useState("");

  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState("");

  const [popupTitle, setPpupTitle] = useState("");

  const [sedePesquisa, setSedePesquisa] = useState("");
  const childRefSede = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
  const [role, setRole] = useState(0);
  const [count, setCount] = useState(0);
  const [agencia, setAgencia] = useState("");
  const [agenciaID, setAgenciaID] = useState(0);
  const [userID, setUserID] = useState(0);
  const [nivelAcesso, setNivelAcesso] = useState(0);
  const [checkedFuncionario, setCheckedFuncionario] = useState(false);
  const [checkedCentroTrabalho, setCheckedCentroTrabalho] = useState(false);
  const [checkedEmpresa, setCheckedEmpresa] = useState(false);
  const [checkedProduto, setCheckedProduto] = useState(false);

  const [checkedServico, setCheckedServico] = useState(false);
  const [checkedOutras, setCheckedOutras] = useState(false);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [totalPendente, setTotalPendente] = useState(0);
  const [totalEmCurso, setTotalEmCurso] = useState(0);
  const [totalConcluido, setTotalConcluido] = useState(0);

  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    // if ("primeiroNome") validationErrorM.primeiroNome = primeiroNome ? "" : " "; // This field is Required
    // if ("apelido") validationErrorM.apelido = apelido ? "" : " "; // This field is Required

    // if ("nome" in fieldValues)
    //   validationErrorM.nome = fieldValues.nome ? "" : " ";

    // // if ('tipodenunciaID' in fieldValues)
    // //     validationErrorM.tipodenunciaID = fieldValues.tipodenunciaID ? "" : " "

    // // if ('queixa' in fieldValues)
    // //     validationErrorM.queixa = fieldValues.queixa ? "" : " "

    // if ("emailDenunciante" in fieldValues)
    //   validationErrorM.emailDenunciante = /$^|.+@.+..+/.test(
    //     fieldValues.emailDenunciante
    //   )
    //     ? ""
    //     : " ";

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

    getUserContext();

    getGetAllZero();
    updateValuesOnOpen(); // dados da pagina anterior
  }, []);

  const updateValuesOnOpen = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";
    let agenciaIDP = 0;
    let agenciaIDP_text = "";

    userSavedValue.map(
      (item) => (
        setSedeID(item.sedeID),
        // setUserID(item.id),
        setSede(item.sede),
        // setNivelAcesso(item.nivelAcesso),

        (testEdit = item.provenienciaFormulario),
        (sedeIDP = item.sedeID_pesquisas),
        (agenciaIDP = item.agenciaID_pesquisa),
        (sedeIDP_text = item.sede_pesquisa),
        (agenciaIDP_text = item.agencia_pesquisa)
      )
    );

    if (testEdit === "funcionario") {
      setSedeID(sedeIDP);
      //setAgenciaID(agenciaIDP);
      setSede(sedeIDP_text);
      // setagencia(agenciaIDP_text);

      childRef.current.getGetAllData(
        "Funcionario", //tipoMovimentodenuncia,
        sedeIDP,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedFuncionario(true);
      values.reclamacaoFuncionario = true;

      //childRefDepartement.current.getGetAllData(sedeIDP, agenciaIDP) // saveImage() = method called
    }
  };

  const getUserContext = () => {
    userSavedValue.map((item) => {
      setRole(item.nivelAcesso);
      setSedeID(item.sedeID);
      setSede(item.sede);
      setUserID(item.id);
      setNivelAcesso(item.nivelAcesso);
    });
  };

  const tableDenunciaLinguaUpdateData = (sedeID1, agenciaID1) => {
    setLingua(currentLanguageCode);
    childRef.current.getGetAllData(
      currentLanguageCode,
      "normal",
      sedeID1,
      agenciaID1,
      1,
      0
    ); // saveImage() = method called
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

  const tableAgenciaUpdateDataUtilizador = (sedeID1) => {
    childRefAgenciaUtilizador.current.getGetAllData(sedeID1); // saveImage() = method called
  };
  const tableAgenciaUpdateDataCriador = (sedeID1) => {
    childRefAgenciaCriador.current.getGetAllData(sedeID1); // saveImage() = method called
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

  const getGetAllDataFuncionario = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedCentroTrabalho(false);
    values.reclamacaoCentroTrabalho = false;

    setCheckedEmpresa(false);
    values.reclamacaoEmpresa = false;

    setCheckedProduto(false);
    values.reclamacaoProduto = false;

    setCheckedServico(false);
    values.reclamacaoServico = false;

    setCheckedOutras(false);
    values.reclamacaoOutras = false;

    if (event.target.checked) {
      values.reclamacaoFuncionario = true;

      childRef.current.getGetAllData(
        "Funcionario", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedFuncionario(event.target.checked);
      totalDenunciaStatus("Funcionario"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoFuncionario = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedFuncionario(event.target.checked);
    }
  };

  const getGetAllDataCentroTrabalho = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    values.reclamacaoFuncionario = false;

    setCheckedEmpresa(false);
    values.reclamacaoEmpresa = false;

    setCheckedProduto(false);
    values.reclamacaoProduto = false;

    setCheckedServico(false);
    values.reclamacaoServico = false;

    setCheckedOutras(false);
    values.reclamacaoOutras = false;

    if (event.target.checked) {
      values.reclamacaoCentroTrabalho = true;

      childRef.current.getGetAllData(
        "Centro Trabalho", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called

      setCheckedCentroTrabalho(event.target.checked);
      totalDenunciaStatus("Centro Trabalho"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoCentroTrabalho = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedCentroTrabalho(event.target.checked);
    }
  };

  const getGetAllDataEmpresa = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    setCheckedCentroTrabalho(false);
    values.reclamacaoFuncionario = false;
    values.reclamacaoCentroTrabalho = false;

    setCheckedProduto(false);
    values.reclamacaoProduto = false;

    setCheckedServico(false);
    values.reclamacaoServico = false;

    setCheckedOutras(false);
    values.reclamacaoOutras = false;

    if (event.target.checked) {
      values.reclamacaoEmpresa = true;

      childRef.current.getGetAllData(
        "Empresa", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called

      setCheckedEmpresa(event.target.checked);
      totalDenunciaStatus("Empresa"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoEmpresa = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedEmpresa(event.target.checked);
    }
  };

  const getGetAllProduto = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    setCheckedCentroTrabalho(false);
    setCheckedEmpresa(false);
    setCheckedServico(false);
    setCheckedOutras(false);

    values.reclamacaoServico = false;

    values.reclamacaoFuncionario = false;
    values.reclamacaoCentroTrabalho = false;
    values.reclamacaoEmpresa = false;

    values.reclamacaoOutras = false;

    if (event.target.checked) {
      values.reclamacaoProduto = true;

      childRef.current.getGetAllData(
        "Produto", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called

      setCheckedProduto(event.target.checked);
      totalDenunciaStatus("Produto"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoProduto = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedProduto(event.target.checked);
    }
  };

  const getGetAllServico = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    setCheckedCentroTrabalho(false);
    setCheckedEmpresa(false);
    setCheckedProduto(false);
    setCheckedOutras(false);

    values.reclamacaoFuncionario = false;
    values.reclamacaoCentroTrabalho = false;
    values.reclamacaoEmpresa = false;
    values.reclamacaoProduto = false;
    values.reclamacaoOutras = false;

    if (event.target.checked) {
      values.reclamacaoServico = true;

      childRef.current.getGetAllData(
        "Servico", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called

      setCheckedServico(event.target.checked);
      totalDenunciaStatus("Servico"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoServico = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedServico(event.target.checked);
    }
  };

  const getGetAllOutras = (event) => {
    event.preventDefault();

    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    setCheckedCentroTrabalho(false);
    setCheckedEmpresa(false);
    setCheckedProduto(false);
    setCheckedServico(false);

    values.reclamacaoFuncionario = false;
    values.reclamacaoCentroTrabalho = false;
    values.reclamacaoEmpresa = false;
    values.reclamacaoProduto = false;
    values.reclamacaoServico = false;

    if (event.target.checked) {
      values.reclamacaoOutras = true;

      childRef.current.getGetAllData(
        "Outras", //tipoMovimentodenuncia,
        sedeID,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called

      setCheckedOutras(event.target.checked);
      totalDenunciaStatus("Outras"); // total pendente, em curso e concluido
    } else {
      values.reclamacaoOutras = false;

      childRef.current.getGetAllData(
        "nada", //tipoMovimentodenuncia,
        0,
        0, //agenciaID1,
        "funcionario" // tipoImpressao
      ); // saveImage() = method called
      setCheckedOutras(event.target.checked);
    }
  };

  const getGetAllZero = () => {
    setTotalPendente(0);
    setTotalEmCurso(0);
    setTotalConcluido(0);

    setCheckedFuncionario(false);
    setCheckedCentroTrabalho(false);
    setCheckedEmpresa(false);
    setCheckedProduto(false);
    setCheckedServico(false);
    setCheckedOutras(false);

    values.reclamacaoFuncionario = false;
    values.reclamacaoCentroTrabalho = false;
    values.reclamacaoEmpresa = false;
    values.reclamacaoProduto = false;
    values.reclamacaoServico = false;
    values.reclamacaoOutras = false;
  };

  const totalDenunciaStatus = (tipoMovimentodenuncia) => {
    DenunciasServices.getAll(
      tipoMovimentodenuncia,
      sedeID,
      0, //agenciaID,
      "countDenunciasStatus",
      0 // 0funcionarioID
    )
      .then((response) => {
        response.data.map((total) => {
          if (total.status === "1") {
            setTotalPendente(total.total_Status);
          }
          if (total.status === "2") {
            setTotalEmCurso(total.total_Status);
          }
          if (total.status === "3") {
            setTotalConcluido(total.total_Status);
          }
          //settotal_ReclamacaoFuncionario(total.total_ReclamacaoFuncionario);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ItemMainTitlo>
              <PageHeader
                title={t("lista_denuncia")}
                subTitle={t("header_subTitle_Listagem_denuncia")}
                backGroundColor="lightblue"
                color="black"
                icon={<House />}
              ></PageHeader>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={6}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "75%",
              }}
            >
              <div
                style={
                  {
                    //  marginLeft: "5px",
                    // marginTop: "auto",
                  }
                }
              >
                <label
                  className="inputLabel"
                  style={{
                    fontSize: "12px",
                    height: "auto",
                  }}
                >
                  {t("sede")}
                </label>
                <Controls.Input
                  name="sede"
                  placeHolder={t("sede")}
                  value={sede}
                  width="60%"
                  type="text"
                  disabled="true"
                />
                <Search
                  style={{ marginTop: "auto", cursor: "pointer", width: "10%" }}
                  onClick={onclickSedePopup}
                />
              </div>

              <div
                style={{
                  marginTop: "auto",
                  // marginLeft: "5px",
                  // marginBottom: "20px",
                  // marginTop: "3px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    height: "auto",
                    margin: "auto",
                  }}
                  className="inputLabel"
                >
                  {t("agencia")}
                </label>
                <Controls.Input
                  name="agencia"
                  placeHolder={t("agencia")}
                  value={agencia}
                  type="text"
                  width="60%"
                />
                <Search
                  style={{ marginTop: "auto", cursor: "pointer", width: "10%" }}
                  onClick={onclickAgenciaPopup}
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={3}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "75%",
              }}
            >
              <div style={{ marginTop: "-15px" }}>
                <Controls.CheckBox
                  checked={setCheckedFuncionario}
                  name="reclamacaoFuncionario"
                  label="Contra o Funcionários"
                  value={values.reclamacaoFuncionario}
                  onChange={getGetAllDataFuncionario}
                />
              </div>
              <div style={{ marginTop: "-25px" }}>
                <Controls.CheckBox
                  checked={setCheckedCentroTrabalho}
                  name="reclamacaoCentroTrabalho"
                  label="Contra o Centro de Trabalho"
                  value={values.reclamacaoCentroTrabalho}
                  onChange={getGetAllDataCentroTrabalho}
                />
              </div>

              <div style={{ marginTop: "-25px" }}>
                <Controls.CheckBox
                  name="reclamacaoEmpresa"
                  label="Contra a Empresa"
                  value={values.reclamacaoEmpresa}
                  onChange={getGetAllDataEmpresa}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "75%",
              }}
            >
              <div style={{ marginTop: "-15px" }}>
                <Controls.CheckBox
                  name="reclamacaoProduto"
                  label="Contra o Produto"
                  value={values.reclamacaoProduto}
                  onChange={getGetAllProduto}
                />
              </div>
              <div style={{ marginTop: "-25px" }}>
                <Controls.CheckBox
                  name="reclamacaoServico"
                  label="Contra o Serviço"
                  value={values.reclamacaoServico}
                  onChange={getGetAllServico}
                />
              </div>

              <div style={{ marginTop: "-25px" }}>
                <Controls.CheckBox
                  name="reclamacaoOutras"
                  label="Outras.."
                  value={values.reclamacaoOutras}
                  onChange={getGetAllOutras}
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={4}>
            <ItemMainTitlo
              style={{
                marginTop: "-5px",
                height: "20px",
                borderStyle: "solid",
                borderColor: "black",
                marginBottom: "3px",
                backgroundColor: "#f8d210",

                // boxShadow: "none"
              }}
            >
              <span>Total pendente: {totalPendente}</span>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={4}>
            <ItemMainTitlo
              style={{
                marginTop: "-5px",
                height: "20px",
                borderStyle: "solid",
                borderColor: "black",
                marginBottom: "3px",
                backgroundColor: "#BACC81",

                // boxShadow: "none"
              }}
            >
              <span>Total em Curso: {totalEmCurso}</span>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={4}>
            <ItemMainTitlo
              style={{
                marginTop: "-5px",
                height: "20px",
                borderStyle: "solid",
                borderColor: "black",
                marginBottom: "3px",
                backgroundColor: "#32CD30",
                // boxShadow: "none"
              }}
            >
              <span>Total Concluido: {totalConcluido}</span>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div style={{ height: 400, width: "100%", marginTop: "5px" }}>
              <DenunciaSearchTable
                ref={childRef}
                idDisplay={true}
                nomeDisplay={true}
                tipoDenunciaDisplay={true}
                linguaQueixa={true}
                dataDisplay={true}
                horaDisplay={true}
                emailDisplay={false}
                telefoneDislay={false}
                statusDisplay={true}
                queixaDisplay={false}
                trabalhadorDisplay={true}
                actionsButtonDisplaySelect={true}
                actionsButtonDisplayEditDelete={false}
                backGroundColor="lightblue"
                color="black"
                abreviationLangue={currentLanguageCode}
                sedeID={sedeID}
                tipoMovimento={1}
                agenciaID={agenciaID}
                pageSize={10}
                rowPerPage={10}
              />
            </div>
          </Grid>

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
                idDisplay={true}
                codeDisplay={false}
                statusDisplay={true}
                actionsButtonSelectDisplay={true}
                actionsButtonDisplayEditDelete={false}
                pageSize={10}
                rowPerPage={10}
                backGroundColor="lightblue"
                color="black"
                sedeID={sedeID}
                userID={userID}
                sedeData={(id, code, sede) => {
                  setSede(sede);
                  setSedeID(id);
                  setOpenPopup(false);
                  setAgencia("");
                  tableDenunciaLinguaUpdateData(sedeID, 0);
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
                backGroundColor="lightblue"
                color="black"
                pageSize={10}
                rowPerPage={10}
                sedeID={sedeID}
                userID={userID}
                agenciaData={(id, code, agencia) => {
                  setAgencia(agencia);
                  setAgenciaID(id);
                  setOpenPopup(false);
                  tableDenunciaLinguaUpdateData(sedeID, id);
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
              // title={popupTitle}
              width="800px"
              height="580px"
              closeButtonDisplay={false}
              marginTop="-20px"
            >
              <SedeSearchTable
                idDisplay={true}
                codeDisplay={true}
                statusDisplay={true}
                actionsButtonSelectDisplay={true}
                actionsButtonDisplayEditDelete={false}
                pageSize={9}
                rowPerPage={9}
                backGroundColor="lightblue"
                color="black"
                listarGrid={true}
                sedeData={(id, code, sede) => {
                  setSede(sede);
                  setSedeID(id);
                  setOpenPopup(false);
                  setAgencia("");
                  tableDenunciaLinguaUpdateData(sedeID, 0);
                }}
              />
            </Popup>
          ) : null}

          {count === 6 ? (
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
              <AgenciaSearchTable
                idDisplay={true}
                codeDisplay={true}
                emailDisplay={false}
                statusDisplay={true}
                actionsButtonDisplaySelect={true}
                actionsButtonDisplayEditDelete={false}
                idSede={sedeID}
                userID={userID}
                backGroundColor="lightblue"
                color="black"
                pageSize={9}
                rowPerPage={9}
                listarGrid={true}
                agenciaData={(id, code, agencia) => {
                  setAgencia(agencia);
                  setAgenciaID(id);
                  setOpenPopup(false);
                  tableDenunciaLinguaUpdateData(sedeID, id);
                }}
              />
            </Popup>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};
export default ListagemDenuncia;
