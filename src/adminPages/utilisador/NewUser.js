import React, { useState, useEffect, useRef } from 'react'
import './newUser.css'
import '../../App.css'
import ArticleIcon from '@mui/icons-material/Article';
import Controls from '../../components/reusableComponents/Controls';
import { useForm, Form } from '../../components/reusableComponents/useForm';
import Notifications from '../../components/reusableComponents/Notifications';
import * as userRole from "../../services/admin/RoleData";
import PageHeader from '../../components/reusableComponents/PageHeader';
import ImageUpLoad from '../../components/reusableComponents/ImageUpLoad';
import UserService from '../../services/admin/User.service';

const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    dateofbirth: '',
    gender: 'male',
    role: '',
    password: '',
    photofilename: '',
    status: 'Active',
    country: ''
}

export default function NewUSerForm() {

    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [imageSRC, setImageSRC] = useState();
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js
    const [imageFileName, setImageFileName] = useState("");

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageSRC(URL.createObjectURL(event.target.files[0]));
        }
    }

    // function for validating form
    const validate = (fieldValues = values) => {
        let validationErrorM = {}
        if ('firstName' in fieldValues)
            validationErrorM.firstname = fieldValues.firstname ? "" : " "  // This field is Required
        if ('lastName' in fieldValues)
            validationErrorM.lastname = fieldValues.lastname ? "" : " "   // This field is Required
        if ('email' in fieldValues)
            validationErrorM.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : ""
        if ('telephone' in fieldValues)
            validationErrorM.telephone = fieldValues.telephone.length > 8 ? "" : "Minimum 9 caracters"

        setErrors({
            ...validationErrorM
        })

        return Object.values(validationErrorM).every(x => x === "")  // it will return true if x==""
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange } = useForm(initialFValues, true, validate);  // useForm = useForm.js. We defined - validateOnChange=false

    useEffect(() => {
        setImageSRC("https://media-exp1.licdn.com/dms/image/C4E03AQFsD7qKHQJzYA/profile-displayphoto-shrink_800_800/0/1624105018084?e=1642032000&v=beta&t=HTny2PpWRl0YOFcXgDMAx2rXIE7XU2lbDjzFm4T2g5o");
    }, []);

    const genderItems = [
        { id: 'male', title: 'Male' },
        { id: 'female', title: 'Female' },
        { id: 'other', title: 'Other' },
    ];

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
            saveUniversity(); // save new user
            ResetForm();
        }
    }

    const ResetForm = () => {
        setValues(initialFValues);
        imageReset();
        setErrors({})

        setNotify({
            isOpen: false,
            message: '',
            type: ''
        })
    }

    const saveUniversity = () => {
        saveImageFromImageUpload();
        UserService.create(values).then(response => {
            setNotify({
                isOpen: true,
                message: 'New User was Submitted succefully',
                type: 'success'
            });

        })
            .catch(e => {
                console.log(e)
            });
    }

    return (
        <>
            <div className="newUserMainContainer">

                <PageHeader
                    title="New User"
                    subTitle="Save new User here"
                    backGroundColor="#50394c"
                    color="white"
                    icon={<ArticleIcon />}>
                </PageHeader>


                <Form onSubmit={handleSubmit}>

                    <div className="newUserContainer">

                        <div className="newUser">
                            <div>
                                <label className="userLabel">Primeiro Nome</label>
                                <Controls.Input
                                    name="firstname"
                                    placeHolder="First Name"
                                    value={values.firstname}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className='textField-TextLarge'
                                    type="text"
                                    error={errors.firstname}
                                />
                                {/* <span style={{marginTop:'5px', marginLeft:'2px', color:'red'}}>{errors.firstName}</span> */}
                            </div>
                            <div>
                                <label className="userLabel">Apelido</label>
                                <Controls.Input
                                    name="lastname"
                                    placeHolder="Last Name"
                                    value={values.lastname}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                    error={errors.lastname}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Email</label>
                                <Controls.Input
                                    name="email"
                                    placeHolder="Email Addresse"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                    error={errors.email}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Telefone</label>
                                <Controls.Input
                                    name="telephone"
                                    placeHolder="Telephone"
                                    value={values.telephone}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                    error={errors.telephone}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Endereço</label>
                                <Controls.Input
                                    name="address"
                                    placeHolder="Addresse"
                                    value={values.address}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                />
                            </div>

                            <div>
                                <label className="userLabel">Cidade</label>
                                <Controls.Input
                                    name="city"
                                    placeHolder="City"
                                    value={values.city}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="userLabel">País</label>
                                <Controls.Input
                                    name="country"
                                    placeHolder="Country"
                                    value={values.country}
                                    onChange={handleInputChange}
                                    // className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="text"
                                />
                            </div>

                        </div>

                        <div className="newUser2">
                            <div>
                                <label className="userLabel">Data Nascimento</label>
                                <Controls.Input
                                    name="dateofbirth"
                                    placeHolder="Date of Birth"
                                    value={values.dateofbirth}
                                    /// className= {'inputTextLarge'}
                                    onChange={handleInputChange}
                                    className={'textField-TextLarge'}
                                    type="date"
                                />
                            </div>

                            <div >
                                <label className="userLabel">Genero</label>
                                <Controls.RadioGroup
                                    name="gender"
                                    label="Gender"
                                    value={values.gender}
                                    items={genderItems}
                                    onChange={handleInputChange}
                                    className={"radio-button"}
                                >
                                </Controls.RadioGroup>
                            </div>

                            <div style={{ paddingTop: "5px", }}>
                                <label className="userLabel" htmlFor="role">Nível Acesso</label>
                                <Controls.Select
                                    name="role"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleInputChange}
                                    options={userRole.getRole()}
                                    className={"select-buttonLarge"}
                                />
                            </div>

                            <div>
                                <label className="userLabel">Senha</label>
                                <Controls.Input
                                    name="password"
                                    placeHolder="Password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                    with="300px"
                                    type="password"

                                />
                            </div>

                            <div>
                                <label className="userLabel">Confirmar</label>
                                <Controls.Input
                                    name="password"
                                    placeHolder="Confirm Password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                    //className= {'inputTextLarge'}
                                    className={'textField-TextLarge'}
                                    type="password"
                                />
                            </div>
                            <div>
                                <div style={{ marginTop: "10px" }}>
                                    <ImageUpLoad
                                        ref={childRef}
                                        fotoTitulo="Photo"
                                        margnLeft="0px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="newUserContainer">

                        <div className="buttonContainer1">
                            <div >
                                <Controls.Buttons
                                    type="submit"
                                    text="Submit"
                                />
                                <Controls.Buttons
                                    type="button"
                                    text="Reset"
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
