import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import styles from '../CSS/Account.module.css';

const Account = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [bookedVacations, setBookedVacations] = useState([]);

  const fetchAccountData = () => {
    // Ensure there's a user ID available
    if (!user._id) {
      console.error('User or User ID is not available');
      return;
    }

    fetch(`http://localhost:4200/user-data/${user._id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUserData(data))
      .catch(err => console.error('Error fetching specified user data', err));
  };

  const fetchBookedVacations = () => {
    // Ensure there's a user ID available
    if (!user._id) {
      console.error('User or User ID is not available');
      return;
    }

    // Fetch the vacations booked by the user
    fetch(`http://localhost:4200/user-booked-vacations/${user._id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBookedVacations(data))
      .catch(err => console.error('Error fetching booked vacations', err));
  };

  useEffect(() => {  
    fetchAccountData();
    fetchBookedVacations();
  }, [user && user._id]);

  return (
    <UserContext.Provider value={user}>
    <div className={styles.accountContainer}>
      <div className={styles.accountDetails}>
        <h2>{userData.username}</h2>
        <p>Email: {userData.email}</p>
      </div>

      <div className={styles.bookedVacations}>
        {bookedVacations.map((vacation) => (
          <div key={vacation.id} className={styles.bookedVacationTile}>
            <h3>{vacation.destination}</h3>
            <p>{vacation.description}</p>
          </div>
        ))}
      </div>
    </div>
    </UserContext.Provider>
  );
};

export default Account;
