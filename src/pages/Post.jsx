import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {Button, Container } from "../components"

import parse from "html-react-parser"

import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId
    === userData.$id : false
    // console.log("Welcome in Post");
    // console.log(slug);
    
    
    useEffect(() => {

        const gettingPost = async() => {
           if(slug) {
            try {
                
                const post = await appwriteService.getPost(slug);
                console.log("post is getting", post);
                
                if(post) {
                    setPost(post);
                }
                else{
                    console.log("NO Post found, navigating");
                    navigate('/');
                    
                }
            } catch (error) {
                console.log("Error fetching post: ",error);
                
            }
           }
           else {
            console.log("No slug provided, navigating");
            navigate('/');
            
           }
        }
        gettingPost();

    }, [slug, navigate])


    useEffect(() => {
    const fetchPreview = async () => {
        console.log("post fetched",post.featuredImage);
        
        if (post?.featuredImage) {
            try {
                const result = await appwriteService.getFileView(post.featuredImage);
              
             
                if(result) {
                    console.log("Image preview URL: ", result);
                    setImageUrl(result);
                    
                } else{
                    console.log("No href found in image preview result: ", result);
                    
                }
            } catch (error) {
                console.log("Error fetching image preview:", error);
            }
        }
        };
        fetchPreview();
    }, [post]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if(status){
                appwriteService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    // {
    //     console.log(post.featuredImage);
        
    // }

    
    
    return post ? (
        <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        {
                console.log("image url is: ",imageUrl)
        }
            {imageUrl ? (
                <img 
                    src={imageUrl}
                    alt={post.title}
                    // onError={(e) => { e.target.src = "/fallback.png"; }}
                    className="rounded-lg max-h-[500px] w-auto object-contain transform hover:scale-105 transition duration-300"

                />
            ) : (
                <p>No image available</p>
            )}


            {isAuthor && (
                <div className="absolute right-6 top-6">
                <Link to= {`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                </Button>
                </Link>
                <Button bgColor="bg-red-500"
                onClick={deletePost}>
                    Delete
                </Button>
                </div>
            )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            
            <div className="browser-css">
                {parse(post.content)}
            </div>

        </Container>

        </div>
    ) : null

}
