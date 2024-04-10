import { useState , useEffect } from "react";
import { useGetAllUserMutation } from "../slices/usersApiSlice";

export function useGetAllUsers(){
    const [alluser, setAllUsers] = useState([]);
    const [getAllUser] = useGetAllUserMutation();

    async function getAllUsers(){
        let {data} = await getAllUser();
        setAllUsers(data.users)
      }
    
      useEffect(()=>{
        getAllUsers();
      },[])

      return [alluser,setAllUsers]
}