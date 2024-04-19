// StepOne.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StepOne = ({ onNextClick }) => {
  const [rows, setRows] = useState([{ ClassName: "", Type: "Lab" }]);

  const handleAddRow = () => {
    setRows([...rows, { ClassName: "", Type: "Lab" }]);
  };

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.username) {
      fetchExistingData();
    }
  }, [userDetails]);


  const fetchExistingData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/display-classes/', { username: userDetails.username });
      const data = response.data;
      console.log(data);
      setRows(data); 
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index][event.target.name] = event.target.value;
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
      <div className="row">
        <div className="col-6 col-sm-8 mb-2">Class Name</div>
        <div className="col-6 col-sm-2 mb-2">Type</div>
      </div>
      {rows.map((row, index) => (
        <div className="row" key={index}>
          <div className="col-6 col-sm-8 mb-2">
            <div className="form-group">
              <input
                type="text"
                name="ClassName"
                label="Classroom"
                value={row.ClassName}  // Fix: Use 'ClassName' instead of 'firstName'
                onChange={(e) => handleInputChange(index, e)}
                className="form-control"
                placeholder="N501"
                required
              />
            </div>
          </div>
          <div className="col-6 col-sm-2 mb-2">
            <div className="form-group">
              <select
                name="Type"
                value={row.Type}  // Fix: Use 'Type' instead of 'lab'
                onChange={(e) => handleInputChange(index, e)}
                className="form-control"
                placeholder="Lab"
                required
              >
                <option value="Lab">Lab</option>
                <option value="Class">Class</option>
              </select>
            </div>
          </div>
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

export default StepOne;
