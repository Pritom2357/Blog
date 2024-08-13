import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom';
import { Container, Postcard } from '../components/index';

function Home() {
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        appwriteService.getAllPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
  
        return (
            <div className='w-full py-8 pt-4 text-center'>
                <Container>
                    <div className="flex flex-wrap">
                        <div className="py-40 w-full">
                            <p>
                                <h2 className='text-xl p-4 text-blue-800'>
                                    
                                    What are you thinking?
                                </h2>
                                <Link to='/add-post' className='text-2xl font-semibold hover:text-orange-600 hover:underline hover:underline-offset-8 hover:decoration-orange-600'>
                                    Create Some Blogs
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
}

export default Home