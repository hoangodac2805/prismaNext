import { ERRORTYPE } from "@/enums";
import { AxiosError } from "axios";

export const getErrorMessageAxiosError = (
  error: AxiosError<any>,
  fallbackMess: string = "Vui lòng thử lại"
) => {
  let message = fallbackMess;
  if (error.response?.data.name) {
    switch (error.response.data.name) {
      case ERRORTYPE.DATA_ERROR:
        message = error.response.data.message;
        break;
        case ERRORTYPE.ZOD_ERROR:
        let issuesMess:string[] = error.response.data.issues.map((issue:any)=>{
          return capitalize(issue.path[0]) + ": " + issue.message;
        }) 
        message = issuesMess.join('\n');
      default:
        break;
    }
  }

  return message;
};


const capitalize = (text:string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}