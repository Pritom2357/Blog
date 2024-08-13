import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import Button from '../components/Button'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import parse from 'html-react-parser'
import { toast } from 'react-toastify';


function Post() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id:false;

    // console.log("userData: ", userData.$id);
    // if(userData.$id === null){
    //     toast.warning("refresh please");
    // }
    

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                console.log(post);
                if(post) setPost(post);
                else navigate('/');
            });
        }else{
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = ()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate('/');
            }
        });
    };
    // console.log("post ", post.userID);
    
    
  return post ? (
    <div className='py-8'>
        <Container>
            <div className='w-auto flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.$id} 
                className='rounded-xl w-16 h-16'
                />
                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor='bg-green-500' className='mr-3'>
                                <Pencil/>
                            </Button>
                        </Link>
                        <Button bgColor='bg-red-500' className='mr-3' onClick={deletePost}>
                                <Trash2/>
                        </Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6 flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>
                    {post.title}
                </h1>
            </div>
            <div className='browser-css border border-blue-700 p-4 rounded-xl'>
                {post.content?parse(post.content):parse("You did not provide any content")}
            </div>
        </Container>
    </div>
  ):null;
}

export default Post