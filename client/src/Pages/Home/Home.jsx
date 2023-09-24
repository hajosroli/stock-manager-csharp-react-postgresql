import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import TopNavbar from "../Navbar";
import { useAuth } from "../../Contexts/AuthContext";
import Loading from "../Loading";

const addFacilityToUser = async (userId, facilityId) => {
  try {
      // Implement your login logic here
      const response = await fetch(process.env.REACT_APP_API_URL + `/facility/addFacility/${userId}/${facilityId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({}),
      });
      if (response.ok) {
        // Facility added successfully, you can handle this case
        console.log("facility added");
      } else {
        // Facility addition failed, handle this case accordingly
        console.error('Facility addition failed');
      }
  }  catch (error) {
      // Handle network or other errors
      console.error('Error logging in:', error);
    }
}
export default function Home() {
  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch( process.env.REACT_APP_API_URL + "/facility/facilities");
        const data = await response.json();
        console.log(data)
        setFacilities(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchFacilities();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div>
      <TopNavbar />
      <div className="table-container">
        <Table striped bordered hover style={{ outline: '2px solid'}}>
          <thead style={{ outline: '2px solid'}}>
            <tr style={{ outline: '2px solid'}}>
              <th>Name</th>
              <th>Sport</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facilities &&
              facilities.map((facility) => (
                <tr key={facility._id}>
                  <td>{facility.name}</td>
                  <td>{facility.sport}</td>
                  <td>{facility.city}</td>
                  <td>{facility.address}</td>
                  <td>
                    <Link
                      to={`/facilities/${facility.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}