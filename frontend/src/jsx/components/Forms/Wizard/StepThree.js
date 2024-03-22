import React from "react";
import { useState,useEffect } from "react";
import CustomClearIndicator from "../../PluginsMenu/Select2/MultiSelect";

const StepThree = ({ onNextClick }) => {
  const [rows, setRows] = useState([{ teachername: "", subjects: [] }]);

  const handleAddRow = () => {
   setRows([...rows, { teachername: "", subjects: [] }]);
 };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };


  const handleSelectData = (index, selectedValues) => {
   // Create a copy of the rows state
   const updatedRows = [...rows];
   // Update the data for the corresponding row using the index
   updatedRows[index].subjects = selectedValues;
   // Update the state with the modified rows
   setRows(updatedRows);
};


const handleNext = () => {
  // Create a new array with the user object followed by the rows
  const dataToSend = [
    { user: userDetails.username },
    ...rows
  ];

  // Call the onNextClick callback with the modified data

  onNextClick(dataToSend);
};

  return (
    <section>
      {rows.map((row, index) => (
        <div className="d-flex row justify-content-center align-items-center gap" key={index}>
          {/* TEACHER NAME */}
          <div className="col-6 col-sm-4 mb-2">
            <input
              type="text"
              name="teachername"
              placeholder="Teacher Name"
              label="Teacher"
              value={row.teacherName}
              onChange={(e) => handleInputChange(index, e)}
              className="form-control"
              required
            />
          </div>
          {/* MULTISELECT COMPONENT */}
          <div className="col-6 col-sm-6 mb-2">
            <CustomClearIndicator index={index} onSave={handleSelectData} />
          </div>
          {/* TEACHER DELETE BUTTON */}
          <div className="col-6 col-sm-2 mb-2">
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveRow(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {/* ADD BUTTON */}
      <div className="row">
        <div className="col-6 col-sm-4 mb-2">
          <button className="btn btn-primary sw-btn-next ms-1" onClick={handleAddRow}>
            Add
          </button>
          <button className="btn btn-primary sw-btn-next ms-1" onClick={handleNext}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
