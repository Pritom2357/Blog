import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config'
import { Container } from '../components';
import {Postcard} from '../components';
import { NavLink } from 'react-router-dom';

export default function Allposts() {
    const [posts, setPosts] = useState([]);
    // const navigate = useNavigate();

    useEffect(()=>{
        appwriteService.getAllPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [])

    console.log(posts);
    

  return posts.length!==0?(
    (
        <div className="flex felx-wrap w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post)=>(
                            <div key={post.$id} className="p-3 sm:w-1/10">
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
      )
  ):(
    (
        <div className='flex flex-col justify-center items-center py-40'>
            <h2 className='text-2xl mb-4'>
                Nobody has Created anything yet.
            </h2>
            <NavLink to='/add-post'>
                <button className='text-3xl font-semibold hover:underline hover:underline-offset-8 hover:text-orange-600'>
                    Be the first one to create Post.
                </button>
            </NavLink>
        </div>
      )
  )
}