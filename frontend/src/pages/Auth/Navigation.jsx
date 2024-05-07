import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaRecordVinyl } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import FavoritesCount from "../Products/FavoritesCount";
import vinyl from "../../public/vinyl.png";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className=" bg-base-200">
      <div className="navbar align-element  ">
        <div className="navbar-start">
          <Link
            to="/"
            className="hidden lg:flex btn btn-base-content text-4xl items-center"
          >
            <span>
              <img className="w-8 h-8" src={vinyl} alt="" />
            </span>
            Vinylio Shop
          </Link>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content  mt-3 z-[1] p-2 shadow-md bg-base-200 rounded-box w-52  "
            >
              <li>
                <Link to="/" className="flex items-center hover:bg-red-400 ">
                  <AiOutlineHome className="mr-2 " size={26} />
                  <span className="text-2xl"> Home</span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center hover:bg-red-400">
                  <AiOutlineShopping className="mr-2 " size={26} />
                  <span className="text-2xl">Shop</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center  hover:bg-red-400"
                >
                  <AiOutlineShoppingCart className="mr-2 " size={26} />
                  <span className="text-2xl">Cart</span>
                  {cartItems.length > 0 && (
                    <span>
                      <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </span>
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/favorite"
                  className="flex items-center hover:bg-red-400 "
                >
                  <FaHeart className="mr-2 " size={26} />
                  <span className="text-2xl">Wishlist</span>
                  <FavoritesCount />
                </Link>
              </li>

              <li className="mt-6">
                {userInfo ? (
                  <span className="text-white">{userInfo.username}</span>
                ) : (
                  <></>
                )}
                {userInfo && userInfo.isAdmin && (
                  <>
                    <div className="navbar dropdown dropdown-right ">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-primary btn-circle  "
                      >
                        Admin
                        <ul
                          tabIndex={0}
                          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/productlist"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/categorylist"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Category
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/orderlist"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/userlist"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {!userInfo && (
                  <ul className="menu menu-horizontal">
                    <li>
                      <Link
                        to="/login"
                        className="flex text-xl items-center mt-1 "
                      >
                        <AiOutlineLogin className="mr-2 " size={16} />
                        <span className="">LOGIN</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="flex items-center hover:bg-red-400 "
                      >
                        <AiOutlineUserAdd className="mr-2 " size={26} />
                        <span className="text-2xl">Register</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {userInfo && (
                <button
                  onClick={logoutHandler}
                  className="flex items-center  hover:bg-slate-200 text-xl"
                >
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
        <div className=" hidden lg:flex  items-center navbar-center   ">
          <ul className="menu menu-horizontal  ">
            <li>
              <Link to="/" className="flex items-center hover:bg-red-400 ">
                <AiOutlineHome className="mr-0.5 " size={16} />
                <span className="text-xl"> Home</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center hover:bg-red-400">
                <AiOutlineShopping className="mr-0.5 " size={16} />
                <span className="text-xl">Shop</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center  hover:bg-red-400">
                <AiOutlineShoppingCart className="mr-0.5 " size={16} />
                <span className="text-xl">Cart</span>
                {cartItems.length > 0 && (
                  <span>
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to="/favorite"
                className="flex items-center hover:bg-red-400 "
              >
                <FaHeart className="mr-0.5 " size={16} />
                <span className="text-xl">Wishlist</span>
                <FavoritesCount />
              </Link>
            </li>
          </ul>

          <div className=" menu menu-horizontal">
            {userInfo ? (
              <span className="text-white text-xl capitalize">
                {userInfo.username}
              </span>
            ) : (
              <></>
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <div className="navbar dropdown dropdown-bottom ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-primary btn-circle  "
                  >
                    Admin
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Users
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {!userInfo && (
              <ul className="menu menu-horizontal">
                <li>
                  <Link to="/login" className="flex text-xl items-center mt-1 ">
                    <AiOutlineLogin className="mr-2 " size={16} />
                    <span className="">Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex text-xl items-center mt-1 "
                  >
                    <AiOutlineUserAdd size={16} />
                    <span className=" ">Register</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <li className="menu menu-horizontal">
            {userInfo && (
              <button
                onClick={logoutHandler}
                className="flex items-center  hover:bg-slate-200 text-xl"
              >
                Logout
              </button>
            )}
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
