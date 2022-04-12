import "./cidade.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { Add, AddBox, House, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import SedeSearchTable from "../sede/SedeSearchTable";
import CidadeService from "../../services/admin/Cidade.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import urlImage from "../../http-common-images";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import SideMenuData2 from "../../menuData/admin/SideMenuData2";

import { useTranslation } from "react-i18next";
import Popup from "../../components/reusableComponents/Popup";
import CidadeSearchTable from "./CidadeSearchTable";
import PaisService from "../../services/admin/Pais.service";
import Pais from "../paises/Pais";


const Cidade = (props) => {
  const initialFValues = {
    id: 0,
    code: "",
    cidade: "",
    paisID: '',
  };

  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

  // notification with SnackBar
  const [url, setUrl] = useState(urlImage); // backend image  URL
  const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState(
    ""
  );
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [savedData, setSavedData] = useState(0);
  const childRef2 = useRef(null);
  const [notificatinoShow, setNotificationShow] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [id, setID] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [popupTitle, setPpupTitle] = useState("");
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [paisesTable, setPaisesTable] = useState([]);
  const [count, setCount] = useState(0);


  let imageDisplay;
  let logoCheck = "";

  const childRefMenu = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  // function to call the click from ImageUpLoad.js

  const { t } = useTranslation();

  const updateValuesOnOpen = () => {
    // userSavedValue.map(item => (
    //     setID(item.sedeID),
    //     values.id = item.sedeID,
    //     values.code = item.codeSede,
    //     values.sede = item.nomeSede,
    //     values.email = item.emailSede,
    //     values.contacto = item.sedeContacto,
    //     values.endereco = item.sedeEndereco,
    //     values.cidade = item.sedeCidade,
    //     values.pais = item.sedePais,
    //     imageDisplay = "https://s3.amazonaws.com/liralink.sigra/" + item.sedeImageFile,
    //     values.imageName = item.sedeImageFile,
    //     logoCheck = item.sedeImageFile
    // ));
  };

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    updateValuesOnOpen();
    getPaises();
  }, []);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("cidade" in fieldValues)
      validationErrorM.cidade = fieldValues.cidade ? "" : " "; // This field is Required

    setErrors({
      ...validationErrorM,
    });

    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  ); // useForm = useForm.js. We defined - validateOnChange=false

  const tableCidadeData = (tipoPesquisa, paisID) => {
    childRef2.current.getGetAllData(tipoPesquisa, paisID); // saveImage() = method called
  };

  const handleDelete = (id) => {
    //setSlideImgCategory(universityDaya.filter((item) => item.id !== id));
  };

  const ResetForm = () => {
    setValues(initialFValues);
    setNotificationShow(false);

  };

  const gavarCidade = () => {
    if (values.id > 0) {
      CidadeService.update(values.id, values)
        .then((response) => {
          //alert(t('mensagem_alteracao_sede'));
          tableCidadeData(1, values.paisID); // update DataGrid Table used form universitySearchTable.js
          setNotify({
            isOpen: true,
            message: t("mensagem_modificar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      CidadeService.create(values)
        .then((response) => {
          tableCidadeData(1, values.paisID); // update DataGrid Table used form universitySearchTable.js
          setNotify({
            isOpen: true,
            message: t("mensagem_Gravar_Nova_Agencia"),
            type: "success",
          });
          setNotificationShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      gavarCidade(); // call save university
      ResetForm();
      // close();
    }
  };

  const close = () => {
    // navigate("/Home");
    setOpenPopup(false);
    props.cidadeData();
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

  const novoPaisclickPopup = () => {
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const paisHandleChange = (e) => {
    handleInputChange(e);
    tableCidadeData(1, e.target.value); // update DataGrid Table used form universitySearchTable.js
  }

  return (
    <div style={{ marginTop: "-30px" }}>
      <div className="newPaisContainer_deleted">
        <PageHeader
          title={t("header_title_cidade")}
          subTitle={t("header_title_cidade_subTile")}
          backGroundColor= {props.backGroundColor}
          color= {props.color}
          icon={<House />}
        ></PageHeader>

        {/* <button onClick={MenuDataDisplay}>Test Menu Data</button> */}

        {/* <button onClick={buttonclick}> Button</button> */}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <div className="newPaisContainer">
            <div className="cidadeCadrado">

            <div style={{ marginBottom: "0px", marginTop: "5px" }}>
              <label className="inputLabel">{t("pais")}</label>
              <Controls.Select
                name="paisID"
                label="paisID"
                value={values.paisID}
                onChange={paisHandleChange}
                options={paisesTable}
                typeOfSelect={6}
                //error={errors.role}
                width="65%"
                height="40px"
              />
              <AddBox
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={novoPaisclickPopup}
              />
            </div>

              <div>
                <label className="inputLabel">{t("code")}</label>
                <Controls.Input
                  name="code"
                  placeHolder={t("code")}
                  value={values.code}
                  onChange={handleInputChange}
                  type="text"
                  width="65%"
                  error={errors.code}
                />
              </div>

              <div>
                <label className="inputLabel">{t("cidade")}</label>
                <Controls.Input
                  name="cidade"
                  placeHolder={t("cidade")}
                  value={values.cidade}
                  onChange={handleInputChange}
                  type="text"
                  width="65%"
                  error={errors.cidade}
                />
              </div>
            </div>

            <div className="cidadeCadrado2">
              <div style={{ marginTop: "0px" }}>
                <Controls.Buttons
                  type="submit"
                  text={t("button_gravar")}
                  //   className="button"
                  size="small"
                />
                <Controls.Buttons
                  type="button"
                  text={t("button_limpar")}
                  color="secondary"
                  //   className="button"
                  onClick={ResetForm}
                  size="small"
                  // onClick={close}
                />

                <Controls.Buttons
                  type="button"
                  text={t("sair")}
                  size="small"
                  color="info"
                  onClick={close}
                />
              </div>
            </div>

            <div></div>
          </div>
        </Form>

        <div>
          <CidadeSearchTable
            ref={childRef2}
            idDisplay={false}
            // motivoDisplay={true}
            actionsButtonDisplaySelect={false} // monstrar o campo = true
            actionsButtonDisplayEditDelete={true}
            pageSize={6}
            rowPerPage={6}
          />
        </div>

        {notificatinoShow ? (
          <Notifications notify={notify} setNotify={setNotify} />
        ) : null}

        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        buttonColor="secondary"
        width="850px"
        height="700px"
        closeButtonDisplay={false}
        marginTop="-10px"
        // title={popupTitle}
      >
        {count === 1 ? (
          <Pais
            //ref={childRePais}
            // idDisplay={true}
            // codeDisplay={false}
            // statusDisplay={true}
            // actionsButtonSelectDisplay={true} // monstrar o campo = true
            // actionsButtonDisplayEditDelete={false}
            // pageSize={7}
            // rowPerPage={7}
            backGroundColor="darkBlue"
            color="white"
            paisData={(id, code, sede) => {
              // setSede(sede);
              // setSedeID(id);
              // values.sedeID = id
              setOpenPopup(false);
              getPaises();
              // tableAgenciaUpdateData(id);
              // setSedePesquisa("")
            }}
          />
        ) : null}
      </Popup>
    </div>
  );
};
export default Cidade;
