import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onFilesAdded }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      onFilesAdded(filesWithPreview); // استدعاء الدالة لإرسال الملفات للمكون الرئيسي
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop your images here, or click to select files</p>
    </div>
  );
};

export default ImageUpload;
