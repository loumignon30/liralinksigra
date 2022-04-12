import "./sede.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { Add, AddBox, House, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import SedeSearchTable from "../sede/SedeSearchTable";
import SedeService from "../../services/admin/Sede.services";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import urlImage from "../../http-common-images";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import SideMenuData2 from "../../menuData/admin/SideMenuData2";

import Pais from "../../adminPages/paises/Pais";
import PaisService from "../../services/admin/Pais.service";

import { useTranslation } from "react-i18next";
import Popup from "../../components/reusableComponents/Popup";
import CidadeService from "../../services/admin/Cidade.service";
import Cidade from "../cidade/cidade";
import swal from "sweetalert";

import CodigoMensagemErro from "../../services/erroMessages/CodigoMensagemErro";

const Sede = (props) => {
  const initialFValues = {
    id: 0,
    code: "",
    sede: "",
    email: "",
    contacto: "",
    endereco: "",
    status: "1",
    imageName: "",
    paisID: "",
    cidadeID: "",
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
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRef2 = useRef(null);
  const childRePais = useRef(null);
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
  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);

  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [count, setCount] = useState(0);

  let imageDisplay;
  let logoCheck = "";

  const childRefMenu = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const [codeMMensagemErro, setodeMMensagemErro] = useState();

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
    getPaises(); //Dados dos paises

    if (values.id > 0) {
      imaSedeDisplay(imageDisplay);
    }
  }, [id]);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("sede" in fieldValues)
      validationErrorM.sede = fieldValues.sede ? "" : " "; // This field is Required

    if ("endereco" in fieldValues)
      validationErrorM.endereco = fieldValues.endereco ? "" : " ";

    if ("nomeRepresentante" in fieldValues)
      validationErrorM.nomeRepresentante = fieldValues.nomeRepresentante
        ? ""
        : " ";

    if ("paisID" in fieldValues)
      validationErrorM.paisID = fieldValues.paisID ? '' : " ";

    if ("cidadeID" in fieldValues)
      validationErrorM.cidadeID = fieldValues.cidadeID ? '' : " ";

    if ("contacto" in fieldValues)
      validationErrorM.contacto =
        fieldValues.contacto.length > 8 ? "" : "Minimum 9 caracters";

    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : " ";

    setErrors({
      ...validationErrorM,
    });

    return Object.values(validationErrorM).every((x) => x === ""); // it will return true if x==""
  };

  const { values, setValues, errors, setErrors, handleInputChange, register } = useForm(
    initialFValues,
    true,
    validate
  ); // useForm = useForm.js. We defined - validateOnChange=false

  const saveImageFromImageUpload = () => {
    setImageFileName(childRef.current.fileName);
    values.imageName = childRef.current.fileName;
    childRef.current.saveImage(); // saveImage() = method called
    logoCheck = childRef.current.fileName;
  };

  const tableSedeData = () => {
    childRef2.current.getGetAllData(); // saveImage() = method called
  };
  const imaSedeDisplay = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const imageReset = () => {
    childRef.current.imageReset();
  };

  const handleDelete = (id) => {
    //setSlideImgCategory(universityDaya.filter((item) => item.id !== id));
  };

  const ResetForm = () => {
    imageReset();
    setValues(initialFValues);
    setNotificationShow(false);

    //setUserSavedValue({});

    //navigate('/');
    // setOpenPopup(false);
  };

  const gavarSede = () => {
    if (values.id > 0) {
      SedeService.update(values.id, values)
        .then((response) => {
          //alert(t('mensagem_alteracao_sede'));
          tableSedeData(); // update DataGrid Table used form universitySearchTable.js
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
      SedeService.create(values)
        .then((response) => {
          // alert(t('mensagem_alteracao_sede'));
          tableSedeData(); // update DataGrid Table used form universitySearchTable.js
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

  function codeExistMessage() {
    return swal(
      t("mensagem_erro_menu_atencao"),
      t("O Código da Sede Existe com uma outra Sede!"),
      "warning"
    );
  }

  function sedeExistMessage() {
    return swal(
      t("mensagem_erro_menu_atencao"),
      t("A Sede já existe na base!"),
      "warning"
    );
  }
  function emailExistMessage() {
    return swal(
      t("mensagem_erro_menu_atencao"),
      t("O Email já existe na base com uma outra Sede!"),
      "warning"
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      if (childRef.current.imageSelected) {
        // if (childRef.current.imageSelected) {
        saveImageFromImageUpload();
      }
      if (logoCheck === "") {
        alert(t("mensagem_falta_de_logitipo_da_sede"));
        return;
      }

      // check code exist
      const response = await SedeService.getAll(1, values.code);
      let codecheck = response.data.length;
      if (codecheck > 0) {
        codeExistMessage();
        return;
      }

      // check code exist
      const responseSede = await SedeService.getAll(2, values.sede);
      let sedecheck = responseSede.data.length;
      if (sedecheck > 0) {
        sedeExistMessage();
        return;
      }

      // check email exist
      const responseEmail = await SedeService.getAll(3, values.email);
      let emailcheck = responseEmail.data.length;
      if (emailcheck > 0) {
        emailExistMessage();
        return;
      }

      gavarSede(); // call save university
      ResetForm();
      // close();
    }
  };

  const close = () => {
    navigate("/Home");
    setOpenPopup(false);
    props.yearGetData();
  };

  const novoPaisclickPopup = () => {
    values.paisID = "";
    values.cidadeID = "";
    setCount(1);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const novaCidadeclickPopup = () => {
    values.cidadeID = "";
    setCount(2);
    setPpupTitle(t("Listar Cidades"));
    setOpenPopup(true);
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
    handleInputChange(e);
    getCidade(e.target.value);
  };
 
  return (
    <div className="universityContainer">
      <PageHeader
        title={t("header_title_sede")}
        subTitle={t("header_subTitle_sede")}
        backGroundColor="darkBlue"
        color="white"
        icon={<House />}
      ></PageHeader>

      {/* <button onClick={MenuDataDisplay}>Test Menu Data</button> */}

      {/* <button onClick={buttonclick}> Button</button> */}

      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="unversityItemContainer">
          <div className="newUniversity">
            <div style={{ marginTop: "-20px" }}>
              <label className="inputLabel">{t("code")}</label>
              <Controls.Input
                name="code"
                placeHolder={t("code")}
                value={values.code}
                onChange={handleInputChange}
                type="text"
                error={errors.code}
              />
            </div>

            <div>
              <label className="inputLabel">{t("sede")}</label>
              <Controls.Input
                name="sede"
                placeHolder={t("sede")}
                value={values.sede}
                onChange={handleInputChange}
                type="text"
                error={errors.sede}
              />
            </div>

            <div>
              <label className="inputLabel">{t("email")}</label>
              <Controls.Input
                name="email"
                placeHolder={t("email")}
                value={values.email}
                onChange={handleInputChange}
                type="text"
                error={errors.email}
              />
            </div>

            <div>
              <label className="inputLabel">{t("contacto")}</label>
              <Controls.Input
                name="contacto"
                placeHolder={t("contacto")}
                value={values.contacto}
                onChange={handleInputChange}
                type="text"
                error={errors.contacto}
              />
            </div>

            <div>
              <label className="inputLabel">{t("endereco")}</label>
              <Controls.Input
                name="endereco"
                placeHolder={t("endereco")}
                value={values.endereco}
                onChange={handleInputChange}
                type="text"
                error={errors.endereco}
              />
            </div>

            <div style={{ marginBottom: "0px", marginTop: "5px" }}>
              <label className="inputLabel">{t("pais")}</label>
              <Controls.Select
                name="paisID"
                label="paisID"
                value={values.paisID}
                onChange={paisHandleChange}
                options={paisesTable}
                typeOfSelect={6}
                error={errors.paisID}
                width="65%"
                height="40px"
              />
              <AddBox
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={novoPaisclickPopup}
              />
            </div>

            <div style={{ marginTop: "3px", marginBottom: "20px" }}>
              <label className="inputLabel">{t("cidade")}</label>

              <Controls.Select
                name="cidadeID"
                label="cidadeID"
                value={values.cidadeID}
                onChange={handleInputChange}
                options={cidadeTable}
                typeOfSelect={7}
                error={errors.cidadeID}
                width="65%"
                height="40px"
              />
              <AddBox
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={novaCidadeclickPopup}
              />

              {/* <Controls.Input
                name="cidade"
                placeHolder={t("cidade")}
                value={values.cidade}
                onChange={handleInputChange}
                type="text"
                error={errors.cidade}
              /> */}
            </div>
          </div>

          {deviceWidth > 820 ? (
            <div className="newUniversity">
              <div>
                <SedeSearchTable
                  ref={childRef2}
                  idDisplay={true}
                  codeDisplay={false}
                  actionsButtonSelectDisplay={false} // monstrar o campo = true
                  actionsButtonDisplayEditDelete={true}
                  pageSize={4}
                  rowPerPage={4}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="unversityItemContainer">
          <div className="newUniversity">
            <ImageUpLoad
              ref={childRef}
              margnLeft="0px"
              fotoTitulo="Logo"
              uploadDisplay={true}
            />
          </div>

          <div className="newUniversity">
            <div>
              <Controls.Buttons
                type="submit"
                text={t("button_gravar")}
                className="button"
              />
              <Controls.Buttons
                type="button"
                text={t("button_limpar")}
                color="secondary"
                className="button"
                onClick={ResetForm}
                // onClick={close}
              />
            </div>
          </div>
        </div>
      </Form>

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <SideMenuData2 ref={childRefMenu} />

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
        ) : count === 2 ? (
          <Cidade
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
            cidadeData={(id, code, sede) => {
              // setSede(sede);
              // setSedeID(id);
              // values.sedeID = id
              setOpenPopup(false);
              getCidade(values.paisID);
              // tableAgenciaUpdateData(id);
              // setSedePesquisa("")
            }}
          />
        ) : null}
      </Popup>
    </div>
  );
};
export default Sede;
