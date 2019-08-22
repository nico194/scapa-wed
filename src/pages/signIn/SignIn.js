import React, { Component } from 'react'
import './SignIn.css'
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            login: false
        }
        this.onChangeTextField = this.onChangeTextField.bind();
        this.onClickLogin = this.onClickLogin.bind();
    }

    onChangeTextField = (e, field) => {
        console.log(`${field}: ${e.target.value}`)
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        

    }

    render() {
        const { login } = this.state;
        return (
            <div className="sign-in-component">
                <h1>SignIn</h1>
                <TextField text='Email' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                <TextField text='Password' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                <Button text='Ingresar' onClick={this.onClickLogin}/>
                {login && 
                    <h2>Login Exitoso!</h2>
                }
            </div>
        )
    }
}

export default SignIn
