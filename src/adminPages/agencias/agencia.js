import "./agencia.css";
import "../../App.css";
import Notifications from "../../components/reusableComponents/Notifications";
import { AddBox, House, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from "../../components/reusableComponents/Controls";
import { useForm, Form } from "../../components/reusableComponents/useForm";
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import AgenciaService from "../../services/admin/Agencia.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InputAdornment } from "@mui/material";
import PaisService from "../../services/admin/Pais.service";
import CidadeService from "../../services/admin/Cidade.service";
import Pais from "../paises/Pais";
import Cidade from "../cidade/cidade";
import StatusDataInfo from "../../services/admin/StatusData";


const initialFValues = {
  id: 0,
  code: "",
  nome: "",
  endereco: "",
  email: "",
  telefone: "",
  nomeRepresentante: "",
  status: "1",
  imageName: "",
  sedeID: 0,
  paisID: "",
  cidadeID: "",
};

const Agencia = () => {
  const { t } = useTranslation();

  // notification with SnackBar
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPpupTitle] = useState("");
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const childRef2 = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const [imageFileName, setImageFileName] = useState("");

  const childRefSede = useRef(null); // it's using a reference of a method from ImageUpLoad.js
  const navigate = useNavigate();

  //const [slideImgCategory, setSlideImgCategory] = useState("");
  const [sede, setSede] = useState("");
  const [sedeID, setSedeID] = useState("");

  const [notificatinoShow, setNotificationShow] = useState(false);
  const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
  const location = useLocation();

  const [backGroundColor, setBackGroundColor] = useState("");
  const [color, setColor] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubTitle, setHeaderSubTitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [textReset, setTextReset] = useState("");
  const [sedePesquisa, setSedePesquisa] = useState("");

  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [paisesTable, setPaisesTable] = useState([]);
  const [cidadeTable, setCidadeTable] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
    // setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");

    getPaises(); //Dados dos paises
    getStateValuesFromSearchTable();
    updateValuesOnOpen(); // useContext
   

    // alert(window.screen.width);
    // console.log(1);
  }, [t, location.state]);

  // function for validating form
  const validate = (fieldValues = values) => {
    let validationErrorM = {};
    if ("code" in fieldValues)
      validationErrorM.code = fieldValues.code ? "" : " "; // This field is Required
    if ("nome" in fieldValues)
      validationErrorM.nome = fieldValues.nome ? "" : " "; // This field is Required

    if ("endereco" in fieldValues)
      validationErrorM.endereco = fieldValues.endereco ? "" : " ";

    if ("nomeRepresentante" in fieldValues)
      validationErrorM.nomeRepresentante = fieldValues.nomeRepresentante
        ? ""
        : " ";

    if ("cidade" in fieldValues)
      validationErrorM.cidade = fieldValues.cidade ? "" : " ";
    if ("pais" in fieldValues)
      validationErrorM.pais = fieldValues.pais ? "" : " ";

    if ("telefone" in fieldValues)
      validationErrorM.telefone =
        fieldValues.telefone.length > 8 ? "" : "Minimum 9 caracters";

    if ("email" in fieldValues)
      validationErrorM.email = /$^|.+@.+..+/.test(fieldValues.email) ? "" : " ";

      if ("sede")
      validationErrorM.sede = sede ? "" : " ";
      if ("paisID" in fieldValues)
      validationErrorM.paisID = fieldValues.paisID ? '' : " ";

    if ("cidadeID" in fieldValues)
      validationErrorM.cidadeID = fieldValues.cidadeID ? '' : " ";


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

  const getStateValuesFromSearchTable = () => {
    if (location.state !== null) {
      setBackGroundColor("darkBlue");
      setColor("white");
      setHeaderTitle(t("header_title_agence_modificar"));
      setHeaderSubTitle(t("header_subTitle_agence_modificar"));
      setButtonTitle(t("button_modificar"));
      setTextReset(t("button_novo"));
      setSedeID(location.state.sedeID);
      setSede(location.state.sede);
      setValues(location.state);
      tableAgenciaUpdateData(location.state.sedeID);

      getCidade(location.state.paisID)

    } else {
      ResetForm();
      // setBackGroundColor("darkGreen");
      // setColor("white");
      // setHeaderTitle(t('header_title_agence_novo'));
      // setHeaderSubTitle(t('header_subTitle_agence_novo'));
      // setButtonTitle(t('button_gravar'));
      // setTextReset("Limpar");
      // setTextReset(t('button_limpar'));
    }
  };

  const sendImageFromImageUpload = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const updateValuesOnOpen = () => {
    // userSavedValue.map(item => (
    // values.userID = item.id,
    // setUserID(item.id),
    //(item.sedeID),
    //setSede(item.sede),
    //values.sedeID = item.sedeID
    // ));
  };

  // const saveImageFromImageUpload = () => {
  //     setImageFileName(childRef.current.fileName);
  //     values.imageName = (childRef.current.fileName);
  //     childRef.current.saveImage();  // saveImage() = method called
  // }

  // const imageReset = () => {
  //     childRef.current.imageReset();
  // }

  // const onImageChange = (event) => {
  //     if (event.target.files && event.target.files[0]) {
  //         setSlideImgCategory(URL.createObjectURL(event.target.files[0]));
  //     }
  // }

  const ResetForm = () => {
    setSede("");
    //imageReset();
    setValues(initialFValues);

    updateValuesOnOpen(); // useContext

    setBackGroundColor("darkGreen");
    setColor("white");
    setHeaderTitle(t("header_title_agence_novo"));
    setHeaderSubTitle(t("header_subTitle_agence_novo"));
    setButtonTitle(t("button_gravar"));
    setTextReset("Limpar");
    setTextReset(t("button_limpar"));

    //setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");
    setNotificationShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveAgencia(); // call save university
      if (location.state === null) {
        // reset quando é um novo funcionario
        ResetForm();
      }
    }
  };

  const tableAgenciaUpdateData = (sedeID1) => {
    //childRef2.current.test3();
    childRef2.current.getGetAllData(sedeID1); // saveImage() = method called
  };

  const onclickUniversityPopup = () => {
      setCount(6);
    setPpupTitle(t("lista_sede"));
    setOpenPopup(true);
  };

  const saveAgencia = () => {
    // if (childRef.current.imageSelected) {  // save image only if selected
    //     saveImageFromImageUpload();
    // }

    if (values.id > 0) {
      AgenciaService.update(values.id, values)
        .then((response) => {
          tableAgenciaUpdateData(sedeID); // update Faculty Data on FacultySearchTable.js
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
      AgenciaService.create(values)
        .then((response) => {
          tableAgenciaUpdateData(sedeID); // update Faculty Data on FacultySearchTable.js
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

  const editCliqued = () => {
    getStateValuesFromSearchTable();
  };

  const reserClick = () => {
    values.code = -"";
  };
  const imageAgenciaDisplay = (image) => {
    childRef.current.imageChangeFromOutSide(image); // saveImage() = method called
  };

  const sedeSearchToToDataGrid = (e) => {
    setSedePesquisa(e.target.value);
    childRefSede.current.sedSearch(e.target.value); // search the firstname
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

  const paisHandleChange = (e) => {
    values.cidadeID = "";
    handleInputChange(e);
    getCidade(e.target.value);
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

  return (
    <div className="facultyContainer">
      <PageHeader
        title={headerTitle}
        subTitle={headerSubTitle}
        backGroundColor={backGroundColor}
        color={color}
        icon={<House />}
      ></PageHeader>

      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="facultyItemContainer">
          <div className="newFaculty">
            <div>
              <label className="inputLabel">{t("sede")}</label>
              <Controls.Input
                name="sede"
                placeHolder={t("sede")}
                value={sede}
                onChange={handleInputChange}
                width="65%"
                type="text"
                disabled="true"
                error={errors.sede}
              />
              <Search
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={onclickUniversityPopup}
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
              <label className="inputLabel">{t("nome_Agencia")}</label>
              <Controls.Input
                name="nome"
                placeHolder={t("nome_Agencia")}
                value={values.nome}
                onChange={handleInputChange}
                type="text"
                width="65%"
                error={errors.nome}
              />
            </div>
            <div>
              <label className="inputLabel">{t("nome_representante")}</label>
              <Controls.Input
                name="nomeRepresentante"
                placeHolder={t("nome_representante")}
                value={values.nomeRepresentante}
                onChange={handleInputChange}
                type="text"
                width="65%"
                error={errors.nomeRepresentante}
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
                width="65%"
                error={errors.endereco}
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
                width="42%"
                // width="40%"
                error={errors.email}
              />

              {/* <label className="inputLabel">{t('contacto')}</label> */}
              <Controls.Input
                name="telefone"
                placeHolder={t("contacto")}
                value={values.telefone}
                onChange={handleInputChange}
                type="text"
                width="23%"
                error={errors.telefone}
              />
            </div>

            <div style={{marginTop:"5px"}}>
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
            </div>

            {location.state !== null ? (
              <div style={{ marginTop: "5px" }}>
                <label className="userLabel" htmlFor="status">
                  {t("status")}
                </label>
                <Controls.Select
                  name="status"
                  label="status"
                  value={values.status}
                  onChange={handleInputChange}
                  options={StatusDataInfo()}
                  typeOfSelect={1}
                  width="65%"
                  height="40px"
                  // error={errors.status}
                />
              </div>
            ) : null}
          </div>
          {deviceWidth > 820 ? (
            <div className="newFaculty">
              <AgenciaSearchTable
                ref={childRef2}
                idDisplay={true}
                codeDisplay={true}
                paisDisplay={true}
                emailDisplay={false}
                statusDiplay={false}
                actionsButtonDisplaySelect={false}
                actionsButtonDisplayEditDelete={false}
                backGroundColor={backGroundColor}
                color={color}
                pageSize={5}
                rowPerPage={5}
                //idSede={sedeID}
                editClick={(
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
                  values.id = id;
                  values.code = code;
                  values.nome = nome;
                  values.endereco = endereco;
                  values.email = email;
                  values.telefone = telefone;
                  values.cidade = cidade;
                  values.pais = pais;
                  values.nomeRepresentante = nomeRepresentante;
                  values.status = status;
                  values.imageName = imageName;

                  setImageFileName(imageName);
                  imageAgenciaDisplay(imageChangeFromOutSideURL);
                  setOpenPopup(false);
                  tableAgenciaUpdateData(id);

                  editCliqued(); // color
                }}
              />
            </div>
          ) : null}
        </div>

        <div className="facultyItemContainer">
          {deviceWidth > 800 ? <div className="newFaculty"></div> : null}

          <div className="newFaculty">
            {location.state === null ? (
              <Controls.Buttons
                type="submit"
                text={t("button_gravar")}
                className="button"
              />
            ) : (
              <Controls.Buttons
                type="submit"
                text={t("button_modificar")}
                className="button"
              />
            )}

            {location.state === null ? (
              <Controls.Buttons
                type="button"
                text={t("button_limpar")}
                color="secondary"
                className="button"
                onClick={ResetForm}
              />
            ) : (
              <Controls.Buttons
                type="button"
                text={t("button_pagina_anterior")}
                color="secondary"
                className="button"
                onClick={() => {
                  setUserSavedValue((prevState) => {
                    prevState[0].sedeID_pesquisas = sedeID;
                    prevState[0].sede_pesquisa = sede;
                    prevState[0].provenienciaFormulario = "EditAgencia";
                    return [...prevState];
                  });

                  navigate(-1);
                }}
              />
            )}
          </div>
        </div>
      </Form>

      {notificatinoShow ? (
        <Notifications notify={notify} setNotify={setNotify} />
      ) : null}

      {count === 6 ? (
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          buttonColor="secondary"
          width="650px"
          height="520px"
          title={popupTitle}
        >
          <div style={{ marginBottom: "10px", marginTop: "-20px" }}>
            <label className="userLabel">{t("Recherche")}</label>
            <Controls.Input
              name="sedePesquisa"
              type="text"
              value={sedePesquisa}
              placeHolder={t("sede")}
              width="55%"
              marginLeft="-20px"
              onChange={sedeSearchToToDataGrid}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <SedeSearchTable
            ref={childRefSede}
            idDisplay={true}
            codeDisplay={false}
            statusDisplay={true}
            actionsButtonSelectDisplay={true} // monstrar o campo = true
            actionsButtonDisplayEditDelete={false}
            pageSize={7}
            rowPerPage={7}
            backGroundColor={backGroundColor}
            color={color}
            sedeData={(id, code, sede) => {
              setSede(sede);
              setSedeID(id);
              values.sedeID = id;
              setOpenPopup(false);
              tableAgenciaUpdateData(id);
              setSedePesquisa("");
            }}
          />
        </Popup>
      ) : null}

{Number(count) === 1 ? 
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
          </Popup>:
           Number(count) === 2 ? 
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
              getPaises();
              // tableAgenciaUpdateData(id);
              // setSedePesquisa("")
            }}
          />
      </Popup> : null}
    </div>
  );
};

export default Agencia;
