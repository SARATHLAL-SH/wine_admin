import React,{useState,useCallback,useEffect} from 'react'
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '50vh'
};
const center = {
    lat: 22.5726,
    lng: 88.3639
  };


  function LocationSelector({markerPosition,setMarkerPosition}) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCR6m47owJG21hUsWuE3FbMR0sJS1NMO_Q'
      });
      
      const onMapClick = useCallback((event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
      }, []);

    return isLoaded ? (
    <div className="relative ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </div>
    ) : <></>;
  }

export default LocationSelector
