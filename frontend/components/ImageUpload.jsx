import { useRef, useState } from 'react';
import axios from 'axios';

const BACKEND_HOST = import.meta.env.BACKEND_HOST || 'localhost';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      await axios.post(`http://${BACKEND_HOST}:5000/upload_files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setLoading(false);
      setImage(null);
      setCaption('');
      fileRef.current.value = null;
    }
  };

  console.log(loading);

  return (
    <div className='formContainer'>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} ref={fileRef} />
        <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;