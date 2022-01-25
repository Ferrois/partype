import React, { Component, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { socket } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import "../component-css/Game.css";
import PlayerIcon from './PlayerIcon';
import GameLogic from './GameLogic';


export default class Game extends Component {
  render() {
    return(
        <div className='gameContainer'>
            <PlayerList/>
            <div className='gameWrapper'>
              <GameLogic/>
            </div>
        </div>
    )
  }
}

function PlayerList() {
    const [listActivated, setListActivated] = useState(false);
    

    

    const toggleList = () => {
      setListActivated(!listActivated);
    }

    return(
      <div>
        <div className={listActivated ? "usersIconActivated" : "usersIcon"} onClick={()=>toggleList()}>
            <FontAwesomeIcon icon={ faUsers }/>
        </div>
        <UsersTray listActivated={listActivated}/>
      </div>
    )
}

function UsersTray(props) {
  const [listActivated ,setListActivated] = useState(props.listActivated)
  const [users,setUsers] = useState([]);
  const renderPlayerList = () => {
    return users.map((users,index) => (
        <div key={index}>
          {users}
        </div>
      )
    )
  }
  //update state if prop is changed
  useEffect(() => {
      if (props.listActivated !== listActivated){
        setListActivated(props.listActivated);
      }
    },[props.listActivated]);
  //update player list when server emits new copy of data
  useEffect(() => {
    socket.on("gameData", gameData => {
      let playerNames = [];
      console.log(gameData)
      for(var playerId in Object.keys(gameData)){
         playerNames.push(Object.values(gameData)[playerId]["name"]);
      }
      setUsers(playerNames)
    })
  },[])

  return (
    <div className={listActivated ? "usersTrayActivated" : "usersTray" }>
      {renderPlayerList()}
    </div>
  )
  
}


