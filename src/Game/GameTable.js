import React from 'react';
import { Table, Button } from 'reactstrap';
const GameTable = (props) => {
    const deleteGame = (game) => {
        fetch(`http://localhost:3000/game/delete/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchGames())
    }
    const gameMapper = () => {
        return props.games.map((game, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{game.id}</th>
                    <td>{game.game}</td>
                    <td>{game.post}</td>
                    <td>{game.image}</td>
                    <td>
                        <Button color="warning"onClick={() => {props.editUpdateGame(game); props.updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => {deleteGame(game)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
        <h3>Game History</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Post</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {gameMapper()}
            </tbody>
        </Table>
        </>
    )
}
export default GameTable;