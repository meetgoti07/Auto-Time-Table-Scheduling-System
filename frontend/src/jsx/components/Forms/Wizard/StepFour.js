import React, { useState,useEffect } from "react";

const StepFour = ({ onNextClick }) => {
  const [classData, setClassData] = useState({ ClassName: "" });
  const [subclassRows, setSubclassRows] = useState([{ Subclass: "" }]);
  const [subjectRows, setSubjectRows] = useState([{ Subject: "" }]);


  const handleAddSubclassRow = () => {
    setSubclassRows([...subclassRows, { Subclass: "" }]);
  };

  const handleAddSubjectRow = () => {
    setSubjectRows([...subjectRows, { Subject: "" }]);
  };

  const handleRemoveSubclassRow = (index) => {
    const updatedSubclassRows = [...subclassRows];
    updatedSubclassRows.splice(index, 1);
    setSubclassRows(updatedSubclassRows);
  };

  const handleRemoveSubjectRow = (index) => {
    const updatedSubjectRows = [...subjectRows];
    updatedSubjectRows.splice(index, 1);
    setSubjectRows(updatedSubjectRows);
  };


  const handleInputChange = (index, event, type) => {
    if (type === "subclass") {
      const updatedSubclassRows = [...subclassRows];
      updatedSubclassRows[index][event.target.name] = event.target.value;
      setSubclassRows(updatedSubclassRows);
    } else if (type === "subject") {
      const updatedSubjectRows = [...subjectRows];
      updatedSubjectRows[index][event.target.name] = event.target.value;
      setSubjectRows(updatedSubjectRows);
    }
  };
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);

  const handleClassInputChange = (event) => {
    setClassData({ ...classData, [event.target.name]: event.target.value });
  };


  const handleNext = () => {
    // Create a new array with the user object followed by the rows
    const dataToSend = [
      { user: userDetails.username },
      { classData, subclassRows, subjectRows }
    ];
    // Call the onNextClick callback with the modified data
    onNextClick(dataToSend);
  };


  return (
    <section>
      <div className="row mb-2">
        <div className="col-4">
          <div className="form-group">
            <label>Class Name</label>
            <input
              type="text"
              name="ClassName"
              value={classData.ClassName}
              onChange={handleClassInputChange}
              className="form-control"
              placeholder="Class"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">Subclass</div>
          </div>

          {subclassRows.map((row, index) => (
            <div className="row" key={index}>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="Subclass"
                    value={row.Subclass}
                    onChange={(e) => handleInputChange(index, e, "subclass")}
                    className="form-control"
                    placeholder="Subclass"
                    required
                  />
                </div>
              </div>
              <div className="col-6 col-sm-4 mb-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveSubclassRow(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-6 col-sm-4 mb-2">
              <button
                className="btn btn-primary sw-btn-next ms-1"
                onClick={handleAddSubclassRow}
              >
                Add Subclass
              </button>
            </div>
          </div>
        </div>

        <div className="col-6">          <div className="row">

          <div className="col-8">Subject</div>
        </div>

          {subjectRows.map((row, index) => (
            <div className="row" key={index}>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="Subject"
                    value={row.Subject}
                    onChange={(e) => handleInputChange(index, e, "subject")}
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
              </div>
              <div className="col-6 col-sm-2 mb-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveSubjectRow(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-6 col-sm-4 mb-2">
              <button
                className="btn btn-primary sw-btn-next ms-1"
                onClick={handleAddSubjectRow}
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-6 col-sm-4 mb-2">
            <button className="btn btn-primary sw-btn-next ms-1" onClick={handleNext}>
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepFour;
