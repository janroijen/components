import { useState } from "react";
import "./App.css";

import ComboBox from "./components/combobox";

const items = [
  "Apple",
  "Banana",
  "Orange",
  "Pear",
  "Cucumber",
  "Grape",
  "Pecan",
  "Chips",
  "Nuts",
].sort();

function App() {
  const [result, setResult] = useState("");
  return (
    <>
      <h1>test</h1>
      <ComboBox items={items} setSelected={setResult} />
      {result ? `Selection: ${result}` : "Nothing selected"}
    </>
  );
}

export default App;
