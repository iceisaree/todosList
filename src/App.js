import React from 'react';
import './App.css';
import Item from './Item';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { input: "" , store:[], what: "", select: null, show: false , input2: ""};
    this.handleShow = this.handleShow.bind(this);
  }

  handleChange = (e) => {
    this.setState({input : e.target.value});
  }

  handleChange2 = (e) => {
    this.setState({input2 : e.target.value});
  }

  handleClicked = (e) => {
    e.preventDefault();
    let arr = this.state.store;
    arr.push(this.state.input);
    this.setState({store : arr});
    this.setState({input : ""});
    console.log(this.state.store);
    document.getElementById("i").value = "";
  }

  handleDeleteRow = (e) => {
    this.state.store.splice(e, 1);
    this.setState(this.state.store);
  }

  componentDidMount() {
    fetch('https://searchconsole.googleapis.com/$discovery/rest?version=v1')
        .then(response => response.json())
        .then(data => this.setState({ what: data.parameters['$.xgafv']['location'] })
        );
  }

  handleClose = (e) => {
    this.setState({show: false})
  }

  async handleShow(e){
    await this.setState({show: true, select: e})
    document.getElementById("input2").value = this.state.store[this.state.select];
  }

  handleEdit = (e) => {
    let arr = this.state.store;
    arr.splice(this.state.select,1,this.state.input2);
    // console.log(arr);
    // console.log(this.state.input2);
    // console.log(this.state.select);
    this.setState({store: arr, show: false})
  }
  
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1>tableeeeeeee</h1> */}
          {/* <h1>{this.state.what}</h1> */}
          <div className="tablebox">
            <table className="tablecell">
              <tbody>
              { this.state.store.map((element, index)=> { 
                return(
                  <Item key={index} name={element} id={index} handleDeleteRow={this.handleDeleteRow} handleShow={this.handleShow}/>
                )})
              }
              </tbody>
            </table>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose} backdrop={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit :)</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="text-input" type="text" id="input2" onChange={this.handleChange2} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleEdit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
          </Modal>
          
          <div className="inputbox">
            <input className="text-input" id="i" type="text" onChange={this.handleChange} placeholder="enter something..." />
            <Button variant="primary" onClick={this.handleClicked}>OK</Button>
          </div>
        </header>
      </div>
    )
  }
}

// {/*value={this.state.store[this.state.select]}*/}
export default App;
