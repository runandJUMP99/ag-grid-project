import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import  RowGroupingModule  from 'ag-grid-community';

import classes from "./Grid1.module.css";

const Grid1 = () => {
    const [gridApi, setGridApi] = useState();
    const columnDefs = [
        {headerName: "ID", field: "id", checkboxSelection: true, headerCheckboxSelection: true},
        {headerName: "Name", field: "name"},
        {headerName: "Rank", field: "rank", filter: false},
        {headerName: "Price", field: "price", filter: false, tooltipField: "name"},
        {headerName: "Circulating Supply", field: "circulating_supply", filter: false, tooltipField: "name"},
        {headerName: "1 Day Price Change", field: "1d.price_change", filter: false, tooltipField: "name", cellStyle: (params) => (params.value > 0 ? {borderLeft: "4px solid #61db61"} : {borderLeft: "4px solid #ec6262"})},
        {headerName: "30 Day Price Change", field: "30d.price_change", filter: false, tooltipField: "name", cellStyle: (params) => (params.value > 0 ? {borderLeft: "4px solid #61db61"} : {borderLeft: "4px solid #ec6262"})}
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

        fetch("https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=0cb836808f7a84be56815b8a45781181&ids=BTC,ETH,XRP&interval=1d,30d&convert=USD&per-page=100&page=1")
            .then(res => res.json())
            .then(res => {
                params.api.applyTransaction({add: res}); //adding API data to grid
                params.api.paginationGoToPage(10);
            });
    }

    function handleExport() {
        gridApi.api.exportDataAsCsv({onlySelected: true});
    }

    return (
        <div className={classes.Grid1}>
            <h1 align="center">Crypto</h1>
            <div className={classes.HeaderRow}>
                <h3>Crypto Details</h3>
                <button onClick={handleExport}>Export Data</button>
            </div>
            <div className="ag-theme-alpine-dark" style={{ height: "400px"}}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    enableBrowserTooltips={true}
                    onGridReady={onGridReady}
                    paginationAutoPageSize={true}
                    rowSelection="multiple"
                    tooltipShowDelay={{tooltipShowDelay: 1}}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default Grid1;