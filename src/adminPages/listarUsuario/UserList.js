import { useState, useEffect, useRef } from 'react';
import "./userList.css";
import '../../App.css'
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog"
import Notifications from '../../components/reusableComponents/Notifications';
import UserSearchTable from '../utilisador/UserSearchTable';
import { useTranslation } from "react-i18next";
import Controls from '../../components/reusableComponents/Controls';
import { Search } from '@mui/icons-material';
import SedeSearchTable from '../sede/SedeSearchTable';
import Popup from '../../components/reusableComponents/Popup';

const UserList = () => {

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: '' })
    const [sede, setSede] = useState("");
    const childRef = useRef(null);  // it's using a reference of a method from ImageUpLoad.js

    const [openPopup, setOpenPopup] = useState(false);
    const [popupTitle, setPpupTitle] = useState("");

    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // open the page on top
    }, []);

    const onclickAgenciaPopup = () => {
        setPpupTitle(t('lista_sede'));
        setOpenPopup(true);
    }

    const tableAgenciaUpdateData = (sedeID) => {
        childRef.current.userGetAll(sedeID);  // saveImage() = method called
    }

    return (
        <div className="utilisateurList">
            <h3 style={{ marginLeft: '15px' }}>{t('lista_usuarios')}</h3>

            <div style={{ marginBottom: "5px", padding: "6px" }}>
                <label className="inputLabel">{t('sede')}</label>
                <Controls.Input
                    name="sede"
                    placeHolder={t('sede')}
                    value={sede}
                    width="35%"
                    type="text"
                    disabled="true"
                />
                <Search style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={onclickAgenciaPopup}
                />
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <UserSearchTable ref={childRef}
                    idDisplay={true}
                    userNameDisplay={true}
                    emailDisplay={true}
                    roleDisplay={true}
                    statusDisplay={true}
                    actionsButtonDisplaySelect={false}
                    actionsButtonDisplayEditDelete={true}
                    backGroundColor="blue"
                    color="white"
                    pageSize={8}
                    rowPerPage={8}
                />
            </div>

            {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notifications
                notify={notify}
                setNotify={setNotify}
            /> */}

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                //pageHeader={PopupHeaderUniversity()}
                buttonColor="secondary"
                width="550px"
                height="520px"
                title={popupTitle}>
                <SedeSearchTable
                    idDisplay={true}
                    codeDisplay={false}
                    actionsButtonSelectDisplay={true} // monstrar o campo = true
                    actionsButtonDisplayEditDelete={false}
                    pageSize={5}
                    rowPerPage={5}
                    backGroundColor="darkBlue"
                    color="white"
                    sedeData={(id, code, sede) => {
                        setSede(sede);
                        setOpenPopup(false);
                        tableAgenciaUpdateData(id);
                    }
                    }
                />

            </Popup>
        </div>
    )
}
export default UserList;
