import React, { useRef } from 'react'
import { X } from 'lucide-react';
import { Download } from 'lucide-react';

function Popup({onClose})//pass a function
 {
    const modalRef = useRef();

    const closeModal = (e)=>{
        if(modalRef.current===e.target){
            console.log(modalRef);
            onClose();
        }
    }
  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-white bg-violet-600 p-4 rounded-xl'>
            <button className='place-self-end'
            onClick={onClose}><X size={30}/></button>
            <div className='px-20 pb-10 flex flex-col items-center mx-4'>
                <form action="" className='text-center w-full'>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Popup