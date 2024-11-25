import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import SnackbarAlert from "./SnackbarAlert";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";
import { DragDropContext } from "react-beautiful-dnd";
import "./dash.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [loading, setLoading] = useState(false); // حالة للـ Loader
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // جلب المشاريع من Firebase عند التحميل الأول
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(
          projectList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // رفع الصور إلى Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // رابط الصورة المخزنة
  };

  // إضافة أو تحديث مشروع
  const handleAddOrUpdateProject = async (projectData, isEdit) => {
    setLoading(true); // تشغيل الـ Loader
    try {
      // رفع الصور إلى Cloudinary والحصول على الروابط
      const imageUrls = await Promise.all(
        projectData.images.map(async (image) => {
          if (image.file) {
            return await uploadImageToCloudinary(image.file);
          }
          return image.preview;
        })
      );

      const projectWithImages = { ...projectData, images: imageUrls };

      if (isEdit) {
        const projectRef = doc(db, "projects", editProjectId);
        await updateDoc(projectRef, projectWithImages);

        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === editProjectId ? { ...proj, ...projectWithImages } : proj
          )
        );
        setSnackbarMessage("Project updated successfully!");
      } else {
        const newOrder = projects.length;
        const docRef = await addDoc(collection(db, "projects"), {
          ...projectWithImages,
          order: newOrder,
        });
        const newProject = {
          id: docRef.id,
          ...projectWithImages,
          order: newOrder,
        };

        setProjects((prevProjects) => [...prevProjects, newProject]);
        setSnackbarMessage("Project added successfully!");
      }

      setSnackbarType("success");
    } catch (error) {
      console.error("Error saving project:", error);
      setSnackbarMessage("An error occurred while saving the project!");
      setSnackbarType("error");
    } finally {
      setLoading(false); // إيقاف الـ Loader بعد انتهاء العملية
      setSnackbarOpen(true);
    }
  };

  // حذف مشروع
  const handleDeleteProject = async (id) => {
    setLoading(true); // تشغيل الـ Loader أثناء الحذف
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prevProjects) =>
        prevProjects.filter((proj) => proj.id !== id)
      );
      setSnackbarMessage("Project deleted successfully!");
      setSnackbarType("success");
    } catch (error) {
      console.error("Error deleting project:", error);
      setSnackbarMessage("An error occurred while deleting the project!");
      setSnackbarType("error");
    } finally {
      setLoading(false); // إيقاف الـ Loader بعد الحذف
      setSnackbarOpen(true);
    }
  };

  // إعادة ترتيب المشاريع
  const handleProjectDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedProjects = Array.from(projects);
    const [movedProject] = reorderedProjects.splice(source.index, 1);
    reorderedProjects.splice(destination.index, 0, movedProject);

    setProjects(reorderedProjects);

    try {
      await Promise.all(
        reorderedProjects.map((project, index) => {
          const projectRef = doc(db, "projects", project.id);
          return updateDoc(projectRef, { order: index });
        })
      );
      setSnackbarMessage("Projects reordered successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating project order:", error);
      setSnackbarMessage("Error updating project order!");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      {/* عرض الـ Loader أثناء رفع البيانات */}
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <SnackbarAlert
            open={snackbarOpen}
            message={snackbarMessage}
            type={snackbarType}
            onClose={handleSnackbarClose}
          />
          <h2 className="title">Manage Projects</h2>
          <ProjectForm
            onSubmit={handleAddOrUpdateProject}
            editMode={editMode}
            setEditMode={setEditMode}
            projects={projects}
            editProjectId={editProjectId}
          />
          <DragDropContext onDragEnd={handleProjectDragEnd}>
            <ProjectTable
              projects={projects}
              onEdit={(project) => {
                setEditMode(true);
                setEditProjectId(project.id);
              }}
              onDelete={handleDeleteProject}
            />
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default Dashboard;
