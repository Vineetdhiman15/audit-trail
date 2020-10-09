import React from 'react';

export default class HeaderInput extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className='buttonContainer'>
        <input type="number" id="inputValue" name="search" value={this.props.searchValue} onChange = {this.props.onSearch}/>
        <label for="fromDate">From Date: </label>
        <input type="text" id="fromDate" name="fromDate"/>
        <label for="toDate">To Date: </label>
        <input type="text" id="toDate" name="toDate"/>
        <input type="button" value="Apply Dates" onClick={this.props.onSubmit}/>
        </div>
        );
      }
    }
