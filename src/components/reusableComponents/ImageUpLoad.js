import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import axios from "axios";
import http from '../../http-common';
import urlImage from '../../http-common-images';
import { Publish } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import semmagem from "../../assets/images/sem-imagem.jpg"
import { v4 as uuidv4 } from 'uuid';
import { width } from '@mui/system';
import Swal from 'sweetalert2'


const ImageUpLoad = forwardRef((props, ref) => {

    const { iconMarginLeft, iconMarginTop, icon, backGroundColor, color,
        fotoTitulo, margnLeft, uploadDisplay } = props;

    const useStyles = makeStyles({
        imageIcon: {
            marginLeft: props.iconMarginLeft || "220px",
            marginTop: props.iconMarginTop || "-10px",
            background: "yellow",
            width: "30px",
            height: "30px"
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

    const { imageChangeFromOutSideURL, primeironome, apelido, agencia } = props;
    const classes = useStyles();

    let codigo = "";
    let campoImageNaBaseDeDados = "";


    const saveImage = () => {

        if (imageSelected)  // save the image only if an image is selected
        {
            const formData = new FormData();
            formData.append('photo', file);

            if (campoImageNaBaseDeDados === "code") {
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

    const funcionarioImageClick = () => {
        Swal.fire({
            title: primeironome + " " + apelido,
            text: agencia,
            imageUrl:fileDisplay,
            imageWidth: 300,
            imageHeight: 240,
            imageAlt: 'Custom image',
          })
    }

    return (
        <div className="App">
            {
                uploadDisplay ?
                    <div style={{ marginTop: "10px", marginLeft: "-20px" }}>
                        <label htmlFor="file" >
                            <Publish className={classes.imageIcon} />
                        </label>
                    </div>
                    : null
            }

            <input type="file" id="file" name="file" onChange={onImageInputChange}
                className={classes.file}
            />

            <div style={{ marginTop: "5px", marginLeft:"0px", cursor:"pointer"}}>
                <label className={classes.labelStyle}>{fotoTitulo}</label>
                <img className="ImageContainer"
                    src={fileDisplay}
                    alt=""
                    onClick={funcionarioImageClick}
                />

            </div>

        </div>
    )
})
export default ImageUpLoad;
