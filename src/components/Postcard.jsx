import React from 'react'
import {Link} from 'react-router-dom'
import appwriteService from '../appwrite/config'
 
function Postcard({
    $id,
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-32 bg-blue-100 rounded-xl p-2 border border-blue-600'>
            <div className='w-full flex flex-wrap justify-center items-center mb-2'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-20 h-20 rounded-xl border border-blue-500' />
            </div>
            <h2 className='text-xl font-bold truncate max-w-34'>{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard