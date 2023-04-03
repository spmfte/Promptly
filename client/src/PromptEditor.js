import React, { useState } from 'react';
import axios from 'axios';

function PromptEditor() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSendClick = () => {
    axios.post('/prompt', { prompt })
      .then((res) => {
        setResponse(res.data.response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt here"
      />
      <button onClick={handleSendClick}>Send</button>
      <div>
        {response}
      </div>
    </div>
  );
}

export default PromptEditor;
