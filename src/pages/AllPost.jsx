import React, { useEffect, useState, lazy, Suspense } from "react";

import { Container } from "../components";

import appwriteService from "../appwrite/config";

const PostCard = lazy(() => import("../components/PostCard"));


// export const preLoadPost = () => {
//     import('../components/PostCard');
// }

function AllPost() {
    const [posts, setPosts] = useState([])

    //  useEffect(() => {
    //     preLoadPost();
    //         }, []);
        
    useEffect(() => {

        appwriteService.getAllPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
    }, [])

    console.log(posts.documents);

    return (
        <div className="w-full py-8">
            <Container>
            <div className="flex flex-wrap">
        <Suspense
            fallback={<div>Loading posts...</div>}>
            {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post} />
                </div>
            ))}
        </Suspense>

            </div>
            </Container>

        </div>
    )
}

export default AllPost