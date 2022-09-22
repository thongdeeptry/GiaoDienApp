import axiosInstance from '../../../ultil/axios';


export const login = async(email,password) =>{
    const data = {
        email: email,
        password: password
    }
    const response = await axiosInstance.post('api/auth/login',data);
    return response;
}
export const register = async(email,password) =>{
    const data = {
        email: email,
        password: password
    }
    const response = await axiosInstance.post('api/users/register',data);
    return response;
}