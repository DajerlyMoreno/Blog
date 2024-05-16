import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Llene todos los espacios')
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }catch(error){
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Tu nombre de usuario'/>
              <TextInput
                type='text' placeholder='Username' id='username' onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Tu email'/>
              <TextInput
                type='email' placeholder='Email' id='email' onChange={handleChange}
              />
            </div>
            <div className=''>
              <Label value='Tu contraseña'/>
              <TextInput
                type='password' placeholder='Password' id='password' onChange={handleChange}
              />
            </div>
            <Button type='submit' className='text-black' disabled = {loading}>
              {
                loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
                ): 'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Tienes una cuenta?</span>
            <Link className='text-blue-500' to="/sign-in">
              Sign In
            </Link>
            <div>
              {
                errorMessage && (
                  <Alert className='mt-10' color='failure'>
                    {errorMessage}
                  </Alert>
                )
              }
            </div>
          </div>
        </div>
        <div className='flex-1'>LOGO</div>
      </div>
    </div>
  )
}

