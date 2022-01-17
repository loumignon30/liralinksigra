import "./funcionario.css";
import '../../App.css';
import Notifications from '../../components/reusableComponents/Notifications';
import { House, Search } from '@mui/icons-material';
import React, { useState, useEffect, useRef, useContext } from "react";
import PageHeader from "../../components/reusableComponents/PageHeader";
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import AgenciaSearchTable from "../agencias/AgenciaSeachTable";
import SedeSearchTable from "../sede/SedeSearchTable";
import Popup from "../../components/reusableComponents/Popup";
import AgenciaService from "../../services/admin/Agencia.service";
import ImageUpLoad from "../../components/reusableComponents/ImageUpLoad";
import FuncionarioService from "../../services/admin/Funcionario.services";
import FuncionarioSearchTable from "../funcionario/FuncionarioSearchTable";
import DepartamentoSearchTable from "../departamento/DepartamentoSearchTable";
import FuncaoSearchTable from "../funcao/FuncaoSearchTable";
import { UserLoggedContext } from "../utilisador/UserLoggedContext";
import { useLocation } from "react-router-dom";


const initialFValues = {
    id: 0,
    code: '',
    qr: '',
    primeironome: '',
    ultimonome: '',
    email: '',
    telefone: '',
    funcao: '',
    departmento: '',
    dataamissao: null,
    status: 'Active',
    imageName: '',
    observacao: '',
    sedeID: 0,
    agenciaID: 0,
    departamentoID: 0,
    funcaoID: 0
}

