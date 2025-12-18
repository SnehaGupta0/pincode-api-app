import { useState } from "react";

function PincodeLookup() {
  const [pin, setPin] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [error, setError] = useState("");

  const fetchPincodeDetails = async () => {
    setError("");
    setPostOffices([]);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status !== "Success") {
        throw new Error("Invalid PIN Code");
      }

      setPostOffices(data[0].PostOffice);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>PIN Code Lookup</h2>

      <input
        type="number"
        placeholder="Enter PIN Code"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <button onClick={fetchPincodeDetails}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {postOffices.map((po, index) => (
        <div key={index}>
          <p><b>Post Office:</b> {po.Name}</p>
          <p><b>District:</b> {po.District}</p>
          <p><b>State:</b> {po.State}</p>
          <p><b>Delivery:</b> {po.DeliveryStatus}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PincodeLookup;
