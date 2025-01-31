import React, { useContext } from 'react';
import { StepperContext } from '../../context/StepperContext';
import { useSelector } from 'react-redux';
import { IoMdImages } from 'react-icons/io';
import { FadeLoader } from 'react-spinners';
import imageCompression from 'browser-image-compression';

const Credentials = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const { loader } = useSelector((state) => state.auth);

  // File validation and compression
  const handleFileChange = async (e, key) => {
    const file = e.target.files[0];

    // Validate file size
    if (file.size > 2000000) { // 2MB size limit
      alert('File size too large! Please upload a file smaller than 2MB.');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type! Please upload a JPEG or PNG image.');
      return;
    }

    try {
      // Compress the image before uploading
      const options = {
        maxSizeMB: 1, // Reduce image size to under 1MB
        maxWidthOrHeight: 1920, // Keep the resolution
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // Read the compressed file
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, [key]: compressedFile });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error compressing the image:', error);
    }
  };

  // Component to render each image upload area
  const ImageUpload = ({ id, label, fileKey }) => (
    <div className="w-full">
      <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
        {label}
      </div>
      <div className="flex justify-center h-[200px] w-full rounded-sm">
        {userData[fileKey] ? (
          <label
            htmlFor={id}
            className="h-full w-full relative cursor-pointer overflow-hidden rounded-md"
          >
            <img
              className="w-full h-full object-scale-down rounded-sm"
              src={URL.createObjectURL(userData[fileKey])}
              alt={label}
            />
            {loader && (
              <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                <FadeLoader />
              </div>
            )}
          </label>
        ) : (
          <label
            htmlFor={id}
            className="flex justify-center items-center flex-col h-full w-full cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative"
          >
            <span>
              <IoMdImages size="40px" color="#53596B" />
            </span>
            <span className="text-slate-500">Upload {label}</span>
            {loader && (
              <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                <FadeLoader />
              </div>
            )}
          </label>
        )}
        <input
          id={id}
          type="file"
          name={fileKey}
          onChange={(e) => handleFileChange(e, fileKey)}
          className="hidden w-full h-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-4">
        {/* First column */}
        <div className="w-full px-2 flex flex-col gap-2">
          <ImageUpload
            id="validId_img"
            label="Applicant Valid ID"
            fileKey="validId_img"
          />
          <ImageUpload
            id="credential_img02"
            label="Applicant Valid ID 02"
            fileKey="credential_img02"
          />
        </div>

        {/* Second column */}
        <div className="w-full px-2 flex flex-col gap-2">
          <ImageUpload
            id="cred1"
            label="Applicant Valid ID 01"
            fileKey="cred1"
          />
          <ImageUpload
            id="credential_img03"
            label="Applicant Valid ID 03"
            fileKey="credential_img03"
          />
        </div>
      </div>
    </div>
  );
};

export default Credentials;
