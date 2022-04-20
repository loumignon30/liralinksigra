import React, { useState, useEffect, useRef } from "react";
import "./sede.css";
import "../../App.css";
import ConfirmDialog from "../../components/reusableComponents/ConfirmDialog";
import Notifications from "../../components/reusableComponents/Notifications";

import { useTranslation } from "react-i18next";
import SedeSearchTable from "./SedeSearchTable";
import { Grid, InputAdornment } from "@mui/material";
import Controls from "../../components/reusableComponents/Controls";
import { Search } from "@mui/icons-material";

const SedeList = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openPopup, setOpenPopup] = useState(false);

  const [sede, setSede] = useState("");
  const childRef = useRef(null); // it's using a reference of a method from ImageUpLoad.js

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0); // open the page on top
  }, []);

  const sedeSearchToToDataGrid = (e) => {
    setSede(e.target.value);
    childRef.current.sedSearch(e.target.value); // search the firstname
  };

  return (
    <>
      <Grid constainer spacing={2}
      container
      direction="column"
      justifyContent="space-between"
      
      >
        <div className="utilisateurList">

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <h3 style={{ marginLeft: "20px" }}>{t("lista_sede")}</h3>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div style={{ marginBottom: "10px", marginLeft: "20px" }}>
            <label className="userLabel">{t("Recherche")}</label>
            <Controls.Input
              name="sede"
              type="text"
              value={sede}
              placeHolder={t("sede")}
              width="35%"
              marginLeft="-20px"
              onChange={sedeSearchToToDataGrid}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

          <div style={{ height: 400, width: "98%", marginLeft: "20px" }}>
            <SedeSearchTable
              ref={childRef}
              idDisplay={true}
              codeDisplay={true}
              ciadadeDisplay={true}
              paisDiplay={true}
              statusDisplay={true}
              actionsButtonSelectDisplay={false}
              actionsButtonDisplayEditDelete={true}
              pageSize={13}
              rowPerPage={13}
              backGroundColor="blue"
              color="white"
            />
          </div>
          </Grid>

          {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
             */}
        </div>
      </Grid>
    </>
  );
};
export default SedeList;
