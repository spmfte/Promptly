// src/Promptly.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function Promptly() {
  const [prompts, setPrompts] = useState([]);
  const [newPromptText, setNewPromptText] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios.get("/api/prompts").then((res) => {
      setPrompts(res.data);
    });
  }, []);

  const handleNewPrompt = () => {
    axios.post("/api/prompts", { text: newPromptText }).then((res) => {
      setPrompts([...prompts, res.data]);
      setNewPromptText("");
    });
  };

  const handleGenerateResponse = (prompt) => {
    axios
      .post("/api/generate-prompt", { prompt })
      .then((res) => {
        setResponse(res.data);
      });
  };

  return (
    <div>
      <h1>Promptly</h1>
      <div>
        <h2>Create a new prompt</h2>
        <input
          type="text"
          value={newPromptText}
          onChange={(e) => setNewPromptText(e.target.value)}
        />
        <button onClick={handleNewPrompt}>Create Prompt</button>
      </div>
      <div>
        <h2>Prompts</h2>
        <ul>
          {prompts.map((prompt) => (
            <li key={prompt._id}>
              {prompt.text}
              <button onClick={() => handleGenerateResponse(prompt)}>
                Generate Response
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Promptly;

