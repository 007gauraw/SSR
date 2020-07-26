import React, { Component } from 'react';
import styles from './App.module.scss'
// const { InstantSearch, findResultsState } = createInstantSearch();

class ListView extends Component {

  sendDummyRequest(e, objectID, vote) {
    let newsFeed = (typeof localStorage === 'undefined') ? null : localStorage.getItem(objectID);

    if (newsFeed) {
      newsFeed = JSON.parse(newsFeed);
      vote = newsFeed.vote;
    }
    let valueStr = JSON.stringify({ vote: vote + 1, hidden: false })
    //dengorus dom manipulation should be avoided
    e.target.parentElement.previousElementSibling.innerText = vote + 1;
    localStorage.setItem(objectID, valueStr)
  }

  hideStory(e, objectID, vote) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    let newsFeed = (typeof localStorage === 'undefined') ? null : localStorage.getItem(objectID);

    if (newsFeed) {
      newsFeed = JSON.parse(newsFeed);

    } else {
      newsFeed = {
        vote: vote,
        hidden: true
      }
    }
    newsFeed.hidden = true;
    let valueStr = JSON.stringify(newsFeed)
    //dengorus dom manipulation should be avoided
    e.target.parentElement.parentElement.parentElement.setAttribute("style", "display: none;");
    localStorage.setItem(objectID, valueStr)
    return false;
  }

  renderTableData(rows) {
    let array = rows.map((news, index) => {

      const { num_comments, points, title, objectID } = news //destructuring
      let newsFeed = (typeof localStorage === 'undefined') ? null : localStorage.getItem(objectID);
      let classes = "";
      if (newsFeed) {
        newsFeed = JSON.parse(newsFeed);
        classes = (newsFeed.hidden == true) ? "hide" : "show";
      }
      if(newsFeed && newsFeed.hidden === true) {
        return (
          <tr className={styles.hide} style = {{
            border: "1px solid black",
            "textAlign": "left",
            "padding": "15px"}} key={index} >
            <td>{num_comments}</td>
            <td className="points">{(newsFeed && newsFeed.vote) ? newsFeed.vote : points}</td>
            <td><button onClick={(e) => this.sendDummyRequest(e, objectID, points)}>Up vote</button></td>
            <td><span>{title}</span><span><a href="javascript: false" onClick={(e) => this.hideStory(e, objectID, points)}>Hide</a></span></td>
          </tr>)
      }else {
        return (
          <tr className={styles.show} style = {{
            border: "1px solid black",
            "textAlign": "left",
            "padding": "15px"}} key={index} >
            <td>{num_comments}</td>
            <td className="points">{(newsFeed && newsFeed.vote) ? newsFeed.vote : points}</td>
            <td><button onClick={(e) => this.sendDummyRequest(e, objectID, points)}>Up vote</button></td>
            <td><span>{title}</span><span><a href="javascript: false" onClick={(e) => this.hideStory(e, objectID, points)}>Hide</a></span></td>
          </tr>)
  
      }
      

    })
    return array;
  }

  renderTableHeader(columns) {
    let col = columns.map((key, index) => {
      
      return <th style = {{
        border: "1px solid black",
        background: "bisque",
        "textAlign": "left",
        "padding": "15px"}} key={index}>{key.label}</th>
    })
    return col;
  }
  render() {
    const { columns, rows } = this.props;
    let arrayOfTH = [];
    let arrayOfTd = [];
    arrayOfTH = this.renderTableHeader(columns);
    arrayOfTd = this.renderTableData(rows);

    return (
      <div>
        
        <table id='students'>
          <tbody>
            <tr>
              {arrayOfTH}
            </tr>
            {arrayOfTd}
          </tbody>
        </table>
      </div>

    );
  }
}

export default ListView;
