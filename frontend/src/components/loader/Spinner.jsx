import BootstrapSpinner from "react-bootstrap/Spinner";

const Spinner = ({ autoHeight }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center spinner"
      style={{ width: "100%", height: autoHeight ? "auto" : "100vh" }}
    >
      <BootstrapSpinner animation="border" variant="primary" />
      &nbsp; Loading...
    </div>
  );
};

export default Spinner;
