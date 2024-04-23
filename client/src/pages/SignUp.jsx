import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        formData,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "API request failed");
      }

      console.log("Success:", response.data); //
    } catch (error) {
      console.error("Error:", error.message || "An error occurred"); // Log the error for debugging
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-4xl sm:text-xl font-bold dark:text-white "
          >
            <span className="px-2 rounded-lg py-1 bg-gradient-to-r from-[#6f34a7] to-[#FF6978] text-white">
              Bisht G's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            This is a demo project . you can sign up with your email and
            password or with google
          </p>
        </div>
        {/* right */}
        <div className=" flex-1  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="demo@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
