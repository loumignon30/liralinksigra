import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./reusableComponents.css";
import { createStyles, makeStyles, withStyles } from '@mui/styles';

const styles = makeStyles({
    row: {
        height: '15px',
    }
})

export default function UsableTable(props) {
    const { records, columns, pageSize, rowPerPage } = props;
    const classes = styles();
    return (
        <>
            <div>
                <DataGrid
                    rows={records}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[rowPerPage]}
                    //checkboxSelection
                    autoHeight={true}
                    //"MuiDataGrid-viewport1"
                    disableExtendRowFullWidth={true}
                    rowHeight={40}
                    //addColumnsToStore = {true}
                >


                </DataGrid>
            </div>
        </>
    )
}
