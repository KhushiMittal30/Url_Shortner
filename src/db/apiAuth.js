//import all logic related to logic and signup
//create an api related to login and signup and fo rthat we need to interact with the db

import supabase, { supabaseUrl } from "./supabase";


export async function login({email,password}) {
    
 const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password
 })

    if(error)throw new Error(error.message);
    
    return data;
}

export async function getCurrentUser(){
   const {data : session, error} = await supabase.auth.getSession()
   if(!session.session) return null ;
      if(error) throw new Error(error.message);
   return session.session?.user;

}
 //api for signing up the user 
export async function signup({name, email, password, profilepic}){
   const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const {error: StorageError} = await supabase.storage.from("profilepic").upload(fileName, profilepic)

   if(StorageError) throw new Error(StorageError.message);

    const {data, error } = await supabase.auth.signUp({
      email,
      password,
      options :{
         data :{
            name,
            profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`
         }
      }
   })

   if(error) throw new Error(error.message);

   return data ;
}
