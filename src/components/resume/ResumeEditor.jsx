import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import SnackbarAlert from "../Dashboard/SnackbarAlert";
import ResumeTable from "./ResumeTable";

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState({
    education: [],
    experience: [],
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // Fetch data from Firebase
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const docRef = doc(db, "content", "resume");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResumeData(docSnap.data());
        } else {
          console.log("No such document!");
          setSnackbarMessage("No Resume data found!");
          setSnackbarType("error");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error fetching Resume data:", error);
        setSnackbarMessage("Failed to load Resume data!");
        setSnackbarType("error");
        setSnackbarOpen(true);
      }
    };

    fetchResumeData();
  }, []);

  // Save updated data to Firebase
  const saveResumeData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "content", "resume");
      await setDoc(docRef, resumeData);

      setSnackbarMessage("Resume updated successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving Resume data:", error);
      setSnackbarMessage("Failed to save Resume data!");
      setSnackbarType("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (field, index, key, value) => {
    const updatedField = [...resumeData[field]];
    updatedField[index][key] = value;
    setResumeData({ ...resumeData, [field]: updatedField });
  };

  // Handle delete action
  const handleDelete = (field, index) => {
    const updatedField = [...resumeData[field]];
    updatedField.splice(index, 1);
    setResumeData({ ...resumeData, [field]: updatedField });
  };

  // Handle add action
  const handleAdd = (field, defaultValue) => {
    setResumeData({
      ...resumeData,
      [field]: [...resumeData[field], defaultValue],
    });
  };

  return (
    <div>
      <h1 className="title">Edit Resume</h1>

      {/* Education Section */}
      <h3 className="title">Education</h3>
      <button
        onClick={() =>
          handleAdd("education", {
            title: "",
            degree: "",
            date: "",
            description: "",
          })
        }
        className="Add-project"
      >
        Add Education
      </button>
      <ResumeTable
        data={resumeData.education}
        fields={["title", "degree", "date", "description"]}
        labels={["Title", "Degree", "Date", "Description"]}
        section="education"
        onChange={handleChange}
        onDelete={handleDelete}
      />

      {/* Experience Section */}
      <h3 className="title">Experience</h3>
      <button
        onClick={() =>
          handleAdd("experience", { title: "", date: "", tasks: [] })
        }
        className="Add-project"
      >
        Add Experience
      </button>
      <ResumeTable
        data={resumeData.experience}
        fields={["title", "date", "tasks"]}
        labels={["Title", "Date", "Tasks"]}
        section="experience"
        onChange={handleChange}
        onDelete={handleDelete}
      />

      {/* Skills Section */}
      <h3 className="title">Skills</h3>
      <button
        onClick={() => handleAdd("skills", { name: "", proficiency: 0 })}
        className="Add-project"
      >
        Add Skill
      </button>
      <ResumeTable
        data={resumeData.skills}
        fields={["name", "proficiency"]}
        labels={["Skill Name", "Proficiency (%)"]}
        section="skills"
        onChange={handleChange}
        onDelete={handleDelete}
      />

      {/* Save Button */}
      <button  onClick={saveResumeData} disabled={loading} className="Add-project">
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {/* Snackbar */}
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ResumeEditor;
