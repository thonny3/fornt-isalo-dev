import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);  // Initialisation du localizer avec moment.js

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([
      {
        title: 'Event 1',
        start: new Date(),
        end: new Date(),
      },
      // Ajoutez plus d'événements ici
    ]);
  }, []);

  const rooms = ['Chambre 1', 'Chambre 2', 'Chambre 3']; // Liste des chambres
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']; // Jours de la semaine

  return (
    <div className="calendar-container" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Container des Jours et Chambres */}
      <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: '10px' }}>
        {/* Colonnes pour les jours de la semaine */}
        <div style={{ fontWeight: 'bold' }}></div> {/* Espace vide pour l'alignement */}
        {daysOfWeek.map((day, index) => (
          <div key={index} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}

        {/* Lignes pour les chambres */}
        {rooms.map((room, index) => (
          <React.Fragment key={index}>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{room}</div>
            {daysOfWeek.map((_, dayIndex) => (
              <div key={dayIndex} style={{ padding: '10px', border: '1px solid #ddd' }}>
                <Calendar
                  localizer={localizer}
                  events={events.filter(event => event.start.getDay() === dayIndex)} // Filtre les événements pour le jour actuel
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100px' }} // Ajustez la taille selon vos besoins
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
