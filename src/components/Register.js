<<<<<<< HEAD
import { SettingsInputAntennaTwoTone, TrendingUp, Troubleshoot } from "@mui/icons-material";
=======
>>>>>>> 18e1a7584878a339de60b412e34dfe28a89b31f9
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
  

  let handleChange= (e) =>{
    setUser({...user,[e.target.name]: e.target.value})
    console.log(user);
  }
  
  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
   console.log(formData);
   if(validateInput(formData))
    try{
      
      {
        let res = await axios.post(config.endpoint + "/auth/register", 
        { username: formData.username, password: formData.password } );
        if(res.status===201){
          enqueueSnackbar("Registered Successfully",{variant:"success"})
        }
      }

    }
    catch(error){
      if(error.response&&error.response.status===400){
        enqueueSnackbar(error.response.data.message,{variant:"error"})

      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running and returns valid JSON.",{variant:"error"});
      }

    }
  
    
  
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    //console.log(data);
    if(data.username===""){
      enqueueSnackbar("Username is a required field",{variant:"error"})
      return true
    }
    else if(data.username.length<6){
      enqueueSnackbar("Username must be at least 6 characters",{variant:"error"})
      return true
    }
    else if(data.password===""){
      enqueueSnackbar("Password is a required field",{variant:"error"})
      return true
    }
    else if(data.password.length<6){
      enqueueSnackbar("Password must be at least 6 characters",{variant:"error"})
      return true
    }
    else if(data.password!=data.confirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:"error"})
      
      
    }
    else{
      return true;
    }
  };
  // validateInput(user);
  const handleOnSubmit = () => {
    //take data form state
      //step1: do input validation -> const validData =  inputValidation(state data);
      // if (validData){
      //     make post call with data
      //     enqueusbar status based on api status
      //     if(api call sucess){

      //     }else{
            
      //     }
      // }else{
      //   enqueqeBar status saying that validation failed.
      // }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form" >
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            onChange={handleChange}
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            fullWidth
          />
          <Button className="button" variant="contained" onClick = {()=>{register(user)}}>
            Register Now
          </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="#">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
