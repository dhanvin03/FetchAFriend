import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/DogList.css';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const DogList = ({ dogIds }) => {
  const [dogs, setDogs] = useState([]);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const dogDetails = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, dogIds, {
          withCredentials: true,
        });

        setDogs(dogDetails.data);

        const zipCodes = [...new Set(dogDetails.data.map(dog => dog.zip_code))];
        fetchLocations(zipCodes);

      } catch (error) {
        console.error('Failed to fetch dog details', error);
      }
    };

    if (dogIds.length > 0) {
      fetchDogDetails();
    }
  }, [dogIds]);

  const fetchLocations = async (zipCodes) => {
    try {
      const locationDetails = await axios.post(`https://frontend-take-home-service.fetch.com/locations`, zipCodes, {
        withCredentials: true,
      });

      const locationMap = {};
      locationDetails.data.forEach(location => {
        locationMap[location.zip_code] = location;
      });

      setLocations(locationMap);

    } catch (error) {
      console.error('Failed to fetch locations', error);
    }
  };

  const getGoogleMapsLink = (location) => {
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  }

  return (
    <div className="card-container">
      {dogs.map((dog) => (
        <div className="card" key={dog.id}>
          <img src={dog.img} alt={dog.name} className="card-img" />
          <div className="card-data">
            <div className="title-container">
              <h2 className="card-title">{dog.name}</h2>
              <span className='heart-icon'>
                <FaHeart className="liked" />
              </span>
            </div>
            <p className="card-description"><span>Breed:</span> {dog.breed}</p>
            <p className="card-description"><span>Age:</span> {dog.age}</p>
            <p className="card-description"><span>Location: </span>
              {locations[dog.zip_code] ? `${locations[dog.zip_code].city}, 
               ${locations[dog.zip_code].state} ${dog.zip_code} (${locations[dog.zip_code].county})` : 'Loading...'
              }
            </p>
            {locations[dog.zip_code] && (
              <a href={getGoogleMapsLink(locations[dog.zip_code])} target='_blank' rel="noopener noreferrer" className='google-maps'>
                <span>Google Maps</span>
                <FaMapMarkerAlt className='map-icon' />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogList;