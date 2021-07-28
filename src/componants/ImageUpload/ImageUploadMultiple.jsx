import React, { useState,useEffect } from "react";
import Loader from '../Loader/Loader';
import ReactToast from "../Toast/ReactToast";
import {apiRequest} from "../../Helpers/General"
import "./ImageUploadMultiple.css";
const ImageUploadMultiple = React.forwardRef((props, ref) => {
  const id = props.dataId;
  const [filesUrls, setFilesUrls] = useState([]);
  const [existingFilesUrls, setExistingFilesUrls] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isImageFetched, setIsImageFetched] = useState(false);
  let wordDocs = [
    "vnd.oasis.opendocument.text",
    "doc",
    "ms-doc",
    "msword",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  let excelDocs = [
    "vnd.oasis.opendocument.spreadsheet",
    "excel",
    "vnd.ms-excel",
    "x-excel",
    "x-msexcel",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const fileChangeEvent = async (event) => {
    setIsPageLoading(true);
    let fileObjects = event.currentTarget.files;
    if (fileObjects && fileObjects.length > 0) {
      const isExtValid = await validateFileExt(fileObjects);
      if(isExtValid !== true) {
        ReactToast({
          type: "error",
          message: "Wrong file type. Please upload image or pdf files.",
        });
        return false;
      }
      let tmpFilesUrls = existingFilesUrls.slice();//get existing list
      for (const [key, file] of Object.entries(fileObjects)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          let type = "other";
          let typeArr = file.type.split("/");
          if (typeArr[0] === "image") type = "image";
          else if (typeArr[0] === "audio") type = "audio";
          else if (typeArr[0] === "video") type = "video";
          else if (typeArr[1] === "pdf") type = "pdf";
          else if (typeArr[1] === "zip") type = "zip";
          else if (excelDocs.includes(typeArr[1])) type = "word";
          else if (wordDocs.includes(typeArr[1])) type = "excel";          
          tmpFilesUrls.push({file_id : 0,file_name:file.name,file_type:type,file_path: reader.result});
          setFilesUrls(tmpFilesUrls);
          setIsPageLoading(true);
        };
        reader.readAsDataURL(file);
      }
      props.setValue(props.name,fileObjects);
    }
    //uploadFile(event.currentTarget.files);
  };
  
  const validateFileExt = async (fileObjects) => {
    let result = false;
    for(const [key,fileObj] of Object.entries(fileObjects))
    {
      const typeArr = fileObj.type.split("/");
      if (typeArr[0] === "image") result = true;
      else if (typeArr[1] === "pdf") result = true;
    }    
    return result;
  }
  const ShowInPreview = () => {
    if(isPageLoading)
    {
      return <Loader/>;
    }
    const onRemoveBtnClick = (event) => {
      let name = event.currentTarget.getAttribute("data-name");
      let id = event.currentTarget.getAttribute("data-id");
      props.toBeDeleted.push(id);
      const tmpExistingFileUrls = filesUrls.filter(function (obj) {
        return obj.file_id !== id;
      });
      setExistingFilesUrls(tmpExistingFileUrls);
      const tmpFileUrls = filesUrls.filter(function (obj) {
        return obj.file_name !== name;
      });
      setFilesUrls(tmpFileUrls);
    };
    if (filesUrls.length > 0) {
      return filesUrls.map((urlObject, key) => {
        let url = urlObject.file_path;
        let type = urlObject.file_type
        if (type !== "image") url = `/asset/icons/${type}.png`;
        return (
          <div
            key={key}
            className="custom-file-container__image-multi-preview"
            style={{
              backgroundImage: `url("${url}")`,
            }}
          >
            {urlObject.file_id > 0 && <span className="custom-file-container__image-multi-preview__single-image-clear">
              <span
                onClick={onRemoveBtnClick}
                data-name={urlObject.file_name}
                data-id={urlObject.file_id}
                className="custom-file-container__image-multi-preview__single-image-clear__icon"
              >
                ×
              </span>
            </span>}
          </div>
        );
      });
    } else {
      return "";
    }
  };
  
  useEffect(() => {
    const getAttachments = async () => {
      try {
        const apiSetting = {apiParams: {record_id: props.dataId,module_code: "documents"}};
        const apiResult = await apiRequest("get_documents",apiSetting);
        
        if (apiResult.data.settings.success === "1") {
          let tmpFilesUrls = filesUrls.slice();//get existing list
          apiResult.data.data[0].forEach(element => {
            tmpFilesUrls.push(element);
          });
          setFilesUrls(tmpFilesUrls);
          setExistingFilesUrls(tmpFilesUrls);
        }
      } catch (error) {
        console.warn("getAttachments",error);
      }
    }
    if(isPageLoading)
    {
      if(id > 0 ) 
      {
        if(!isImageFetched)
        { 
          getAttachments();
          setIsImageFetched(true);
        }
      }
      else
      {
        setIsImageFetched(true);
      }
      setIsPageLoading(false);
    }
  },[props, isPageLoading,filesUrls,id,isImageFetched]);
  return (<> 
            <input
              className="form-control"
              type="file"
              id="formFile"
              multiple
              onChange={fileChangeEvent}
              ref={ref}
            />
            <div className="custom-file-container__image-preview custom-file-container__image-preview--active">
              <ShowInPreview />
            </div>
          </>
  );
});
export default ImageUploadMultiple;