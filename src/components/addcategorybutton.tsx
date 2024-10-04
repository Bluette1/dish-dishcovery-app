import React, { useState } from "react";

const AddCategoryButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleAddCategory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        alert(`Category created successfully: ${newCategory.name}`);
        setCategoryName("");
        setShowInput(false); // Hide input after successful addition
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create category.");
      }
    } catch (err) {
      setError("An error occurred while creating the category.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Create a Category
        </button>
      ) : (
        <>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded p-2 mb-2 mx-5 my-3"
          />
          <button
            onClick={handleAddCategory}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AddCategoryButton;
