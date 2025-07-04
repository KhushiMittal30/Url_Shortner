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
import { login } from '../db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '../context'

const Login = () => {

  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let[serachParams] = useSearchParams();
  const longLink = serachParams.get("createNew")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

 const{data, error, loading, fn:fnLogin} =  useFetch(login, formData )
 const {fetchUser} = UrlState();
 useEffect(() => {

  if(error === null && data){
     navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
 },[data,error])
 
 //handle login validation
  const handleLogin = async() => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email : Yup.string().email("Invalid email").required("Email is required"),
        password : Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required"),
      });

      await schema.validate(formData, {abortEarly: false});
      //api call
      await fnLogin();
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
          <CardTitle>Login</CardTitle>
          <CardDescription>to your account if you already have one</CardDescription>
          {error && <Error message={error.message}/>}
        </CardHeader>
        <CardContent classname="space-y-2">
          <div className="space-y-1 my-1">
            <Input name="email" type="email" onChange={handleInputChange} placeholder="Enter Email" />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input name="password" type="password" onChange={handleInputChange} placeholder="Enter Password" />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color='#36d7b7' /> : "login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
