import React, { useState, useEffect } from 'react';
import { readString } from 'react-papaparse';
import siteListCSV from '../data/data.csv';

function Events() {
    const [array, setArray] = useState('');

    const papaConfig = {
        complete: (results, file) => {
          
          setArray(results.data);
          
        },
        download: true,
        header: true,
        error: (error, file) => {
          console.log('Error while parsing:', error, file);
        },
      };
      readString(siteListCSV, papaConfig);

    const fetchEventData = async () => {
        const eventId = Math.floor(Math.random() * 3);
        // const d = '2022-12-03T08:00:00Z';
        // d = d.split('T')[0];
        // console.log(d);

        const dateString = '12/12/1955 12:00:00 AM';
        const date = new Date(dateString);
        // const dateTime = { year: 'numeric', month: 'short', day: 'numeric' };
        setArray(array.data[eventId].start[date]);
      };

      useEffect(() => {
        // Fetch events 
        fetchEventData();
      }, []);
    
  return (
    <div>
    {Array.isArray(array)
        ? array.map((item, index) => (
            
                  <>
                    <p>{item.title}</p>
                    <p>{item.category}</p>
                    <p>{item.start}</p>

                </>
    )): null}
    </div>
  );
}

export default Events;
