import React from 'react';
import axios from 'axios';
import { Button, Input, Card } from 'antd';
import 'antd/dist/antd.css';


class GetBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author: "",
            title: "",
            isbn: "",
            clicked: false,
        }
    }

    accumulateTitle = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    sendTitle = (event) => {
        let title = this.state.title;
        axios
            .get(`http://localhost:9000/?title=${title}`)
            .then(res => {
                let data = res.data.split('?');
                let auth = data[0];
                let is = data[1];
                this.setState({
                    author: auth,
                    isbn: is,
                    clicked: true,
                });
            })
            .catch(err => {
                console.log(`something went wrong: ${err}`);
            });

    }

    render() {
        let dis = 'hidden';
        if (this.state.clicked){
            dis = 'visible';
        }
        let inputStyle = {
            width: '25%',
            height: '20px',
        };
        let buttonStyle = {
            display: 'block',
            width: '12%',
            'margin-left': '44%',
            'margin-top': '5px',
            'text-align': 'center',
        };
        let divStyle = {
            'margin-top': '80px',
            'padding-bottom': '10px',
            'margin-right': '10%',
            'margin-left': '10%'
        };
        let cardStyle = {
            width: '25%',
            'margin-left': '37.5%',
            'margin-top': '5px',
            visibility: dis
        }
        let currIsbn = this.state.isbn;

        let imgPath = `http://covers.openlibrary.org/b/isbn/${currIsbn}-M.jpg`;
        return (
            <div style={divStyle}>
                <h1>Find Author!</h1>
                <Input.TextArea 
                    style={inputStyle}
                    size='small' 
                    value={this.state.title} 
                    onChange={this.accumulateTitle}
                />
                <Button type='primary' onClick={this.sendTitle} style={buttonStyle}>Search by Title</Button>
                <Card style={cardStyle}>
                    <h3>{this.state.author}</h3>
                    <hr></hr>
                    <img src={imgPath} alt='' />
                </Card>
            </div>
        );
    }
}

export default GetBook;
