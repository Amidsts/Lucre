import { Request, Response, NextFunction } from "express";

export async function asyncWrapper(
  callback: () => Promise<Response> | Response | any,
  res: Response,
  next?: NextFunction
) {
  try {
    const result = await callback();
    return result;
  } catch (err) {
    // if (err instanceof ZodError) {
    //   next(Error(`${err.errors[0].path}: ${err.errors[0].message}`));
    //   return;
    // }
    // if (err instanceof AxiosError) {
    //   // console.log(err.response);
    //   if (err.response) {
    //     const { data } = err.response;

    //     if (
    //       (data.error && "first_image" in data.error) ||
    //       (data.error && "second_image" in data.error)
    //     )
    //       return next(Error(`image: ${data.error.first_image}`));

    //     if (data.errors instanceof Array)
    //       return next(Error(`Ebay Error: ${data.errors[0].longMessage}`));

    //     return next(
    //       Error(
    //         `Axios error: ${err.response.data.message ?? err.response.data}`
    //       )
    //     );
    //   } else {
    //     return next(Error(`Axios error: ${err.response.data}`));
    //   }
    // }

    return next(err);
  }
}