const NovoFuncionario = () => {

    // notification with SnackBar
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' });
    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRef2 = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const childRefSideBar = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");
    const { values, setValues, handleInputChange } = useForm(initialFValues)  // useForm = useForm.js
    const [slideImgCategory, setSlideImgCategory] = useState();
    const [sede, setSede] = useState("");
    const [agencia, setAgencia] = useState("");
    const [count, setCount] = useState();
    const [notificatinoShow, setNotificationShow] = useState(false);
    const [departamento, setDepartamento] = useState("");
    const [funcao, setFuncao] = useState("");
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);

    const [agenciaID, setAgenciaID] = useState();
    const [sedeID, setSedeID] = useState(0);

    const location = useLocation();

    const [backGroundColor, setBackGroundColor] = useState("");
    const [color, setColor] = useState("");
    const [headerTitle, setHeaderTitle] = useState("");
    const [headerSubTitle, setHeaderSubTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState();
    const [textReset, setTextReset] = useState();
    const [imageChangeFromOutSideURL, setImageChangeFromOutSideURL] = useState();


    const saveImageFromImageUpload = () => {
        setImageFileName(childRef.current.fileName);
        values.imageName = (childRef.current.fileName);
        childRef.current.saveImage();  // saveImage() = method called
    }

    const updateValuesOnOpen = () => {
        userSavedValue.map(item => (
            values.sedeID = item.sedeID,
            setSede(item.nomeSede)
        ));
    }

    const imageReset = () => {
        childRef.current.imageReset();
    }

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
        setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");

        updateValuesOnOpen();
        getStateValuesFromSearchTable();
    }, []);


    const getStateValuesFromSearchTable = () => {

        if ((location.state) !== null) {

            setBackGroundColor("darkBlue");
            setColor("white");
            setHeaderTitle("Modificar Funcionário");
            setHeaderSubTitle("Modificar os dados do Funcionário");
            setButtonTitle("Modificar");
            setTextReset("Novos dados");

            setValues(location.state);
            setSede(location.state.sede);
            setAgencia(location.state.agencia)
            setSedeID(location.state.sedeID)
            setAgenciaID(location.state.agenciaID)

            setFuncao(location.state.funcao);
            setDepartamento(location.state.departamento)

            setImageChangeFromOutSideURL(location.state.imageChangeFromOutSideURL);
            sendImageFromImageUpload(location.state.imageChangeFromOutSideURL);


        } else {
            setBackGroundColor("darkGreen");
            setColor("white");
            setHeaderTitle("Cadastrar Novo Funcionário");
            setHeaderSubTitle("Guardar os dados do Funcionário");
            setButtonTitle("Guardar");
            setTextReset("Limpar");
        }
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSlideImgCategory(URL.createObjectURL(event.target.files[0]));
        }
    }

    const sendImageFromImageUpload = (image) => {
        childRef.current.imageChangeFromOutSide(image);  // saveImage() = method called
    }

    const ResetForm = () => {
        setDepartamento("");
        setFuncao("")
        imageReset();
        setValues(initialFValues);
        setSlideImgCategory("https://thumbs.dreamstime.com/z/no-image-available-icon-photo-camera-flat-vector-illustration-132483296.jpg");
        //setNotificationShow(false);

        setBackGroundColor("darkGreen");
        setColor("white");
        setHeaderTitle("Cadastrar Novo Funcionário");
        setHeaderSubTitle("Guardar os dados do Funcionário");
        setButtonTitle("Guardar");
        setTextReset("Limpar");

        values.sedeID = sedeID;
        values.agenciaID = agenciaID;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveFuncionario(); // call save university
        ResetForm();
        // if (validate()) {

        // }
    }

    const tableFuncionarioUpdateData = () => {
        childRef2.current.getGetAllData(values.sedeID);  // saveImage() = method called
    }

    const onclickSedePopup = () => {
        setCount(1);
        setPpupTitle("Listagem de Sedes");
        setOpenPopup(true);
    }
    const onclickAgenciaPopup = () => {
        setCount(2);
        setPpupTitle("Listagem de Agências");
        setOpenPopup(true);
    }
    const onclickDepartamentoPopup = () => {
        setCount(3);
        setPpupTitle("Listagem de Departamentos");
        setOpenPopup(true);
    }
    const onclickFuncaoPopup = () => {
        setCount(4);
        setPpupTitle("Listagem de Funções da Empresa");
        setOpenPopup(true);
    }

    const saveFuncionario = () => {
        if (childRef.current.imageSelected) {  // save image only if selected
            saveImageFromImageUpload();
        }
        if (values.id > 0) {
            FuncionarioService.update(values.id, values).then(response => {
                setNotificationShow(true);
                tableFuncionarioUpdateData();
                setNotify({
                    isOpen: true,
                    message: 'Dados do Funcionario Modificados com Sucesso!',
                    type: 'success'
                })
            })
                .catch(e => {
                    console.log(e)
                });
        } else {
            FuncionarioService.create(values).then(response => {
                setNotificationShow(true);
                tableFuncionarioUpdateData();
                setNotify({
                    isOpen: true,
                    message: 'Novo Funcionario guarda com Sucesso!',
                    type: 'success'
                })
            })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    return (

        <div className="facultyContainer">
            <PageHeader
                title={headerTitle}
                subTitle={headerSubTitle}
                backGroundColor={backGroundColor}
                color={color}>
            </PageHeader>

            <Form onSubmit={handleSubmit} autoComplete="off">

                <div className="facultyItemContainer">

                    <div className="newFaculty">
                        <div>
                            <label className="inputLabel">Sede</label>
                            <Controls.Input
                                name="sede"
                                placeHolder="Sede da Empresa"
                                value={sede}
                                onChange={handleInputChange}
                                type="text"
                                disabled="true"
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickSedePopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Agencia</label>
                            <Controls.Input
                                name="agencia"
                                placeHolder="Agencia da Empresa"
                                value={agencia}
                                onChange={handleInputChange}
                                type="text"
                                disabled="true"
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickAgenciaPopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Code</label>
                            <Controls.Input
                                name="code"
                                placeHolder="Code"
                                value={values.code}
                                onChange={handleInputChange}
                                type="text"
                            //className={'textField-TextLarge'}
                            />
                        </div>

                        <div >
                            <label className="inputLabel">Nome</label>
                            <Controls.Input
                                name="primeironome"
                                placeHolder="Primeiro nome"
                                value={values.primeironome}
                                onChange={handleInputChange}
                                type="text"
                                width="145px"

                            />

                            <Controls.Input
                                name="ultimonome"
                                placeHolder="Apelido "
                                value={values.ultimonome}
                                onChange={handleInputChange}
                                type="text"
                                width="145px"
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Email</label>
                            <Controls.Input
                                name="email"
                                placeHolder="Email da Egencia"
                                value={values.email}
                                onChange={handleInputChange}
                                type="text"
                            //className={'textField-TextLarge'}
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Telefone</label>
                            <Controls.Input
                                name="telefone"
                                placeHolder="Número de Telefone"
                                value={values.telefone}
                                onChange={handleInputChange}
                                type="text"
                            />
                        </div>

                        <div>
                            <label className="inputLabel">Departamento</label>
                            <Controls.Input
                                name="departamento"
                                placeHolder="Departamento do Funcionario"
                                value={departamento}
                                onChange={handleInputChange}
                                type="text"
                            //className={'textField-TextLarge'}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickDepartamentoPopup}
                            />
                        </div>
                        <div>
                            <label className="inputLabel">Função</label>
                            <Controls.Input
                                name="funcao"
                                placeHolder="Função do Funcionario"
                                value={funcao}
                                onChange={handleInputChange}
                                type="text"
                            //className={'textField-TextLarge'}
                            />
                            <Search style={{ marginTop: "10px", cursor: "pointer" }}
                                onClick={onclickFuncaoPopup}
                            />
                        </div>

                    </div>
                    <div className="newFaculty">

                    </div>

                </div>

                <div className="facultyItemContainer">

                    <div className="newFaculty">

                        <div className="newUniversity">
                            <ImageUpLoad ref={childRef}
                                fotoTitulo="Fotografia" />
                        </div>

                    </div>



                    <div className="newFaculty">
                        <Controls.Buttons
                            type="submit"
                            text="Gravar"
                            className="button"
                        />
                        <Controls.Buttons
                            type="button"
                            text="Limpar"
                            color="secondary"
                            className="button"
                            onClick={ResetForm}
                        />
                    </div>

                </div>

            </Form>

            <div className="faculty-datagrid-style">
                <div style={{ height: '230px', width: '100%', marginTop: "0px" }}>

                    <FuncionarioSearchTable ref={childRef2}
                        idDisplay={false}
                        codeDisplay={true}
                        facultyDisplay={true}
                        emailDisplay={false}
                        deanDisplay={false}
                        statusDiplay={false}
                        actionsButtonDisplaySelect={false}
                        actionsButtonDisplayEditDelete={false}
                        backGroundColor={backGroundColor}
                        color={color}
                        pageSize={5}
                        rowPerPage={5}

                    />
                </div>
            </div>
            {notificatinoShow ?
                <Notifications
                    notify={notify}
                    setNotify={setNotify}
                /> : null
            }

            {
                count === 1 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="550px"
                        height="500px"
                    >

                        <SedeSearchTable
                            idDisplay="true"
                            codeDisplay={false}
                            actionsButtonSelectDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={5}
                            rowPerPage={5}
                            backGroundColor={backGroundColor}
                            color={color}
                            sedeData={(id, code, sede) => {
                                setSede(sede);
                                values.sedeID = id
                                setOpenPopup(false);
                                tableFuncionarioUpdateData(id);
                            }
                            }
                        />
                    </Popup> : ""
            }

            {
                count === 2 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="540px"
                        height="500px"
                    >

                        <AgenciaSearchTable
                            idDisplay="true"
                            codeDisplay="false"
                            statusDiplay="false"
                            actionsButtonDisplaySelect={true}
                            actionsButtonDisplayEditDelete={false}
                            backGroundColor={backGroundColor}
                            color={color}
                            pageSize={5}
                            rowPerPage={5}
                            agenciaData={(id, code, agencia) => {
                                values.agenciaID = id;
                                setAgencia(agencia);
                                setOpenPopup(false);
                            }}
                        />
                    </Popup> : ""
            }

            {
                count === 3 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="540px"
                        height="500px"
                    >

                        <DepartamentoSearchTable
                            idDisplay="true"
                            codeDisplay="false"
                            actionsButtonDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={3}
                            rowPerPage={3}
                            backGroundColor={backGroundColor}
                            departamentoData={(id, code, departamento) => {
                                setDepartamento(departamento);
                                values.departamentoID = id;
                                setOpenPopup(false);

                            }
                            }
                        />
                    </Popup> : ""
            }

            {
                count === 4 ?
                    <Popup
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        //pageHeader={PopupHeaderUniversity()}
                        buttonColor="secondary"
                        title={popupTitle}
                        width="540px"
                        height="500px"
                    >

                        <FuncaoSearchTable
                            idDisplay="true"
                            codeDisplay="false"
                            actionsButtonDisplay={true}
                            actionsButtonDisplayEditDelete={false}
                            pageSize={3}
                            rowPerPage={3}
                            backGroundColor="darkGreen"
                            funcaoData={(id, code, funcao) => {
                                setFuncao(funcao);
                                values.funcaoID = id;
                                setOpenPopup(false);

                            }
                            }
                        />
                    </Popup> : ""
            }


        </div>
    )
}
export default NovoFuncionario;
