import './App.css';
import Topbar from "./components/admin/topbar/Topbar";
import Sidebar from "./components/admin/sidebar/Sidebar"
import Home from './adminPages/home/Home';
import SedeEmpresa from './adminPages/sede/Sede';
import SedeEdit from './adminPages/sede/SedeEdit';
import SedeList from './adminPages/sede/SedeList';
import Agencia from './adminPages/agencias/agencia';
import AgenciaEdit from './adminPages/agencias/AgenciaEdit';

import NovoFuncionario from './adminPages/funcionario/NovoFuncionario';
import { BrowserRouter as Router, Routes, Route, Navigate }  from "react-router-dom";
import NovoDepartamento from "./adminPages/departamento/NovoDepartamento";
import NovaFuncao from "./adminPages/funcao/NovaFuncao";
import ListagemFuncao from "./adminPages/funcao/ListagemFuncao";
import { UserLoggedContext } from './adminPages/utilisador/UserLoggedContext';
import NewUser from "./adminPages/utilisador/NewUser";
import UserList from "./adminPages/listarUsuario/UserList";
import USerEdit from "./adminPages/utilisador/USerEdit";
import ListagemAgencias from './adminPages/agencias/ListagemAgencias';
import ListagemDepartamento from "./adminPages/departamento/ListagemDepartamento";
import ListagemFuncionarios from './adminPages/funcionario/ListagemFuncionarios';
import NovaDenuncia from './adminPages/denuncias/NovaDenuncia';
import ListagemDenuncia from './adminPages/denuncias/ListagemDenuncia';
import TipoDeDenuncias from './adminPages/denuncias/TipoDeDenuncias';
import ListagemTipoDenuncia from './adminPages/denuncias/ListagemTipoDenuncia';
import AfetacaoSedeAgencia from "./adminPages/utilisador/AfetacaoSedeAgencia";
import EstisticaPorSede from "./adminPages/gestaoDenuncia/EstisticaPorSede"

import React, { useState } from 'react';
import Login from './adminPages/utilisador/Login';
import Popup from './components/reusableComponents/Popup';

import ListagemAvaliacoes from './adminPages/denuncias/ListagemAvaliacoes';
import ListagemSugestoes from './adminPages/denuncias/ListagemSugestoes';


const App = () => {
  const [userSavedValue, setUserSavedValue] = useState({});
  const [openPopup, setOpenPopup] = useState(true);
  const [popupTitle, setPpupTitle] = useState("");

  const TipoDenunciaComponent = () => (
    <>
      {
        openPopup ?
          < Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            buttonColor="secondary"
            title=""
            closeButtonDisplay={false}
            width="920px"
            height="650px"
            marginTop = "-10px"
          >
            <div style={{marginTop:"-25px"}}>
            <TipoDeDenuncias
              yearGetData={() => {
                setOpenPopup(true);
              }
              }
            />
            </div>
          </Popup> : null
      }
    </>
  )
  return (
    <Router>

          {/* <Routes >
              <Route exact path="/denuncias" element={<NovaDenuncia />} />
          </Routes> */}

    <div>
      <UserLoggedContext.Provider value={{ userSavedValue, setUserSavedValue }}>
        {!userSavedValue.length > 0 ?
          <Routes >
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

          </Routes>
          :
          <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes >
            <Route exact path="/Home" element={<Home />} />
             <Route path="/sede" element={<SedeEmpresa/>} />
             <Route path="/sedeList" element={<SedeList/>} />
            <Route path="/sedeEdit/:sedeId" element={<SedeEdit/>} />
            <Route path="/agencia" element={<Agencia/>} />
            {/* <Route path="/agenciaEdit/:id" element={<AgenciaEdit/>} /> */}
            <Route path="/agencia/:id" element={<Agencia/>} />
            <Route path="/funcionario" element={<NovoFuncionario/>} />
            <Route path="/funcionario/:id" element={<NovoFuncionario/>} />
            <Route path="/listagemFuncionario" element={<ListagemFuncionarios/>} />
            <Route path="/departamento" element={<NovoDepartamento/>} />
            <Route path="/departamento/:id" element={<NovoDepartamento/>} />
            <Route path="/listagemDepartamento" element={<ListagemDepartamento/>} />
            <Route path="/funcao" element={<NovaFuncao/>} />
            <Route path="/funcao/:id" element={<NovaFuncao/>} />
            <Route path="/listagemFuncao" element={<ListagemFuncao/>} />
            <Route path="/newUser" element={<NewUser />} />   
            <Route path="/userList" element={<UserList />} />
            <Route path="/userEdit/:userID" element={<USerEdit />} />
            <Route path="/denuncia" element={<NovaDenuncia />} />
            <Route path="/listagemDenuncia" element={<ListagemDenuncia />} />

            <Route path="/listagemAvaliacoes" element={<ListagemAvaliacoes />} />
            <Route path="/ListagemSugestoes" element={<ListagemSugestoes />} />

            <Route path="/listagemTipoDenuncia" element={<ListagemTipoDenuncia />} />
           
            {/* <Route path="/tipoDenunciaConfig" element={<TipoDeDenuncias />} /> */}
            {/* <Route exact path="/tipoDenuncia/*" element={<TipoDenunciaComponent />} /> */}
            <Route exact path="/tipoDenuncia" element={<TipoDeDenuncias />} />

            <Route path="/listaAgencias" element={<ListagemAgencias />} />
            <Route path="/afetacaoSedeAgencia/:id" element={<AfetacaoSedeAgencia />} />   

            <Route path="/gestaoDenuncias" element={<EstisticaPorSede />} />

            
          </Routes >
          </div>
          </div>
        }
          </UserLoggedContext.Provider>

        </div>
      </Router>
  );
}

export default App;
