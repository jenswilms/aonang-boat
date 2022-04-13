import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/config.js";

import Home from "./components/Home.js";

function App() {
  const app = initializeApp(firebaseConfig);

  return (
    <div>
      <Home />
      {/*       
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
