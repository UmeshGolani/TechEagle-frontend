// src/components/Activity.js
import React, { useState, useEffect } from 'react';
import { updateActivity, deleteActivity } from '../services/api';

const Activity = ({ activity, index }) => {
  const [status, setStatus] = useState(activity.status);
  const [duration, setDuration] = useState(activity.duration);

  useEffect(() => {
    let interval;
    if (status === 'Ongoing') {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const { data } = await updateActivity(activity._id, { status: newStatus });
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivity(activity._id);
      window.location.reload(); // To refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  const formatDuration = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{activity.activityName}</td>
      <td>{formatDuration(duration)}</td>
      <td>
        {status !== 'Completed' && (
          <>
            {status === 'Pending' && <button onClick={() => handleUpdateStatus('Ongoing')}>Start</button>}
            {status === 'Ongoing' && <button onClick={() => handleUpdateStatus('Paused')}>Pause</button>}
            {status === 'Paused' && <button onClick={() => handleUpdateStatus('Ongoing')}>Resume</button>}
            {(status === 'Ongoing' || status === 'Paused') && (
              <button onClick={() => handleUpdateStatus('Completed')}>End</button>
            )}
          </>
        )}
        <button onClick={handleDelete}>Delete</button>
      </td>
      <td>{status}</td>
    </tr>
  );
};

export default Activity;
