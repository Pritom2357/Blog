import React, { useCallback, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import Button from '../Button';
import Input from '../Input';
import RTE from '../RTE';
import Select from '../Select';
import { login } from '../../store/authSlice';

function Postform({post}) {

  const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
    defaultValues:{
      title:post?.title|| '',
      slug: post?.slug|| '',
      content: post?.content||'',
      status:post?.status||"active"
    }
  })
  
  // console.log("post ", post);
  
  const navigate = useNavigate();
  const userData = useSelector(state=>state.auth.userData);

  const submit = async(data) =>{
    if(post){
      console.log("data ", data);
      console.log("post ", post);
      //TODO: replace null with a default image
      const file = data.image[0]?await appwriteService.uploadFile(data.image[0]):await appwriteService.defaultImage();

      if(file){
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage:file?file.$id:undefined,
      })
      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }
    }else{
      const file = data.image[0]?await appwriteService.uploadFile(data.image[0]): await appwriteService.defaultImage();
      // console.log(file);

      if(file){
        const fileId = file.$id;
        data.featuredImage=fileId;
        console.log(data);
        
        const dbPost = await appwriteService.createPost({
            ...data,
            userID:userData.$id
        });
        if(dbPost){
            navigate(`/post/${dbPost.$id}`);
        }
    }
    }
  };

  const slugTransform = useCallback((value)=>{
    if(value && typeof(value)==='string'){
      return value
            .trim()
            .slice(0, 36)
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
    }
    return '';
  }, [])

  useEffect(()=>{
    const subscription = watch((value, {name})=>{
      if(name === 'title'){
        setValue('slug', slugTransform(value.title,
          {shouldValidate:true}
        ));
      }
    })
    return ()=>{
      subscription.unsubscribe();
    }
  },[watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-slate-100">
            <div className="md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    // readonly="false"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly={true}
                    {...register("slug", { required: false })}
                    onInput={(e) => {
                        setValue("slug", post? slugTransform(userData.title): slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="md:w-1/3 px-2 py-2 md:py-0">
                <Input
                    label="Cover photo :"
                    type="file"
                    className="mb-4"
                    // readonly="false"
                    required={false}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-1/3 mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default Postform