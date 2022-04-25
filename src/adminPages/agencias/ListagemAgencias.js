import React, { useState, useEffect, useRef, useContext } from "react";
import "./agencia.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";
import UserSearchTable from "../utilisador/UserSearchTable";
import AgenciaSearchTable from "./AgenciaSeachTable";
import { useTranslation } from "react-i18next";
import Controls from "../../components/reusableComponents/Controls";
import { House, Search } from "@mui/icons-material";
import { useForm } from "../../components/reusableComponents/useForm";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import { Box, Grid, InputAdornment, Paper } from "@mui/material";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { styled } from "@mui/material/styles";
import PageHeader from "../../components/reusableComponents/PageHeader";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";

const initialFValues = {
  paisID: "",
  cidadeID: "",
  centroTrabalhoPesquisa: '',
};

const ListagemAgencias = () => {
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
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRefSede = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");
  const [sedeID, setSedeID] = useState(0);
  const [sedePesquisa, setSedePesquisa] = useState("");
  const [agenciaPesquisa, setAgenciaPesquisa] = useState("");

  
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const { t } = useTranslation();

  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    false
  ); // useForm = useForm.js. We defined - validateOnChange=false

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen();
    getPaises(); //Dados dos paises
  }, []);

  const updateValuesOnOpen = () => {
    let testEdit = 0;
    let sedeIDP = 0;
    let sedeIDP_text = "";

    userSavedValue.map((item) => {
      setSedeID(item.sedeID);
      setSede(item.sede);
      testEdit = item.provenienciaFormulario;
      sedeIDP = item.sedeID_pesquisas;
      sedeIDP_text = item.sede_pesquisa;

      tableAgenciaUpdateData(item.sedeID);
    });

    if (testEdit === "EditAgencia") {
      setSedeID(sedeIDP);
      setSede(sedeIDP_text);
      childRef.current.getGetAllData(sedeIDP); // saveImage() = method called
    }
  };

  const onclickAgenciaPopup = () => {
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const tableAgenciaUpdateData = (sedeID, tipoPesquisa, agencia, pais, cidade  ) => {
    childRef.current.getGetAllData(sedeID, tipoPesquisa, agencia, pais,  cidade); // saveImage() = method called
  };

  const sedeSearchToToDataGrid = (e) => {
    handleInputChange(e);
    setSedePesquisa(e.target.value);
    //childRefSede.current.sedSearch(e.target.value); // search the firstname
    childRef.current.getGetAllData(sedeID, "filtre", e.target.value, values.pais,  values.cidade); // saveImage() = method called

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
    tableAgenciaUpdateData(sedeID, "filtre", agenciaPesquisa, e.target.value, values.cidadeID)
  };

  const cidadeHandleChange = (e) => {
    values.cidadeID = "";
    values.centroTrabalhoPesquisa = "";
    handleInputChange(e);
    tableAgenciaUpdateData(sedeID, "filtre", agenciaPesquisa, values.paisID, e.target.value)
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
                title={t("lista_agencia")}
                subTitle={t("Formulário de Listagem de Sedes")}
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
                    width="65%"
                    type="text"
                    disabled="true"
                  />
                  <Search
                    style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickAgenciaPopup}
                  />
                </div>
                <div >
                  <label className="userLabel">{t("Recherche")}</label>
                  <Controls.Input
                    name="centroTrabalhoPesquisa"
                    type="text"
                    value={values.centroTrabalhoPesquisa}
                    placeHolder={t("agencia")}
                    width="65%"
                    // marginLeft="-20px"
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
                      width="74%"
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
                      width="74%"
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
                textAlign: "center",
              }}
            >
              <div>
                <div>
                  <AgenciaSearchTable
                    ref={childRef}
                    idDisplay={false}
                    codeDisplay={true}
                    actionsButtonDisplaySelect={false}
                    actionsButtonDisplayEditDelete={true}
                    emailDisplay={false}
                    telefoneDislay={true}
                    cidadeDisplay={true}
                    paisDisplay={true}
                    statusDisplay={true}
                    backGroundColor="darkBlue"
                    color="white"
                    pageSize={9}
                    rowPerPage={9}
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

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
    </>

    // <div className="utilisateurList">
    //     <h3 style={{ marginLeft: '15px', textTransform: "uppercase" }}>{t('lista_agencia')}</h3>

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
    //             onClick={onclickAgenciaPopup}
    //         />
    //     </div>

    //     <div style={{ height: 400, width: '100%' }}>
    //         <AgenciaSearchTable ref={childRef}
    //             idDisplay={false}
    //             codeDisplay={true}
    //             actionsButtonDisplaySelect={false}
    //             actionsButtonDisplayEditDelete={true}
    //             emailDisplay={false}
    //             telefoneDislay={true}
    //             cidadeDisplay={true}
    //             paisDisplay={true}
    //             statusDisplay={true}
    //             backGroundColor="darkBlue"
    //             color="white"
    //             pageSize={10}
    //             rowPerPage={10} />
    //     </div>

    //     <Popup
    //         openPopup={openPopup}
    //         setOpenPopup={setOpenPopup}
    //         //pageHeader={PopupHeaderUniversity()}
    //         buttonColor="secondary"
    //         width="650px"
    //         height="520px"
    //         marginTop="10px"
    //         title={popupTitle}>

    //         <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
    //             <label className="userLabel">{t('Recherche')}</label>
    //             <Controls.Input
    //                 name="sedePesquisa"
    //                 type="text"
    //                 value={sedePesquisa}
    //                 placeHolder={t('sede')}
    //                 width="55%"
    //                 marginLeft="-20px"
    //                 onChange={sedeSearchToToDataGrid}
    //                 InputProps={{
    //                     startAdornment: (<InputAdornment position='start'>
    //                         <Search />
    //                     </InputAdornment>)
    //                 }}
    //             />
    //         </div>
    //         <SedeSearchTable ref={childRefSede}
    //             idDisplay={true}
    //             codeDisplay={false}
    //             statusDisplay={true}
    //             actionsButtonSelectDisplay={true} // monstrar o campo = true
    //             actionsButtonDisplayEditDelete={false}
    //             pageSize={7}
    //             rowPerPage={7}
    //             backGroundColor="darkBlue"
    //             color="white"
    //             sedeData={(id, code, sede) => {
    //                 setSede(sede);
    //                 setSedeID(id);
    //                 setOpenPopup(false);
    //                 tableAgenciaUpdateData(id);
    //                 setSedePesquisa("")

    //             }
    //             }
    //         />

    //     </Popup>

    // </div>
  );
};
export default ListagemAgencias;
