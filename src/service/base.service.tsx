import Response from "../models/response";
import axios from "axios";

export default class BaseService {
  private static baseURL: any = process.env.REACT_APP_ENDPOINT;

  public static async getAll<T>(url: string): Promise<Response> {
    let res = await axios
      .get<Array<T>>(this.baseURL + url)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          return new Response(true, response.data as Array<T>, "Success");
        } else {
          const msg = response.message || "Error";
          return new Response(false, null, msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, error);
      });
    return res;
  }

  public static get<T>(url: string, param: any): Promise<Response> {
    let res = axios
      .get<T>(this.baseURL + url + param)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          return new Response(true, response.data, "Success");
        } else {
          const msg = response.message || "Error";
          return new Response(false, null, msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, error);
      });
    return res;
  }
  public static delete(url: string, id: any): Promise<Response> {
    let res = axios
      .delete(this.baseURL + url + id)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return new Response(true, response.data, "Success");
        } else {
          const msg = response.request || "Error";
          return new Response(false, null, msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, error);
      });
    return res;
  }
  public static create<T>(url: string, obj: T): Promise<Response> {
    let res = axios
      .post(this.baseURL + url, obj)
      .then((response) => {
        console.log("111>>>", response);
        if (response.status === 200 || response.status === 201) {
          return new Response(true, response.data, "Success");
        } else {
          const msg = response.statusText || "Error";
          return new Response(false, null, msg);
        }
      })
      .catch(function (error) {
        console.log("222>>>", error);
        return new Response(false, null, error);
      });
    return res;
  }
  public static update<T>(url: string, param: any, obj: T): Promise<Response> {
    let res = axios
      .put(this.baseURL + url + param, obj)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return new Response(true, response.data, "Success");
        } else {
          const msg = response.request || "Error";
          return new Response(false, null, msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, error);
      });
    return res;
  }
}
