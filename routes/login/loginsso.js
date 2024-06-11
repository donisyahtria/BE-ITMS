import express, { response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma";
import axios from "axios";

const router = express.Router();

// #region version 2

const checkUserExists = async (username) => {
    try {
        const user = await prisma.karyawan.findUnique({
            where: {
              nippos: username
            },
            include:{
              nipposrole: 
              {
                select:{
                  roleid:{
                    select:{
                      nama_role: true
                    }
                  }
                }
              }
            }
          });
      return user;
      
      } catch (error) {
        console.log("Error get karyawan");
          return null
    }
};

const generateTokenApiPos = async () => {
  const encodedCredentials = btoa(process.env.TOKEN_CREDENTIALS);

  // Panggil API TOKEN SSO
  const response = await axios.post(
    process.env.SSO_TOKEN_ENDPOINT,
    {
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + encodedCredentials,
      },
    }
  );
  // console.log(response.data);
  return response.data.access_token;
};

router.post("/login-sso", async (req, res) => {
  const { nippos, password } = req.body;
  try {
    console.log("Generating Token for SSO API ");
    const tokenSSO = await generateTokenApiPos();
    console.log("Token generated: ", tokenSSO);

    const encodedLogin = btoa(nippos + ":" + password);
    // Panggil API Login SSO
    let loginResponse;
    try {
      console.log("Trying To Fetch Login SSO");
      loginResponse = await axios.post(process.env.SSO_LOGIN_ENDPOINT, null, {
        headers: {
          Authorization: `Bearer ${tokenSSO}`,
          "X-POS-Auth": encodedLogin,
          "X-POS-Key": process.env.SSO_X_POS_KEY_LOGIN,
        },
      });
    } catch (error) {
        console.log("Failed to fetch login sso");
      return res.status(400).json({
        message: "Error Login SSO, please contact administrator",
      });
    }

    console.log("Login SSO Success, Checking to Database");
    console.log("data login:", loginResponse.data.data[0]);
    let user = await checkUserExists(loginResponse.data.data[0].nippos);

    if(!user) {
        return response.status(404).json({message:"datanya belom ada bang"})
    }
    console.log("user:", user);
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    console.log("token:", token);
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ message: "Connection to staff server is currently unavailable" });
  }
});

// #endregion



export default router;
