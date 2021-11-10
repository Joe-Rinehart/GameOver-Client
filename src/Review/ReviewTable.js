import React from 'react';
import { Table, Button } from 'reactstrap';
const ReviewTable = (props) => {
    const deleteReview = (review) => {
        fetch(`http://localhost:3000/review/delete/${review.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchReviews())
    }
    const reviewMapper = () => {
        return props.reviews.map((review, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{review.id}</th>
                    <td>{review.game}</td>
                    <td>{review.post}</td>
                    <td>{review.image}</td>
                    <td>
                        <Button color="warning"onClick={() => {props.editUpdateReview(review); props.updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => {deleteReview(review)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
        <h3>Review History</h3>
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
                {reviewMapper()}
            </tbody>
        </Table>
        </>
    )
}
export default ReviewTable;