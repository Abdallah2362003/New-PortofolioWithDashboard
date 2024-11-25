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
    onSubmit({ ...newProject, images: selectedFiles }, editMode);
    setNewProject({ title: "", githubLink: "", videoLink: "", images: [] });
    setSelectedFiles([]);
    setEditMode(false);
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
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={newProject.title}
        onChange={handleInputChange}
      />
      <input
        type="url"
        name="githubLink"
        placeholder="GitHub Link"
        value={newProject.githubLink}
        onChange={handleInputChange}
      />
      <input
        type="url"
        name="videoLink"
        placeholder="Video Link"
        value={newProject.videoLink}
        onChange={handleInputChange}
      />
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
      <h2 className="title">Image Slider</h2>
      {/* عرض الصور المرفوعة */}
      <ImageManager
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <button className="Add-project" onClick={handleAddOrUpdate}>
        {editMode ? "Save Changes" : "Add Project"}
      </button>
    </div>
  );
};

export default ProjectForm;
