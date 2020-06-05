import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            id: null,
            show: false
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td><Button variant="primary" onClick={this.props.handleShow.bind(this,this.props.id)}>edit</Button></td>
                <td><button className="del" onClick={this.props.handleDeleteRow.bind(this,this.props.id)}>-</button></td>
            </tr>
        )
    }
}

export default Item;