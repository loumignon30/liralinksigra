import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./reusableComponents.css";
import { createStyles, makeStyles, withStyles } from '@mui/styles';

// const styles = makeStyles({
//     row: {
//         height: '15px',
//     }
// });
const styles = makeStyles((theme) =>
createStyles({
    root: {
        "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
            }
      }
    }
})
);





export default function UsableTable(props) {
    const { records, columns, pageSize, rowPerPage, campoPesquisa, firstNameSearch } = props;
    const classes = styles();
    return (
        <>
            <div>
                <DataGrid
                //getRowId={(row) => row.agenciaID}
                className={classes.root}
                    rows={records}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[rowPerPage]}
                    //checkboxSelection
                    autoHeight={true}
                    //"MuiDataGrid-viewport1"
                    disableExtendRowFullWidth={true}
                    rowHeight={35}
                    headerHeight={25}
                    // getRowId={(row) => row.no}
                   // loading={loading}                  
                      //addColumnsToStore = {true}
                    filterModel={{
                        items: [
                            { columnField: campoPesquisa, operatorValue: 'contains', value: firstNameSearch},
                        ],
                      }}
                >


                </DataGrid>
            </div>
        </>
    )
}
