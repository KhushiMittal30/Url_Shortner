import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { QRCode } from 'react-qrcode-logo';
import { UrlState } from '../context';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import Error from './error';
import * as yup from 'yup';
import useFetch from '../hooks/use-fetch';
import { createUrl } from '../db/apiUrls';
import { BeatLoader } from 'react-spinners';


const CreateLink = () => {
    const {user} = UrlState();
    const navigate = useNavigate();
    const [searchParams, setsearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const ref = useRef();
    
    const[errors, setErrors] = useState({})
    const[formValues, setFormValues] = useState({
        title : "",
        longUrl : longLink ? longLink : "",
        customUrl :"",
    });

    const schema = yup.object().shape({
        title : yup.string().required("Title is required"),
        longUrl : yup.string().url("Must be a valid url").required("Long URL is required"),
        customUrl : yup.string(),
    });

    const handleChange = (e) =>{
        setFormValues({
            ...formValues,
            [e.target.id] : e.target.value,
        })}

        const {loading, error, data, fn:fnCreateUrl} =useFetch(createUrl,{...formValues, user_id:user.id});
        
        useEffect(()=>{
            if(error === null && data){
                navigate(`/link/${data[0].id}`);
            }
        },[error, data]);

     const createNewLink = async() =>{
        setErrors([]);
        try{
            await schema.validate(formValues, {abortEarly:false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve)=> canvas.toBlob(resolve));
            
            await fnCreateUrl(blob);
        }catch(e){
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors)
        }
     }
  return (
    <>
      <Dialog defaultOpen={longLink}
      onOpenChange={(res)=>{ if(!res)setsearchParams({})}}>
        <DialogTrigger>
            <Button variant="destructive"> Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
            </DialogHeader>

            {formValues?.longUrl && (<QRCode value={formValues?.longUrl} size={250}  ref={ref}/>)}

            <Input id="title" placeholder="Short Link's Title" onChange={handleChange} value={formValues.title}/>
            {errors.title && <Error message={errors.title}></Error>}

            <Input id="longUrl" placeholder="Enter your long URL " onChange={handleChange} value={formValues.longUrl}/>
            {errors.longUrl && <Error message={errors.longUrl}></Error>}

             <div className="flex items-center gap-2">
            <Card className="p-2 h-12 flex items-center justify-center">trimrr.in</Card> /
            <Input id="customUrl" placeholder="Custom Link (optional)" onChange={handleChange} value={formValues.customUrl}/>
            </div>
            {error && <Error message={error.message}></Error>}
             <DialogFooter className="sm:justify-start">
            <Button disabled={loading} variant="destructive" onClick={()=> createNewLink()}>
                {loading ? <BeatLoader size={10} color="white"/> : "Create Link"}</Button>
          </DialogFooter>
        </DialogContent>
        
        </Dialog>
    </>
  )
}

export default CreateLink;
