import React, {useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import  RowGroupingModule  from 'ag-grid-community';

import classes from "./Grid2.module.css";

const Grid2 = () => {
    const [gridApi, setGridApi] = useState();
    const columnDefs = [
        {headerName: "ID", field: "id", checkboxSelection: true, headerCheckboxSelection: true},
        {headerName: "Title", field: "title"},
        {headerName: "URL", field: "url"},
        {headerName: "Thumbnail", field: "thumbnailUrl", cellRenderer: "imgRenderer", filter: false, floatingFilter: false}
    ];

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1, 
        filter: true,
        floatingFilter: true
    }

    function onGridReady(params) {
        setGridApi(params);

        fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(res => {
                params.api.applyTransaction({add: res}); //adding API data to grid
                // params.api.paginationGoToPage(10);
        });
    }

    function onPaginationChange(pageSize) {
        gridApi.api.paginationSetPageSize(Number(pageSize));
    }

    function ImgRenderer(props) {
        return <img src={props.value} style={{width: "50%"}} />
    }

    return (
        <div className={classes.Grid2}>
            <h1 align="center">Color Display</h1>
            <div className={classes.HeaderRow}>
                <h3>Color Details</h3>
                <select onChange={(event) => onPaginationChange(event.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="ag-theme-alpine" style={{height: "400px"}}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{imgRenderer: ImgRenderer}}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={10}
                    // paginationAutoPageSize={true}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default Grid2;