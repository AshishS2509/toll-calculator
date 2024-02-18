"use client";
import Form from "./components/form";
import Map from "./components/map";

function App() {

  return (
    <div className="d-flex container align-items-center m-auto p-0">
      <div className="row py-5 mx-auto w-100 mb-5">
        <div className="col-lg-7">
          <Form />
        </div>
        <div className="col-lg-5">
          <Map/>
        </div>
      </div>
    </div>
  );
}

export default App;
