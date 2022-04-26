import React, { useState, useEffect, useRef, useContext } from "react";
import "./departamento.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import UserSearchTable from "../utilisador/UserSearchTable";
import DepartamentoSearchTable from "./DepartamentoSearchTable";
import DepartamentoResumoSearchTable from "./DepartamentoResumoSearchTable";

import { useTranslation } from "react-i18next";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import Controls from "../../components/reusableComponents/Controls";
import { House, Search } from "@mui/icons-material";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeUtilizadorSearchTable from "../utilisador/SedeUtilizadorSearchTable";
import AgenciaUtilizadorSearchTable from "../utilisador/AgenciaUtilizadorSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { styled } from "@mui/material/styles";
import { Box, Grid, InputAdornment, Paper } from "@mui/material";
import PageHeader from "../../components/reusableComponents/PageHeader";
import { useForm } from "../../components/reusableComponents/useForm";

const initialFValues = {
    departamentoPesquisa: "",
};

const ListagemDepartamento = () => {
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
  const [agencia, setagencia] = useState("");
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRef_resumo = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [count, setCount] = useState(0);
  const [agenciaID, setAgenciaID] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");

  const [sedeID, setSedeID] = useState(0);
  const [userID, setUserID] = useState(0);
  const [nivelAcesso, setNivelAcesso] = useState(0);

  const childRefDepartement = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const childRefAgence = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen();
  }, [t]);

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    false
  ); // useForm = useForm.js. We defined - validateOnChange=false

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

        tableDepartamentoUpdateData1(item.sedeID, 0, "");

      }
    );

    if (testEdit === "EditDepartamento") {
      setSedeID(sedeIDP);
      setAgenciaID(agenciaIDP);
      setSede(sedeIDP_text);
      setagencia(agenciaIDP_text);

      childRefDepartement.current.getGetAllData(sedeIDP, agenciaIDP); // saveImage() = method called
    }
  };

  const onclicSedePopup = () => {
    try {
      // childRefDepartement.current.getGetAllData(0, 0) // saveImage() = method called

      if (Number(nivelAcesso) !== 101) {
        setCount(1);
      } else {
        setCount(3);
      }

      setPpupTitle(t("lista_sede"));
      setOpenPopup(true);
    } catch (err) {}
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

  const tableDepartamentoUpdateData1 = (sedeID1, agenciaID1, departamentoPesquisa) => {
    //if(sedeID1 > 0  && agenciaID1 > 0){
    childRefDepartement.current.getGetAllData(sedeID1, agenciaID1, departamentoPesquisa); // saveImage() = method called
    //}
  };

  const departamentoPesquisaCons = (e) => {
      handleInputChange(e);

    tableDepartamentoUpdateData1(sedeID, agenciaID,  e.target.value)
  }

  const onclickResumoDepartamento = () => {
    setCount(5);
    // alert(sedeID)
    try {
      childRef_resumo.current.getGetAllDataFuncionarioDepartamento(sedeID, 0); // search the firstname
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.2}>
          <Grid item xs={12}>
            <ItemMainTitlo>
              <PageHeader
                title={t("listagem_departemento_menu")}
                subTitle={t("Formulário de Listagem de Departamentos")}
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
                  <div style={{marginLeft: "5px"}}>
                <div >
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
                     <label style={{fontSize:"12px", marginTop: "-5px"}} className="inputLabel">{t('nome_Agencia')}</label>
                     <Controls.Input
                        name="agencia"
                        placeHolder={t('nome_Agencia')}
                        value={agencia}
                        type="text"
                        width="74%"
                    />
                    <Search style={{ marginTop: "10px", cursor: "pointer" }}
                        onClick={onclickAgenciaPopup}
                    /></div>
                <div>
                  <label className="userLabel">{t("Recherche")}</label>
                  <Controls.Input
                    name="departamentoPesquisa"
                    type="text"
                    value={values.departamentoPesquisa}
                    placeHolder={t("Pesquisar Departamento")}
                    width="74%"
                    onChange={departamentoPesquisaCons}
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
              <div style={{  fontWeight: 600 }}>
                <span>RESUMO TRABALHADORES POR DEPARTAMENTO</span>
              </div>
              </div>

              <Grid item xs={12}>
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
                    // backgroundColor: "#f0efeb",
                      textAlign: "center",
                  }}
                >
                  <div>
                    <Controls.Buttons
                      type="button"
                      text={t("resumo")}
                      size="small"
                      width="60%"
                      onClick={onclickResumoDepartamento}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    height: "8.8vh",
                    maxHeight: "8.8vh",
                    overflowY: "auto",
                    overflow: "auto",
                    // overflowX: "hidden",
                    margin: "5px",
                    backgroundColor: "#f0efeb",                      textAlign: "center",
                  }}
                >
                  <div>
                    
                  </div>
                </div>
              </Grid>
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
                {count === 5 ? (
                  <div style={{ height: 400, width: "100%", marginTop: "2px" }}>
                    <DepartamentoResumoSearchTable
                      ref={childRef_resumo}
                      sedeID={sedeID}
                      agenciaID={0}
                      backGroundColor="darkBlue"
                      color="white"
                      pageSize={9}
                      rowPerPage={9}
                    />
                  </div>
                ) : (
                  <DepartamentoSearchTable
                    ref={childRefDepartement}
                    idDisplay={true}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={true}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="#f0efeb"
                    color="black"
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    pageSize={6}
                    rowPerPage={6}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/*
        // <div className="utilisateurList">
        //     <h3 style={{ marginLeft: '15px' }}>{t('listagem_departemento_menu')}</h3>

        //     <div style={{ marginBottom: "5px", padding: "6px" }}>
        //         <label className="inputLabel">{t('sede')}</label>
        //         <Controls.Input
        //             name="sede"
        //             placeHolder={t('sede')}
        //             value={sede}
        //             width="35%"
        //             type="text"
        //             disabled="true"
        //         />
        //         <Search style={{ marginTop: "10px", cursor: "pointer" }}
        //             onClick={onclicSedePopup}
        //         />

        //         <div>
        //             <label style={{fontSize:"12px", marginTop: "-5px"}} className="inputLabel">{t('nome_Agencia')}</label>
        //             <Controls.Input
        //                 name="agencia"
        //                 placeHolder={t('nome_Agencia')}
        //                 value={agencia}
        //                 type="text"
        //                 width="35%"
        //             />
        //             <Search style={{ marginTop: "10px", cursor: "pointer" }}
        //                 onClick={onclickAgenciaPopup}
        //             />

        //             <Controls.Buttons
        //                 type="submit"
        //                 text={t('resumo')}
        //                 size="small"
        //                 onClick={onclickResumoDepartamento}
        //             />
        //         </div>

        //     </div>
        //     {(count === 5) ?
        //         <div style={{ height: 400, width: '100%', marginTop: "2px" }}>
        //             <DepartamentoResumoSearchTable ref={childRef_resumo}
        //                 sedeID={sedeID}
        //                 agenciaID={0}
        //                 backGroundColor="darkBlue"
        //                 color="white"
        //                 pageSize={9}
        //                 rowPerPage={9} />
        //         </div> :
        //         <div style={{ height: 400, width: '100%', marginTop: "2px"}}>
        //             <DepartamentoSearchTable ref={childRefDepartement}
        //                 idDisplay={true}
        //                 codeDisplay={true}
        //                 actionsButtonDisplaySelect={true}
        //                 statusDisplay={true}
        //                 actionsButtonDisplayEditDelete={true}
        //                 backGroundColor="darkBlue"
        //                 color="white"
        //                 sedeID={sedeID}
        //                 agenciaID={agenciaID}
        //                 pageSize={13}
        //                 rowPerPage={13} />
        //         </div>
        //     }

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
            actionsButtonSelectDisplay={true} // monstrar o campo = true
            actionsButtonDisplayEditDelete={false}
            pageSize={9}
            rowPerPage={9}
            backGroundColor="#f0efeb"
            color="black"
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              setOpenPopup(false);
              setagencia("");
              setAgenciaID(0);
              tableDepartamentoUpdateData1(sedeID, 0, "");
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
            backGroundColor="#f0efeb"
            color="black"
            sedeID={sedeID}
            userID={userID}
            pageSize={9}
            rowPerPage={9}
            agenciaData={(id, code, agencia) => {
              setagencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableDepartamentoUpdateData1(sedeID, id, "");
            }}
          />
        </Popup>
      ) : null}

      {count === 3 ? (
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
              setOpenPopup(false);
              // tableAgenciaUpdateData(id);
              setagencia("");
              tableDepartamentoUpdateData1(sedeID, 0, "");

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
        //   title={popupTitle}
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
            backGroundColor="#f0efeb"
            darkBlue
            idSede={sedeID}
            userID={userID}
            color="black"
            pageSize={9}
            rowPerPage={9}
            listarGrid={true}
            agenciaData={(id, code, agencia) => {
              setagencia(agencia);
              setAgenciaID(id);
              setOpenPopup(false);
              tableDepartamentoUpdateData1(sedeID, id, "");
            }}
          />
        </Popup>
      ) : null}
    </>
  );
};
export default ListagemDepartamento;
