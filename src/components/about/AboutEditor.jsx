import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import SnackbarAlert from "../Dashboard/SnackbarAlert"; // استيراد مكون SnackbarAlert

const AboutEditor = () => {
  const [aboutContent, setAboutContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // جلب البيانات من Firebase عند التحميل الأول
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAboutContent(docSnap.data().content); // تحميل النصوص من قاعدة البيانات
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching About content:", error);
        setSnackbarMessage("Failed to load About content!");
        setSnackbarType("error");
        setSnackbarOpen(true);
      }
    };

    fetchAboutContent();
  }, []);

  // تحديث البيانات في Firebase
  const saveAboutContent = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "content", "about");
      await setDoc(docRef, { content: aboutContent });

      setSnackbarMessage("Content updated successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving About content:", error);
      setSnackbarMessage("Failed to save content!");
      setSnackbarType("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="title">Edit About Content</h2>
      {loading && <p>Saving changes...</p>}
      <textarea
        value={aboutContent}
        onChange={(e) => setAboutContent(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Edit the About content here..."
      ></textarea>
      <br />
      <button className="Add-project" onClick={saveAboutContent} disabled={loading}>
        Save Changes
      </button>

      {/* استخدام SnackbarAlert */}
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default AboutEditor;
