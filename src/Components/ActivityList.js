// src/components/ActivityList.js
import React, { useEffect, useState } from 'react';
import { fetchActivities, createActivity } from '../services/api';
import Activity from './Activity';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    const getActivities = async () => {
      try {
        const { data } = await fetchActivities();
        setActivities(data);
      } catch (error) {
        console.error(error);
      }
    };
    getActivities();
  }, []);

  const handleCreateActivity = async () => {
    try {
      const { data } = await createActivity({ activityName: newActivity });
      setActivities([...activities, data]);
      setNewActivity('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="activity-list">
      <h2>Activity List</h2>
      <div className="new-activity">
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="New Activity"
        />
        <button onClick={handleCreateActivity}>Add Activity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Activity Name</th>
            <th>Duration</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <Activity key={activity._id} activity={activity} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList;
