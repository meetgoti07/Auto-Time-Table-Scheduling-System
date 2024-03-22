import React, { useState,useEffect } from "react";

const StepFive = ({ onNextClick }) => {
  const [daysOfWeek, setDaysOfWeek] = useState([{ Day: "" }]);
  const [sessionTimes, setSessionTimes] = useState([
    { StartTime: "", EndTime: "" },
  ]);
  const [breakData, setBreakData] = useState({ BreakStartTime: "", BreakEndTime: "" });
  
  const handleBreakInputChange = (event) => {
    setBreakData({ ...breakData, [event.target.name]: event.target.value });
  };

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);
  const handleAddDay = () => {
    setDaysOfWeek([...daysOfWeek, { Day: "" }]);
  };

  const handleRemoveDay = (index) => {
    const updatedDaysOfWeek = [...daysOfWeek];
    updatedDaysOfWeek.splice(index, 1);
    setDaysOfWeek(updatedDaysOfWeek);
  };

  const handleAddSessionTime = () => {
    setSessionTimes([...sessionTimes, { StartTime: "", EndTime: "" }]);
  };

  const handleRemoveSessionTime = (index) => {
    const updatedSessionTimes = [...sessionTimes];
    updatedSessionTimes.splice(index, 1);
    setSessionTimes(updatedSessionTimes);
  };

  const handleInputChange = (index, event, type) => {
    if (type === "Day") {
      const updatedDaysOfWeek = [...daysOfWeek];
      updatedDaysOfWeek[index][event.target.name] = event.target.value;
      setDaysOfWeek(updatedDaysOfWeek);
    } else if (type === "StartTime" || type === "EndTime") {
      const updatedSessionTimes = [...sessionTimes];
      updatedSessionTimes[index][event.target.name] = event.target.value;
      setSessionTimes(updatedSessionTimes);
    }
  };

  const handleNext = () => {
    // Create a new array with the user object followed by the rows
    const dataToSend = [
      { user: userDetails.username },
      { daysOfWeek, sessionTimes, breakData }
    ];
    // Call the onNextClick callback with the modified data
    onNextClick(dataToSend);
  };

  return (
    <section>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">Days in Week</div>
          </div>
          {daysOfWeek.map((day, index) => (
            <div className="row" key={index}>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="Day"
                    value={day.Day}
                    onChange={(e) => handleInputChange(index, e, "Day")}
                    className="form-control"
                    placeholder="Monday"
                    required
                  />
                </div>
              </div>
              <div className="col-6 col-sm-4 mb-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveDay(index)}
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
                onClick={handleAddDay}
              >
                Add Day
              </button>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="row">
            <div className="col-8">Session Time</div>
          </div>
          {sessionTimes.map((session, index) => (
            <div className="row" key={index}>
              <div className="col-4">
                <div className="form-group">
                  <input
                    type="time"
                    name="StartTime"
                    value={session.StartTime}
                    onChange={(e) => handleInputChange(index, e, "StartTime")}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <input
                    type="time"
                    name="EndTime"
                    value={session.EndTime}
                    onChange={(e) => handleInputChange(index, e, "EndTime")}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col-6 col-sm-2 mb-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveSessionTime(index)}
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
                onClick={handleAddSessionTime}
              >
                Add Session
              </button>
            </div>
          </div>
        </div>

<div className="col-6 mb-2">
  <div className="row">
    <div className="col-6">Break Start Time</div>
    <div className="col-6">Break End Time</div>
  </div>
  <div className="row">
    <div className="col-6">
      <input
        type="time"
        name="BreakStartTime"
        value={breakData.BreakStartTime}
        onChange={handleBreakInputChange}
        className="form-control"
        required
      />
    </div>
    <div className="col-6">
      <input
        type="time"
        name="BreakEndTime"
        value={breakData.BreakEndTime}
        onChange={handleBreakInputChange}
        className="form-control"
        required
      />
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

export default StepFive;
