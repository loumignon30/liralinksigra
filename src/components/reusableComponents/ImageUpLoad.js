import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import axios from "axios";
import http from '../../http-common';
import urlImage from '../../http-common-images';
import { Publish } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import semmagem from "../../assets/images/sem-imagem.jpg"
import { v4 as uuidv4 } from 'uuid';


const ImageUpLoad = forwardRef((props, ref) => {

    const { iconMarginLeft, iconMarginTop, icon, backGroundColor, color,
        fotoTitulo, margnLeft, uploadDisplay } = props;

    const useStyles = makeStyles({
        imageIcon: {
            marginLeft: props.iconMarginLeft || "220px",
            marginTop: props.iconMarginTop || "-10px",
        },
        labelStyle: {
            marginLeft: props.margnLeft || "0px",
            fontWeight: "bold",
        },
        file: {
            display: "none"
        }
    });

    const [url, setUrl] = useState(urlImage());  // backend URL
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileDisplay, setFileDisplay] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);
    const [fileNameRandom, setfileNameRandom] = useState("");

    const { imageChangeFromOutSideURL } = props;
    const classes = useStyles();

    let codigo = "";
    let campoImageNaBaseDeDados = "";


    const saveImage = () => {

        if (imageSelected)  // save the image only if an image is selected
        {
           
            const formData = new FormData();
            formData.append('photo', file);

            if(campoImageNaBaseDeDados === "code"){
                formData.append('code', codigo);
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            //const url = 'http://localhost:5001/api';

            axios.post(url, formData).then((response) => {
                // alert('Image Uploaded Successfully!!');
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useImperativeHandle(ref, () => ({
        saveImage: saveImage, // it's calling the method : saveImage()
        fileName: fileName,
        imageReset: imageReset,
        imageChangeFromOutSide: imageChangeFromOutSide,
        imageSelected: imageSelected,
        getFuncionarioCode: getFuncionarioCode

    }));

    useEffect(() => {

        setFileDisplay(semmagem);

    }, []);

    const imageReset = () => {
        setFileDisplay(semmagem);
    }

    const imageChangeFromOutSide = (imageChangeFromOutSideURL) => {
        setFileDisplay(imageChangeFromOutSideURL);
    }

    const getFuncionarioCode = (code, campoImageNaBaseDeDados1) => {
        codigo = code;
        campoImageNaBaseDeDados = campoImageNaBaseDeDados1;

    }

    const onImageInputChange = (e) => {

        let uuidvRandom = "";

        setFile(e.target.files[0]);
        setFileDisplay(URL.createObjectURL(e.target.files[0]));
        setImageSelected(true);
        setFileName(e.target.files[0].name);

       // uuidvRandom = uuidv4();
        //setfileNameRandom(uuidvRandom)
        //setFileName(uuidvRandom);
       

       // console.log(fileName);

    }

    return (
        <div className="App">
            {
                uploadDisplay ?
                    <label htmlFor="file" >
                        <Publish className={classes.imageIcon} />
                    </label>
                    : null
            }

            <input type="file" id="file" name="file" onChange={onImageInputChange}
                className={classes.file}
            />

            <div style={{ marginTop: "5px" }}>
                <label className={classes.labelStyle}>{fotoTitulo}</label>
                <img className="ImageContainer"
                    src={fileDisplay}
                    alt=""
                />

            </div>

        </div>
    )
})
export default ImageUpLoad;
