import React, { useState, useEffect, useRef, useContext } from 'react'
import './denuncia.css'
import '../../App.css'
import ArticleIcon from '@mui/icons-material/Article';
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import Notifications from '../../components/reusableComponents/Notifications';
import * as userRole from "../../services/admin/RoleData";
import PageHeader from '../../components/reusableComponents/PageHeader';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import UserService from '../../services/admin/User.service';
import { UserLoggedContext } from '../utilisador/UserLoggedContext';
import { Search, SetMeal } from '@mui/icons-material';
import FuncionarioService from "../../services/admin/Funcionario.services";
import urlImage from '../../http-common-images';
import DenunciaService from '../../services/admin/Denuncias.services';
import TipoDenunciaServices from "../../services/admin/TipoDenuncia.services";

import { useTranslation } from "react-i18next";
import cookies from 'js-cookie'
import i18next from 'i18next';
import { Rating, SvgIcon } from '@mui/material';
import Popup from '../../components/reusableComponents/Popup';
import FuncionarioSearchTable from '../funcionario/FuncionarioSearchTable';
import RatingServices from "../../services/admin/RatingServices";
import RatingMotivoService from '../../services/admin/RatingMotivo.service';

import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { convertToRaw } from 'draft-js'

// import Rating from 'react-simple-star-rating'

const initialFValues = {
    id: 0,
    codigo: '',
    nome: '',
    telepfoneDenunciante: '',
    emailDenunciante: '',
    queixa: '',
    status: '1',
    hora: '',
    data: null,
    funcionarioID: 0,
    sedeID: 0,
    agenciaID: 0,
    tipodenunciaID: '',
    tipodenuncia: "",
    abreviationLangue: "",
    rating: 0,
    ratingID: '',
    ratingMotivoID: ''
}

const languages = [
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    },
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'pt',
        name: 'Português',
        country_code: 'pt'
    },
    {
        code: 'ar',
        name: 'العربية',
        country_code: 'sa',
        dir: 'rtl'
    }
]


