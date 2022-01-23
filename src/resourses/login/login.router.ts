import { IncomingMessage, ServerResponse} from "http";
import { REQUEST_METHODS, STATUS_CODES } from "../../constants/constants";
import { ERRORS } from "../../constants/errors";
import { requestDataExtractor } from "../../helpers/request";
import { sendResponse } from "../../helpers/response";
import { IError } from "../../interfaces/errors";
import { IUserLogin } from "../../interfaces/users";
import { postLoginObjValodator } from "../../validators/userValidator";
import { createToken } from "./login.service";

export const loginController= async (req: IncomingMessage, res: ServerResponse, time: number): Promise<void> => {
    const url = req.url as string;

    try {
        if(req.method === REQUEST_METHODS.POST && url === '/login'){
            const data = await requestDataExtractor(req);
            let dataObj: IUserLogin;
            try {
                dataObj = JSON.parse(data);
            } catch(e) {
            return sendResponse(req, res, STATUS_CODES.SERVER_ERROR, time, ERRORS.JSON_PARSE_ERR);
            }
            postLoginObjValodator(dataObj);
            const token = await createToken(dataObj);
            return sendResponse(req, res, STATUS_CODES.CREATED, time, token)
        }
    }catch (e: unknown) {
        const transformedE = e as IError;
        const status = transformedE.status ? transformedE.status : STATUS_CODES.SERVER_ERROR;
        sendResponse(req, res, status, time, transformedE);
    }
   
}

    