import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
        <div className="w-full py-20 bg-gray-100 min-h-screen flex items-center justify-center">
        <Container>
            <div className="p-8 bg-white rounded-xl shadow-lg max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">👋 Welcome to <span className="text-yellow-500">PostPlus</span></h1>
            <p className="text-gray-600 text-lg">Please login or signup to read and add posts.</p>
            </div>
        </Container>
        </div>
        );
    }

    return (
        <div className="w-full py-16 bg-gray-300 min-h-screen">
        <Container>
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">✨ Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
            ))}
        </div>
        </Container>
        </div>
    );
}

export default Home;
