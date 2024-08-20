/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 rounded-lg py-1 bg-gradient-to-r from-[#6f34a7] to-[#FF6978] text-white">
            BishtG's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10  lg:hidden" pill color="gray">
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            pill
            color="gray"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" rounded img={currentUser.profilePicture} />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-bold truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/" className="sm:text-[20px] font-bold">
            <Navbar.Link active={path === "/"} as={"div"}>
              Home
            </Navbar.Link>
          </Link>
          <Link to="/about" className="sm:text-[20px] font-bold">
            <Navbar.Link active={path === "/about"} as={"div"}>
              About
            </Navbar.Link>
          </Link>
          <Link to="/projects" className="sm:text-[20px] font-bold">
            <Navbar.Link active={path === "/projects"} as={"div"}>
              Projects
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
