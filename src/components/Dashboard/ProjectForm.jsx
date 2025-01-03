import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageManager from "./ImageManager";

const ProjectForm = ({
  onSubmit,
  editMode,
  setEditMode,
  projects,
  editProjectId,
}) => {
  const [newProject, setNewProject] = useState({
    title: "",
    githubLink: "",
    videoLink: "",
    images: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState({}); // لتخزين الأخطاء

  // تحميل المشروع في وضع التعديل
  useEffect(() => {
    if (editMode) {
      const projectToEdit = projects.find((proj) => proj.id === editProjectId);
      if (projectToEdit) {
        setNewProject({
          title: projectToEdit.title,
          githubLink: projectToEdit.githubLink,
          videoLink: projectToEdit.videoLink,
          images: projectToEdit.images.map((url) => ({ preview: url })),
        });
        setSelectedFiles(projectToEdit.images.map((url) => ({ preview: url })));
      }
    }
  }, [editMode, editProjectId, projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddOrUpdate = () => {
    // التحقق من المدخلات قبل الإرسال
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // لا يتم الإرسال إذا كان هناك أخطاء
    }

    onSubmit({ ...newProject, images: selectedFiles }, editMode);
    setNewProject({ title: "", githubLink: "", videoLink: "", images: [] });
    setSelectedFiles([]);
    setEditMode(false);
    setErrors({}); // مسح الأخطاء بعد الإرسال
  };

  // التحقق من المدخلات
  const validateForm = () => {
    const errors = {};

    // التحقق من العنوان
    if (!newProject.title) {
      errors.title = "Title is required.";
    }

    // التحقق من رابط GitHub
    if (!newProject.githubLink) {
      errors.githubLink = "GitHub link is required.";
    } else if (!/^https?:\/\/[^\s]+$/.test(newProject.githubLink)) {
      errors.githubLink = "Please enter a valid GitHub link.";
    }

    // التحقق من رابط الفيديو
    if (!newProject.videoLink) {
      errors.videoLink = "Video link is required.";
    } else if (!/^https?:\/\/[^\s]+$/.test(newProject.videoLink)) {
      errors.videoLink = "Please enter a valid video link.";
    }

    // التحقق من وجود الصور
    if (selectedFiles.length === 0) {
      errors.images = "At least one image is required.";
    }

    return errors;
  };

  // منطقة السحب والإفلات
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
    },
  });

  return (
    <div>
      <h3 className="title1">{editMode ? "Edit Project" : "Add Project"}</h3>
      
      {/* عنوان المشروع */}
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={newProject.title}
        onChange={handleInputChange}
        className={errors.title ? "input-error" : ""}
      />
      {errors.title && <p className="error-text">{errors.title}</p>}
      
      {/* رابط GitHub */}
      <input
        type="url"
        name="githubLink"
        placeholder="GitHub Link"
        value={newProject.githubLink}
        onChange={handleInputChange}
        className={errors.githubLink ? "input-error" : ""}
      />
      {errors.githubLink && <p className="error-text">{errors.githubLink}</p>}

      {/* رابط الفيديو */}
      <input
        type="url"
        name="videoLink"
        placeholder="Video Link"
        value={newProject.videoLink}
        onChange={handleInputChange}
        className={errors.videoLink ? "input-error" : ""}
      />
      {errors.videoLink && <p className="error-text">{errors.videoLink}</p>}
      
      <h3 className="title1">Add Images Here</h3>
      
      {/* منطقة السحب والإفلات */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop your images here, or click to select files</p>
      </div>

      {/* عرض الصور المرفوعة */}
      <ImageManager
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      {errors.images && <p className="error-text">{errors.images}</p>}

      <button className="Add-project" onClick={handleAddOrUpdate}>
        {editMode ? "Save Changes" : "Add Project"}
      </button>
    </div>
  );
};

export default ProjectForm;
