import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ReviewCreate from "./ReviewCreate";
import ReviewTable from "./ReviewTable";
import ReviewEdit from "./ReviewEdit";

const ReviewIndex = (props) => {
  const [reviews, setReviews] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState([]);

  const editUpdateReview = (review) => {
    setReviewToUpdate(review);
    console.log(review);
  };
  const updateOn = () => {
    setUpdateActive(true);
  };
  const updateOff = () => {
    setUpdateActive(false);
  };

  const fetchReviews = () => {
    fetch("http://localhost:3000/review/get", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setReviews(logData);
        console.log(logData);
      });
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <Container>
      <Row>
        <Col md="3">
          <ReviewCreate fetchReviews={fetchReviews} token={props.token} />
        </Col>
        <Col md="9">
          <h2>
            <ReviewTable
              reviews={reviews}
              editUpdateReview={editUpdateReview}
              updateOn={updateOn}
              fetchReviews={fetchReviews}
              token={props.token}
            />
          </h2>
        </Col>
        {updateActive ? (
          <ReviewEdit
            reviewToUpdate={reviewToUpdate}
            updateOff={updateOff}
            token={props.token}
            fetchReviews={fetchReviews}
          />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};
export default ReviewIndex;
