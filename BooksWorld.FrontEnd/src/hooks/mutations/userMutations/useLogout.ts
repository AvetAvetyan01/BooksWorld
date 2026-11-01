import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogout(){
  const { setUser } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ["POST", "user/logout"],
    mutationFn: async () => await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`,{},{ withCredentials: true }),
    onSuccess: () => {
      setUser(null)
      navigate("/home")
    }
  })
}