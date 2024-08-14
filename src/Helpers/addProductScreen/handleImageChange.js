import AWS from "aws-sdk";
import axios from "axios";
import { API } from "../../utils/apiUtils";
import { notifyError } from "../toaster";
const dotenv = require("dotenv");
dotenv.config();

console.log(
  "process.env.REACT_APP_ACCESS_KEY",
  process.env.REACT_APP_SECRET_KEY
);
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
});

export const handleImageChange = async (e, setImageURL, selectedImage) => {
  const file = e.target.files[0];

  if (file) {
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload an image.");
      notifyError("Invalid file type. Please upload an image.");
      setImageURL(null);
      return;
    }

    const customerID = "66925640c4a9c61a716cc8fd_Products";

    try {
      selectedImage(URL.createObjectURL(file));
      const blob = file;
      const fileName = file.name.split("/").pop();
      const key = `${customerID}/${fileName}`;

      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_KEY,
        region: process.env.REACT_APP_REGION,
      });

      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: key,
        Body: blob,
        ContentType: file.type,
      };

      const result = await s3.upload(params).promise();
      console.log("Image Uploaded Successfully");
      const getKey = result.key;
      console.log("getKey====>", getKey);
      getImageUrl(getKey, setImageURL);
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);

      if (error.code === "AccessControlListNotSupported") {
        console.error("Bucket does not allow ACLs");
      } else {
        // Handle other potential errors
      }

      throw error;
    }
  } else {
    setImageURL(null);
  }
};

const getImageUrl = async (key, setImageURL) => {
  try {
    console.log("key", key);
    const response = await axios.post(API + "/get/s3/url", { key: key });
    if (response.data) {
      setImageURL(response.data.url);
      console.log("response", response.data.url);
    }
  } catch (err) {
    console.log("error while uploading Image", err);
  }
};
