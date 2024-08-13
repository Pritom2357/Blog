import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom';
import Container from '../components/container/Container'
import { Postcard } from '../components';
import { toast } from 'react-toastify';
import authService from '../appwrite/auth';

function Yourpost() {
    const [posts, setPosts] = useState([]);
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //       window.location.reload();
    //     }, 3000); 
    //     return () => clearTimeout(timeout);
    //   }, []);

    const userData = useSelector((state)=>state.auth.userData);
    // console.log(userData);
    // if(userData.$id === null){
    //     toast.warning("refresh please");
    // }
    
    // const user = authService.getCurrentUser();
    // console.log(user.$id);
    

    appwriteService.getAllPosts([]).then((posts)=>{
        if(posts){
            let x=[];
            posts.documents.map((doc)=>{
                if(userData && doc.userID === userData.$id){
                    x.push(doc);
                }
            })
            setPosts(x);
        }
    })
    // console.log(posts);
    
  if(posts.length!==0){
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {
                posts.map((post)=>(
                        <div key={post.$id} className='p-2
                        sm:w-1/10'>
                            <Postcard 
                            {...post}
                            />
                        </div>
                    ))
                }
                </div>
            </Container>
        </div>
      )
  }else{
    return (
        <div className='py-20'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl p-4'>
                    No posts found
                </p>
                <Link className='text-xl hover:underline hover:underline-offset-8 hover:text-orange-600 hover:decoration-orange-600' to='/add-post'>
                    Create Some
                </Link>
            </div>
        </div>
    )
  }
}

export default Yourpost