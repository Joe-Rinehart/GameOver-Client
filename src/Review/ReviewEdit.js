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
const ReviewEdit = (props) => {
  
  const [editGame, setEditGame] = useState(props.reviewToUpdate.review);
  const [editPost, setEditPost] = useState(props.reviewToUpdate.post);
  const [editImage, setEditImage] = useState(props.reviewToUpdate.image);
  const reviewUpdate = (event, review) => {
    event.preventDefault();
    fetch(`http://localhost:3000/review/update/${props.reviewToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
         review: {game: editGame, post: editPost, image: editImage} 
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchReviews();
      props.updateOff();
    });
  };
  return (
    <Modal isOpen={true}>
      <ModalHeader>Reviews</ModalHeader>
      <ModalBody>
        <Form onSubmit={reviewUpdate}>
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
          <Button type="submit">Update the Review!</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default ReviewEdit;