import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = React.forwardRef((props, ref) => {
  const [imgSrc, setImgSrc] = useState(
    props.imgSrc ||
      `${process.env.PUBLIC_URL}/asset/images/profilePlaceHolder.jpg`
  );
  const photoUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(file);
    props.onChange(file);
  };
  return (
    <label className="label custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img htmlFor="photo-upload" className="photo-upload-img" src={imgSrc} alt=""/>
      </div>
      <input
        ref={ref}
        id="photo-upload"
        name={props.name}
        type="file"
        onChange={photoUpload}
      />
    </label>
  );
});
export default ImageUpload;
