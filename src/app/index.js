import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListView from './listView';
import {RowChart} from "./rowChart";
//import {AdvanceChart} from "./advanceChart";

// const { InstantSearch, findResultsState } = createInstantSearch();

class App extends Component {
  
  updatePageCount(opration, currentPage){
    let newPageNumber = 0;
    
    if (opration === "increse"){
      newPageNumber = parseInt(currentPage) + 1;
    }else {
      newPageNumber = parseInt(currentPage) - 1;
    }
    window.location.href = `${window.location.origin}/${newPageNumber}`; 
  }
  render() {
    const {columns, rows, pageNumber } = this.props;
    return (
      <React.Fragment>
        <ListView columns={columns} rows= {rows}></ListView>
       
        <div id="rowChart1" className="rowChart"></div>
        <RowChart newsData = {rows}></RowChart> 
      { /* <AdvanceChart newsData = {rows}></AdvanceChart> */}
        <button onClick={()=>this.updatePageCount('decrese', pageNumber)} >prev</button>
        <button onClick={()=>this.updatePageCount('increse', pageNumber)}>next</button>
      </React.Fragment>
      
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object,
};

export {App} ;
