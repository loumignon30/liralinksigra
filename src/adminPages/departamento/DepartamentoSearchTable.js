import { Delete, Done, Search } from "@mui/icons-material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import urlImage from "../../http-common-images";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DepartamentoServices from "../../services/admin/Departamento.services";

import { useTranslation } from "react-i18next";

import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Grid, InputAdornment, Paper } from "@mui/material";
import Controls from "../../components/reusableComponents/Controls";

const DepartamentoSearchTable = forwardRef((props, ref) => {
  // forwardRef is used to update method from this file from ather files

  const useStyles = makeStyles({
    paper: {
      background: props.backGroundColor || "darkBlue",
      color: props.color || "white",
      fontSize: "16px",
      fontFamily: "Times New Roman', Times, serif",
      textAlign: "center",
      width: "100%",
    },
    editButton: {
      border: "none",
      borderRadius: "10px",
      padding: "5px 10px",
      backgroundColor: "green",
      color: "white",
      cursor: "pointer",
      marginRight: "20px",
    },
    deleleButton: {
      color: "red",
      cursor: "pointer",
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
    image: {
      display: "flex",
      alignItems: "center",
    },
    imageList: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "10px",
    },
  });

  const propsTableGrid = {
    // grid style: SearchTableStyle.js
    backGroundColor: props.backGroundColor,
    color: props.color,
  };
  const classes2 = useStylesSearchTable(propsTableGrid);

  const classes = useStyles();
  const { t } = useTranslation();
  const [departamentoPesquisaParam, setdepartamentoPesquisaParam] = useState("");
  const [depSearch, setDepSedeSearch] = useState("");
  const [campoPesquisa, setCampoPesquisa] = useState("");

  const [openPopup, setOpenPopup] = useState(false);
  const {
    idDisplay,
    codeDisplay,
    actionsButtonDisplay,
    actionsButtonDisplayEditDelete,
    statusDisplay,
    pageSize,
    rowPerPage,
    sedeID,
    agenciaID,
    departamentoPesquisa,
    listarGrid
  } = props;

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(""); // backend image  URL


  useEffect(() => {
    getGetAllData(sedeID, agenciaID, departamentoPesquisa);
    setUrl(urlImage());
  }, []);
  useImperativeHandle(ref, () => ({
    getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
    // test3: test,
  }));
  const getDepartamentoData = (id, code, departamento) => {
    props.departamentoData(id, code, departamento);
    setOpenPopup(false);
  };

  const getGetAllData = (sedeID1, agenciaID1, departamentoPesquisa) => {
    

    DepartamentoServices.getAll(
      sedeID1,
      agenciaID1,
      "geral",
      departamentoPesquisa
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = [
    idDisplay
      ? {
          field: "id",
          headerName: "ID",
          width: 100,
          headerClassName: classes.paper,
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { idDisplay },
          width: 100,
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
          headerClassName: classes.paper,
        },

    {
      field: "departamento",
      headerName: t("departamento"),
      flex: 3,
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
                </button>{" "}
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

    actionsButtonDisplay
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
                    getDepartamentoData(
                      params.row.id,
                      params.row.code,
                      params.row.departamento
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
          hide: { actionsButtonDisplay },
          flex: 1,
          headerClassName: classes.paper,
        },
    ,
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
                  to={"/departamento/" + params.row.id}
                  state={{
                    id: params.row.id,
                    code: params.row.code,
                    departamento: params.row.departamento,
                    observacao: params.row.observacao,
                    sedeID: params.row.sedeDepartamento.id,
                    sede: params.row.sedeDepartamento.sede,
                    agenciaID: params.row.agenciaDepsrtamento.id,
                    agencia: params.row.agenciaDepsrtamento.nome,
                    status: params.row.status,
                  }}
                >
                  <button className={classes.editButton}>{t("edit")}</button>
                </Link>

                <Delete className={classes.deleleButton} />
              </>
            );
          },
        }
      : {
          field: "action2",
          headerName: t("action"),
          hide: { actionsButtonDisplayEditDelete },
          flex: 1,
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
    props.departamentoData();
  };

  const departamentoToSearch = (departToSearch) => {
    setCampoPesquisa("departamento");
    setDepSedeSearch(departToSearch);
    // setSedePesquisa(e.target.value);
  };

  const depSearchToToDataGrid = (e) => {
    setdepartamentoPesquisaParam(e.target.value);
    departamentoToSearch(e.target.value);
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
                  <span>PESQUISA DE DEPARTAMENTOS</span>
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
                    name="departamentoPesquisaParam"
                    type="text"
                    value={departamentoPesquisaParam}
                    placeHolder={t("departamento")}
                    width="75%"
                    marginLeft="-20px"
                    onChange={depSearchToToDataGrid}
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
                    firstNameSearch={depSearch}
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
            firstNameSearch={depSearch}
            campoPesquisa={campoPesquisa}
          />
        </div>
      )}
    </>
    // <>
    //   <UsableTable
    //     records={data}
    //     columns={columns}
    //     pageSize={pageSize}
    //     rowPerPage={rowPerPage}
    //   />
    // </>
  );
});

export default DepartamentoSearchTable;
