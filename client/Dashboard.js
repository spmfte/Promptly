// client/Dashboard.js

import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");

  useEffect(() => {
    axios.get("/api/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("/api/prompts", { text: newPrompt }).then((response) => {
      setPrompts([...prompts, response.data]);
      setNewPrompt("");
    });
  }

  return (
    <div>
      <h1>Promptly Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new prompt"
          value={newPrompt}
          onChange={(event) => setNewPrompt(event.target.value)}
        />
        <button type="submit">Add Prompt</button>
      </form>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt._id}>{prompt.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

