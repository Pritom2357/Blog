import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config'
import { Postform } from '../components';

function Editpost() {
    const [post, setPost] = useState();
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    console.log(post);
                    setPost(post);
                }
            })
        }else{
            navigate('/');
        }
    }, [slug, navigate])

    return post?(
        <div className="py-8">
            <Postform
             post={post}
            />
        </div>
    ):null;
}

export default Editpost