import "./funcionario.css";
import { Delete, Done, Search } from "@mui/icons-material";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import FuncionarioService from "../../services/admin/Funcionario.services";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import urlImage from "../../http-common-images";
import { Link } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import AgenciaService from "../../services/admin/Agencia.service";

import { useTranslation } from "react-i18next";
import Controls from "../../components/reusableComponents/Controls";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const FuncionarioSearchTable = forwardRef((props, ref) => {
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

  const [openPopup, setOpenPopup] = useState(false);
  const {
    idDisplay,
    codeDisplay,
    primeiroNomeDisplay,
    ultimonomeDisplay,
    emailDisplay,
    telefoneDislay,
    statusDisplay,
    actionsButtonDisplaySelect,
    actionsButtonDisplayEditDelete,
    pageSize,
    rowPerPage,
    sedeID,
    agenciaID,
    agenciaDisplay,
    fotoDisplay,
  } = props;

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(""); // backend image  URL
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [campoPesquisa, setCampoPesquisa] = useState("");
  const [agenciaData, setAgenciaData] = useState([]);
  const [agenciaIDLocal, setAgenciaIDLocal] = useState(""); // backend image  URL
  const [code, setCode] = useState("");

  const classes = useStyles();

  const propsTableGrid = {
    // grid style: SearchTableStyle.js
    backGroundColor: props.backGroundColor,
    color: props.color,
  };
  const classes2 = useStylesSearchTable(propsTableGrid);

  const { t } = useTranslation();

  useEffect(() => {
     getGetAllData(sedeID, agenciaID);
    setUrl(urlImage());
    agenciaGetData(sedeID);
  }, []);

  useImperativeHandle(ref, () => ({
    getFirstnameSearch: getFirstnameSearch,
    getLasttnameSearch: getLasttnameSearch,
    getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
    getGetAllDataFuncionarioAgencia: getGetAllDataFuncionarioAgencia,
  }));

  const getFuncionarioData = (
    id,
    code,
    primeironome,
    ultimonome,
    telefone,
    agencia,
    agenciaID,
    email,
    endereco,
    imageName
  ) => {
    props.funcionariosData(
      id,
      code,
      primeironome,
      ultimonome,
      telefone,
      agencia,
      agenciaID,
      email,
      endereco,
      imageName
    );
    setOpenPopup(false);
  };

  const getGetAllData = (sedeID1, agenciaID1) => {
    FuncionarioService.getAll(sedeID1, agenciaID1, "codigoPesquisa2", "")
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getGetAllDataFuncionarioAgencia = (sedeID) => {
    FuncionarioService.getAll(sedeID, 0, "TodasAsAgencia", "")
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getFirstnameSearch = (firstNameToSearch) => {
    setCampoPesquisa("primeironome");
    setFirstNameSearch(firstNameToSearch);
  };
  const getLasttnameSearch = (lastNameToSearch) => {
    setCampoPesquisa("ultimonome");
    setFirstNameSearch(lastNameToSearch);
  };

  const agenciaChange = (e) => {
    let agenciaIDLocal = e.target.value;
    setAgenciaIDLocal(agenciaIDLocal);

    FuncionarioService.getAll(
      sedeID,
      agenciaIDLocal,
      "funcionariosComAgencia",
      ""
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGetAllDataPorCodigo = (sedeID, agenciaID, codigo) => {
    FuncionarioService.getAll(sedeID, agenciaID, "codigoPesquisa", codigo)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const agenciaGetData = (sedeID1) => {
    AgenciaService.getAll(sedeID1)
      .then((response) => {
        setAgenciaData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const CodeClick = (e) => {
    getGetAllDataPorCodigo(sedeID, agenciaID, code);
  };

  const close = () => {
    setOpenPopup(false);
    props.funcionariosData();
  };

  const columns = [
    idDisplay
      ? {
          field: "id",
          headerName: "ID",
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { idDisplay },
          headerClassName: classes.paper,
        },

    agenciaDisplay
      ? {
          field: "agencia",
          headerName: t("agencia"),
          flex: 1.5,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return <>{params.row.agenciaFuncionario.nome}</>;

            // C:\React app\world-university-backend\public\images
          },
        }
      : {
          field: "agencia",
          headerName: t("agencia"),
          flex: 1,
          hide: { agenciaDisplay },
          headerClassName: classes.gridHeader,
        },

    ,
    codeDisplay
      ? {
          field: "code",
          headerName: t("code"),
          flex: 0.5,
          headerClassName: classes.paper,
        }
      : {
          field: "code",
          headerName: t("code"),
          hide: { codeDisplay },
          flex: 1,
          headerClassName: classes.paper,
        },

    fotoDisplay
      ? {
          field: "nomeCompleto",
          headerName: t("nome_completo"),
          flex: 3,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <div className="UtilisateurListPlusPhoto">
                  <img
                    className="fotoFuncionarioFormatoGrande"
                    src={
                      params.row.imageName !== ""
                        ? "https://s3.amazonaws.com/liralink.sigra/" +
                          params.row.imageName
                        : "https://s3.amazonaws.com/liralink.sigra/" +
                          "semfoto.png"
                    }
                    alt=""
                  />
                  {/* {params.row.primeironome + " " + params.row.ultimonome} */}
                </div>
              </>
            );

            // C:\React app\world-university-backend\public\images
          },
        } //{ field: 'nomeCompleto', headerName: t('nomeCompleto'), hide: { fotoDisplay }, flex: 1, headerClassName: classes.paper },
      : // !fotoDisplay ?
        {
          field: "nomeCompleto",
          headerName: t("nome_completo"),
          flex: 3,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <div className="UtilisateurListPlusPhoto">
                  <img
                    className="UtilisateurListImage"
                    src={
                      params.row.imageName !== ""
                        ? "https://s3.amazonaws.com/liralink.sigra/" +
                          params.row.imageName
                        : "https://s3.amazonaws.com/liralink.sigra/" +
                          "semfoto.png"
                    }
                    alt=""
                  />
                  {params.row.primeironome + " " + params.row.ultimonome}
                </div>
              </>
            );
          },
        },

    primeiroNomeDisplay
      ? {
          field: "primeironome",
          headerName: t("nome"),
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "primeironome",
          headerName: t("apelido"),
          hide: { primeiroNomeDisplay },
          headerClassName: classes.paper,
        },

    ultimonomeDisplay
      ? {
          field: "ultimonome",
          headerName: t("nome"),
          flex: 1,
          headerClassName: classes.paper,
        }
      : {
          field: "ultimonome",
          headerName: t("apelido"),
          hide: { ultimonomeDisplay },
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
                    getFuncionarioData(
                      params.row.id,
                      params.row.code,
                      params.row.primeironome,
                      params.row.ultimonome,
                      params.row.telefone,
                      params.row.agenciaFuncionario.nome,
                      params.row.agenciaFuncionario.id
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
          hide: { actionsButtonDisplaySelect },
          flex: 1,
          headerClassName: classes.paper,
        },
    ,
    actionsButtonDisplayEditDelete
      ? {
          field: "action1",
          headerName: t("action"),
          flex: 1,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <Link
                  to={"/funcionario/" + params.row.id}
                  state={{
                    id: params.row.id,
                    code: params.row.code,
                    primeironome: params.row.primeironome,
                    ultimonome: params.row.ultimonome,
                    endereco: params.row.endereco,
                    email: params.row.email,
                    telefone: params.row.telefone,
                    status: params.row.status,
                    imageChangeFromOutSideURL: params.row.imageName
                      ? "https://s3.amazonaws.com/liralink.sigra/" +
                        params.row.imageName
                      : "https://s3.amazonaws.com/liralink.sigra/" +
                        "semfoto.png",
                    sedeID: params.row.sedeFuncionario.id,
                    sede: params.row.sedeFuncionario.sede,
                    agenciaId: params.row.agenciaFuncionario.id,
                    agencia: params.row.agenciaFuncionario.nome,
                    departamentoID: params.row.departamentoFuncionario.id,
                    departamento:
                      params.row.departamentoFuncionario.departamento,
                    funcaoID: params.row.funcaoFuncionario.id,
                    funcao: params.row.funcaoFuncionario.funcao,
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
          field: "action1",
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
  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "-20px" }}>
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <ItemMainTitlo
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "30px",
              }}
            >
              <div style={{ alignContent: "center", textAlign: "center" }}>
                <span style={{ fontWeight: 600, color: "black" }}>
                  Dados dos Funcionários
                </span>
              </div>
            </ItemMainTitlo>
          </Grid>

          <Grid item xs={1}>
            <ItemMainTitlo
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "30px",
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

          <Grid item xs={8}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "40px",
                marginTop: "22px",
              }}
            >
              <div style={{ paddingTop: "-10px", marginBottom: "10px" }}>
                <label
                  style={{
                    height: "auto",
                    margin: "auto",
                    marginRight: "20px",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                  htmlFor="classificacao"
                >
                  {t("agencia")}
                </label>
                <Controls.Select
                  name="agenciaLocal"
                  label="agenciaLocal"
                  value={agenciaIDLocal}
                  onChange={agenciaChange}
                  options={agenciaData}
                  typeOfSelect={5}
                  //error={errors.role}
                  width="70%"
                  height="40px"
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "40px",
                marginTop: "22px",
              }}
            >
              <div>
                <label
                  style={{
                    marginLeft: "0px",
                  }}
                  className="userLabel"
                >
                  {t("pesquisar")}
                </label>
                <Controls.Input
                  name="code"
                  placeHolder={t("pesquisar")}
                  value={code}
                  onChange={handleCodeChange}
                  width="55%"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item
              style={{
                borderStyle: "solid",
                borderColor: "black",
                // height: "40px",
                marginTop: "22px",
              }}
            >
              {/* daodos dos funcionarios */}
              <ImageList
                sx={{ width: 760, height: 500 }}
                cols={3}
                rowHeight={175}
              >
                {data.map((item, index) => (
                  <ImageListItem
                    key={index}
                    style={{ border: "solid", margin: "10px", cursor:"pointer" }}
                  >
                       {/* <li style={{listStyle:"none"}} key={index} > */}
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        onClick={() => {
                          getFuncionarioData(
                            item.id,
                            item.code,
                            item.primeironome,
                            item.ultimonome,
                            item.telefone,
                            item.agenciaFuncionario.nome,
                            item.agenciaFuncionario.id,
                            item.email,
                            item.endereco,
                            item.imageName
                          );
                        }}
                        style={{
                          width: "100%",
                          objectFit: "contain",
                          marginTop: "10px",
                        }}
                        component="img"
                        alt="green iguana"
                        height="100"
                        image={
                          item.imageName !== ""
                            ? "https://s3.amazonaws.com/liralink.sigra/" +
                              item.imageName
                            : "https://s3.amazonaws.com/liralink.sigra/" +
                              "semfoto.png"
                        }
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h9"
                          component="div"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          Code: {item.code}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ fontSize: "12px" }}
                        >
                          Nome: {item.primeironome + " " + item.ultimonome}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ fontSize: "10px" }}
                        >
                          {/* Função: {item.funcaoFuncionario.funcao} */}
                          Departamento:{" "}
                          {item.departamentoFuncionario.departamento}
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
                    </Card>
                    {/* </li> */}

                    {/* <div>
                <Card className="cardPositioning1">
                 

                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sagittis pellentesque lacus eleifend lacinia...
                  </CardText>

                  <CardHeader
                    titleTypographyProps={{
                      fontSize: 12,
                    }}
                    title={item.primeironome + " " + item.ultimonome}
                    style={{
                      border: "solid",
                      borderWidth: "2px",
                      margin: "0px",
                    }}
                    // avatar={
                    //   <Avatar
                    //     sx={{
                    //       bgcolor: red[500],
                    //       height: "20px",
                    //       width: "20px",
                    //     }}
                    //     aria-label="recipe"
                    //   >
                    //     {item.code}
                    //   </Avatar>
                    // }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    // title={item.primeironome + " " + item.ultimonome}

                    subheader={
                      <img
                        style={{
                          height: "130px",
                          margin: "5px",
                          width: "100%",
                          objectFit: "contain",
                          margin: "15px",
                        }}
                        src={
                          item.imageName !== ""
                            ? "https://s3.amazonaws.com/liralink.sigra/" +
                              item.imageName
                            : "https://s3.amazonaws.com/liralink.sigra/" +
                              "semfoto.png"
                        }
                        alt={item.title}
                        loading="lazy"
                      />
                    }

                    //   "Função: " +
                    //   item.funcaoFuncionario.funcao +
                    //   " " +
                    //   " Departamento: " +
                    //   item.departamentoFuncionario.departamento
                    // }
                  />
                </Card>
              </div> */}
                  </ImageListItem>
                ))}
              </ImageList>
            </Item>
          </Grid>
        </Grid>
      </Box>

      {
        // fotoDisplay ? (
        //     <div style={{ paddingTop: "5px", marginBottom: "10px" }}>
        //       <label className="userLabel" htmlFor="classificacao">
        //         {t("agencia")}
        //       </label>
        //       <Controls.Select
        //         name="agenciaLocal"
        //         label="agenciaLocal"
        //         value={agenciaIDLocal}
        //         onChange={agenciaChange}
        //         options={agenciaData}
        //         typeOfSelect={5}
        //         //error={errors.role}
        //         width="95%"
        //         height="40px"
        //       />
        //       <div>
        //         <label className="userLabel">{t("pesquisar")}</label>
        //         <Controls.Input
        //           name="code"
        //           placeHolder={t("pesquisar")}
        //           value={code}
        //           onChange={handleCodeChange}
        //           width="49%"
        //           type="text"
        //           InputProps={{
        //             startAdornment: (
        //               <InputAdornment position="start">
        //                 <Search />
        //               </InputAdornment>
        //             ),
        //           }}
        //         />
        //         <Controls.Buttons
        //           type="button"
        //           text={t("pesquisar")}
        //           //  className="button"
        //           size="small"
        //           onClick={CodeClick}
        //         />
        //       </div>
        //     </div>
        //   ) : null}
      }

      {!fotoDisplay ? (
        <UsableTable
          records={data}
          columns={columns}
          pageSize={pageSize}
          rowPerPage={rowPerPage}
          firstNameSearch={firstNameSearch}
          campoPesquisa={campoPesquisa}
        />
      ) : null
      // <li style={{listStyle:"none"}} key={index} >

      // <div style={{ margin: "10px" }}>

      //     <Card className="cardPositioning"    >
      //         <CardHeader style={{ border: "solid", borderWidth: "2px" }}
      //             avatar={
      //                 <Avatar sx={{ bgcolor: red[500], height: '70px', width: '70px'  }} aria-label="recipe"
      //                 >
      //                     {item.code}
      //                 </Avatar>
      //             }
      //             action={
      //                 <IconButton aria-label="settings">
      //                     <MoreVertIcon />
      //                 </IconButton>
      //             }
      //             title={item.primeironome + " " + item.ultimonome}
      //             subheader={"Função: " + item.funcaoFuncionario.funcao + " " + " Departamento: " + item.departamentoFuncionario.departamento}

      //         />

      //         {/* <CardMedia
      //             component="img"
      //             // height="300"
      //             className="fotoFuncionarioFormatoGrande"
      //             image={item.imageName !== "" ? "https://s3.amazonaws.com/liralink.sigra/" + item.imageName : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"}
      //             //"/static/images/cards/paella.jpg"
      //             alt={item.primeironome + " " + item.ultimonome}
      //             onClick={() => {

      //                 getFuncionarioData(item.id, item.code, item.primeironome,
      //                     item.ultimonome, item.telefone,
      //                     item.agenciaFuncionario.nome, item.agenciaFuncionario.id,
      //                     item.email, item.endereco, item.imageName);
      //             }}
      //         /> */}
      //         {/* <CardContent>
      //         <Typography variant="body2" color="text.secondary">

      //         This impressive paella is a perfect party dish and a fun meal to cook
      //         together with your guests. Add 1 cup of frozen peas along with the mussels,
      //         if you like.
      //     </Typography>
      // </CardContent> */}
      //     </Card>
      // </div>
      // </li>
      // ))
      }
    </>
  );
});

export default FuncionarioSearchTable;
