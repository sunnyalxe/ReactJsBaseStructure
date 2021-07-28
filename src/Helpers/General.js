import axios from 'axios';
import {checkLogin} from './Session';
import numeral from "numeral";
//capitalize only the first letter of the string. 
export const ucFirst = (string) => (string.charAt(0).toUpperCase() + string.slice(1));
export const getNumberValue = (number,shouldFormat = false) => {
  if(shouldFormat) return numeral(number).format('0,0.[00]');
  else { 
    return parseFloat(numeral(number).format('0.[00]'));
  }
}
export const apiRequest = async (apiFunc, apiSetting ={}) => {
  let baseFunc = 'api';
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;multipart/form-data';
  axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
  axios.defaults.timeout = 1000 * 60; // Wait for 60 seconds
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const method = apiSetting.method ? apiSetting.method : "GET";
  const apiParams = apiSetting.apiParams ? apiSetting.apiParams : {};
  const fileInput = apiSetting.fileInput ? apiSetting.fileInput : null;
  const headerObj = {};
  const axiosConfig = {cancelToken: source.token};
  const loginInfo = checkLogin();
  if(loginInfo && loginInfo.id)
  {
    headerObj['AUTHTOKEN'] = loginInfo.id;
  }

  if(apiSetting.headers && apiSetting.headers.lenght > 0)
  {
    
    for(const [hk,hv] of Object.entries(apiSetting.headers))
    {
      headerObj[hk] = hv;
    }
  }
  if(Object.keys(headerObj).length > 0)
  {
    axiosConfig['headers'] = headerObj;
  }
  
  
  if(method === "POST")
  {
    console.log(apiSetting);
    //return true;
    let formData = new FormData();    
    for(const [key,value] of Object.entries(apiParams))
    {
      if(typeof value === "object") formData.append(key, value && JSON.stringify(value));
      else formData.append(key, value && value);
    }
    //loop on file input keys
    if(fileInput)
    {
      for(const [key,fileObjects] of Object.entries(fileInput))
      {
        //formData.append(`${key}`, fileObjects)
        for(const [fKey,fileObj] of Object.entries(fileObjects))
        {
          formData.append(`${key}[${fKey}]`, fileObj)
        }
      }
    }
    //loop on file input key's array
    return await axios.post(baseFunc,formData,axiosConfig);
  }
  else
  {
    axiosConfig['params'] = apiParams;
    return await axios.get(baseFunc,axiosConfig);
  }
}