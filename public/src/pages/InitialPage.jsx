import { focusedStyle, acceptStyle, rejectStyle, FormContainer, baseStyle } from "./style";
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone'
import Logo from "../assets/Logotipo_do_Supremo_Tribunal_Federal.svg";
import axios from "axios"
import { scrappingRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pages() {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                : ['.xlsx']
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                console.log('test')
            }
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = await axios.get(scrappingRoute);
        console.log(data)
        if (data.status) {
            console.log('entrei papi')
            toast.success('Seu Excel foi baixado', toastOptions)
        } else {
            toast.error('Erro ao baixar seu Excel, favor contatar TI', toastOptions)
        }
    }


    return (
        <div>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <button>Baixar Último Excel</button>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p>Arraste algum arquivo aqui, ou clique para selecionar arquivo</p>
                    </div>
                </form>
            </FormContainer>
            <ToastContainer />
        </div >
    );
}

export default Pages;
