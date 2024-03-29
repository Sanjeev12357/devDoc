import React from 'react';
import './Flow.css';

const Flow = () => {
  const activities = [
    {
      time: '7:00 AM',
      activity: 'Wake up',
      description: 'Start your day early and fresh.',
    },
    {
      time: '8:00 AM',
      activity: 'Breakfast',
      description: 'Eat a balanced and nutritious breakfast, such as oatmeal with fruits, eggs, or whole-grain toast.',
    },
    {
      time: '10:00 AM',
      activity: 'Light Exercise',
      description: 'Go for a brisk walk or do some light exercise to get your body moving.',
    },
    {
      time: '12:30 PM',
      activity: 'Lunch',
      description: 'Have a healthy and balanced lunch, such as a salad with lean protein and whole grains.',
    },
    {
      time: '2:00 PM',
      activity: 'Work or Study',
      description: 'Focus on your work or studies to be productive.',
    },
    {
      time: '5:00 PM',
      activity: 'Exercise',
      description: 'Engage in moderate to intense exercise, such as running, cycling, or strength training.',
    },
    {
      time: '7:30 PM',
      activity: 'Dinner',
      description: 'Enjoy a balanced and nutritious dinner, such as grilled fish with steamed vegetables and brown rice.',
    },
    {
      time: '9:00 PM',
      activity: 'Relaxation',
      description: 'Engage in relaxing activities, such as reading, listening to music, or practicing mindfulness.',
    },
    {
      time: '11:00 PM',
      activity: 'Sleep',
      description: 'Get at least 7-8 hours of quality sleep to recharge for the next day.',
    },
  ];

  return (
    <div className="timeline-container">
      <h2>Daily Routine Suggested by a Doctor</h2>
      <div className="timeline">
        {activities.map((activity, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{activity.time}</h3>
              <h4>{activity.activity}</h4>
              <p>{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flow;