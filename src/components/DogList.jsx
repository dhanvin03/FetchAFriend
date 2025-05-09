import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/DogList.css';
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';

const DogList = ({ dogIds, likedDogs, setLikedDogs }) => {
  const [dogs, setDogs] = useState([]);
  const [locations, setLocations] = useState({});

  // Get dog details
  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const dogDetails = await axios.post(`https://frontend-take-home-service.fetch.com/dogs`, dogIds, {
          withCredentials: true,
        });
        const zipCodes = [...new Set(dogDetails.data.map((dog) => dog.zip_code))];

        setDogs(dogDetails.data);
        fetchLocations(zipCodes);
      } catch (error) {
        console.error('Failed to fetch dog details', error);
      }
    };

    if (dogIds.length > 0) {
      fetchDogDetails();
    }
  }, [dogIds]);

  // Get the dog location
  const fetchLocations = async (zipCodes) => {
    try {
      const locationDetails = await axios.post(`https://frontend-take-home-service.fetch.com/locations`, zipCodes, {
        withCredentials: true,
      });
      const locationMap = {};

      locationDetails.data.forEach((location) => {
        locationMap[location.zip_code] = location;
      });
      setLocations(locationMap);
    } catch (error) {
      console.error('Failed to fetch locations', error);
    }
  };

  // Create a Google map URL
  const getGoogleMapsLink = (location) => {
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  };

  // Toggle like and unlike a dog
  const toggleLike = (dog) => {
    setLikedDogs((prev) => (
      prev.some((favoriteDog) => favoriteDog.id === dog.id) ?
        prev.filter((favoriteDog) => favoriteDog.id !== dog.id) :
        [...prev, { id: dog.id, name: dog.name, breed: dog.breed }]
    ));
  };

  return (
    <div className="card-container">
      {dogs.map((dog) => (
        <div className="card" key={dog.id}>
          <img src={dog.img} alt={dog.name} className="card-img" />
          <div className="card-data">
            <div className="title-container">
              <h2 className="card-title">{dog.name}</h2>
              <span className='heart-icon' onClick={() => toggleLike(dog)}>
                {likedDogs.find((likedDog) => likedDog.id === dog.id) ? <FaHeart className="liked" /> : <FaRegHeart />}
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