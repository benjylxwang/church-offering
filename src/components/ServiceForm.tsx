import React from "react";

function ServiceForm() {
  return (
    <div className="ServiceForm">
      <label htmlFor="dateOfService">Date Of Service</label>
      <input id="dateOfService" type="date" />
      <input type="radio" id="Morning" name="service" value="Morning" />
      <label htmlFor="Morning">Morning</label>
      <input type="radio" id="Evening" name="service" value="Evening" />
      <label htmlFor="Evening">Evening</label>
      <input type="radio" id="Other" name="service" value="Other" />
      <label htmlFor="Other">Other</label>
      <input type="text" />
    </div>
  );
}

export default ServiceForm;
