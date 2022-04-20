import { Delete, Done } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import NotificaoServices from "../../services/admin/Notificao.service";
import useStylesSearchTable from "../../components/reusableComponents/SearchTableStyle";
import urlImage from "../../http-common-images";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Rating, SvgIcon } from "@mui/material";
import StatusDenunciaData from "../../services/admin/StatusDenunciaData";

import { useTranslation } from "react-i18next";

import produtoImagem from "../../assets/images/produtoImagem.png";
import ServicoImagem from "../../assets/images/ServicoImagem.jpg";

import outrosservicos from "../../assets/images/outrosservicos.png";
import swal from 'sweetalert';


const NotificacaoSearchTable = forwardRef((props, ref) => {
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
    actionsButtonDisplaySelect,
    actionsButtonDisplayEditDelete,
    backGroundColor,
    color,
    sedeID,
    nomeComputador,
    tipoMovimento,
    agenciaID,
    pageSize,
    rowPerPage,
    mensagemDisplay,
    tipoNotificaoDisplay,
    userQueRnviouMensagem
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
    getGetAllData(nomeComputador);
  }, []);

  useImperativeHandle(ref, () => ({
    getGetAllData: getGetAllData, // it's calling the method : unversityGetAll()
  }));

  const getFuncionarioData = (id, code, agencia) => {
    props.agenciaData(id, code, agencia);
    setOpenPopup(false);
  };

  const getGetAllData = (tipoPesquisa1, sedeID1, funcionarioID1, tipoMovimento1) => {

    NotificaoServices.getAll(tipoPesquisa1, sedeID1, funcionarioID1, tipoMovimento1)
      .then((response) => {
          console.log(response.data)
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
  

  const handleDelete = (id, nomeComputador1, tipoMovimentoDenuncia) => {

    let message = tipoMovimentoDenuncia;
    
    if(tipoMovimentoDenuncia === "Empresa") {
        message = "Reclamação sobre a Empresa"
    }
    if(tipoMovimentoDenuncia === "Centro Trabalho") {
        message = "Reclamação sobre o Centro Trabalho"
    }

    if(tipoMovimentoDenuncia === "Funcionario") {
        message = "Reclamação sobre doFuncionário"
    }

    if(tipoMovimentoDenuncia === "Servico") {
        message = "Reclamação de Serviço prestado"
    }

    if(tipoMovimentoDenuncia === "Outras") {
        message = "Outro tipo de Reclamação"
    }
    if(tipoMovimentoDenuncia === "Produto") {
        message = "Reclamação sobre o Produto"
    }
   
    swal({
        title: t('Deseja apagar a Reclamação? '),
         text: message,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {

            if (willDelete) {
                NotificaoServices.delete(id)
                    .then(response => {
                        getGetAllData(nomeComputador1);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                swal(t('Notificação apagada com Sucesso!'), {
                    icon: "success",
                })
            }
        });
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
          flex: 0.7,
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
          flex: 0.5,
          headerClassName: classes.paper,
        }
      : {
          field: "tiponotificacao",
          headerName: t("Tipo Notificação"),
          hide: { horaDisplay },
          headerClassName: classes.paper,
        },

        tipoNotificaoDisplay
        ? {
            field: "tiponotificao",
            headerName: t("Tipo Notificação"),
            flex: 0.8,
            headerClassName: classes.paper,
          }
        : {
            field: "hora",
            headerName: t("hora"),
            hide: { tipoNotificaoDisplay },
            headerClassName: classes.paper,
          },

          

        mensagemDisplay
        ? {
            field: "mensagem",
            headerName: t("Mensagem"),
            flex:2,
            headerClassName: classes.paper,
          }
        : {
            field: "mensagem",
            headerName: t("Mensagem"),
            hide: { mensagemDisplay },
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

        userQueRnviouMensagem
        ? {
            field: "user",
            headerName: t("Utilizador"),
            flex: 1,
            headerClassName: classes.paper,
            renderCell: (type) => {
              return (
                <>
                  {
                      type.row.userQueEnviouMensagemID.firstname + " " + 
                      type.row.userQueEnviouMensagemID.lastname
                    }
                 
                </>
              );
            },
          }
        : {
            field: "status",
            headerName: t("status"),
            flex: 1,
            hide: { userQueRnviouMensagem },
            headerClassName: classes.gridHeader,
          },
  

    actionsButtonDisplaySelect
      ? {
          field: "action",
          headerName: t("action"),
          flex: 0.4,
          headerClassName: classes.paper,
          renderCell: (params) => {
            return (
              <>
                {/* <Done
                  

                    // getFuncionarioData(
                    //   params.row.id,
                    //   params.row.code,
                    //   params.row.primeironome,
                    //   params.row.ultimonome,
                    //   params.row.telefone,
                    //   params.row.agenciaFuncionario.nome,
                    //   params.row.agenciaFuncionario.id
                    // );
                  }}
                /> */}

                <Delete className="utilisateurButtonDelete" 
                 onClick={() => handleDelete(
                    params.row.id, params.row.computador,
                    params.row.tipoMovimentodenuncia
                )}/>
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

export default NotificacaoSearchTable;
