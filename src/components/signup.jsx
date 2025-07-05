import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import Error from './error'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import * as Yup from "yup";
import useFetch from '../hooks/use-fetch'
import { signup } from '../db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '../context'

const Signup = () => {

  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: null,
  });

  const navigate = useNavigate();
  let[serachParams] = useSearchParams();
  const longLink = serachParams.get("createNew")

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files? files[0] : value,
    }))
  }

 const{data, error, loading, fn:fnSignup} =  useFetch(signup, formData )
 const {fetchUser} = UrlState();
 useEffect(() => {

  if(error === null && data){
     navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
 },[error, loading]);
 
 //handle login validation
  const handleSignup = async() => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email : Yup.string().email("Invalid email").required("Email is required"),
        password : Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
        profilepic : Yup.mixed().required("Profile picture is required ")
      });

      await schema.validate(formData, {abortEarly: false});
      //api call
      await fnSignup();
    } catch (e) {
      const newErros = {};

      e?.inner?.forEach((err) => {
        newErros[err.path] = err.message;
      });

      setErrors(newErros);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>if you don't have one</CardDescription>
          {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent classname="space-y-2">
          <div className="space-y-1 my-2">
            <Input name="name" type="text" onChange={handleInputChange} placeholder="Enter name" />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-1 my-2">
            <Input name="email" type="email" onChange={handleInputChange} placeholder="Enter Email" />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1 my-2">
            <Input name="password" type="password" onChange={handleInputChange} placeholder="Enter Password" />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div className="space-y-1 my-2">
            <Input name="profilepic" type="file" onChange={handleInputChange} accept= "image/*" />
            {errors.profilepic && <Error message={errors.profilepic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? <BeatLoader size={10} color='#36d7b7' /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
