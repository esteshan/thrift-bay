import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateReviewMutation } from "../../store/reviewsApi";
import { useGetUsersQuery } from "../../store/userProfileApi";

function ReviewForm() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [error, setError] = useState("");
  const { username } = useParams();
  const { data: user, isError: userError, refetch } = useGetUsersQuery(username);
  const [createReview, result] = useCreateReviewMutation();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCreated_at(currentDate);
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      refetch();
      window.location.href = `${process.env.PUBLIC_URL}/users/${user.username}`;
    } else if (result.isError) {
      setError("Failed to create the review.");
    }
  }, [result, user, refetch]);

  const handleCreateReview = async () => {
    try {
      const reviewData = {
        rating,
        comment,
        created_at,
        user_id: user.user_id,
      };
      await createReview(reviewData);
    } catch (err) {
      setError("Failed to create the review.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userError) {
      handleCreateReview();
    } else {
      setError("Failed to retrieve user data or user is not logged in.");
    }
  }

  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
      <p className="text-gray-800 font-medium">Review Information</p>
      <div className="mt-2">
        <label htmlFor="rating" className="block text-sm text-gray-600">
          Rating:
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        >
          {ratingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <label htmlFor="comment" className="block text-sm text-gray-600">
          Comments:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        />
      </div>
      <div className="mt-2">
        <label htmlFor="created_at" className="block text-sm text-gray-600">
          Created At:
        </label>
        <input
          type="date"
          id="created_at"
          value={created_at}
          readOnly
          className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={result.isLoading}
        className="mt-4 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
      >
        Create Review
      </button>

      {result.isLoading && <p className="mt-2 text-gray-800">Loading...</p>}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
    </form>
  );
}

export default ReviewForm;
