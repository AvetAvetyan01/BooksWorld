import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/useAuth";
import type { IUser } from "../../../interfaces/entities/IUser";
import type { SigninReqest } from "../../../types/requests/SigninRequest"
import axios from "axios";

export function useSignin(){
  const { setUser } = useAuth()

  return useMutation({
    mutationKey: ['POST', 'user/signin'],
    mutationFn: async (request: SigninReqest) => {
      const response = await axios.post<IUser>(`${import.meta.env.VITE_API_URL}/users/register`, 
        request,
        { withCredentials : true })

    return response
    },
    onSuccess: (response) => setUser(response.data)
  })  
}