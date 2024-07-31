import { ERRORTYPE } from "@/enums";
import { RcFile } from "antd/es/upload";
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
        let issuesMess: string[] = error.response.data.issues.map(
          (issue: any) => {
            return capitalize(issue.path[0]) + ": " + issue.message;
          }
        );
        message = issuesMess.join("\n");
      default:
        break;
    }
  }

  return message;
};

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

