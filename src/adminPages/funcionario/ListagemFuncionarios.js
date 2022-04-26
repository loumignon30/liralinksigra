import React, { useState, useEffect, useRef, useContext } from "react";
import "./funcionario.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import FuncionarioSearchTable from "./FuncionarioSearchTable";
import FuncionarioResumoSearchTable from "./FuncionarioResumoSearchTable";

import Controls from "../../components/reusableComponents/Controls";
import { House, Search } from "@mui/icons-material";
import Popup from "../../components/reusableComponents/Popup";
import SedeSearchTable from "../sede/SedeSearchTable";
import { InputAdornment } from "@mui/material";

import { useTranslation } from "react-i18next";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";

import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";
import PageHeader from "../../components/reusableComponents/PageHeader";
import { useForm } from "../../components/reusableComponents/useForm";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";
import FuncaoSearchTable from "../funcao/FuncaoSearchTable";
import DepartamentoSearchTable from "../departamento/DepartamentoSearchTable";
import DepartamentoResumoSearchTable from "../departamento/DepartamentoResumoSearchTable";
import FuncaoResumoSearchTable from "../funcao/FuncaoResumoSearchTable";

const initialFValues = {
  primeironome: "",
  ultimonome: "",
  paisID: "",
  cidadeID: "",
};

