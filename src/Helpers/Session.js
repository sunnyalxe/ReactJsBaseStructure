import CryptoJS from "crypto-js"; 
var eKey = process.env.REACT_APP_ENC_KEY;
const saveVariable = (name,value,isLocal=false) => {
  try {
    if(value === null || value === '')
    {
      removeVariable(name);
    }
    else if(Array.isArray(value) || typeof value === 'object')
    {
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), eKey).toString();
      sessionStorage.setItem(name,ciphertext);
      if(isLocal)
      {
        localStorage.setItem(name,ciphertext);
      }
    }
    else
    {
      let ciphertext = CryptoJS.AES.encrypt(value, eKey).toString();
      sessionStorage.setItem(name,ciphertext);
      if(isLocal)
      {
        localStorage.setItem(name,ciphertext);
      }
    }
  } catch (error) {
    console.log("Something went wrong while saving local state",error);
  }  
}

const removeVariable = (name) =>{
  sessionStorage.removeItem(name);
  localStorage.removeItem(name);
}

const clearAll = () => {
  localStorage.clear();
  sessionStorage.clear();
}
const getVariable = (name,isLocal=false) => {
  try {
    if(isLocal)
    {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(localStorage.getItem(name), eKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    else
    {
      // Decrypt
      let bytes = CryptoJS.AES.decrypt(sessionStorage.getItem(name), eKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }    
  } catch (error) {
    return undefined;
  }
}
const checkLogin = () => {
  const rememberMe = getVariable('rememberMe',true);
  if(rememberMe)
  {
    saveVariable('user',JSON.stringify(getVariable('user',true)));
    return getVariable('user',true);
  }
  else
  {
    return getVariable('user');
  }
}

export {saveVariable,getVariable,removeVariable,checkLogin,clearAll};