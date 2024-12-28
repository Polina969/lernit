import { Request } from 'express'; 

export type RequestWithParams<T> = Request<T>
export type RequestWithResBody<T> = Request<{}, T>
export type RequestWithReqBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

export type RequestWithParamsAndReqBody<T, B> = Request<T, {}, B>
export type RequestWithdResBodyAndReqBody<T, B> = Request<{}, T, B>