import React, { Component } from "react";
import { useState, useEffect, useRef, useContext } from "react";
import "./userList.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import UserSearchTable from "../utilisador/UserSearchTable";
import { useTranslation } from "react-i18next";
import Controls from "../../components/reusableComponents/Controls";
import { House, Search } from "@mui/icons-material";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import { Box, Grid, InputAdornment, Paper } from "@mui/material";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { styled } from "@mui/material/styles";
import { useForm } from "../../components/reusableComponents/useForm";
import PageHeader from "../../components/reusableComponents/PageHeader";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";
import AgenciaSearchTable from "../../adminPages/agencias/AgenciaSeachTable";

const initialFValues = {
  paisID: "",
  cidadeID: "",
  centroTrabalhoPesquisa: "",
};
const UserList = () => {
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
  const [sedeID, setSedeID] = useState("");
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");

  const [sedePesquisa, setSedePesquisa] = useState("");
  const childRefSede = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [nomeUsuarioPesquisa, setNomeUsuarioPesquisa] = useState("");
  const [apelidoUsuarioPesquisa, setApelidoUsuarioPesquisa] = useState("");

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const [role, setRole] = useState(0);

  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const [agenciaPesquisa, setAgenciaPesquisa] = useState("");

  const { t } = useTranslation();

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    false
  ); // useForm = useForm.js. We defined - validateOnChange=false

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    getUserContext();
    getPaises(); //Dados dos paises
  }, [role]);

  const getUserContext = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";
    let agenciaIDP = 0;
    let agenciaIDP_text = "";

    userSavedValue.map((item) => {
      setRole(item.nivelAcesso);
      setSedeID(item.sedeID);
      setSede(item.sede);
      testEdit = item.provenienciaFormulario;
      sedeIDP = item.sedeID;
      agenciaIDP = item.agenciaID_pesquisa;
      sedeIDP_text = item.sede;
      agenciaIDP_text = item.agencia_pesquisa;

      tableAgenciaUpdateData(
        sedeID,
        "SedeID",
        "undefined",
        "filtrePais",
        "",
        ""
      );
    });

    if (testEdit === "EditUser") {
      setSedeID(sedeIDP);
      setSede(sedeIDP_text);

      childRef.current.userGetAll(sedeIDP); // saveImage() = method called
    }
  };

  const onclickAgenciaPopup = () => {
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const tableAgenciaUpdateData = (
    sedeID,
    emailPesquisa,
    email,
    tipoPesquisa,
    pais,
    cidade
  ) => {
    childRef.current.userGetAll(
      sedeID,
      emailPesquisa,
      email,
      tipoPesquisa,
      pais,
      cidade
    ); // saveImage() = method called
  };

  const sedeSearchToToDataGrid = (e) => {
    setSedePesquisa(e.target.value);
    childRefSede.current.sedSearch(e.target.value); // search the firstname
  };

  const usuarioSearchToToDataGrid = (e) => {
    setNomeUsuarioPesquisa(e.target.value);
    setApelidoUsuarioPesquisa("");
    childRef.current.nomeSearch(e.target.value); // search the firstname
  };

  const apelidoUsuarioSearchToToDataGrid = (e) => {
    setApelidoUsuarioPesquisa(e.target.value);
    setNomeUsuarioPesquisa("");
    childRef.current.apelidoSearch(e.target.value); // search the firstname
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

    tableAgenciaUpdateData(
      sedeID,
      "filtrePais",
      "undefined",
      "filtrePais",
      e.target.value,
      values.cidadeID
    );
  };

  const cidadeHandleChange = (e) => {
    values.cidadeID = "";
    values.centroTrabalhoPesquisa = "";
    handleInputChange(e);
    tableAgenciaUpdateData(
      sedeID,
      "filtreCidade",
      "undefined",
      "filtreCidade",
      values.paisID,
      e.target.value
    );
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
                title={t("lista_usuarios")}
                subTitle={t("Formulário de Listagem de Usúarios")}
                backGroundColor="lightblue"
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
                  height: "13vh",
                  maxHeight: "13vh",
                  overflowY: "auto",
                  overflow: "auto",
                  // overflowX: "hidden",
                  margin: "5px",
                  // backgroundColor: "#f0efeb",
                  //   textAlign: "center",
                }}
              >
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
                    onClick={onclickAgenciaPopup}
                  />
                </div>
                <div>
                  <label className="userLabel">{t("Recherche")}</label>
                  <Controls.Input
                    name="nomeUsuarioPesquisa"
                    type="text"
                    value={nomeUsuarioPesquisa}
                    placeHolder={t("nome")}
                    width="74%"
                    // marginLeft="-20px"
                    onChange={usuarioSearchToToDataGrid}
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
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "17vh",
                maxHeight: "17vh",
                overflowY: "auto",
                overflow: "auto",
                overflowX: "hidden",
                margin: "5px",
                // backgroundColor: "#f0efeb",
                // textAlign: "center",
              }}
            >
              <Grid item xs={12}>
                <div style={{ marginLeft: "5px" }}>
                  <div style={{ marginTop: "5px" }}>
                    <label className="inputLabel">{t("pais")}</label>
                    <Controls.Select
                      name="paisID"
                      label="paisID"
                      value={values.paisID}
                      onChange={paisHandleChange}
                      options={paisesTable}
                      typeOfSelect={6}
                      width="78%"
                      height="40px"
                    />
                  </div>

                  <div style={{ marginTop: "3px" }}>
                    <label className="inputLabel">{t("cidade")}</label>

                    <Controls.Select
                      name="cidadeID"
                      label="cidadeID"
                      value={values.cidadeID}
                      onChange={cidadeHandleChange}
                      options={cidadeTable}
                      typeOfSelect={7}
                      width="78%"
                      height="40px"
                    />
                  </div>
                </div>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "60vh",
                maxHeight: "60vh",
                overflowY: "auto",
                overflow: "auto",
                // overflowX: "hidden",
                margin: "5px",
                // backgroundColor: "#f0efeb",
                // textAlign: "center",
              }}
            >
              <div>
                <UserSearchTable
                  ref={childRef}
                  idDisplay={true}
                  userNameDisplay={true}
                  firstnameDisplay={true}
                  lastnameDisplay={true}
                  emailDisplay={false}
                  roleDisplay={true}
                  statusDisplay={true}
                  affectacaoDisplay={true}
                  sexoDisplay={false}
                  paisDisplay={true}
                  cidadeDisplay={true}
                  actionsButtonDisplaySelect={false}
                  actionsButtonDisplayEditDelete={true}
                  backGroundColor="blue"
                  sedeID={sedeID}
                  color="white"
                  pageSize={10}
                  rowPerPage={10}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/*  <Grid
        constainer
        spacing={1}
        container
        direction="column"
        justifyContent="space-between"
        // style={{ height: "100%" }}
      >
          <div className="utilisateurList">
          <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>

            <h3 style={{ marginLeft: "15px" }}>{t("lista_usuarios")}</h3>
            </Grid>


        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <div style={{ marginLeft: "10px" }}>
            <div style={{ marginBottom: "0px" }}>
              <label className="inputLabel">{t("sede")}</label>
              <Controls.Input
                name="sede"
                placeHolder={t("sede")}
                value={sede}
                width="65%"
                type="text"
                disabled="true"
              />
              <Search
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={onclickAgenciaPopup}
              />
            </div>

            <div style={{ marginBottom: "5px" }}>
              <label className="userLabel">{t("Recherche")}</label>
              <Controls.Input
                name="nomeUsuarioPesquisa"
                type="text"
                value={nomeUsuarioPesquisa}
                placeHolder={t("nome")}
                width="65%"
                // marginLeft="-20px"
                onChange={usuarioSearchToToDataGrid}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
              <div style={{marginBottom: "20px"}}>
              <label className="userLabel">{t("Recherche")}</label>
              <Controls.Input
                name="apelidoUsuarioPesquisa"
                type="text"
                value={apelidoUsuarioPesquisa}
                placeHolder={t("apelido")}
                width="65%"
                // marginLeft="-20px"
                onChange={apelidoUsuarioSearchToToDataGrid}
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
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div style={{ height: 400, width: "99%", marginLeft: "10px" }}>
            <UserSearchTable
              ref={childRef}
              idDisplay={true}
              userNameDisplay={true}
              firstnameDisplay={true}
              lastnameDisplay={true}
              emailDisplay={false}
              roleDisplay={true}
              statusDisplay={true}
              affectacaoDisplay={true}
              sexoDisplay={false}
              paisDisplay={true}
              cidadeDisplay={true}
              actionsButtonDisplaySelect={false}
              actionsButtonDisplayEditDelete={true}
              backGroundColor="blue"
              sedeID={sedeID}
              color="white"
              pageSize={10}
              rowPerPage={10}
            />
          </div>
        </Grid>
        <div> */}
      {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notifications
                notify={notify}
                setNotify={setNotify}
            /> */}

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        //pageHeader={PopupHeaderUniversity()}
        buttonColor="secondary"
        width="800px"
        height="580px"
        closeButtonDisplay={false}
        marginTop="-20px"
        // title={popupTitle}
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
          statusDisplay={true}
          actionsButtonSelectDisplay={true} // monstrar o campo = true
          actionsButtonDisplayEditDelete={false}
          pageSize={9}
          rowPerPage={9}
          backGroundColor="darkBlue"
          color="white"
          listarGrid={true}
          sedeData={(id, code, sede) => {
            setSede(sede);
            setSedeID(id);
            setOpenPopup(false);
            tableAgenciaUpdateData(
              id,
              "SedeID",
              "undefined",
              "filtrePais",
              "",
              ""
            );

            setSedePesquisa("");
          }}
        />
      </Popup>
      {/* </div>
        </div>
      </Grid> */}
    </>
  );
};
export default UserList;
