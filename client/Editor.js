// client/Editor.js

import axios from "axios";
import { useState } from "react";

function Editor() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("/api/generate-prompt", { prompt }).then((response) => {
      setResponse(response.data);
    });
  }

  return (
    <div>
      <h1>Promptly Editor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="submit">Generate Response</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
}

export default Editor;

