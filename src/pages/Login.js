import React ,{ useState }from 'react'
import InputFrom from '../components/shared/InputFrom';
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Spinner from '../components/shared/spinner';
import { toast } from 'react-toastify';
const Login = () => {
  const[email,setemail] = useState("");
  const[password, setpassword] = useState("");
  //hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //redux state
const {loading} = useSelector(state => state.alerts);

  //form function
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login",{email,password});
      if(data.success){
        dispatch(hideLoading());
        localStorage.setItem('token',data.token);
        toast.success('login successfully');
        navigate('/dashboard');
      }
    }catch(error){
      dispatch(hideLoading())
      toast.error("invalid credintal please try again");
      console.log(error);
    }
  };
  return (
    <>
   {loading ? (<Spinner/>):(
     <div className='form-container'>
     <form onSubmit={handleSubmit}>
       <img src='/images/download (2).jpg' alt='job portal' height={250} width={400}/>
       <InputFrom htmlFor="email" labelText={'Email'} type={'email'} value={email} handleChange={(e) => setemail(e.target.value)}
       name="email"
       />
       <InputFrom htmlFor="password" labelText={'Password'} type={'password'} value={password} handleChange={(e) => setpassword(e.target.value)}
       name="password"
       />
       <div className='d-flex justify-content-between'>
         <p>Not a user? <Link to="/register">Register here!</Link></p>
         <button type="submit" className="btn btn-primary">Register</button>
       </div>
         </form>
         </div>
   )}
    </>
  );
};
export default Login;
