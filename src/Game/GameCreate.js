import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
const GameCreate = (props) => {
  const [game, setGame] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/game/create", {
      method: "POST",
      body: JSON.stringify({ game: { game: game, post: post, image: image } }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setGame("");
        setPost("");
        setImage("");
        props.fetchGames();
      });
  };
  return (
    <>
    
      <Button color="danger" onClick={toggle}>
        Track Food
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Track Food</ModalHeader>
        <ModalBody>

      <h3>Game</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="game" />
          Title
          <Input
            name="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="post" />
          Post
          <Input
            name="post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image" />
          Image
          <Input
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
      </ModalBody>
      </Modal>
    </>
  );
};
export default GameCreate;
