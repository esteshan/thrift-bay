import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateReviewMutation } from "../../store/reviewsApi";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../store/userProfileApi";

function ReviewForm() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [error, setError] = useState("");
  const [createReview, result] = useCreateReviewMutation();
  const { username } = useParams();

  const { data: user, isError: userError } = useGetUsersQuery(username);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCreated_at(currentDate);
  }, []);

  const handleCreateReview = async () => {
  try {
    const reviewData = {
      rating,
      comment,
      created_at,
      user_id: user.user_id,
    };
    await createReview(reviewData);
    navigate(`/users/${user.username}`);
  } catch (err) {
    setError(err.message);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userError) {
      setError("Failed to retrieve user data.");
    } else {
      handleCreateReview();
    }
  };

  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
        >
          {ratingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment">Comments:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="created_at">Created At:</label>
        <input type="date" id="created_at" value={created_at} readOnly />
      </div>
      <button type="submit" disabled={result.isLoading}>
        Create Review
      </button>

      {result.isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}

export default ReviewForm;
