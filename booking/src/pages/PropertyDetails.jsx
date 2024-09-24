import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyService from "../services/PropertyService";
import ImageService from "../services/ImageService";
import RatingService from "../services/RatingService"; // Assuming you have this service
import PropertyFeatureService from "../services/PropertyFeatureService"; // Assuming you have this service
import RoomService from "../services/RoomService"; // Assuming you have this service
import RoomFeatureService from "../services/RoomFeatureService"; // Assuming you have this service

function PropertyDetails() {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]); // State to store filtered images
  const [ratings, setRatings] = useState([]); // State to store ratings
  const [propertyFeatures, setPropertyFeatures] = useState([]); // State to store property features
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [roomFeatures, setRoomFeatures] = useState([]); // State to store room features

  // Fetch the property details by ID
  useEffect(() => {
    PropertyService.getPropertyById(id)
      .then(response => {
        setProperty(response.data);
      })
      .catch(error => {
        console.error("Error fetching the property details:", error);
      });
  }, [id]);

  // Fetch all images and filter by property ID
  useEffect(() => {
    ImageService.getAllImages()
      .then(response => {
        const allImages = response.data;
        const filteredImages = allImages.filter(image => image.property.id === parseInt(id));
        setImages(filteredImages);
      })
      .catch(error => {
        console.error("Error fetching property images:", error);
      });
  }, [id]);

  // Fetch all ratings and filter by property ID
  useEffect(() => {
    RatingService.getAllRatings()
      .then(response => {
        const allRatings = response.data;
        const filteredRatings = allRatings.filter(rating => rating.property.id === parseInt(id));
        setRatings(filteredRatings);
      })
      .catch(error => {
        console.error("Error fetching property ratings:", error);
      });
  }, [id]);

  // Fetch all property features and filter by property ID
  useEffect(() => {
    PropertyFeatureService.getAllPropertyFeatures()
      .then(response => {
        const allPropertyFeatures = response.data;
        const filteredFeatures = allPropertyFeatures.filter(feature => feature.property.id === parseInt(id));
        setPropertyFeatures(filteredFeatures);
      })
      .catch(error => {
        console.error("Error fetching property features:", error);
      });
  }, [id]);

  // Fetch all rooms and filter by property ID
  useEffect(() => {
    RoomService.getAllRooms()
      .then(response => {
        const allRooms = response.data;
        const filteredRooms = allRooms.filter(room => room.property.id === parseInt(id));
        setRooms(filteredRooms);
      })
      .catch(error => {
        console.error("Error fetching property rooms:", error);
      });
  }, [id]);

  // Fetch all room features and filter by room ID (assuming it depends on rooms already fetched)
  useEffect(() => {
    if (rooms.length > 0) {
      RoomFeatureService.getAllRoomFeatures()
        .then(response => {
          const allRoomFeatures = response.data;
          const filteredRoomFeatures = allRoomFeatures.filter(roomFeature =>
            rooms.some(room => room.id === roomFeature.room.id)
          );
          setRoomFeatures(filteredRoomFeatures);
        })
        .catch(error => {
          console.error("Error fetching room features:", error);
        });
    }
  }, [rooms]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <div className="property-details">
      <h2>{property.property_name}</h2>
      <p>{property.description}</p>

      <div className="property-images">
        {images.length > 0 ? (
          images.map(image => (
            <img
              key={image.id}
              src={image.image} // Assuming image.image contains the image URL
              alt={`Property ${property.property_name}`}
              className="property-image"
            />
          ))
        ) : (
          <p>No images available for this property.</p>
        )}
      </div>

      <div className="property-ratings">
        {ratings.length > 0 ? (
          ratings.map(rating => (
            <p key={rating.id}>Rating: {rating.num}</p>
          ))
        ) : (
          <p>No ratings available for this property.</p>
        )}
      </div>

      <div className="property-features">
        {propertyFeatures.length > 0 ? (
          propertyFeatures.map(feature => (
            <p key={feature.id}>Feature: {feature.property_feature.name}</p>
          ))
        ) : (
          <p>No features available for this property.</p>
        )}
      </div>

      <div className="property-rooms">
        {rooms.length > 0 ? (
          rooms.map(room => (
            <div key={room.id}>
              <p>Room: {room.room_name}</p>
              <p>Price: {room.price_p_n}</p>
            </div>
          ))
        ) : (
          <p>No rooms available for this property.</p>
        )}
      </div>

      <div className="room-features">
        {roomFeatures.length > 0 ? (
          roomFeatures.map(roomFeature => (
            <p key={roomFeature.id}>Room Feature: {roomFeature.room_feature.name}</p>
          ))
        ) : (
          <p>No room features available for this property.</p>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
