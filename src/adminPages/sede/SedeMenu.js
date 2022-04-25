import React from "react";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Sede from "./Sede";

const SedeMenu = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5}>
          <Grid item xs={3}>
            <div>
            <Sidebar />
            </div>
          </Grid>

          <Grid item xs={9}>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "black",
                height: "50vh",
                maxHeight: "50vh",
                overflowY: "auto",
                overflow: "auto",
                overflowX: "hidden",
              }}
            >
                <Sede/>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SedeMenu;
