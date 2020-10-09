import React from 'react';
import Pagination from "./Pagination";
import {mockData, header} from '../mockData/mockData';
import HeaderInput from './HeaderInput';

export default class AuditTrail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            data: mockData,
            pageOfItems: [],
            inputValue: null,
            error : false,
            errorMsg: null
        };
      this.onChangePage = this.onChangePage.bind(this);
    }


handleSubmit = () => {
  if(this.state.inputValue !== null && this.state.inputValue !== undefined && this.state.inputValue !== ""){
        let filteredData = this.state.data.filter(item => item.mobile == this.state.inputValue)
        if(filteredData.length>0){
        this.setState({
          error : false,
          data : filteredData
        })
        }
        else{
        this.setState({
          error : true,
          errorMsg : 'No Matches Found !'
        })
        }
  }
  else{
      this.setState({
      error : true,
      errorMsg : 'Please Enter a Mob No. in saarch field to filter'
    })
  }
}

changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  if(this.state.inputValue && this.state.inputValue.length <=1){
      this.setState({
        data : mockData,
        error : false
      })
    }
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems })
  }

    render() {
      return (
        <React.Fragment >
        <HeaderInput searchValue={this.state.inputValue} onSearch={event => this.changeHandler(event)} onSubmit={this.handleSubmit}/>
        <table className='tableContainer'>
        <thead>
          <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
      {this.state.error ?<div className='error'>{this.state.errorMsg}</div> : this.state.pageOfItems.map((item, i) => {
        return [
            <tr key={i} >
              <td>{item.username}</td>
              <td>{item.mobile}</td>
              <td>{item.twoFactorStatus}</td>
              <td>{item.userId}</td>
              <td>{item.maker}</td>
              <td>{item.approvalStatus}</td>
              <td>{item.userStatus}</td>
              <td>{item.fullName}</td>
              <td>{item.dateTimeModified}</td>
              <td>{item.dateTimeModified}</td>
              <td>{""}</td>
              <td>{item.actionType}</td>
            </tr>,
        ];
      })}
    </tbody>
      </table>
      {!this.state.error ? <Pagination items={this.state.data} onChangePage={this.onChangePage} /> : null}
         </React.Fragment >
        );
      }
    }
