import { Delete, Done } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import DenunciaService from "../../services/admin/Denuncias.services";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import urlImage from "../../http-common-images";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Rating, SvgIcon } from "@mui/material";
import StatusDenunciaData from "../../services/admin/StatusDenunciaData";

import { useTranslation } from "react-i18next";

const DenunciaSearchTable = forwardRef((props, ref) => {
  // forwardRef is used to update method from this file from ather files

  const useStyles = makeStyles({
    paper: {
      background: props.backGroundColor || "darkBlue",
      color: props.color || "white",
      fontSize: "12px",
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
    nomeDisplay,
    tipoDenunciaDisplay,
    dataDisplay,
    horaDisplay,
    emailDisplay,
    telefoneDislay,
    statusDisplay,
    queixaDisplay,
    actionsButtonDisplaySelect,
    actionsButtonDisplayEditDelete,
    linguaQueixa,
    pageSize,
    rowPerPage,
    abreviationLangue,
    sedeID,
    agenciaID,
    tipoMovimento,
    ratingDisplay,
    ratingDescricaoDisplay,
    ratingMotivoDisplay,
    trabalhadorDisplay,
    tipoImpressao,
  } = props;

  const [data, setData] = useState([]);
  const [url, setUrl] = useState(""); // backend image  URL
  const classes = useStyles();

  const propsTableGrid = {
    // grid style: SearchTableStyle.js
    backGroundColor: props.backGroundColor,
    color: props.color,
  };
  const classes2 = useStylesSearchTable(propsTableGrid);

  const { t } = useTranslation();

  useEffect(() => {
    getGetAllData(
      abreviationLangue,
      tipoImpressao,
      sedeID,
      agenciaID,
      tipoMovimento,
      0
    );
  }, []);

  useImperativeHandle(ref, () => ({
    getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
    getGetAllDataEstatisticas: getGetAllDataEstatisticas,
    getGetAllDataFuncionario: getGetAllDataFuncionario,
  }));

  const getFuncionarioData = (id, code, agencia) => {
    props.agenciaData(id, code, agencia);
    setOpenPopup(false);
  };

  const getGetAllData = (
    abreviationLangue1,
    tipoImpressao1,
    sedeID1,
    agenciaID1,
    tipoMovimento1,
    funcionarioID1
  ) => {
    DenunciaService.getAll(
      abreviationLangue1,
      tipoImpressao1,
      sedeID1,
      agenciaID1,
      tipoMovimento1,
      funcionarioID1
    )
      .then((response) => {
        //  console.log(response.data)
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGetAllDataFuncionario = (
    tipoMovimentodenuncia,
    sedeID1,
    agenciaID1,
    tipoImpressao
  ) => {
    DenunciaService.getAll(
      tipoMovimentodenuncia,
      sedeID1,
      agenciaID1,
      tipoImpressao
    )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGetAllDataEstatisticas = () => {
    DenunciaService.getAll("Todas", "estatistica1", 0, 0, "")
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function getStatusData(idStatus) {
    const resultStatus = StatusDenunciaData().find(
      ({ id }) => Number(id) === Number(idStatus)
    );

    return resultStatus.title;
  }

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

    dataDisplay
      ? {
          field: "data",
          headerName: t("data"),
          width: 100,
          headerClassName: classes.paper,
        }
      : {
          field: "data",
          headerName: t("data"),
          hide: { dataDisplay },
          headerClassName: classes.paper,
        },

    horaDisplay
      ? {
          field: "hora",
          headerName: t("hora"),
          width: 80,
          headerClassName: classes.paper,
        }
      : {
          field: "hora",
          headerName: t("hora"),
          hide: { horaDisplay },
          headerClassName: classes.paper,
        },

    nomeDisplay
      ? {
          field: "nome",
          headerName: t("denunciante"),
          flex: 2,
          headerClassName: classes.paper,
        }
      : {
          field: "nome",
          headerName: t("denunciante"),
          hide: { nomeDisplay },
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

    queixaDisplay
      ? {
          field: "queixa",
          headerName: t("queixa"),
          flex: 2,
          headerClassName: classes.paper,
        }
      : {
          field: "queixa",
          headerName: t("queixa"),
          hide: { queixaDisplay },
          headerClassName: classes.paper,
        },

    ratingDisplay
      ? {
          field: "rating",
          headerName: t("rating"),
          flex: 1.2,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                <span style={{ fontSize: "11px" }}>
                  <Rating
                    style={{ width: "80px", marginTop: "4px" }}
                    value={type.row.ratingDenuncia.rating}
                    readOnly={true}
                    // fullsymbol={<SVGIcon href="#icon-star-full" className="icon" />}
                  />
                </span>
              </>
            );
          },
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { ratingDisplay },
          headerClassName: classes.paper,
        },
    ratingDescricaoDisplay
      ? {
          field: "ratingDescricao",
          headerName: t("descricao_avaliacao"),
          flex: 1.3,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                {Number(type.row.tipoMovimento) == 1 ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.ratingDenuncia.descricao}
                  </span>
                ) : Number(type.row.tipoMovimento) == 2 ? (
                  <span className={classes2.tipoMovimentoAvaliacoesLandingPage}>
                    {type.row.ratingDenuncia.descricao}
                  </span>
                ) : Number(type.row.tipoMovimento) == 3 ? (
                  <span className={classes2.tipoMovimentoSugestoesLandingPage}>
                    {type.row.ratingDenuncia.descricao}
                  </span>
                ) : null}
              </>
            );
          },
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { ratingDescricaoDisplay },
          headerClassName: classes.paper,
        },
    ,
    ratingMotivoDisplay
      ? {
          field: "ratingMotivo",
          headerName: t("motivo_avaliacao"),
          flex: 1.3,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                {/* {type.row.ratingMotivoTipodenuncia.tipoMotivo}
                 */}
                {Number(type.row.tipoMovimento) == 1 ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.ratingMotivoTipodenuncia.motivo}
                  </span>
                ) : Number(type.row.tipoMovimento) == 2 ? (
                  <span className={classes2.tipoMovimentoAvaliacoesLandingPage}>
                    {type.row.ratingMotivoTipodenuncia.motivo}
                  </span>
                ) : Number(type.row.tipoMovimento) == 3 ? (
                  <span className={classes2.tipoMovimentoSugestoesLandingPage}>
                    {type.row.ratingMotivoTipodenuncia.motivo}
                  </span>
                ) : null

                // <span style={{ fontSize: "11px" }}>
                //      {type.row.ratingMotivoTipodenuncia.motivo}
                // </span>
                }
              </>
            );
          },
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { ratingMotivoDisplay },
          headerClassName: classes.paper,
        },
    trabalhadorDisplay
      ? {
          field: "trabalhador",
          headerName: t("Reclamação Contra"),
          flex: 2,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                {Number(type.row.tipoMovimento) == 1 &&
                type.row.tipoMovimentodenuncia === "Funcionario" ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.funcaionarioDenuncia.primeironome +
                      " " +
                      type.row.funcaionarioDenuncia.ultimonome}
                  </span>
                ) : Number(type.row.tipoMovimento) == 1 &&
                  type.row.tipoMovimentodenuncia === "Empresa" ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.sedeDenuncia.sede}
                  </span>
                ) : Number(type.row.tipoMovimento) == 1 &&
                  type.row.tipoMovimentodenuncia === "Centro Trabalho" ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.agenciaDenuncia.nome}
                  </span>
                ) : Number(type.row.tipoMovimento) == 1 &&
                  type.row.tipoMovimentodenuncia === "Produto" ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.tipoMovimentodenuncia}
                  </span>
                ) : Number(type.row.tipoMovimento) == 1 &&
                  type.row.tipoMovimentodenuncia === "Servico" ? (
                  <span
                    className={classes2.tipoMovimentoReclamacoesLandingPage}
                  >
                    {type.row.tipoMovimentodenuncia}
                  </span>
                ) : null}
              </>
            );
          },
        }
      : {
          field: "id",
          headerName: "ID",
          hide: { trabalhadorDisplay },
          headerClassName: classes.paper,
        },

    {
      field: "TipoReclamacao",
      headerName: t("Tipo Reclamação"),
      flex: 1.3,
      headerClassName: classes.paper,
      renderCell: (type) => {
        return <>{type.row.tipoMovimentodenuncia}</>;
      },
    },
    {
      field: "centroTrabalho",
      headerName: t("Centro de Trabalho"),
      flex: 1.3,
      headerClassName: classes.paper,
      renderCell: (type) => {
        return (
          <>
            {Number(type.row.tipoMovimento) == 1 &&
            type.row.tipoMovimentodenuncia === "Funcionario" ? (
              <span
                className={
                  classes2.tipoMovimentoReclamacoesLandingPageColorLeve
                }
              >
                {type.row.agenciaDenuncia.nome}
              </span>
            ) : Number(type.row.tipoMovimento) == 1 &&
              type.row.tipoMovimentodenuncia === "Centro Trabalho" ? (
              <span
                className={
                  classes2.tipoMovimentoReclamacoesLandingPageColorLeve
                }
              >
                {type.row.agenciaDenuncia.nome}
              </span>
            ) : null}
          </>
        );
      },
    },

    statusDisplay
      ? {
          field: "status",
          headerName: t("status"),
          flex: 0.6,
          headerClassName: classes.paper,
          renderCell: (type) => {
            return (
              <>
                <button
                  className={
                    "ButtonStatutDataGrid " + "_" + type.row.status + "Denuncia"
                  }
                >
                  {getStatusData(type.row.status)}
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
          headerName: t("Tratar"),
          width: 80,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                {params.row.tipoMovimentodenuncia === "Funcionario" ? (
                  <Link
                    to={"/tratamentoDenuncia/" + params.row.id}
                    state={{
                      id: params.row.id,
                      codigoTrabalhador: params.row.funcaionarioDenuncia.code,
                      primeironomeTrabalhador:
                        params.row.funcaionarioDenuncia.primeironome,
                      ultimonomeTrabalhador:
                        params.row.funcaionarioDenuncia.ultimonome,
                      telepfoneTrabalhador:
                        params.row.funcaionarioDenuncia.telefone,
                      emailTrabalhador: params.row.funcaionarioDenuncia.email,
                      funcionarioID: params.row.funcaionarioDenuncia.id,
                      nomeDenunciante: params.row.nome,
                      emailDenunciante: params.row.email,
                      telefoneDenunciante: params.row.telefone,
                      queixa: params.row.queixa,
                    //   status: params.row.status,
                    //   nomeDenunciante: params.row.nome,
                      imageChangeFromOutSideURL: params.row.funcaionarioDenuncia
                        .imageName
                        ? "https://s3.amazonaws.com/liralink.sigra/" +
                          params.row.funcaionarioDenuncia.imageName
                        : "https://s3.amazonaws.com/liralink.sigra/" +
                          "semfoto.png",
                       sedeID: params.row.sedeDenuncia.id,
                       sede: params.row.sedeDenuncia.sede,
                       agenciaID: params.row.agenciaDenuncia.id,
                       agencia: params.row.agenciaDenuncia.nome
                    //   departamentoID: params.row.departamentoFuncionario.id,
                    //   departamento:
                    //     params.row.departamentoFuncionario.departamento,
                    //   funcaoID: params.row.funcaoFuncionario.id,
                    //   funcao: params.row.funcaoFuncionario.funcao,

                    }}
                  >
                    {/* <button className="utilisateurButtonEdit">{t('edit')}</button> */}
                    <ArrowCircleRightIcon className={classes.searchButton} />
                  </Link>
                ) : null}
                {/* <ArrowCircleRightIcon className={classes.searchButton}
                                onClick={() => {
                                    getFuncionarioData(params.row.id, params.row.code, params.row.primeironome)
                                }
                                } */}
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
          width: 110,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                <Link
                  to={"/tratamentoDenuncia/" + params.row.id}
                  state={
                    {
                      // id: params.row.id,
                      // code: params.row.code,
                      // primeironome: params.row.primeironome,
                      // ultimonome: params.row.ultimonome,
                      // endereco: params.row.endereco,
                      // email: params.row.email,
                      // telefone: params.row.telefone,
                      // status: params.row.status,
                      // imageChangeFromOutSideURL: url + "/images/" + params.row.imageName,
                      // sedeID: params.row.sedeFuncionario.id,
                      // sede: params.row.sedeFuncionario.sede,
                      // agenciaId: params.row.agenciaFuncionario.id,
                      // agencia: params.row.agenciaFuncionario.nome,
                      // departamentoID: params.row.departamentoFuncionario.id,
                      // departamento: params.row.departamentoFuncionario.departamento,
                      // funcaoID: params.row.funcaoFuncionario.id,
                      // funcao: params.row.funcaoFuncionario.funcao,
                    }
                  }
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
  return (
    <>
      <UsableTable
        records={data}
        columns={columns}
        pageSize={pageSize}
        rowPerPage={rowPerPage}
      />
    </>
  );
});

export default DenunciaSearchTable;
