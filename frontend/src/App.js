"use client";
import Form from "./components/form";
import Map from "./components/map";

function App() {

  return (
    <div className="d-flex container full align-items-center m-auto p-0">
      <div className="row py-5 full mx-auto w-100">
        <Form/>
        <Map/>
      </div>
    </div>
  );
}

export default App;
