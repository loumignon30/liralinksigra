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
        setImageSRC("https://media-exp1.licdn.com/dms/image/C4E03AQFsD7qKHQJzYA/profile-displayphoto-shrink_800_800/0/1624105018084?e=1642032000&v=beta&t=HTny2PpWRl0YOFcXgDMAx2rXIE7XU2lbDjzFm4T2g5o");

        updateValuesOnOpen();
        setUrl(urlImage());

    }, []);

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
        setPpupTitle("Listagem de Sedes Cadastradas");
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        setCount(2);
        setPpupTitle("Listagem de Agências");
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
                message: 'A denuncia foi guardada com Sucesso!!!',
                type: 'success'
            });

        })
            .catch(e => {
                console.log(e)
            });
    }
    const onclickSedePopup = () => {
        setCount(1);
        setPpupTitle("Listagem de Sedes");
        setOpenPopup(true);
    }

    const pesquisaCodigoFuncionario = () => {

        FuncionarioService.getID(values.codigo).then(response => {
            if (response.data.length === 0) {
                alert("O número " + values.code + " não existe na base de dados");

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
                setImageChangeFromOutSideURL(url + "/images/" + info.imageName);
                sendImageFromImageUpload(url + "/images/" + info.imageName);

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
                    title="CADASTRAR DENÚNCIA"
                    subTitle="Cadastrar nova Denúncia"
                    backGroundColor="#50394c"
                    color="white"
                    icon={<ArticleIcon />}>
                </PageHeader>

                <Form>

                    <div className="newUserContainer">

                        <div className="newUser">

                            <div>
                                <label className="userLabel"># Funcionario</label>
                                <Controls.Input
                                    name="codigo"
                                    placeHolder="Digite o Numero do Funcionário"
                                    value={values.codigo}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
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
                                <label className="userLabel">Nome</label>
                                <Controls.Input
                                    name="primeiroNome"
                                    placeHolder="Primeiro Nome"
                                    value={primeiroNome}
                                    type="text"
                                    width="144px"
                                    error={errors.primeiroNome}

                                />

                                <Controls.Input
                                    name="apelido"
                                    placeHolder="Apelido"
                                    value={apelido}
                                    type="text"
                                    width="144px"
                                    error={errors.apelido}
                                />
                            </div>
                            <div>
                                <label className="inputLabel">Sede</label>
                                <Controls.Input
                                    name="sede"
                                    placeHolder="Sede da Empresa"
                                    value={sede}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="144px"
                                    disabled="true"
                                />
                                <Controls.Input
                                    name="agencia"
                                    placeHolder="Agencia da Empresa"
                                    value={agencia}
                                    onChange={handleInputChange}
                                    type="text"
                                    width="144px"
                                    disabled="true"
                                />

                            </div>

                            <div>
                                <label className="userLabel">Email</label>
                                <Controls.Input
                                    name="email"
                                    placeHolder="Email"
                                    value={email}
                                    width="290px" type="text"
                                    error={errors.telephone}
                                />
                            </div>
                            <div>
                                <label className="userLabel">Telefone</label>
                                <Controls.Input
                                    name="telefone"
                                    placeHolder="Nº de Telefone da Agência"
                                    value={telefone}
                                    width="290px" type="text"
                                    error={errors.telephone}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Endereço</label>
                                <Controls.Input
                                    name="endereco"
                                    placeHolder="Endereço da Agência"
                                    value={endereco}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
                                />
                            </div>

                            <div>
                                <label className="userLabel">Cidade</label>
                                <Controls.Input
                                    name="cidade"
                                    placeHolder="Cidade"
                                    value={cidade}
                                    onChange={handleInputChange}
                                    width="144px" type="text"
                                />

                                <Controls.Input
                                    name="pais"
                                    placeHolder="País"
                                    value={pais}
                                    onChange={handleInputChange}
                                    width="144px"
                                    type="text"
                                />
                            </div>

                            <div style={{ marginTop: "10px" }}>
                                <ImageUpLoad
                                    ref={childRef}
                                    fotoTitulo="Photo"
                                    margnLeft="0px"
                                    uploadDisplay={false}
                                />
                            </div>
                        </div>

                        <div className="newUser2">
                            <div>
                                <label className="userLabel">Denúciante</label>
                                <Controls.Input
                                    name="nome"
                                    placeHolder="Nome do denunciante"
                                    value={values.nome}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
                                    error={errors.nome}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Tipo Denúncia</label>
                                <Controls.Input
                                    name="tipodenuncia"
                                    placeHolder="Tipo de Denuncia"
                                    value={values.tipodenuncia}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
                                    error={errors.tipodenuncia}
                                />
                                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                    onClick={onclickSedePopup}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Telefone</label>
                                <Controls.Input
                                    name="telepfoneDenunciante"
                                    placeHolder="Telefone"
                                    value={values.telepfoneDenunciante}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
                                />
                            </div>
                            <div>
                                <label className="userLabel">Email</label>
                                <Controls.Input
                                    name="emailDenunciante"
                                    placeHolder="Email"
                                    value={values.emailDenunciante}
                                    onChange={handleInputChange}
                                    width="290px" type="text"
                                    error={errors.emailDenunciante}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Queixa</label>
                                <Controls.Input
                                    name="queixa"
                                    placeHolder="Escrever a Denuncia .."
                                    value={values.queixa}
                                    onChange={handleInputChange}
                                    type="text"
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
                                    text="Gravar"
                                    onClick={handleSubmit}
                                />
                                <Controls.Buttons
                                    type="button"
                                    text="Limpar"
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
