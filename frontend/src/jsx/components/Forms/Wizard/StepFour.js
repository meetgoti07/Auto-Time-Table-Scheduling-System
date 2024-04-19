import React, { useState, useEffect } from "react";
import axios from "axios";
const StepFour = ({ onNextClick }) => {

  const [divisionData, setDivisionData] = useState([{ divisionName: "", subDivisions: [{ subDivisionName: "" }], subjects: [{ subjectName: "" }] }]);

  const handleAddDivision = () => {
    setDivisionData([...divisionData, { divisionName: "", subDivisions: [{ subDivisionName: "" }], subjects: [{ subjectName: "" }] }]);
  };

  const handleAddSubdivision = (divisionIndex) => {
    const newDivisionData = [...divisionData];
    newDivisionData[divisionIndex].subDivisions.push({ subDivisionName: "" });
    setDivisionData(newDivisionData);
  };

  const handleAddSubject = (divisionIndex) => {
    const newDivisionData = [...divisionData];
    newDivisionData[divisionIndex].subjects.push({ subjectName: "" });
    setDivisionData(newDivisionData);
  };

  const handleRemoveDivision = (divisionIndex) => {
    const newDivisionData = [...divisionData];
    newDivisionData.splice(divisionIndex, 1);
    setDivisionData(newDivisionData);
  };

  const handleRemoveSubdivision = (divisionIndex, subdivisionIndex) => {
    const newDivisionData = [...divisionData];
    newDivisionData[divisionIndex].subDivisions.splice(subdivisionIndex, 1);
    setDivisionData(newDivisionData);
  };

  const handleRemoveSubject = (divisionIndex, subjectIndex) => {
    const newDivisionData = [...divisionData];
    newDivisionData[divisionIndex].subjects.splice(subjectIndex, 1);
    setDivisionData(newDivisionData);
  };

  const handleInputChange = (divisionIndex, event, type, subIndex) => {
    const newDivisionData = [...divisionData];
    if (type === "division") {
      newDivisionData[divisionIndex].divisionName = event.target.value;
    } else if (type === "subdivision") {
      let subdivisionIndex = parseInt(event.target.dataset.subdivisionIndex, 10); // Convert to number if it's a string
      if (newDivisionData[divisionIndex].subDivisions && newDivisionData[divisionIndex].subDivisions.length > subdivisionIndex) {
        newDivisionData[divisionIndex].subDivisions[subdivisionIndex].subDivisionName = event.target.value;
      }
    } else if (type === "subject") {
      let subjectIndex = parseInt(event.target.dataset.subjectIndex, 10); // Convert to number if it's a string
      if (newDivisionData[divisionIndex].subjects && newDivisionData[divisionIndex].subjects.length > subjectIndex) {
        newDivisionData[divisionIndex].subjects[subjectIndex].subjectName = event.target.value;
      }
    }
    setDivisionData(newDivisionData);
  };



  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.username) {

      fetchDivisionData();
    }
  }, [userDetails]);


  const fetchDivisionData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/display-divisions/', { username: userDetails.username });
      if (response.data) {
        const transformedData = response.data.map(division => ({
          divisionName: division.divisionname,
          subDivisions: division.subdivisions.map(subDivisionName => ({ subDivisionName })),
          subjects: division.subjects.map(subjectName => ({ subjectName })),
        }));
        setDivisionData(transformedData);
      }
    } catch (error) {
      console.error('Failed to fetch division data:', error);
    }
  };




  const handleNext = () => {

    const dataToSend = [
      { user: userDetails.username },
      { divisionData }
    ];
    onNextClick(dataToSend);
  };


  // ... rest of your code ...

  return (

    <section>
      {divisionData.map((division, divisionIndex) => (
        <div className="row" key={divisionIndex}>
          <div className="row">
            <div className="col-6">
              <label>Division Name</label>
              <input
                type="text"
                value={division.divisionName}
                onChange={(e) => handleInputChange(divisionIndex, e, "division")}
                className="form-control"
                placeholder="Division Name"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="row mt-2">
                <label>Subdivision Name</label>
              </div>

              {division.subDivisions.map((subDivision, subDivisionIndex) => (

                <div className="row " key={subDivisionIndex}>

                  <div className="col-8">
                    <div className="form-group">
                      <input
                        type="text"
                        value={subDivision.subDivisionName}
                        onChange={(e) => handleInputChange(divisionIndex, e, "subdivision", subDivisionIndex)}
                        className="form-control"
                        placeholder="Subdivision Name"
                        required
                        data-subdivision-index={subDivisionIndex}  // Ensure this attribute is set correctly
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveSubdivision(divisionIndex, subDivisionIndex)}
                    >
                      Delete
                    </button>
                  </div>

                </div>


              ))}

              <button
                className="btn btn-primary mt-2"
                onClick={() => handleAddSubdivision(divisionIndex)}
              >
                Add Subdivision
              </button>

            </div>


            <div className="col-6">
              <div className="row mt-2">
                <label>Subject Name</label>
              </div>
              {division.subjects.map((subject, subjectIndex) => (
                <div className="row" key={subjectIndex}>
                  <div className="form-group col-8">
                    <input
                      type="text"
                      value={subject.subjectName}
                      onChange={(e) => handleInputChange(divisionIndex, e, "subject", subjectIndex)}
                      className="form-control"
                      placeholder="Subject Name"
                      required
                      data-subject-index={subjectIndex}
                    />
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveSubject(divisionIndex, subjectIndex)}
                    >
                      Delete
                    </button>
                  </div>


                </div>
              ))}

              <button
                className="btn btn-primary mt-2"
                onClick={() => handleAddSubject(divisionIndex)}
              >
                Add Subject
              </button>
            </div>


          </div>
          <div className="row">
            <div className="col-6 col-sm-4 mb-2 mt-3">
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveDivision(divisionIndex)}
              >
                Delete Division
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-3 mb-2">
          <button
            className="btn btn-primary"
            onClick={handleAddDivision}
          >
            Add Division
          </button>
        </div>

        <div className="col-6 mb-2">
          <button className="btn btn-primary sw-btn-next ms-1" onClick={handleNext}>
            Save
          </button>
        </div>
      </div>
    </section >

  );

  // ... rest of your code ...

};

export default StepFour;
