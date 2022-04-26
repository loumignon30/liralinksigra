import { Delete, Done, Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import AgenciaService from "../../services/admin/Agencia.service";
import urlImage from "../../http-common-images";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Grid, InputAdornment, Paper } from "@mui/material";
import Controls from "../../components/reusableComponents/Controls";

const AgenciaSearchTable = forwardRef((props, ref) => {
  // forwardRef is used to update method from this file from ather files

  const useStyles = makeStyles({
    paper: {
      background: props.backGroundColor || "darkBlue",
      color: props.color || "white",
      fontSize: "16px",
      fontFamily: "Times New Roman', Times, serif",
      textAlign: "center",
      // width: "100%"
    },
    searchButton: {
      border: "none",
      borderRadius: "10px",
      padding: "5px 10px",
      backgroundColor: "white",
      color: "green",
      cursor: "pointer",
      marginRight: "20px",
    },
  });

  const propsTableGrid = {
    // grid style: SearchTableStyle.js
    backGroundColor: props.backGroundColor,
    color: props.color,
  };
  const classes2 = useStylesSearchTable(propsTableGrid);

  const [openPopup, setOpenPopup] = useState(false);
  const {
    idDisplay,
    codeDisplay,
    actionsButtonDisplaySelect,
    actionsButtonDisplayEditDelete,
    emailDisplay,
    telefoneDislay,
    cidadeDisplay,
    paisDisplay,
    statusDisplay,
    backGroundColor,
    color,
    pageSize,
    rowPerPage,
    idSede,
    listarGrid
  } = props;

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(""); // backend image  URL
  const classes = useStyles();

  const [agenciaSearch, setAgenciaSearch] = useState("");
  const [campoPesquisa, setCampoPesquisa] = useState("");

  const [agenciaPesquisa, setAgenciaPesquisa] = useState("");


  const { t } = useTranslation();

  useEffect(() => {
    getGetAllData(idSede);
    setUrl(urlImage());
  }, []);

  useImperativeHandle(ref, () => ({
    getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
    editCliqued: editCliqued,
    agenciaSearchData: agenciaSearchData,
  }));

  const getAgenciaData = (id, code, agencia) => {
    props.agenciaData(id, code, agencia);
    setOpenPopup(false);
  };

  const getGetAllData = (sedeID, tipoPesquisa, agencia, pais, cidade ) => {
    AgenciaService.getAll(sedeID, tipoPesquisa, agencia, pais, cidade)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const agenciaSearchData = (agenciaToSearch) => {
    setCampoPesquisa("nome");
    setAgenciaSearch(agenciaToSearch);
  };

  const editCliqued = (
    id,
    code,
    nome,
    endereco,
    email,
    telefone,
    cidade,
    pais,
    nomeRepresentante,
    status,
    imageChangeFromOutSideURL,
    imageName
  ) => {
    props.editClick(
      id,
      code,
      nome,
      endereco,
      email,
      telefone,
      cidade,
      pais,
      nomeRepresentante,
      status,
      imageChangeFromOutSideURL,
      imageName
    );
  };

  const columns = [
    idDisplay
      ? {
          field: "id",
          headerName: "ID",
          flex: 0.5,
          headerClassName: classes.paper,
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { idDisplay },
          width: 50,
          headerClassName: classes.paper,
        },

    codeDisplay
      ? {
          field: "code",
          headerName: t("code"),
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "code",
          headerName: t("code"),
          hide: { codeDisplay },
          flex: 1,
          headerClassName: classes.paper,
        },

    {
      field: "nome",
      headerName: t("nome_Agencia"),
      flex: 3,
      headerClassName: classes.paper,
    },
    emailDisplay
      ? {
          field: "email",
          headerName: t("email"),
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "email",
          headerName: t("email"),
          hide: { emailDisplay },
          flex: 1,
          headerClassName: classes.paper,
        },

    telefoneDislay
      ? {
          field: "telefone",
          headerName: t("contacto"),
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "telefone",
          headerName: t("contacto"),
          hide: { telefoneDislay },
          headerClassName: classes.paper,
        },

        paisDisplay
      ? {
          field: "pais",
          headerName: t("pais"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.paisagencia.pais}</span>
              </>
            );
          },

          // C:\React app\world-university-backend\public\images
        }
      : {
          field: "pais",
          headerName: "pais",
          hide: { paisDisplay },
          headerClassName: classes.paper,
        },

    cidadeDisplay
      ? {
          field: "cidade",
          headerName: t("cidade"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.cidadeagencia.cidade}</span>
              </>
            );
          },
        }
      : {
          field: "cidade",
          headerName: "cidade",
          hide: { cidadeDisplay },
          headerClassName: classes.paper,
        },

    statusDisplay
      ? {
          field: "status",
          headerName: t("status"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                <button
                  className={
                    type.row.status == "1"
                      ? classes2.ButtonStatutDataGrid_actif
                      : type.row.status == "2"
                      ? classes2.ButtonStatutDataGrid_inactif
                      : type.row.status == "3"
                      ? classes2.ButtonStatutDataGrid_pendent
                      : type.row.status == "4"
                      ? classes2.ButtonStatutDataGrid_deleted
                      : ""
                  }
                >
                  {type.row.status == "1"
                    ? t("status_actif")
                    : type.row.status == "2"
                    ? t("status_inactive")
                    : type.row.status == "3"
                    ? t("status_pendente")
                    : type.row.status == "4"
                    ? t("status_apagado")
                    : ""}
                </button>
              </>
            );
          },
        }
      : {
          field: "status",
          headerName: t("status"),
          flex: 1,
          hide: { statusDisplay },
          headerClassName: classes.gridHeader,
        },

    actionsButtonDisplaySelect
      ? {
          field: "action",
          headerName: t("action"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <Done
                  className={classes.searchButton}
                  onClick={() => {
                    getAgenciaData(
                      params.row.id,
                      params.row.code,
                      params.row.nome
                    );
                  }}
                />
              </>
            );
          },
        }
      : {
          field: "action",
          headerName: t("action"),
          flex: 1,
          hide: { actionsButtonDisplaySelect },
          headerClassName: classes.paper,
        },

    actionsButtonDisplayEditDelete
      ? {
          field: "action2",
          headerName: t("action"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <Link
                  to={"/agencia/" + params.row.id}
                  state={{
                    id: params.row.id,
                    code: params.row.code,
                    nome: params.row.nome,
                    endereco: params.row.endereco,
                    email: params.row.email,
                    telefone: params.row.telefone,
                    cidadeID: params.row.cidadeID,
                    paisID: params.row.paisID,
                    nomeRepresentante: params.row.nomeRepresentante,
                    status: params.row.status,
                    sede: params.row.sedeAgencia.sede,
                    sedeID: params.row.sedeAgencia.id,
                  }}
                >
                  <button className="utilisateurButtonEdit">{t("edit")}</button>
                </Link>

                <Delete className="utilisateurButtonDelete" />
              </>
            );
          },
        }
      : {
          field: "action2",
          headerName: t("action"),
          flex: 1,
          hide: { actionsButtonDisplayEditDelete },
          headerClassName: classes.paper,
        },
  ];
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

  const close = () => {
    setOpenPopup(false);
    props.agenciaData();
  };

  const agenciaSearchCons = (agenciaToSearch) => {
    setCampoPesquisa("nome");
    setAgenciaSearch(agenciaToSearch);
    // setSedePesquisa(e.target.value);
  };

  const agenciaSearchToToDataGrid = (e) => {
    setAgenciaPesquisa(e.target.value);
    agenciaSearchCons(e.target.value);
    // childRefSede.current.sedSearch(e.target.value); // search the firstname
  };
  return (
    <>
    {listarGrid ? (
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: "-20px" }}>
          <Grid container spacing={0}>
            <Grid item xs={11}>
              <ItemMainTitlo
                style={{
                  borderStyle: "solid",
                  backgroundColor: "#f0efeb",
                  height: "5vh",
                  maxHeight: "5vh",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  <span>PESQUISA DE CENTRO DE TRABALHO</span>
                </div>
              </ItemMainTitlo>
            </Grid>

            <Grid item xs={1}>
              <ItemMainTitlo
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundColor: "#f0efeb",
                  height: "5vh",
                  maxHeight: "5vh",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <button
                    className="buttonPopupGridFuncionarioSearhTable"
                    onClick={() => {
                      close();
                    }}
                  >
                    X
                  </button>
                </div>
              </ItemMainTitlo>
            </Grid>

            <Grid item xs={6}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  // backgroundColor: "#f0efeb",
                  height: "7vh",
                  maxHeight: "7vh",
                  margin: "5px",
                  // textAlign: "center",
                }}
              >
                <div>
                  <label className="userLabel">{t("Recherche")}</label>
                  <Controls.Input
                    name="agenciaPesquisa"
                    type="text"
                    value={agenciaPesquisa}
                    placeHolder={t("agencia")}
                    width="75%"
                    marginLeft="-20px"
                    onChange={agenciaSearchToToDataGrid}
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
            <Grid item xs={6}>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundColor: "#f0efeb",
                  height: "7vh",
                  maxHeight: "7vh",
                  margin: "5px",
                  // textAlign: "center",
                }}
              >
                <div></div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  borderStyle: "solid",
                  height: "59vh",
                  maxHeight: "59vh",
                  overflowY: "auto",
                  overflow: "auto",
                  margin: "5px",
                }}
              >
                <div>
                  <UsableTable
                    records={data}
                    columns={columns}
                    pageSize={pageSize}
                    rowPerPage={rowPerPage}
                    firstNameSearch={agenciaSearch}
                    campoPesquisa={campoPesquisa}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>
          <UsableTable
            records={data}
            columns={columns}
            pageSize={pageSize}
            rowPerPage={rowPerPage}
            firstNameSearch={agenciaSearch}
            campoPesquisa={campoPesquisa}
          />
        </div>
      )}
      {/* <UsableTable
        records={data}
        columns={columns}
        pageSize={pageSize}
        rowPerPage={rowPerPage}
        firstNameSearch={agenciaSearch}
        campoPesquisa={campoPesquisa}
      /> */}
    </>
  );
});

export default AgenciaSearchTable;
