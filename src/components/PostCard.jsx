import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom'



function PostCard({ $id, title, featuredImage }) {
    // const imageUrl = appwriteService.getFileView(featuredImage);
    // console.log("postcard",imageUrl);
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        const fetchImage = async() => {
            try {
                const url = await appwriteService.getFileView(featuredImage);
                setImageUrl(url);
            } catch (error) {
                console.log("Error fetching image URL", error);
                
            }
        }
        if(featuredImage){
            fetchImage();
        }
    },[featuredImage])

    return (
        <Link to={`/post/${$id}`}>
          <div className="w-64 h-80 bg-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
            {featuredImage && (
              <div className="w-full h-48 mb-4 overflow-hidden flex justify-center items-center bg-white rounded-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h2 className="text-lg font-bold text-center mt-auto">{title}</h2>
          </div>
        </Link>
      );
      

      
      
}

export default PostCard

