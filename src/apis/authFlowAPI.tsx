import axios from "axios";

interface isAuth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
}

const url: string = "http://localhost:4000/api/v1/auth";

export const registerAPI = async (data: any) => {
  try {
    const config:any = { "content-type": "multipart/form-data" };

    return await axios
      .post(`${url}/register`, data, config)
      .then((res: any) => {
        console.log(data)
        return res.data.data;

      });
  } catch (error) {
    console.log("error")
  }
};

export const signIn = async (data:any) => {
  try {
    return await axios
      .post(`${url}/sign-in`, data)
      .then((res: any) => {
        res.data.data;
      });
  } catch (error) {
    console.log("error")
  }
};