const ListagemFuncionarios = () => {
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

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");

  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState(0);
  const [agencia, setAgencia] = useState("");
  const [agenciaID, setAgenciaID] = useState(0);
  const [userID, setUserID] = useState(0);

  const [count, setCount] = useState(0);

  const childRefAgence = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefFuncao = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefDepartamento = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const childRef_resumo = useRef(null);


  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
  const [searchNome, setSearchNome] = useState("");
  const [searchApelido, setSearchApelido] = useState("");

  const [nivelAcesso, setNivelAcesso] = useState(0);
  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const [departamento, setDepartamento] = useState("");
  const [funcao, setFuncao] = useState("");

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    false
  ); // useForm = useForm.js. We defined - validateOnChange=false

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top

    updateValuesOnOpen();
    getPaises(); //Dados dos paises
  }, [t]);

  const updateValuesOnOpen = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";
    let agenciaIDP = 0;
    let agenciaIDP_text = "";

    userSavedValue.map(
      (item) => (
        // console.log(item),
        setSedeID(item.sedeID),
        setUserID(item.id),
        setSede(item.sede),
        setNivelAcesso(item.nivelAcesso),
        (testEdit = item.provenienciaFormulario),
        (sedeIDP = item.sedeID_pesquisas),
        (agenciaIDP = item.agenciaID_pesquisa),
        (sedeIDP_text = item.sede_pesquisa),
        (agenciaIDP_text = item.agencia_pesquisa)
      )
    );

    if (testEdit === "EditFuncionario") {
      setSedeID(sedeIDP);
      setAgenciaID(agenciaIDP);
      setSede(sedeIDP_text);
      setAgencia(agenciaIDP_text);
      childRef.current.getGetAllData(sedeIDP, agenciaIDP); // saveImage() = method called
    }
  };
  const onclicSedePopup = () => {
    childRef.current.getGetAllData(0, 0); // saveImage() = method called

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
      setCount(6);
    }
    setPpupTitle(t("lista_agencia"));
    setOpenPopup(true);
  };

  const tableFuncaooUpdateData1 = (sedeID1, agenciaID1, nome, apelido) => {
    childRef.current.getGetAllData(sedeID1, agenciaID1, nome, apelido); // saveImage() = method called
    //}
  };
  const nameSearchToToDataGrid = (e) => {
    setSearchNome(e.target.value);
    setSearchApelido("");
    childRef.current.getFirstnameSearch(e.target.value); // search the firstname
  };
  const lastNameSearchSearchToToDataGrid = (e) => {
    setSearchApelido(e.target.value);
    setSearchNome("");
    childRef.current.getLasttnameSearch(e.target.value); // search the firstname
  };

  const onclickAllDataPopup = () => {
    setAgencia("");
    setCount(15);
    try {
      childRef_resumo.current.getGetAllDataFuncionarioAgencia(); // search the firstname
    } catch (err) {
      // console.log(err)
    }
  };
  const onclickResumoDepartamento = () => {
    setCount(16);
    // alert(sedeID)
    try {
        childRefDepartamento.current.getGetAllDataFuncionarioDepartamento(sedeID, 0); // search the firstname
    } catch (err) {
      //console.log(err)
    }
  };

  const onclickResumoFuncao = () => {
    setCount(17);
    // alert(sedeID)
    try {
      childRefFuncao.current.getGetAllDataFuncionarioFuncao(sedeID, 0); // search the firstname
    } catch (err) {
      //console.log(err)
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

  const funcionarioPesquisaCons = (e) => {
    handleInputChange(e);
    tableFuncaooUpdateData1(
      sedeID,
      agenciaID,
      e.target.value,
      values.ultimonome
    );
  };
  const funcionarioPesquisaUltimoNomeCons = (e) => {
    handleInputChange(e);
    tableFuncaooUpdateData1(
      sedeID,
      agenciaID,
      values.primeironome,
      e.target.value
    );
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

  const paisHandleChange = (e) => {
    values.cidadeID = "";
    values.centroTrabalhoPesquisa = "";
    handleInputChange(e);
    getCidade(e.target.value);
    // tableAgenciaUpdateData(sedeID, "filtre", agenciaPesquisa, e.target.value, values.cidadeID)
  };

  const cidadeHandleChange = (e) => {
    values.cidadeID = "";
    values.centroTrabalhoPesquisa = "";
    handleInputChange(e);
    // tableAgenciaUpdateData(
    //   sedeID,
    //   "filtre",
    //   agenciaPesquisa,
    //   values.paisID,
    //   e.target.value
    // );
  };

  const onclickDepartamentoPopup = () => {
    setCount(4);
    setPpupTitle(t("listagem_departamento_menu"));
    setOpenPopup(true);
  };
  const onclickFuncaoPopup = () => {
    setCount(18);
    setPpupTitle(t("listagem_funcao_menu"));
    setOpenPopup(true);
  };

  const tableDepartamentoUpdateData1 = (sedeID1, agenciaID1, nome, apelido) => {
    if (sedeID1 > 0 && agenciaID1 > 0) {
      childRef.current.getGetAllData(sedeID1, agenciaID1, nome, apelido); // saveImage() = method called
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.2}>
          <Grid item xs={12}>
            <ItemMainTitlo>
              <PageHeader
                title={t("lista_funcionario")}
                subTitle={t("Formulário de Listagem de Funcionários")}
                backGroundColor="#f0efeb"
                color="black"
                icon={<House />}
              ></PageHeader>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "3vh",
                maxHeight: "3vh",
                // overflowY: "auto",
                // overflow: "auto",
                // overflowX: "hidden",
                margin: "5px",
                // backgroundColor: "#f0efeb",
                textAlign: "center",
                backgroundColor: "#f0efeb",
              }}
            >
              <div style={{ marginTop: "0px", fontWeight: 600 }}>
                <span>DADOS DA SEDE</span>
              </div>
            </div>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  height: "24vh",
                  maxHeight: "24vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  // backgroundColor: "#f0efeb",
                  //   textAlign: "center",
                }}
              >
                <div style={{ marginLeft: "5px" }}>
                  <div>
                    <label className="inputLabel">{t("sede")}</label>
                    <Controls.Input
                      name="sede"
                      placeHolder={t("sede")}
                      value={sede}
                      width="74%"
                      type="text"
                      disabled="true"
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclicSedePopup}
                    />
                  </div>
                  <div>
                    <label
                      style={{ fontSize: "12px", marginTop: "-5px" }}
                      className="inputLabel"
                    >
                      {t("nome_Agencia")}
                    </label>
                    <Controls.Input
                      name="agencia"
                      placeHolder={t("nome_Agencia")}
                      value={agencia}
                      type="text"
                      width="74%"
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickAgenciaPopup}
                    />
                  </div>
                  <div>
                    <label className="userLabel">{t("Recherche")}</label>
                    <Controls.Input
                      name="primeironome"
                      type="text"
                      value={values.primeironome}
                      placeHolder={t("Pesquisar o Nome")}
                      width="74%"
                      onChange={funcionarioPesquisaCons}
                      // marginLeft="-20px"
                      // onChange={sedeSearchToToDataGrid}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div>
                    <label className="userLabel">{t("Recherche")}</label>
                    <Controls.Input
                      name="ultimonome"
                      type="text"
                      value={values.ultimonome}
                      placeHolder={t("Pesquisar o Apelido")}
                      width="74%"
                      onChange={funcionarioPesquisaUltimoNomeCons}
                      // marginLeft="-20px"
                      // onChange={sedeSearchToToDataGrid}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
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
                height: "3vh",
                maxHeight: "3vh",
                // overflowY: "auto",
                // overflow: "auto",
                // overflowX: "hidden",
                margin: "5px",
                // backgroundColor: "#f0efeb",
                textAlign: "center",
                backgroundColor: "#f0efeb",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "10px" }}>
                <span>FILTRAR POR DEPARTAMENTO E FUNÇÃO</span>
              </div>
            </div>

            <Grid item xs={12}>
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
                  // backgroundColor: "#f0efeb",
                  //   textAlign: "center",
                }}
              >
                <div style={{ marginLeft: "5px" }}>
                  <div>
                    <label className="inputLabel">{t("departamento")}</label>
                    <Controls.Input
                      name="departamento"
                      placeHolder={t("departamento")}
                      value={departamento}
                      onChange={handleInputChange}
                      type="text"
                      width="74%"
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
                    />
                    <Search
                      style={{ marginTop: "10px", cursor: "pointer" }}
                      onClick={onclickFuncaoPopup}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0.2}>
                <Grid item xs={6}>
                  <div
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      height: "8vh",
                      maxHeight: "8vh",
                    //   overflowY: "auto",
                    //   overflow: "auto",
                      // overflowX: "hidden",
                      margin: "5px",
                      backgroundColor: "#f0efeb",
                      //   textAlign: "center",
                    }}
                  >
                      <div>
                        <Controls.Buttons
                          type="button"
                          text={t("Resumo Centro de Tr.")}
                          color="primary"
                          size="small"
                          width="40%"
                          onClick={onclickAllDataPopup}
                        />
                      
                        <Controls.Buttons
                          type="button"
                          text={t("Resumo por Dep.")}
                          size="small"
                          color="success"
                          width="40%"
                          onClick={onclickResumoDepartamento}
                        />
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
                      //   textAlign: "center",
                    }}
                  >
                    <div>
                      <div>
                        <Controls.Buttons
                          type="button"
                          text={t("Resumo por Função")}
                          size="small"
                          color="secondary"
                          width="40%"
                          onClick={onclickResumoFuncao}
                        />
                      
                    <Controls.Buttons
                      type="button"
                      text={t("Resumo por Estado")}
                      size="small"
                      width="40%"
                      onClick={onclickAllDataPopup}
                    />
                  </div> 
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "65vh",
                maxHeight: "65vh",
                overflowY: "auto",
                overflow: "auto",
                // overflowX: "hidden",
                margin: "5px",
                // backgroundColor: "#f0efeb",
                //   textAlign: "center",
              }}
            >
              <div>
                {count === 15 && Number(nivelAcesso) === 101 ? (
                  <div style={{ height: 400, width: "100%" }}>
                    <FuncionarioResumoSearchTable
                      ref={childRef_resumo}
                      backGroundColor="darkBlue"
                      color="white"
                      pageSize={9}
                      rowPerPage={9}
                    />
                  </div>
                ) : 
                count === 16 ? 
                    <div style={{ height: 400, width: "100%", marginTop: "2px" }}>
                      <DepartamentoResumoSearchTable
                        ref={childRefDepartamento}
                        sedeID={sedeID}
                        agenciaID={0}
                        backGroundColor="darkBlue"
                        color="white"
                        pageSize={9}
                        rowPerPage={9}
                      />
                    </div>
                   : 
                   count === 17 ? 
                    <div style={{ height: 400, width: "100%", marginTop: "2px" }}>
                      <FuncaoResumoSearchTable
                        ref={childRefFuncao}
                        sedeID={sedeID}
                        agenciaID={0}
                        backGroundColor="darkBlue"
                        color="white"
                        pageSize={9}
                        rowPerPage={9}
                      />
                    </div>
                   : 
                  <div style={{ height: 400, width: "100%" }}>
                    <FuncionarioSearchTable
                      ref={childRef}
                      idDisplay={false}
                      agenciaDisplay={false}
                      codeDisplay={true}
                      primeiroNomeDisplay={false}
                      ultimonomeDisplay={false}
                      emailDisplay={true}
                      actionsButtonDisplaySelect={false}
                      telefoneDislay={true}
                      statusDisplay={true}
                      actionsButtonDisplayEditDelete={true}
                      backGroundColor="darkBlue"
                      sedeID={sedeID}
                      agenciaID={agenciaID}
                      color="white"
                      pageSize={9}
                      rowPerPage={9}
                    />
                  </div>
                }
                {/* {count === 6 && Number(nivelAcesso) === 101 ? (
                  <div style={{ height: 400, width: "100%" }}>
                    <FuncionarioResumoSearchTable
                      ref={childRef_resumo}
                      backGroundColor="darkBlue"
                      color="white"
                      pageSize={9}
                      rowPerPage={9}
                    />
                  </div>
                ) : null
                } */}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/*




   {/*
    <div className="utilisateurList">
        <h3 style={{ marginLeft: '15px' }}>{t('lista_funcionario')}</h3>

        <div style={{ marginBottom: "5px", marginLeft: "5px" }}>
            <label className="inputLabel">{t('sede')}</label>
            <Controls.Input
                name="sede"
                placeHolder={t('sede')}
                value={sede}
                width="35%"
                type="text"
                disabled="true"
            />
            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={onclicSedePopup}
            />

            {(Number(nivelAcesso) === 101) ?
                <Controls.Buttons
                    type="submit"
                    text={t('resumo')}
                    size="small"
                    onClick={onclickAllDataPopup}
                /> :
                <div style={{ marginTop: "20px" }}>

                </div>
            }

        </div>

        <div style={{ marginTop: "-25px", marginBottom: "0px", marginLeft: "5px" }}>
            <label className="inputLabel">{t('nome_Agencia')}</label>
            <Controls.Input
                name="agencia"
                placeHolder={t('nome_Agencia')}
                value={agencia}
                type="text"
                width="35%"
            />
            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={onclickAgenciaPopup}
            />
        </div>
        <div style={{ marginBottom: "20px", marginLeft: "5px" }}>
            <label className="userLabel">{t('Recherche')}</label>
            <Controls.Input
                name="searchNome"
                type="text"
                value={searchNome}
                placeHolder={t('nome')}
                width="20%"
                marginLeft="-20px"
                onChange={nameSearchToToDataGrid}
                InputProps={{
                    startAdornment: (<InputAdornment position='start'>
                        <Search />
                    </InputAdornment>)
                }}
            />
            <Controls.Input
                name="searchApelido"
                type="text"
                value={searchApelido}
                placeHolder={t('apelido')}
                width="15%"
                marginLeft="-20px"
                onChange={lastNameSearchSearchToToDataGrid}
                InputProps={{
                    startAdornment: (<InputAdornment position='start'>
                        <Search />
                    </InputAdornment>)
                }}
            />

        </div>

        {count === 5 && (Number(nivelAcesso) === 101) ?

            <div style={{ height: 400, width: '100%' }}>
                <FuncionarioResumoSearchTable ref={childRef_resumo}
                    // idDisplay={false}
                    // agenciaDisplay={false}
                    // codeDisplay={true}
                    // primeiroNomeDisplay={false}
                    // ultimonomeDisplay={false}
                    // emailDisplay={true}
                    // actionsButtonDisplaySelect={false}
                    // emailDisplay={true}
                    // telefoneDislay={true}
                    // statusDisplay={true}
                    // actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={9}
                    rowPerPage={9} />
            </div> :

            <div style={{ height: 400, width: '100%' }}>

                <FuncionarioSearchTable ref={childRef}
                    idDisplay={false}
                    agenciaDisplay={false}
                    codeDisplay={true}
                    primeiroNomeDisplay={false}
                    ultimonomeDisplay={false}
                    emailDisplay={true}
                    actionsButtonDisplaySelect={false}
                    telefoneDislay={true}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="darkBlue"
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    color="white"
                    pageSize={9}
                    rowPerPage={9} />
            </div>
        }

    */}

      {count === 1 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          //pageHeader={PopupHeaderUniversity()}
          buttonColor="secondary"
          width="800px"
          height="580px"
          marginTop="10px"
          title={popupTitle}
        >
          <SedeUtilizadorSearchTable
            idDisplay={true}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonSelectDisplay={true} // monstrar o campo = true
            actionsButtonDisplayEditDelete={false}
            pageSize={10}
            rowPerPage={10}
            backGroundColor="darkBlue"
            color="white"
            userID={userID}
            sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              setOpenPopup(false);
              setAgencia("");
              tableFuncaooUpdateData1(0, 0, "", "");
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
          buttonColor="secondary"
          title={popupTitle}
          width="800px"
          height="580px"
          marginTop="10px"
        >
          <AgenciaUtilizadorSearchTable
            ref={childRefAgence}
            idDisplay={false}
            codeDisplay={true}
            emailDisplay={false}
            statusDiplay={false}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor="darkBlue"
            color="white"
            sedeID={sedeID}
            userID={userID}
            pageSize={10}
            rowPerPage={10}
            agenciaData={(id, code, agencia) => {
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableFuncaooUpdateData1(sedeID, id, "", "");
            }}
          />
        </Popup>
      ) : null}
      {count === 3 ? (
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
            pageSize={10}
            rowPerPage={10}
            backGroundColor="darkBlue"
            color="white"
            listarGrid={true}
            // userID={userID2}
            // sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              setOpenPopup(false);
              // tableAgenciaUpdateData(id);
              setAgencia("");
              tableFuncaooUpdateData1(0, 0, "", "");
            }}
          />
        </Popup>
      ) : null}

      {count === 4 ? (
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
          <DepartamentoSearchTable
            idDisplay={true}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonDisplay={true}
            actionsButtonDisplayEditDelete={false}
            pageSize={10}
            rowPerPage={10}
            sedeID={sedeID}
            agenciaID={agenciaID}
            departamentoPesquisa=""
            backGroundColor="#f0efeb"
            color="black"
            listarGrid={true}
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
      {count === 18 ? (
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
            pageSize={10}
            rowPerPage={10}
            backGroundColor="#f0efeb"
            color="black"
            sedeID={sedeID}
            agenciaID={agenciaID}
            funcaoPesquisa=""
            listarGrid={true}
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
      {count === 6 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          title={popupTitle}
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
            pageSize={10}
            rowPerPage={10}
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
export default ListagemFuncionarios;
