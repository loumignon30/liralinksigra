import { Delete, Done } from "@mui/icons-material";
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
  } = props;

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(""); // backend image  URL
  const classes = useStyles();

  const [agenciaSearch, setAgenciaSearch] = useState("");
  const [campoPesquisa, setCampoPesquisa] = useState("");

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
  return (
    <>
      <UsableTable
        records={data}
        columns={columns}
        pageSize={pageSize}
        rowPerPage={rowPerPage}
        firstNameSearch={agenciaSearch}
        campoPesquisa={campoPesquisa}
      />
    </>
  );
});

export default AgenciaSearchTable;
