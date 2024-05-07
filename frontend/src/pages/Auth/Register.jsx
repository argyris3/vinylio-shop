import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match...');
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
        }).unwrap();
        dispatch(
          setCredentials({
            ...res,
          })
        );
        navigate(redirect);
        toast.success('User Successfully registered');
      } catch (error) {
        console.log(error);
        // toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-3xl font-semibold mb-4 ">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-md font-medium">
              Name
            </label>
            <input
              type="text"
              id="text"
              placeholder="Enter name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-md font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="text"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-md font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className="block text-md font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already Have An Account ?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-pink-500 hover:underline ">
              Login
            </Link>
          </p>
        </div>
      </div>
      <img
        src="https://i.pinimg.com/originals/9d/cd/88/9dcd887de3f8e53b9022475281d13aaa.jpg"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};

export default Register;
