import React from 'react'
import Container from '../components/container/Container'
import  Postform  from '../components/Postform/Postform'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <Postform/>
        </Container>
    </div>
  )
}

export default AddPost