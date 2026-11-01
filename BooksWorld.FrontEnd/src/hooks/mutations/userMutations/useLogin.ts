import { useNavigate } from "react-router";
// import { userService } from "../../../services/UserService";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import type { IUser } from "../../../interfaces/entities/IUser";
import type { LoginReqest } from "../../../types/requests/LoginRequest";
// import { supabase } from "../../../utilities/supabase"
import axios from "axios";

export function useLogin(){  
  const { setUser } = useAuth()
  const navigate = useNavigate()  

  return useMutation({
    mutationKey: ['POST', 'user/login'],
    mutationFn: async (request: LoginReqest) => {
      const response = await axios.post<IUser>(`${import.meta.env.VITE_API_URL}/users/login`, 
        request,
        { withCredentials : true },)
      
      // await supabase.auth.signInWithPassword(
      //   { email: request.Email, password: request.Password });
      
      
      return response
    },
    onSuccess: async (response) => 
    {
      // in all likelihood we must to recive user role in success response
      setUser(response.data)

      const role = await axios.get(
        import.meta.env.VITE_API_URL + "/users/role", // prob. change to "me/role"
        { withCredentials: true })
        .then(r => r.data) 

      navigate(role == "User" ? "/home" : "/admin")
    }
  })
}