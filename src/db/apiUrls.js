import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id){
   const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);

      if(error) {
        console.log(error.message);
        throw new Error("Unable to load URLs");
      }
   return data;

}

export async function deleteUrl(id){
   const {data, error} = await supabase.from("urls").delete().eq("id", id);

      if(error) {
        console.log(error.message);
        throw new Error("Unable to delete URLs");
      }
   return data;

}
export async function createUrl({title, longUrl, customUrl, user_id}, qrcode){
    
    const short_url = Math.random().toString(36).substring(2,6);
   const fileName = `qr-${short_url}`;
  const {error: StorageError} = await supabase.storage.from("qrs").upload(fileName, qrcode)

   if(StorageError) throw new Error(StorageError.message);

   const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  
   const {data, error} = await supabase.from("urls").insert([
      {
         title,
         original_url : longUrl,
         custom_url : customUrl || null,
         user_id,
         short_url, 
         qr,
      }
   ])
   .select();

      if(error) {
        console.log(error.message);
        throw new Error("Unable to create short URLs");
      }
   return data;

}