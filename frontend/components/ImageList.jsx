import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_HOST = import.meta.env.BACKEND_HOST || 'localhost';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const {data} = await axios.get(`http://${BACKEND_HOST}:5000/uploaded_images`);
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    }

    fetchImages();
  }, []);

  console.log(images);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div className='imageList'>
      {images.length > 0 && images.map((image, index) => (
        <div key={index} style={{position: 'relative'}} className='image-container'>
          <img src={`http://${BACKEND_HOST}:5000/images/${image.image}`} alt={`Image ${index}`} />
          <p>{image.caption}</p>
          {image.detections && image.detections.map(det => ((
            <div className='bounding-box' key={det.x} style={{
              position: 'absolute',
              top: det.y,
              left: det.x,
              width: det.width,
              height: det.height,
              border: '2px solid red',
            }}></div>)))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default ImageList;
