import swal from 'sweetalert';
import {apiRequest} from "../../Helpers/General";
import ReactToast from "../../componants/Toast/ReactToast"
const DeleteActionBox = (apiFunc,apiSetting,doRefresh,setDoRefresh) => {
  swal({
    title: "Are you sure?",
    text: "Are you sure you want to delete this record?",
    icon: "warning",
    buttons: ["Not Sure", "Yes Please"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteAddress(apiFunc,apiSetting,doRefresh,setDoRefresh);
    }
  });
};

const deleteAddress = async (apiFunc,apiSetting,doRefresh,setDoRefresh) => {
  let msgClass= "info";
  let msg = "";
  try {
    const apiResult = await apiRequest(apiFunc,apiSetting);    
    msg =apiResult.data.settings.message;      
    if(apiResult.data.settings.success === "1") msgClass= "success"; 
    else msgClass= "error";
  } catch (error) {
    msgClass= "error";
  }finally{
    if(msgClass !== "success")
    {
      swal(msg, {icon: msgClass});
      new Audio(`${process.env.PUBLIC_URL}/asset/sounds/error.mp3`).play();
    }
    else
    {
      ReactToast({type: msgClass, message: msg});  
      setDoRefresh(doRefresh + 1);
    }
  }
};
export default DeleteActionBox;
