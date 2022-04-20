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

const initialFValues = {
  lingua: "",
  reclamacaoFuncionario: false,
  reclamacaoCentroTrabalho: false,
  reclamacaoEmpresa: false,
  reclamacaoProduto: false,
  reclamacaoServico: false,
  reclamacaoOutras: false
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

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
    //tableDenunciaLinguaUpdateData();

    getUserContext();
  }, [currentLanguageCode]);

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
                style={{
                  //  marginLeft: "5px",
                  // marginTop: "auto",
                }}
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
              <div style={{marginTop:"-15px"}}>
                <Controls.CheckBox
                  name="reclamacaoFuncionario"
                  label="Contra o Funcionários"
                  value={values.reclamacaoFuncionario}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{marginTop:"-25px"}}>
                <Controls.CheckBox
                  name="reclamacaoCentroTrabalho"
                  label="Contra o Centro de Trabalho"
                  value={values.reclamacaoCentroTrabalho}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{marginTop:"-25px"}}>
                <Controls.CheckBox
                  name="reclamacaoEmpresa"
                  label="Contra a Empresa"
                  value={values.reclamacaoEmpresa}
                  onChange={handleInputChange}
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
              <div style={{marginTop:"-15px"}}>
                <Controls.CheckBox
                  name="reclamacaoProduto"
                  label="Contra o Produto"
                  value={values.reclamacaoProduto}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{marginTop:"-25px"}}>
                <Controls.CheckBox
                  name="reclamacaoServico"
                  label="Contra o Serviço"
                  value={values.reclamacaoServico}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{marginTop:"-25px"}}>
                <Controls.CheckBox
                  name="reclamacaoOutras"
                  label="Outras.."
                  value={values.reclamacaoOutras}
                  onChange={handleInputChange}
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
               backgroundColor:"#f8d210"

              // boxShadow: "none"
            }}>
             Total pendente:
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
               backgroundColor:"#BACC81"

              // boxShadow: "none"
            }}>
              
             Total em Curso:
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
               backgroundColor:"#32CD30"
              // boxShadow: "none"
            }}>
             Total Concluido:
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
              title={popupTitle}
              width="800px"
              height="580px"
              marginTop="10px"
            >
              <SedeSearchTable
                idDisplay={true}
                codeDisplay={true}
                statusDisplay={true}
                actionsButtonSelectDisplay={true}
                actionsButtonDisplayEditDelete={false}
                pageSize={10}
                rowPerPage={10}
                backGroundColor="lightblue"
                color="black"
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
              title={popupTitle}
              width="800px"
              height="580px"
              marginTop="10px"
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
                pageSize={10}
                rowPerPage={10}
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
