import React, { Component } from "react";
import { useState, useEffect, useRef, useContext } from "react";
import "./userList.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import UserSearchTable from "../utilisador/UserSearchTable";
import { useTranslation } from "react-i18next";
import Controls from "../../components/reusableComponents/Controls";
import { Search } from "@mui/icons-material";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import { Grid, InputAdornment } from "@mui/material";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";

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

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    getUserContext();
  }, [role]);

  const getUserContext = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";
    let agenciaIDP = 0;
    let agenciaIDP_text = "";

    userSavedValue.map(
      (item) => (
        setRole(item.nivelAcesso),
        (testEdit = item.provenienciaFormulario),
        (sedeIDP = item.sedeID_pesquisas),
        (agenciaIDP = item.agenciaID_pesquisa),
        (sedeIDP_text = item.sede_pesquisa),
        (agenciaIDP_text = item.agencia_pesquisa)
      )
    );

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

  const tableAgenciaUpdateData = (sedeID) => {
    childRef.current.userGetAll(sedeID); // saveImage() = method called
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

  return (
    <>
      <Grid
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
        <div>
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
            width="650px"
            height="520px"
            marginTop="10px"
            title={popupTitle}
          >
            <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
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
            </div>

            <SedeSearchTable
              ref={childRefSede}
              idDisplay={true}
              codeDisplay={false}
              statusDisplay={true}
              actionsButtonSelectDisplay={true} // monstrar o campo = true
              actionsButtonDisplayEditDelete={false}
              pageSize={7}
              rowPerPage={7}
              backGroundColor="darkBlue"
              color="white"
              sedeData={(id, code, sede) => {
                setSede(sede);
                setSedeID(id);
                setOpenPopup(false);
                tableAgenciaUpdateData(id);
                setSedePesquisa("");
              }}
            />
          </Popup>
        </div>
        </div>
      </Grid>
    </>
  );
};
export default UserList;
