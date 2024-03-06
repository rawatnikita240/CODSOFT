import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import InputFrom from '../components/shared/InputFrom';
import {useDispatch , useSelector} from 'react-redux';
import {hideLoading, showLoading} from"../redux/features/alertSlice";
import axios from 'axios';
import Spinner from '../components/shared/spinner';
import { toast } from 'react-toastify';

const Register = () => {
  const[name,setname] = useState("");
  const[lastname,setlastname] =useState("");
  const[email,setemail] =useState("");
  const[password,setpassword] = useState("");
  
  //redux
  const {loading} = useSelector(state => state.alerts)


  //hooks
  const dispatch = useDispatch()
  const navigate = useNavigate() 
 //form function
 const handleSubmit = async (e) => {
  e.preventDefault()
  try{
    if(!name || !lastname || !email || !password){
      return alert('please provide all fields')
    }
    dispatch(showLoading())
    const{data} = await axios.post('/api/v1/auth/register',{name,lastname,email,password})
    dispatch(hideLoading())
    if(data.success){
      toast.success('Register successfully')
      navigate('/login')
    }
  }catch(error){
    dispatch(hideLoading());
    toast.error('invalid from details please try again');
    console.log(error);
  }
 }
  return (
    <>
    {loading ? (<Spinner/>) : (
      <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <img src='/images/download (2).jpg' alt='job portal' height={250} width={400}/>
        <InputFrom htmlFor="name" labelText={'Name'} type={'text'} value={name} handleChange={(e) => setname(e.target.value)}
        name="name"
        />
       <InputFrom htmlFor="lastname" labelText={'Last Name'} type={'text'} value={lastname} handleChange={(e) => setlastname(e.target.value)}
        name="lastname"
        />
        <InputFrom htmlFor="email" labelText={'Email'} type={'email'} value={email} handleChange={(e) => setemail(e.target.value)}
        name="email"
        />
        <InputFrom htmlFor="password" labelText={'Password'} type={'password'} value={password} handleChange={(e) => setpassword(e.target.value)}
        name="password"
        />
        <div className='d-flex justify-content-between'>
          <p>already have account? <Link to="/login">click here</Link></p>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
        
      </form>
      </div>
    )}
    </>
  )
}


export default Register;