const NovaDenuncia = (props) => {

    
    const currentLanguageCode = 'pt'  // cookies.get('i18next') || 'en';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode);
    const { t } = useTranslation();

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageSRC, setImageSRC] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefFuncionario = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [imageFileName, setImageFileName] = useState("");

    const [sede, setSede] = useState("LiraLink Tecnologia Lda");
    const [sedeID, setSedeID] = useState(1);
    const [agenciaID, setAgenciaID] = useState(0);
    const [agencia, setAgencia] = useState("");

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const [notificatinoShow, setNotificationShow] = useState(false);

    const [count, setCount] = useState(0);
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState("");
    const [url, setUrl] = useState("");  // backend image  URL

    const [primeiroNome, setPrimeiroNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");
    const [pais, setPais] = useState("");
    const [tipoDenunciaList, setSipoDenunciaList] = useState([]);
    const [starValue, setStarValue] = useState(1);
    const [rating, setRating] = useState(0) // initial rating value
    const [Ratingdata, setRatingData] = useState([]);
    const [RatingMotivodata, setRatingMotivoData] = useState([]);

    const [countOneStar, setCountOneStar] = useState(1);
    const [value, setValue] = useState('')

    let fotoFuncionario = "";
    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('primeiroNome')
            validationErrorM.primeiroNome = primeiroNome ? "" : " "  // This field is Required
        if ('apelido')
            validationErrorM.apelido = apelido ? "" : " "   // This field is Required

        if ('nome' in fieldValues)
            validationErrorM.nome = fieldValues.nome ? "" : " "

        // if ('tipodenunciaID' in fieldValues)
        //     validationErrorM.tipodenunciaID = fieldValues.tipodenunciaID ? "" : " "

        // if ('queixa' in fieldValues)
        //     validationErrorM.queixa = fieldValues.queixa ? "" : " "

        if ('emailDenunciante' in fieldValues)
            validationErrorM.emailDenunciante = (/$^|.+@.+..+/).test(fieldValues.emailDenunciante) ? "" : " "

        setErrors({
            ...validationErrorM
        })

        return Object.values(validationErrorM).every(x => x === "")  // it will return true if x==""
    }

    const getTime = () => {
        var today = new Date(),
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        values.hora = time;
        let today2 = new Date().toLocaleDateString();
        values.data = today2;
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange } = useForm(initialFValues, true, validate);  // useForm = useForm.js. We defined - validateOnChange=false

    useEffect(() => {
       // window.scrollTo(0, 0); // open the page on top
       
       // i18next.changeLanguage("pt");

       // updateValuesOnOpen();
        //setUrl(urlImage());

       // TipoDenunciaGetAll(currentLanguageCode, values.sedeID);

    }, []);

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => {
            values.sedeID = 1; // item.sedeID;
            setSede("LiraLink Tecnologia Lda");  //
            setSedeID(1);  //item.sedeID
            values.codigo = "";
        });
    }


    const sendImageFromImageUpload = (image) => {

        childRef.current.imageChangeFromOutSide("https://s3.amazonaws.com/liralink.sigra/" + image);  // saveImage() = method called
    }


    const saveImageFromImageUpload = () => {
        setImageFileName(childRef.current.fileName);
        values.photofilename = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
    }
    const imageReset = () => {
        childRef.current.imageReset()
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (validate()) {
            guardarDenuncias(); // save new user
            ResetForm();
        }
    }

    const onclicSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        setCount(2);
        setPpupTitle(t('lista_agencia'));
        setOpenPopup(true);
    }

    const ResetForm = () => {
        setValues(initialFValues);
        values.codigo = "";
        //  setSede("");
        setAgencia("");
        setPrimeiroNome("");
        setApelido("");
        setTelefone("");
        setEmail("");
        setEndereco("");
        setCidade("");
        setPais("");
        imageReset();
        setErrors({});
        sendImageFromImageUpload("");
        setUrl(urlImage())
        imageReset(); // reset the image
        setNotificationShow(false);
        setRating(0)

    }

    const guardarDenuncias = () => {

        getTime(); // data e hora da denuncia
        values.abreviationLangue = currentLanguageCode;

        DenunciaService.create(values).then(response => {
            setNotify({
                isOpen: true,
                message: t('mensagem_Gravar_Nova_Agencia'),
                type: 'success'
            });
            setNotificationShow(true);

        })
            .catch(e => {
                console.log(e)
            });
    }
    const onclickSedePopup = () => {
        setCount(1);
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const pesquisaCodigoFuncionario = () => {

        if (values.codigo !== "") {

            FuncionarioService.getID(values.codigo).then(response => {

                if (response.data.length === 0) {
                    alert(t('mensagem_erro_numero_funcionario_pesquisa'));

                    setSede("");
                    setAgencia("");
                    setPrimeiroNome("");
                    setApelido("");
                    setTelefone("");
                    setEmail("");
                    setEndereco("");
                    setCidade("");
                    setPais("");
                    sendImageFromImageUpload("");
                    return
                }

                response.data.map(info => {

                    setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + info.imageName);
                    sendImageFromImageUpload("https://s3.amazonaws.com/liralink.sigra/" + info.imageName);

                    fotoFuncionario = info.imageName;

                    if (fotoFuncionario === "") {
                        setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png");
                        sendImageFromImageUpload("https://s3.amazonaws.com/liralink.sigra/" + "semfoto.png");
                    }

                    setSede(info.sedeFuncionario.sede)
                    setAgencia(info.agenciaFuncionario.nome)
                    setPrimeiroNome(info.primeironome);
                    setApelido(info.ultimonome);
                    setTelefone(info.agenciaFuncionario.telefone);
                    setEmail(info.agenciaFuncionario.email)
                    setEndereco(info.agenciaFuncionario.endereco);
                    setCidade(info.agenciaFuncionario.cidade);
                    setPais(info.agenciaFuncionario.pais);

                    values.funcionarioID = info.id;
                    values.sedeID = info.sedeFuncionario.id;
                    values.agenciaID = info.agenciaFuncionario.id;
                    values.rating = 0;


                    TipoDenunciaGetAll(currentLanguageCode, values.sedeID);


                })


            })
                .catch(e => {
                    console.log(e)
                });

        } else {
            alert(t('mensagem_erro_numero_funcionario_pesquisa'));
        }
    }

    const TipoDenunciaGetAll = (abreviationLanguem1, sedeID1) => {

        TipoDenunciaServices.getAll(abreviationLanguem1, sedeID1)
            .then(response => {
                setSipoDenunciaList(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleKeyPress = () => {
        pesquisaCodigoFuncionario();
    }

    const onclickFuncionarioPopup = () => {

        setPpupTitle(t('lista_funcionario'));
        setOpenPopup(true);
    }

    const ratingDescricaoGet = (sedeID1, rating1) => {
        RatingServices.getAll(sedeID1, rating1).then(response => {
            setRatingData(response.data);

        }
        )
    }

    const ratingMotivoGet = (sedeID1, rating1) => {
        RatingMotivoService.getAll(sedeID1, rating1).then(response => {
            setRatingMotivoData(response.data);
        }
        )
    }

    const ratingAvaliacaoDescricaoChange = (e) => {

        let ratingIDLocal = e.target.value
        handleInputChange(e);
        ratingMotivoGet(sedeID, ratingIDLocal);

        //ratingMotivoTable(values.sedeID, ratingIDLocal);

    }

    const ratingMotivoChange = (e) => {

        let ratingIDLocal = e.target.value
        handleInputChange(e);
        //ratingMotivoTable(values.sedeID, ratingIDLocal);
    }

    const myTheme = createTheme({
        // Set up your custom MUI theme here
    })

    const onEditorChange = (event) => {
        const plainText = event.getCurrentContent().getPlainText()
       // console.log(plainText);
        values.queixa = plainText;
        // const plainText = event.getCurrentContent().getPlainText() // for plain text
        // const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
        // rteContent && setValue(JSON.stringify(rteContent)) // store your rteContent to state
    }

    const save = (data) => {
        console.log(values.queixa);
      };


    return (
        <>
            <div className="newUserMainContainer">
                <PageHeader
                    title={t('header_title_denuncia_novo')}
                    subTitle={t('header_subTitle_denuncia_novo')}
                    backGroundColor="#50394c"
                    color="white"
                    icon={<ArticleIcon />}>
                </PageHeader>

                <Form>

                    <div className="newUserContainer">

                        <div className="newUser">

                            <div style={{ marginTop: "-30px" }}>
                                <label className="userLabel"># {t('funcionarios_menu')}</label>
                                <Controls.Input
                                    name="codigo"
                                    placeHolder={t('denunciaNumeroPlaceOrder')}
                                    value={values.codigo}
                                    onChange={handleInputChange}
                                    width="65%" type="text"
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            handleKeyPress()
                                        }
                                    }
                                    }

                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    // onClick={handleKeyPress}
                                    onClick={onclickFuncionarioPopup}
                                />
                            </div>
                            <div>
                                <label className="userLabel">{t('nome')}</label>
                                <Controls.Input
                                    name="primeiroNome"
                                    placeHolder={t('funcionarios_menu')}
                                    value={primeiroNome}
                                    type="text"
                                    width="32%"
                                    error={errors.primeiroNome}

                                />

                                <Controls.Input
                                    name="apelido"
                                    placeHolder={t('apelido')}
                                    value={apelido}
                                    type="text"
                                    width="33%"
                                    error={errors.apelido}
                                />
                            </div>
                            <div>
                                <label className="inputLabel">{t('sede')}</label>
                                <Controls.Input
                                    name="sede"
                                    placeHolder={t('sede')}
                                    value={sede}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="32%"
                                    disabled="true"
                                />
                                <Controls.Input
                                    name="agencia"
                                    placeHolder={t('agencia')}
                                    value={agencia}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="33%"
                                    disabled="true"
                                />

                            </div>

                            <div>
                                <label className="userLabel">{t('email')}</label>
                                <Controls.Input
                                    name="email"
                                    placeHolder={t('email')}
                                    value={email}
                                    width="65%" type="text"
                                    error={errors.telephone}
                                />
                            </div>
                            <div>
                                <label className="userLabel">{t('contacto')}</label>
                                <Controls.Input
                                    name="telefone"
                                    placeHolder={t('contacto')}
                                    value={telefone}
                                    width="65%" type="text"
                                    error={errors.telephone}
                                />
                            </div>

                            {/* <div>
                                <label className="userLabel">{t('endereco')}</label>
                                <Controls.Input
                                    name="endereco"
                                    placeHolder={t('endereco')}
                                    value={endereco}
                                    onChange={handleInputChange}
                                    width="65%" type="text"
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('cidade')}</label>
                                <Controls.Input
                                    name="cidade"
                                    placeHolder={t('cidade')}
                                    value={cidade}
                                    onChange={handleInputChange}
                                    width="32%" type="text"
                                />

                                <Controls.Input
                                    name="pais"
                                    placeHolder={t('pais')}
                                    value={pais}
                                    onChange={handleInputChange}
                                    width="33%"
                                    type="text"
                                />
                            </div> */}

                            <div style={{ marginTop: "10px" }}>
                                <ImageUpLoad
                                    ref={childRef}
                                    fotoTitulo={t('foto')}
                                    margnLeft="0px"
                                    uploadDisplay={false}
                                    primeironome={primeiroNome}
                                    apelido={apelido}
                                    agencia={agencia}


                                />
                            </div>

                            <hr style={{ borderStyle: "solid", marginTop: "5px", width: "450px" }} />

                            <div>
                                <label className="userLabel" style={{ color: "red" }}>{t('rating')}</label>

                                <Rating style={{ width: "200px", marginTop: "4px" }}
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                        if (newValue === null) {
                                            values.rating = 0;
                                            values.ratingID = '';
                                            values.ratingMotivoID = '';
                                            ratingDescricaoGet(sedeID, 0);
                                        } else {
                                            values.ratingID = '';
                                            values.ratingMotivoID = '';
                                            values.rating = newValue;
                                            ratingDescricaoGet(sedeID, newValue)

                                        }

                                    }}
                                />
                            </div>

                            <div style={{ paddingTop: "5px" }}>
                                <label className="userLabel" style={{ marginTop: "-5px" }}
                                    htmlFor="classificacao">{t('descricao_avaliacao')}</label>
                                <Controls.Select
                                    name="ratingID"
                                    label="ratingID"
                                    value={values.ratingID}
                                    onChange={ratingAvaliacaoDescricaoChange}
                                    options={Ratingdata}
                                    typeOfSelect={3}
                                    //error={errors.role}
                                    width="65%"
                                    height="40px"
                                />
                            </div>

                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel" style={{ marginTop: "-5px" }}
                                    htmlFor="classificacao">{t('motivo_avaliacao')}</label>
                                <Controls.Select
                                    name="ratingMotivoID"
                                    label="ratingMotivoID"
                                    value={values.ratingMotivoID}
                                    onChange={handleInputChange}
                                    options={RatingMotivodata}
                                    typeOfSelect={4}
                                    //error={errors.role}
                                    width="65%"
                                    height="40px"
                                />
                            </div>

                        </div>

                        <div className="newUser4">

                            {/* <div>
                                <label className="userLabel">{t('rating')}</label>

                                <Rating style={{ width: "200px", marginTop: "4px" }}
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                        if (newValue === null) {
                                            values.rating = 0;
                                            ratingDescricaoGet(sedeID, 0);
                                        } else {
                                            values.rating = newValue;
                                            ratingDescricaoGet(sedeID, newValue)

                                        }

                                    }}
                                />
                            </div>

                            <div style={{ paddingTop: "5px", }}>
                                <label className="userLabel"
                                    htmlFor="classificacao">{t('descrição Avaliação')}</label>
                                <Controls.Select
                                    name="ratingID"
                                    label="ratingID"
                                    value={values.ratingID}
                                    onChange={ratingAvaliacaoDescricaoChange}
                                    options={Ratingdata}
                                    typeOfSelect={3}
                                    //error={errors.role}
                                    width="65%"
                                    height="40px"
                                />
                            </div>

                            <div style={{ marginTop: "5px" }}>
                                <label className="userLabel"
                                    htmlFor="classificacao">{t('Motivo')}</label>
                                <Controls.Select
                                    name="ratingMotivoID"
                                    label="ratingMotivoID"
                                    value={values.ratingMotivoID}
                                    onChange={handleInputChange}
                                    options={RatingMotivodata}
                                    typeOfSelect={4}
                                    //error={errors.role}
                                    width="65%"
                                    height="40px"
                                />
                            </div> */}

                            {/* <div>
                                <label className="inputLabel">{t('tipo_denuncia')}</label>
                                <Controls.Select
                                    name="tipodenunciaID"
                                    label="tipodenunciaID"
                                    value={values.tipodenunciaID}
                                    onChange={handleInputChange}
                                    options={tipoDenunciaList}
                                    width="65%"
                                    height="40px"
                                    typeOfSelect={2}
                                    error={errors.tipodenunciaID}
                                />

                            </div> */}

                            <div style={{ marginTop: "-25px" }}>
                                <label className="userLabel">{t('denunciante')}</label>
                                <Controls.Input
                                    name="nome"
                                    placeHolder={t('denunciante')}
                                    value={values.nome}
                                    onChange={handleInputChange}
                                    width="65%" type="text"
                                    error={errors.nome}
                                />
                            </div>

                            <div>
                                <label className="userLabel">{t('contacto')}</label>
                                <Controls.Input
                                    name="telepfoneDenunciante"
                                    placeHolder={t('contacto')}
                                    value={values.telepfoneDenunciante}
                                    onChange={handleInputChange}
                                    width="65%"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="userLabel">{t('email')}</label>
                                <Controls.Input
                                    name="emailDenunciante"
                                    placeHolder={t('email')}
                                    value={values.emailDenunciante}
                                    onChange={handleInputChange}
                                    width="65%" type="text"
                                    error={errors.emailDenunciante}
                                />
                            </div>

                            <div style={{ width: "400px", height: "100px" }}>

                                <ThemeProvider theme={myTheme} >
                                    <MUIRichTextEditor
                                        label={t('queixaPlaceOrder')}
                                        controls={['numberList', 'bulletList', 'bold', 'italic', 'underline', 'strikethrough']}
                                        value={values.queixa}
                                        onSave={save}
                                        onChange={onEditorChange}
                                    />
                                </ThemeProvider>
                                {/* <ThemeProvider theme={myTheme} > 
                                    <MUIRichTextEditor label={t('queixaPlaceOrder')}
                                    inlineToolbar={true} 
                                    defaultValue={values.queixa}
                                    />
                                </ThemeProvider> */}
                            </div>

                            {/* <div>
                                <label className="userLabel">{t('queixa')}</label>
                                <Controls.Input
                                    name="queixa"
                                    placeHolder={t('queixaPlaceOrder')}
                                    value={values.queixa}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="65%"
                                    multiline
                                    rows={8}
                                    height="100px"
                                    error={errors.queixa}
                                />

                            </div> */}

                            <div className="buttonContainerDenuncias">
                                <div >
                                    <Controls.Buttons
                                        type="button"
                                        text={t('button_gravar')}
                                        onClick={handleSubmit}
                                    />
                                    <Controls.Buttons
                                        type="button"
                                        text={t('button_limpar')}
                                        color="secondary"
                                        onClick={ResetForm} />
                                </div>

                            </div>


                        </div>
                    </div>

                    {/* <div className="newUserContainer">

                        <div className="buttonContainer">
                            <div >
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_gravar')}
                                    onClick={handleSubmit}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text={t('button_limpar')}
                                    color="secondary"
                                    onClick={ResetForm} />
                            </div>

                        </div>
                    </div> */}

                </Form>
            </div>

            {
                notificatinoShow ?
                    <Notifications
                        notify={notify}
                        setNotify={setNotify}
                    />
                    : null
            }

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                //pageHeader={PopupHeaderUniversity()}
                buttonColor="secondary"
                title={popupTitle}
                width="550px"
                height="650px"
                marginTop="10px"
            >

                <FuncionarioSearchTable ref={childRefFuncionario}
                    idDisplay={false}
                    agenciaDisplay={false}
                    codeDisplay={false}
                    fotoDisplay={true}
                    primeiroNomeDisplay={false}
                    ultimonomeDisplay={false}
                    emailDisplay={false}
                    actionsButtonDisplaySelect={true}
                    telefoneDislay={false}
                    statusDisplay={true}
                    actionsButtonDisplayEditDelete={false}
                    backGroundColor="darkBlue"
                    sedeID={sedeID}
                    agenciaID={agenciaID}
                    color="white"
                    pageSize={9}
                    rowPerPage={9}
                    funcionariosData={(id, code, primeironome, ultimonome, telefone, agencia, agenciaID, email, endereco, imageName) => {
                        values.codigo = code;
                        setPrimeiroNome(primeironome);
                        setApelido(ultimonome);
                        setTelefone(telefone);
                        setEmail(email);
                        setTelefone(telefone);
                        // setEndereco(endereco);
                        setAgencia(agencia)
                        values.agenciaID = agenciaID;
                        values.rating = 0;
                        values.funcionarioID = id;

                        // setImageChangeFromOutSideURL("https://s3.amazonaws.com/liralink.sigra/" + imageName);
                        sendImageFromImageUpload(imageName);

                        setOpenPopup(false);
                    }
                    }
                />
            </Popup>


        </>
    )
}

export default NovaDenuncia;
