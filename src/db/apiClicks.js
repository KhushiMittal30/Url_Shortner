import { UAParser } from "ua-parser-js";
import supabase from "./supabase";


//urlIds is an array
export async function getClicksForUrls(urlIds){
   const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIds);

      if(error) {
        console.log(error.message);
        throw new Error("Unable to load Clicks");
      }
   return data;

}

const parser =  new UAParser();

export const storeClicks = async({id, original_url}) =>{
try{
   const res = parser.getResult();
   const device = res.type || "desktop";
   const response = await fetch(`https://ipapi.co/json/`);
   const {city, country_name : country} = await response.json();
   await supabase.from("clicks").insert({url_id : id, country, city, device});

   window.location.href = original_url;

}catch(error){
console.error("Error storing click data:", error);
}

}

export async function getClicksForUrl(url_id){
      const {data, error} = await supabase.from("clicks").select("*").eq("url_id", url_id); 

      if(error) {
        console.log(error.message);
        throw new Error("Unavle to load stats");
      }
   return data;

}
