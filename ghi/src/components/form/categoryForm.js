import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useCreateCategoryMutation } from "../../store/categoryApi";
import { useNavigate } from "react-router-dom";
// import Categories from "../Categories";

function CategoryForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [error, setError] = useState("");
  const [createCategory, result] = useCreateCategoryMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/categories");
    } else if (result.isError) {
      setError(result.error);
    }
  }, [result, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name) {
      setError("Name cannot be empty");
      return;
    }

    // Trigger the mutation
    createCategory({ name, created_at });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="created_at">Created At:</label>
        <input
          type="date"
          id="created_at"
          value={created_at}
          onChange={(e) => setCreated_at(e.target.value)}
        />
      </div>
      <button type="submit" disabled={result.isLoading}>
        Create Category
      </button>

      {result.isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}

export default CategoryForm;
