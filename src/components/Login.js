import React, { Component } from 'react';
import "../component-css/Login.css";
import { socket } from '../App';
import { io } from 'socket.io-client';


export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn : false
        }
    }

    componentDidMount(){
        //Sets state to true if successfully logged in on serverside
        socket.on("loginSuccess",()=>{
            this.setState({
                loggedIn : true
            });
            alert("Successfully Connected!");
            socket.off("loginSuccess");
        })
    }

    // componentWillUnmount(){
    //     socket.off("loginSuccess");
    //     //removes listener for performance purposes
    // }

    render() {
        return(
            <div className={this.state.loggedIn ? "loginContainerLogged" : "loginContainer"}>
                <Logo/>
                <InputName/>
            </div>
        )
    }
}



class Logo extends Component {
  render() {
    return(
        <div className='logo'>
            Partype
        </div>
    )
  }
}

class InputName extends Component {
    constructor(){
        super();
        this.state = {
            username : "",
            isLoggedIn : false
        }
    }

    async updateUsername(e){
        await this.setState({
            username : e.target.value
        })
    }

    establishUsername(e){
        if (this.state.username.length < 3 || this.state.username.length > 12){
            alert("Please pick a name between 3 and 12 characters!!")
        }else{
            try{
                socket.emit("login", {id : socket.id, name: this.state.username, loggedIn : true});
            }catch(err){
                alert("Failed to connect to server. Please reload the page or reestablish your internet conenction.")
            }
            this.setState({
                isLoggedIn : true
            })
        }
        
    }

    render() {
        return <div>
            <input type={'text'} placeholder='Input Name' value={this.state.username} onChange={e => this.updateUsername(e)} className='loginUsernameInput'>

            </input>
            <button onClick={e => this.establishUsername(e)} className='loginUsernameSubmit'>Go</button>
        </div>
    }
}





