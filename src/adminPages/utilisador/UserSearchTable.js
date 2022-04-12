import { Done, ListAltOutlined } from "@mui/icons-material";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import UserService from "../../services/admin/User.service";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import urlImage from "../../http-common-images";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import { useTranslation } from "react-i18next";
import { UserLoggedContext } from "./UserLoggedContext";

const UserSearchTable = forwardRef((props, ref) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [userDataParam, setUserDataParam] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [url, setUrl] = useState(urlImage()); // backend image URL

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  const { t } = useTranslation();

  const propsTableGrid = {
    // grid style: SearchTableStyle.js
    backGroundColor: props.backGroundColor,
    color: props.color,
  };
  const classes = useStylesSearchTable(propsTableGrid);

  const {
    idDisplay,
    userNameDisplay,
    firstnameDisplay,
    lastnameDisplay,
    emailDisplay,
    roleDisplay,
    statusDisplay,
    affectacaoDisplay,
    sexoDisplay,
    actionsButtonDisplaySelect,
    actionsButtonDisplayEditDelete,
    pageSize,
    rowPerPage,
    sedeID,
    backGroundColor,
    color,
    paisDisplay,
    cidadeDisplay,
  } = props;

  const [usuarioSearch, setUsuarioSearch] = useState("");
  const [campoPesquisa, setCampoPesquisa] = useState("");
  const [role, setRole] = useState(0);

  const getUser = (id, firstname) => {
    props.userData(id, firstname);
    setOpenPopup(false);
  };
  const getUserAfectacao = (id, firstname, lastname) => {
    //props.userData(id, firstname, lastname);
    //setOpenPopup(false);
  };

  const getUserContext = () => {
    userSavedValue.map((item) => setRole(item.nivelAcesso));
  };

  useEffect(() => {
    getUserContext();
    userGetAll(sedeID);
  }, []);

  useImperativeHandle(ref, () => ({
    userGetAll: userGetAll, // it's calling the method : unversityGetAll()
    nomeSearch: nomeSearch,
    apelidoSearch: apelidoSearch,
  }));

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this record?",
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        onDelete(id);
      },
      //onConfirm: () => { setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id)) }

      //confirm: () =>{onDelete(id)}
    });

    // setdonneesUtilisat(donneesUtilisat.filter((item) => item.id !== id));
  };
  const onDelete = (id) => {
    setUserDataParam(UserService.filter((item) => item.id !== id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    setNotify({
      isOpen: true,
      message: "New Faculty was Submitted!",
      type: "success",
    });
  };
  const userGetAll = (sedeID) => {
    UserService.getAll(sedeID)
      .then((response) => {
        setUserDataParam(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const nomeSearch = (usuarioToSearch) => {
    setCampoPesquisa("firstname");
    setUsuarioSearch(usuarioToSearch);
  };

  const apelidoSearch = (usuarioToSearch) => {
    setCampoPesquisa("lastname");
    setUsuarioSearch(usuarioToSearch);
  };

  const columns = [
    idDisplay
      ? {
          field: "id",
          headerName: "ID",
          flex: 0.5,
          headerClassName: classes.gridHeader,
        }
      : {
          field: "id",
          headerName: "ID",
          flex: 1,
          hide: { idDisplay },
          headerClassName: classes.gridHeader,
        },

    userNameDisplay
      ? {
          field: "photofilename",
          headerName: t("foto"),
          flex: 0.7,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                <div className="UtilisateurListPlusPhoto">
                  <img
                    className="UtilisateurListImage"
                    // src={params.row.photofilename !==""? url + "/images/" + params.row.photofilename:  url + "/images/" +"semfoto.png"}
                    src={
                      params.row.photofilename !== ""
                        ? "https://s3.amazonaws.com/liralink.sigra/" +
                          params.row.photofilename
                        : "https://s3.amazonaws.com/liralink.sigra/" +
                          "semfoto.png"
                    }
                    alt=""
                  />
                </div>
              </>
            );
          },
        }
      : "",

    firstnameDisplay
      ? {
          field: "firstname",
          headerName: t("nome"),
          flex: 1.2,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                {Number(role) < 101 && Number(params.row.role) < 101 ? ( // cacher le createur
                  <span>{params.row.firstname}</span>
                ) : Number(role) === 101 ? ( // cacher le createur
                  <span>{params.row.firstname}</span>
                ) : (
                  <span style={{ backgroundColor: "black" }}>
                    Données cachées
                  </span>
                )}
              </>
            );
          },
        }
      : {
          field: "firstname",
          headerName: t("nome"),
          flex: 1.2,
          hide: { firstnameDisplay },
          headerClassName: classes.gridHeader,
        },
    ,
    lastnameDisplay
      ? {
          field: "lastname",
          headerName: t("apelido"),
          flex: 1.2,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                {Number(role) < 101 && Number(params.row.role) < 101 ? ( // cacher le createur
                  <span>{params.row.lastname}</span>
                ) : Number(role) === 101 ? ( // cacher le createur
                  <span>{params.row.lastname}</span>
                ) : (
                  <span style={{ backgroundColor: "black" }}>
                    Données cachées
                  </span>
                )}
              </>
            );
          },
        }
      : {
          field: "lastname",
          headerName: t("nome"),
          flex: 1.2,
          hide: { lastnameDisplay },
          headerClassName: classes.gridHeader,
        },
    ,
    emailDisplay
      ? {
          field: "email",
          headerName: t("email"),
          flex: 2,
          headerClassName: classes.gridHeader,
        }
      : {
          field: "email",
          headerName: t("email"),
          flex: 2,
          hide: { emailDisplay },
          headerClassName: classes.gridHeader,
        },

    sexoDisplay
      ? {
          field: "gender",
          headerName: t("sexo"),
          flex: 0.5,
          headerClassName: classes.gridHeader,
          renderCell: (type) => {
            return (
              <>
                {type.row.gender == "1"
                  ? t("sexo_masculino")
                  : type.row.gender == "2"
                  ? t("sexo_feminino")
                  : type.row.gender == "3"
                  ? t("sexo_outros")
                  : ""}
              </>
            );
          },
        }
      : {
          field: "gender",
          headerName: t("sexo"),
          flex: 0.5,
          hide: { sexoDisplay },
          headerClassName: classes.gridHeader,
        },

    cidadeDisplay
      ? {
          field: "cidade",
          headerName: t("cidade"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.userCidade.cidade}</span>
              </>
            );
          },
        }
      : {
          field: "cidade",
          headerName: "cidade",
          hide: { cidadeDisplay },
          headerClassName: classes.gridHeader,
        },

    paisDisplay
      ? {
          field: "pais",
          headerName: t("pais"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                <span>{params.row.userPais.pais}</span>
              </>
            );
          },

          // C:\React app\world-university-backend\public\images
        }
      : {
          field: "pais",
          headerName: "pais",
          hide: { paisDisplay },
          headerClassName: classes.gridHeader,
        },

    roleDisplay
      ? {
          field: "role",
          headerName: t("nivel_accesso"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (type) => {
            return (
              <>
                {Number(role) < 101 && Number(type.row.role) < 101 ? ( // cacher le createur
                  type.row.role == "1" ? (
                    t("role_administrador")
                  ) : type.row.role == "2" ? (
                    t("role_Funcionario")
                  ) : type.row.role == "3" ? (
                    t("role_utilizador")
                  ) : type.row.role == "101" ? (
                    t("role_super_user")
                  ) : null
                ) : Number(role) === 101 ? ( // cacher le createur
                  type.row.role == "1" ? (
                    t("role_administrador")
                  ) : type.row.role == "2" ? (
                    t("role_Funcionario")
                  ) : type.row.role == "3" ? (
                    t("role_utilizador")
                  ) : type.row.role == "101" ? (
                    t("role_super_user")
                  ) : null
                ) : (
                  <span style={{ backgroundColor: "black" }}>
                    Données cachées
                  </span>
                )}

                {/* {type.row.role == "1" ? t('role_administrador') :
                                type.row.role == "2" ? t('role_Funcionario') :
                                    type.row.role == "3" ? t('role_utilizador') :
                                        type.row.role == "101" ? t('role_super_user') : ""} */}
              </>
            );
          },
        }
      : {
          field: "role",
          headerName: t("nivel_accesso"),
          flex: 1,
          hide: { roleDisplay },
          headerClassName: classes.gridHeader,
        },

    statusDisplay
      ? {
          field: "status",
          headerName: t("status"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (type) => {
            return (
              <>
                <button
                  className={
                    type.row.status == "1"
                      ? classes.ButtonStatutDataGrid_actif
                      : type.row.status == "2"
                      ? classes.ButtonStatutDataGrid_inactif
                      : type.row.status == "3"
                      ? classes.ButtonStatutDataGrid_pendent
                      : type.row.status == "4"
                      ? classes.ButtonStatutDataGrid_deleted
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

    affectacaoDisplay
      ? {
          field: "afectao",
          headerName: t("AfetacaoGridView"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                {Number(role) < 101 && Number(params.row.role) < 101 ? ( // pas d'acces aux données du cr
                  <Link
                    to={"/afetacaoSedeAgencia/" + params.row.id}
                    state={{
                      id: params.row.id,
                      firstname: params.row.firstname,
                      lastname: params.row.lastname,
                      email: params.row.email,
                      role: params.row.role,
                      sedeID: params.row.userSede.id,
                      sede: params.row.userSede.sede,
                      imageChangeFromOutSideURL:
                        params.row.photofilename !== ""
                          ? "https://s3.amazonaws.com/liralink.sigra/" +
                            params.row.photofilename
                          : "https://s3.amazonaws.com/liralink.sigra/" +
                            "semfoto.png",
                    }}
                  >
                    <ListAltOutlined className={classes.seachButton} />
                  </Link>
                ) : Number(role) === 101 ? ( // cacher le createur }
                  <Link
                    to={"/afetacaoSedeAgencia/" + params.row.id}
                    state={{
                      id: params.row.id,
                      firstname: params.row.firstname,
                      lastname: params.row.lastname,
                      email: params.row.email,
                      role: params.row.role,
                      sedeID: params.row.userSede.id,
                      sede: params.row.userSede.sede,
                      imageChangeFromOutSideURL:
                        params.row.photofilename !== ""
                          ? "https://s3.amazonaws.com/liralink.sigra/" +
                            params.row.photofilename
                          : "https://s3.amazonaws.com/liralink.sigra/" +
                            "semfoto.png",
                    }}
                  >
                    <ListAltOutlined className={classes.seachButton} />
                  </Link>
                ) : null}
              </>
            );
          },
        }
      : {
          field: "action",
          headerName: "Afetação",
          flex: 1,
          hide: { affectacaoDisplay },
          headerClassName: classes.gridHeader,
        },

    actionsButtonDisplaySelect
      ? {
          field: "action",
          headerName: t("action"),
          flex: 0.8,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                <Done
                  className={classes.seachButton}
                  onClick={() => {
                    getUser(params.row.id, params.row.firstname);
                  }}
                />
              </>
            );
          },
        }
      : {
          field: "action",
          headerName: t("action"),
          flex: 0.5,
          hide: { actionsButtonDisplaySelect },
          headerClassName: classes.gridHeader,
        },

    actionsButtonDisplayEditDelete
      ? {
          field: "action2",
          headerName: t("action"),
          flex: 1,
          headerClassName: classes.gridHeader,
          renderCell: (params) => {
            return (
              <>
                {Number(role) < 101 && Number(params.row.role) < 101 ? ( // pas d'acces aux données du cr
                  <Link
                    to={"/userEdit/" + params.row.id}
                    state={{
                      id: params.row.id,
                      firstname: params.row.firstname,
                      lastname: params.row.lastname,
                      email: params.row.email,
                      telephone: params.row.telephone,
                      address: params.row.address,
                  //    city: params.row.city,
                      dateofbirth: params.row.dateofbirth,
                      gender: params.row.gender,
                      role: params.row.role,
                     // password: params.row.password,
                      status: params.row.status,
                      paisID: params.row.userPais.id,
                      cidadeID: params.row.userCidade.id,
                      pais: params.row.userPais.pais,
                      cidade: params.row.userCidade.cidade,

                      imageChangeFromOutSideURL:
                        params.row.photofilename !== ""
                          ? "https://s3.amazonaws.com/liralink.sigra/" +
                            params.row.photofilename
                          : "https://s3.amazonaws.com/liralink.sigra/" +
                            "semfoto.png",
                      sedeID: params.row.userSede.id,
                      sede: params.row.userSede.sede,
                    }}
                  >
                    <button className="utilisateurButtonEdit">
                      {t("edit")}
                    </button>
                  </Link>
                ) : Number(role) === 101 ? ( // cacher le createur }
                  <Link
                    to={"/userEdit/" + params.row.id}
                    state={{
                      id: params.row.id,
                      firstname: params.row.firstname,
                      lastname: params.row.lastname,
                      email: params.row.email,
                      telephone: params.row.telephone,
                      address: params.row.address,
                      // city: params.row.city,
                      dateofbirth: params.row.dateofbirth,
                      gender: params.row.gender,
                      role: params.row.role,
                      // password: params.row.password,
                      status: params.row.status,
                      paisID: params.row.userPais.id,
                      cidadeID: params.row.userCidade.id,
                      pais: params.row.userPais.pais,
                      cidade: params.row.userCidade.cidade,
                      imageChangeFromOutSideURL:
                        params.row.photofilename !== ""
                          ? "https://s3.amazonaws.com/liralink.sigra/" +
                            params.row.photofilename
                          : "https://s3.amazonaws.com/liralink.sigra/" +
                            "semfoto.png",
                      sedeID: params.row.userSede.id,
                      sede: params.row.userSede.sede,
                    }}
                  >
                    <button className="utilisateurButtonEdit">
                      {t("edit")}
                    </button>
                  </Link>
                ) : null}

                {Number(role) < 101 && Number(params.row.role) < 101 ? (
                  <Delete
                    className={classes.deleteSearchButton}
                    onClick={() => handleDelete(params.row.id)}
                  />
                ) : null}

                {Number(role) === 101 ? ( // cacher le createur }
                  <Delete
                    className={classes.deleteSearchButton}
                    onClick={() => handleDelete(params.row.id)}
                  />
                ) : null}
              </>
            );
          },
        }
      : {
          field: "action2",
          headerName: t("action"),
          flex: 1,
          hide: { actionsButtonDisplayEditDelete },
          headerClassName: classes.gridHeader,
        },
  ];
  return (
    <>
      <UsableTable
        records={userDataParam}
        columns={columns}
        pageSize={pageSize}
        rowPerPage={rowPerPage}
        firstNameSearch={usuarioSearch}
        campoPesquisa={campoPesquisa}
      />
    </>
  );
});

export default UserSearchTable;
