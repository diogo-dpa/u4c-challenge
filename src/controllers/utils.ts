import { ResponseToolkit } from "@hapi/hapi";

export class ResponseHandler {

    static successResponse(
        responseReference: ResponseToolkit, 
        message: string,
        dataReturned?: any
    ){
        if (dataReturned) {
            return responseReference.response({
                message,
                data: {...dataReturned}
            }).code(200)
        }

        return responseReference.response({
            message
        }).code(200)
    }

    static errorResponse(
        responseReference: ResponseToolkit, 
        message: string
    ){
        return responseReference.response({
            message: `Internal message: ${message}`
        }).code(500)
    }
}