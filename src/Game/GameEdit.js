import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
const GameEdit = (props) => {
  
  const [editGame, setEditGame] = useState(props.gameToUpdate.game);
  const [editPost, setEditPost] = useState(props.gameToUpdate.post);
  const [editImage, setEditImage] = useState(props.gameToUpdate.image);
  const gameUpdate = (event, game) => {
    event.preventDefault();
    fetch(`http://localhost:3000/game/update/${props.gameToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
         game: {game: editGame, post: editPost, image: editImage} 
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchGames();
      props.updateOff();
    });
  };
  return (
    <Modal isOpen={true}>
      <ModalHeader>Games</ModalHeader>
      <ModalBody>
        <Form onSubmit={gameUpdate}>
          <FormGroup>
            <Label htmlFor="game">Edit Title:</Label>
            <Input
              name="game"
              value={editGame}
              onChange={(e) => setEditGame(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="post">Edit Post:</Label>
            <Input
              name="post"
              value={editPost}
              onChange={(e) => setEditPost(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Edit Image</Label>
            <Input
              name="image"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
            ></Input>
          </FormGroup>
          <Button type="submit">Update the Game!</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default GameEdit;