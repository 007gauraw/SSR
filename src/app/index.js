import React, { Component } from "react";
import PropTypes from "prop-types";
import ListView from "./listView";
// const { InstantSearch, findResultsState } = createInstantSearch();

class App extends Component {
  updatePageCount(opration, currentPage) {
    let newPageNumber;
    if (opration === "increse") {
      newPageNumber = currentPage + 1;
    } else {
      newPageNumber = currentPage - 1;
    }
    window.location.href = `http://localhost:8080/${newPageNumber}`;
  }
  render() {
    const { columns, rows, pageNumber } = this.props;
    return (
      <React.Fragment>
        <ListView columns={columns} rows={rows} />
        <button onClick={() => this.updatePageCount("decrese", pageNumber)}>
          prev
        </button>
        <button onClick={() => this.updatePageCount("increse", pageNumber)}>
          next
        </button>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  resultsState: PropTypes.object
};

export { App };
