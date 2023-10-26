import React from 'react';
import { useGetReviewQuery } from "../store/reviewsApi";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Reviews() {
  const { username } = useParams();
  const { data } = useGetReviewQuery();

  if (!data) {
    return <div>No data available</div>;
  }

  const filteredReviews = data.filter(review => review.user_id.username === username);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 ml-4">
        <h1 className="text-2xl font-semibold mt-4">List of Reviews for {username}</h1>
        <Link to={`/users/${username}/reviews/new`} className="text-xl text-blue-500 hover:underline ml-12 mt-4 mr-auto">
          Create a New Review for {username}
        </Link>
      </div>
      {filteredReviews.map((review) => (
        <div key={review.review_id} className="p-4 bg-gray-100 rounded-lg mb-4">
          <ul>
            <li><strong>Rating:</strong> {review.rating}</li>
            <li><strong>Comment:</strong> {review.comment}</li>
            <li><strong>Created By:</strong> {review.user_id.username}</li>
            <li><strong>Created At:</strong> {review.created_at}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
