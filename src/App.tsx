import React from "react";
import "./App.css";
import GeneralOfferingForm from "./components/GeneralOfferingForm";
import EnvelopesForm from "./components/EnvelopesForm";
import ServiceForm from "./components/ServiceForm";

function App() {
  return (
    <div className="App">
      <ServiceForm />
      <GeneralOfferingForm />
      <EnvelopesForm />
    </div>
  );
}

export default App;
