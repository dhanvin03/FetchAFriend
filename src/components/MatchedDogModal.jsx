import '../styles/MatchedDogModal.css';

const MatchedDogModal = ({ matchedDog, closeModal }) => {
  if (!matchedDog) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <button onClick={closeModal} className='close-btn'>x</button>

        <div className="modal-content">
          <img src={matchedDog.img} alt={matchedDog.name} />
          <h2 className="card-title">{matchedDog.name}</h2>
          <p className="card-description"><span>Breed:</span> {matchedDog.breed}</p>
          <p className="card-description"><span>Age:</span> {matchedDog.age}</p>
          <p className="card-description"><span>Zip Code:</span> {matchedDog.zip_code}</p>
        </div>
      </div>
    </div>
  )
};

export default MatchedDogModal;