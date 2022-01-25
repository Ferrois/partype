import React, { Component, useState, useEffect} from 'react';
import { socket } from '../App';
import "../component-css/GameLogic.css";

export default class GameLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : ""
    }
  }

  componentDidMount(){
    socket.on("newRoundWord",data =>{
      this.setState({
        text : data
      })
      // socket.emit("returnPing");
    })
  }

  componentWillUnmount(){
    socket.off("newRoundWord",data =>{
      this.setState({
        text : data
      })
    })
  }

  render() {
    return(
        <div className='GLcontainer'>
          <div className='GLtypeWrapper'>
            <Display text={this.state.text}/>
            <Question/>
          </div>
        </div>
    )
  }
}


function Question() {
  const [word,setWord] = useState("");
  const [typed,setTyped] = useState("");

  useEffect(() => {
    socket.on("newRoundWord",data =>{
      setWord(data);
      setTyped("");
    })
  }, []);

  const updateAnswer = (e) =>{
    setTyped(e.target.value)
    socket.emit("answer",e.target.value);
  }
  
  return(
    <div>
        <input onChange={(e)=>updateAnswer(e)} placeholder={word} value={typed} className='GLinput'></input>
    </div>
  )
}


const Display = (props) => {

  const[display,setDisplay] = useState("");

  useEffect(() => {
    if (display !== props.text){
      setDisplay(props.text)
    }
  }, [props.text]);
  

  return(
    <div className='GLdisplay'>
      {display}
    </div>
  )
};


