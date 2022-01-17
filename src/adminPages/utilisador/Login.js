import './login.css'
import React, { useContext, useEffect, useState } from 'react'
import Controls from '../../components/reusableComponents/Controls';
import { Form, useForm } from '../../components/reusableComponents/useForm';
import UserLoginService from '../../services/admin/UserLogin.services';
import { UserLoggedContext } from './UserLoggedContext';
import { Link, useNavigate } from "react-router-dom";
import PageHeader from '../../components/reusableComponents/PageHeader';
import { House, InfoRounded } from '@mui/icons-material';
import SedeService from "../../services/admin/Sede.services";
import { Grid } from '@mui/material';


const initialValues = {
    email: '',
    password: ''
}
const Login = () => {
    const { values, setValues, handleInputChange } = useForm(initialValues)  // useForm = useForm.js
    const [userData, setUserData] = useState({});
    const { userSavedValue, setUserSavedValue } = useContext(UserLoggedContext);
    const [exampleState, setExampleState] = useState();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [sedeID, setSedeID] = useState(0);
    const [codeSede, setCodeSede] = useState("");
    const [nomeSede, setNomeSede] = useState("");
    const [emailSede, setEmailSede] = useState("");
    const [sedeContacto, setSedeContacto] = useState("");
    const [sedeEndereco, setSedeEndereco] = useState("");
    const [sedeCidade, setSedeCidade] = useState("");
    const [sedePais, setSedePais] = useState("");
    const [sedeImageFile, setSedeImageFile] = useState("");

    const [message, setMessage] = useState("");

    const getGetAllData = () => {
        SedeService.getAll()
            .then(response => {
                response.data.map(info => {
                    setSedeID(info.id)
                    setCodeSede(info.code)
                    setNomeSede(info.sede)
                    setEmailSede(info.email)
                    setSedeContacto(info.contacto)
                    setSedeEndereco(info.endereco)
                    setSedeCidade(info.cidade)
                    setSedePais(info.pais)
                    setSedeImageFile(info.imageName)
                    
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    let testData = 0;

    useEffect(() => {
        getGetAllData();
    }, []);

    const userGetEmail = async () => {
        UserLoginService.getUserEmail(values.email, values.password)
            .then(response1 => {
                testData = (response1.data.length)
                // test data *************************************************
                if (testData > 0) {
                    UserLoginService.getUserEmail(values.email, values.password)
                        .then(response => {
                            response.data.map(info => {
                                setUserSavedValue([
                                    {
                                        "id": info.id,
                                        "firstname": info.firstname,
                                        "lastname": info.lastname,
                                        "photofilename": info.photofilename,
                                        "sedeID": sedeID,
                                        "codeSede": codeSede,
                                        "nomeSede": nomeSede,
                                        "emailSede": emailSede,
                                        "sedeContacto": sedeContacto,
                                        "sedeEndereco": sedeEndereco,
                                        "sedeCidade": sedeCidade,
                                        "sedePais": sedePais,
                                        "sedeImageFile": sedeImageFile
                                    }
                                ])
                            })
                            navigate('/Home');
                        })
                        .catch(e => {
                            console.log(e);
                        });

                } else {
                    setUserSavedValue(false);
                    setMessage("User Name or Password Incorrect!!!")
                }
                // end test data *********************************************
            });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        userGetEmail(); // 
        //ResetForm();
        //tableUpdateData();
        // if (validate()) {
    }
    const resetForm = () => {

    }
    return (

       

        <div className='bodyLogin'>

            <div>
                <img src='https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg'
                    alt=""
                    className='loginImage'
                />
            </div>
           
                <Form onSubmit={handleSubmit}>
                
                <div className="center">

                    <div>
                        <label className="inputLabel">Email</label>
                        <Controls.Input
                            name="email"
                            placeHolder="Email address"
                            value={values.email}
                            onChange={handleInputChange}
                            type="text"
                            width="350px"
                            height="35px"
                        />
                    </div>

                    <div>
                        <label className="inputLabel">Password</label>
                        <Controls.Input
                            name="password"
                            placeHolder="Password"
                            value={values.code}
                            onChange={handleInputChange}
                            type="password"
                            width="350px"
                            height="35px"
                        />
                    </div>

                    <div><span style={{ color: "red", marginLeft: "100px" }}>{message}</span></div>

                    <div style={{ marginLeft: "85px" }}>
                        <Controls.Buttons
                            type="submit"
                            text="Login"
                            className="button"
                            onClick={handleSubmit}
                        />
                    </div>
                    </div>
                </Form>
        </div>
    )
}

export default Login;