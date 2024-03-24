import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Card, Table } from "react-bootstrap";
import axios from "axios";

const Admin = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [starttimeSlots, setStartTimeSlots] = useState([]);
  const [endtimeSlots, setEndTimeSlots] = useState([]);
  const [daysData, setDaysData] = useState([]);

  const [userDetails, setUserDetails] = useState({});
  const [sessionData, setSessionData] = useState([]);

  const [divisions, setDivisions] = useState(new Set());
  const [divisionData, setDivisionData] = useState({});


  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails || {}); // fallback to an empty object if null
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.username) {
      fetchTimeSlots();
      fetchDivisionData();
      console.log(userDetails.username); // This will now log the correct username
    }
  }, [userDetails]); // This useEffect depends on userDetails and will run after it gets updated

  useEffect(() => {
    changeBackground({ value: 'light', label: 'light' });
  }, []);

  const fetchDivisionData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/generate-timetable/', { username: userDetails.username });
      const data = response.data;

      // Extract divisions and populate division data
      const divisionSet = new Set(data.map(entry => entry.division));
      setDivisions(divisionSet);

      const divisionDataObj = {};
      divisionSet.forEach(division => {
        divisionDataObj[division] = [];
      });

      data.forEach(entry => {
        divisionDataObj[entry.division].push(entry);
      });

      setDivisionData(divisionDataObj);
    } catch (error) {
      console.error('Error fetching division data:', error);
    }
  };

  const fetchTimeSlots = async () => {
    // Ensure that you have userDetails before making the call
    if (!userDetails || !userDetails.username) {
      console.log('No user details available for fetchTimeSlots');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/display-timetable/', { username: userDetails.username });
      setStartTimeSlots(response.data[0].start_times);
      setEndTimeSlots(response.data[0].end_times);
      setDaysData(response.data[0].days.map(day => ({ name: day })));

    } catch (error) {
      console.error('There was an error fetching time slots:', error);
    }
  };


  const renderSessionData = (division, day, timeSlotStart, timeSlotEnd) => {
    const sessions = divisionData[division];
    const session = sessions.find(entry => (
      entry.day === day &&
      entry.start_time <= timeSlotStart &&
      entry.end_time > timeSlotStart
    ));

    if (session) {
      // Session fits in the time slot
      return (
        <>
          <div>Class: {session.classname}</div>
          <div>Teacher: {session.teachername}</div>
          <div>Subject: {session.subjectname}</div>
        </>
      );
    }
    // Empty slot
    return "None";
  };


  return (
    <div>
      {[...divisions].map((division, divisionIndex) => (
        <Card key={divisionIndex}>
          <Card.Header>
            <Card.Title>Division: {division}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive bordered className="verticle-middle">
              <thead>
                <tr>
                  <th scope="col">Day / Time</th>
                  {starttimeSlots.map((startTime, index) => (
                    <th key={index} scope="col">{`${startTime} - ${endtimeSlots[index]}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daysData.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{day.name}</td>
                    {starttimeSlots.map((startTime, slotIndex) => (
                      <td key={slotIndex}>
                        {renderSessionData(division, day.name, startTime, endtimeSlots[slotIndex])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Admin;