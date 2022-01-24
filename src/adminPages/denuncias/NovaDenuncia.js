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

import { useTranslation } from "react-i18next";

const initialFValues = {
    id: 0,
    codigo: '',
    nome: '',
    tipodenuncia: '',
    telepfoneDenunciante: '',
    emailDenunciante: '',
    queixa: '',
    status: 'Active',
    hora: '',
    data: null,
    funcionarioID: 0,
    sedeID: 0,
    agenciaID: 0
}

const NovaDenuncia = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageSRC, setImageSRC] = useState();
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");

    const [sede, setSede] = useState("");
    const [sedeID, setSedeID] = useState(0);
    const [agenciaID, setAgenciaID] = useState(0);
    const [agencia, setAgencia] = useState();

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");

    const [count, setCount] = useState();
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();
    const [url, setUrl] = useState("");  // backend image  URL

    const [primeiroNome, setPrimeiroNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");
    const [pais, setPais] = useState("");
    let fotoFuncionario = "";

    const { t } = useTranslation();


    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('primeiroNome')
            validationErrorM.primeiroNome = primeiroNome ? "" : " "  // This field is Required
        if ('apelido')
            validationErrorM.apelido = apelido ? "" : " "   // This field is Required

        if ('nome' in fieldValues)
            validationErrorM.nome = fieldValues.nome ? "" : " "

        if ('tipodenuncia' in fieldValues)
            validationErrorM.tipodenuncia = fieldValues.tipodenuncia ? "" : " "

        if ('queixa' in fieldValues)
            validationErrorM.queixa = fieldValues.queixa ? "" : " "

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
       // setImageSRC("https://media-exp1.licdn.com/dms/image/C4E03AQFsD7qKHQJzYA/profile-displayphoto-shrink_800_800/0/1624105018084?e=1642032000&v=beta&t=HTny2PpWRl0YOFcXgDMAx2rXIE7XU2lbDjzFm4T2g5o");

        updateValuesOnOpen();
        setUrl(urlImage());

    }, [t('header_title_denuncia_novo')]);

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => (
            values.sedeID = item.sedeID,
            setSede(item.nomeSede)
        ));
    }

    const sendImageFromImageUpload = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
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
        setSede("");
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

        setNotify({
            isOpen: false,
            message: '',
            type: ''
        })
    }

    const guardarDenuncias = () => {

        getTime(); // data e hora da denuncia

        DenunciaService.create(values).then(response => {
            setNotify({
                isOpen: true,
                message: t('mensagem_Gravar_Nova_Agencia'),
                type: 'success'
            });

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

                if(fotoFuncionario ===""){
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

            })

        })
            .catch(e => {
                console.log(e)
            });
    }

    const handleKeyPress = () => {
        pesquisaCodigoFuncionario();
    }

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

                            <div>
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
                                    onClick={handleKeyPress}
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

                            <div>
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
                            </div>

                            <div style={{ marginTop: "10px" }}>
                                <ImageUpLoad
                                    ref={childRef}
                                    fotoTitulo={t('foto')}
                                    margnLeft="0px"
                                    uploadDisplay={false}
                                />
                            </div>
                        </div>

                        <div className="newUser2">
                            <div>
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
                                <label className="userLabel">{t('tipo_denuncia')}</label>
                                <Controls.Input
                                    name="tipodenuncia"
                                    placeHolder={t('tipo_denuncia')}
                                    value={values.tipodenuncia}
                                    onChange={handleInputChange}
                                    width="65%" type="text"
                                    error={errors.tipodenuncia}
                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    onClick={onclickSedePopup}
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

                            <div>
                                <label className="userLabel">{t('queixa')}</label>
                                <Controls.Input
                                    name="queixa"
                                    placeHolder={t('queixaPlaceOrder')}
                                    value={values.queixa}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="65%"
                                    multiline
                                    rows={7}
                                    height="140px"
                                    error={errors.queixa}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="newUserContainer">

                        <div className="buttonContainer1">
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

                </Form>
            </div>

            <Notifications
                notify={notify}
                setNotify={setNotify}
            />

        </>
    )
}

export default NovaDenuncia;
