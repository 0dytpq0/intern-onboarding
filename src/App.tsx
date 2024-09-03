import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const BASE_URL = import.meta.env.VITE_AUTH_URL;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} {BASE_URL}
        </button>
        {/* <LoginForm /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
