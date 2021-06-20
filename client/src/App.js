import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Povery and Ticket Rate by Zip Code in Chicago</h1>
      <form>
        <select>
          <option value="" disabled selected>
            Select a zip code
          </option>
          <option value="thing 1">12345</option>
          <option value="thing 2">67890</option>
        </select>
      </form>
    </div>
  );
}

export default App;
