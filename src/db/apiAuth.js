//import all logic related to logic and signup
//create an api related to login and signup and fo rthat we need to interact with the db

import { error } from "console";
import supabase from "./supabase";


export async function login({email,password}) {
    
 const {data, err} = await supabase.auth.signInWithPassword({
    email,
    password
 })

    if(error)throw new Error(error.message);
    
    return data;


}