import { Delete, Done } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import UsableTable from "../../components/reusableComponents/UsableTable";
import DenunciaTempo from "../../services/admin/DenunciaTempo.service";
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


const DenunciaTempoSearchTable = forwardRef((props, ref) => {
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
    backGroundColor,
    color,
    sedeID,
    nomeComputador,
    tipoMovimento,
    agenciaID,
    pageSize,
    rowPerPage,
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

  const getGetAllData = (nomeComputador1) => {
    // alert("ici4: " + nomeComputador1)

    DenunciaTempo.getAll(nomeComputador1)
      .then((response) => {
        //  console.log(response.data)
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
                DenunciaTempo.delete(id)
                    .then(response => {
                        getGetAllData(nomeComputador1);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                swal(t('Reclamação apagada com Sucesso!'), {
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

    {
      field: "nomeCompleto",
      headerName: t("Reclamação Contra"),
      flex: 3,
      headerClassName: classes.paper,
      renderCell: (params) => {
        return (
          <>
            {/* <div className="UtilisateurListPlusPhoto"> */}
            <img
              className="UtilisateurListImage"
              src={
                params.row.tipoMovimentodenuncia === "Funcionario"
                  ? params.row.funcionariodenunciatempo.imageName !== ""
                    ? "https://s3.amazonaws.com/liralink.sigra/" +
                      params.row.funcionariodenunciatempo.imageName
                    : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"
                  : params.row.tipoMovimentodenuncia === "Centro Trabalho"
                  ? params.row.agenciadenunciatempo.imageName !== ""
                    ? "https://s3.amazonaws.com/liralink.sigra/" +
                      params.row.agenciadenunciatempo.imageName
                    : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"
                  : params.row.tipoMovimentodenuncia === "Empresa"
                  ? params.row.sededenunciatempo.imageName !== ""
                    ? "https://s3.amazonaws.com/liralink.sigra/" +
                      params.row.sededenunciatempo.imageName
                    : "https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png"
                  : params.row.tipoMovimentodenuncia === "Produto"
                  ? produtoImagem
                  : params.row.tipoMovimentodenuncia === "Servico"
                  ? ServicoImagem
                  : params.row.tipoMovimentodenuncia === "Outras"
                  ? outrosservicos
                  : null
              }
              alt=""
            />
            {params.row.tipoMovimentodenuncia === "Funcionario" ? (
              params.row.funcionariodenunciatempo.primeironome +
              " " +
              params.row.funcionariodenunciatempo.ultimonome
            ) : params.row.tipoMovimentodenuncia === "Centro Trabalho" ? (
              params.row.agenciadenunciatempo.nome
            ) : params.row.tipoMovimentodenuncia === "Empresa" ? (
              params.row.sededenunciatempo.sede
            ) : params.row.tipoMovimentodenuncia === "Produto" ? (
              <span>Produto</span>
            ) : params.row.tipoMovimentodenuncia === "Servico" ? (
              <span>Serviço</span>
            ) : params.row.tipoMovimentodenuncia === "Outras" ? (
              <span>Outras</span>
            ) : null}
            {/* </div> */}
          </>
        );
      },
    },
    {
      field: "tipoMovimentodenuncia",
      headerName: t("Tipo Denúncia"),
      flex: 1,
      headerClassName: classes.paper,
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

export default DenunciaTempoSearchTable;
