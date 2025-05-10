import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserImages = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          setError("User ID is missing.");
          setLoading(false);
          return;
        }
        const response = await fetch(`https://centkey-backend.onrender.com/user/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading user images...</div>; // Simple loader
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  // Check if user.files exists and is an array
  if (!user.files || !Array.isArray(user.files) || user.files.length === 0) {
    return <div>No images found for this user.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.files.map((file, index) => {
          // Convert the image data to a base64 string
          const base64Image = `data:${file.contentType};base64,${Buffer.from(file.data.data).toString('base64')}`;

          return (
            <div key={index} className="rounded-lg shadow-md overflow-hidden">
              <img
                src={base64Image}
                alt={`User file ${index + 1}`}
                className="w-full h-48 object-cover" // Adjust height as needed
              />
              <div className="p-2">
                <p className="text-sm text-gray-700">File {index + 1}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserImages;
