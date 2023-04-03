// client/Console.js

function Console({ response }) {
  return (
    <div>
      <h1>Promptly Console</h1>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default Console;

