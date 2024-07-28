import { AUTHEN_ENDPOINT } from "../endpoint";
import { baseApi } from "./base.api";

const Login = (userInput: LoginUserInput) => {
  return baseApi.post<LoginRes>(AUTHEN_ENDPOINT.LOGIN,userInput);
};

const Register = (userInput: RegisterUserInput) => {
  return baseApi.post<RegisterRes>(AUTHEN_ENDPOINT.REGISTER,userInput);
};


const VerifyToken = () =>{
  return baseApi.get<VerifyTokenRes>(AUTHEN_ENDPOINT.VERIFY_TOKEN)
}
const AuthApi = {
  Login,
  Register,
  VerifyToken
};
export default AuthApi;
