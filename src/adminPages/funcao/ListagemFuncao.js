import React, { useState, useEffect, useRef, useContext } from "react";
import "./funcao.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import UserSearchTable from "../utilisador/UserSearchTable";
import FuncaoSearchTable from "./FuncaoSearchTable";

import { useTranslation } from "react-i18next";
import Controls from "../../components/reusableComponents/Controls";
import { House, Search } from "@mui/icons-material";
import Popup from "../../components/reusableComponents/Popup";
import SedeSearchTable from "../sede/SedeSearchTable";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { styled } from "@mui/material/styles";
import { Box, Grid, InputAdornment, Paper } from "@mui/material";
import PageHeader from "../../components/reusableComponents/PageHeader";
import { useForm } from "../../components/reusableComponents/useForm";

const initialFValues = {
    funcaoPesquisa: "",
};
const ListagemFuncao = () => {
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
  const [sede, setSede] = useState("");
  const [agencia, setAgencia] = useState("");

  const [sedeID, setSedeID] = useState(0);
  const [agenciaID, setAgenciaID] = useState(0);
  const [userID, setUserID] = useState(0);

  const [count, setCount] = useState(0);

  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefAgence = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefFuncao = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");

  const [nivelAcesso, setNivelAcesso] = useState(0);

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const { t } = useTranslation();
  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    false
  ); // useForm = useForm.js. We defined - validateOnChange=false


  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen();
  }, [t]);

  const updateValuesOnOpen = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";
    let agenciaIDP = 0;
    let agenciaIDP_text = "";

    userSavedValue.map(
      (item) => {
        setSedeID(item.sedeID)
        setUserID(item.id)
        setSede(item.sede)
        setNivelAcesso(item.nivelAcesso)
        testEdit = item.provenienciaFormulario
        sedeIDP = item.sedeID_pesquisas
        agenciaIDP = item.agenciaID_pesquisa
        sedeIDP_text = item.sede_pesquisa
        agenciaIDP_text = item.agencia_pesquisa

        tableFuncaooUpdateData1(item.sedeID, item.agenciaID,  "")

      }
    );

    if (testEdit === "EditFuncao") {
      setSedeID(sedeIDP);
      setAgenciaID(agenciaIDP);
      setSede(sedeIDP_text);
      setAgencia(agenciaIDP_text);

      tableFuncaooUpdateData1(sedeIDP, agenciaIDP,  "")
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
      setCount(4);
    }
    setPpupTitle(t("lista_agencia"));
    setOpenPopup(true);
  };

  const tableFuncaooUpdateData1 = (sedeID1, agenciaID1, funcaoPesquisa) => {
      childRef.current.getGetAllData(sedeID1, agenciaID1, funcaoPesquisa); // saveImage() = method called
    
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



  const funcaoPesquisaCons = (e) => {
    handleInputChange(e);

    tableFuncaooUpdateData1(sedeID, agenciaID,  e.target.value)
}

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.2}>
          <Grid item xs={12}>
            <ItemMainTitlo>
              <PageHeader
                title={t('listagem_funcao_menu')}
                subTitle={t("Formulário de Listagem de Funções")}
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
                  height: "18vh",
                  maxHeight: "18vh",
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
                      name="funcaoPesquisa"
                      type="text"
                      value={values.funcaoPesquisa}
                      placeHolder={t("Pesquisar Função")}
                      width="74%"
                      onChange={funcaoPesquisaCons}
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
                height: "22vh",
                maxHeight: "22vh",
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
              <div style={{ fontWeight: 600 }}>
                <span></span>
              </div>
            </div>

           
           
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
              <FuncaoSearchTable ref={childRef}
                    idDisplay={true}
                    codeDisplay={true}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={10}
                    rowPerPage={10}
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/*
        <div className="utilisateurList">
            <div>
            <h3 style={{ marginLeft: '15px', textTransform: "uppercase" }}>{t('listagem_funcao_menu')}</h3>

            <div style={{ marginBottom: "-5px" }}>
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
            </div>

            <div style={{marginTop: "5px"}}>
                <label style={{marginTop: "0px", fontSize: "12px"}} className="inputLabel">{t('nome_Agencia')}</label>
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

            
            </div>

            <div style={{ height: 400, width: '100%' , marginTop:"10px" }}>
                <FuncaoSearchTable ref={childRef}
                    idDisplay={true}
                    codeDisplay={true}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={true}
                    actionsButtonDisplayEditDelete={true}
                    pageSize={13}
                    rowPerPage={13}
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                />
            </div>

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
            pageSize={9}
            rowPerPage={9}
            backGroundColor="darkBlue"
            color="white"
            userID={userID}
            sedeID={sedeID}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              setOpenPopup(false);
              setAgencia("");
              setAgenciaID(0);
              tableFuncaooUpdateData1(sedeID, id, values.funcaoPesquisa);

              // tableAgenciaUpdateData(id);
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
            pageSize={9}
            rowPerPage={9}
            agenciaData={(id, code, agencia) => {
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableFuncaooUpdateData1(sedeID, id, values.funcaoPesquisa);
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
            pageSize={9}
            rowPerPage={9}
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
          width="800px"
          height="580px"
          closeButtonDisplay={false}
          marginTop="-20px"
        >
          <AgenciaSearchTable
            ref={childRefAgence}
            idDisplay={false}
            codeDisplay={true}
            emailDisplay={false}
            statusDisplay={true}
            actionsButtonDisplaySelect={true}
            actionsButtonDisplayEditDelete={false}
            backGroundColor=""
            darkBlue
            idSede={sedeID}
            userID={userID}
            color="white"
            pageSize={9}
            rowPerPage={9}
            listarGrid={true}
            agenciaData={(id, code, agencia) => {
              setAgencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableFuncaooUpdateData1(sedeID, id, values.funcaoPesquisa);
            }}
          />
        </Popup>
      ) : null}
    </>
  );
};
export default ListagemFuncao;
