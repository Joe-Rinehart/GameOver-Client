import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
const ReviewCreate = (props) => {
  const [game, setGame] = useState("");
  const [rating, setRating] = useState("")
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/review/create", {
      method: "POST",
      body: JSON.stringify({ review: { game: game, rating: rating, post: post, image: image } }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setGame("");
        setRating("")
        setPost("");
        setImage("");
        props.fetchReviews();
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

      <h3>Review</h3>
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
          <Label htmlFor="rating" />
          Rating
          <Input 
            type = "number" 
            name="rating"
            value={rating}
            min="1"
            max="10"
            onChange={(e) => setRating(e.target.value)}
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
export default ReviewCreate;