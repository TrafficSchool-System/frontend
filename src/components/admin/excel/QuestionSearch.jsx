import { useState } from "react";

const QuestionSearch = ({ onSearch }) => {
  const [id, setId] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setId(value);

    // Om rutan är tom → visa alla frågor
    if (!value) {
      onSearch(null);
    } else {
      onSearch(value);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="number"
        placeholder="Sök fråga via ID"
        value={id}
        onChange={handleChange} // live search
        className="border rounded px-3 py-2 w-64"
      />
    </div>
  );
};

export default QuestionSearch;
