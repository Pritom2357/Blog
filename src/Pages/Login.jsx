import React, { useState } from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
    const [show, setShow] = useState(false);
  return (
    <div className='py-8'>
        <LoginComponent/>
    </div>
  )
}

export default Login