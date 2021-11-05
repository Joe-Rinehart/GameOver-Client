import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';

const GameIndex = (props) => {
    const [games, setGames] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [gameToUpdate, setGameToUpdate] = useState([]);
  
    const editUpdateGame = (game) => {
        setGameToUpdate(game);
        console.log(game);
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }  
    
    const fetchGames = () => {
        fetch('http://localhost:3000/game/get', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((logData) => {
                setGames(logData);
                console.log(logData);
            })
    }
    useEffect(() => {
     fetchGames()
    }, []);
    return (
        <Container>
            <Row>
                <Col md="3">
                    <GameCreate fetchGames={fetchGames} token={props.token}/>
                </Col>
                <Col md="9">
                    <h2><GameTable games={games} editUpdateGame={editUpdateGame} updateOn={updateOn} fetchGames={fetchGames} token={props.token}/></h2>
                </Col>
                {updateActive ? <GameEdit gameToUpdate={gameToUpdate} updateOff={updateOff} token={props.token} fetchGames={fetchGames}/> : <></>}
            </Row>
        </Container>
    )
}
export default GameIndex;