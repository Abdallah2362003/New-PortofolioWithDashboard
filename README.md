
# Project Dashboard - React Application

This project is a **React-based dashboard** for managing projects. It allows users to add, edit, delete, and reorder projects. Users can upload images, preview them in a slider, reorder or delete them before saving, and update the database dynamically. The app uses **Firebase Firestore** for database management and **Cloudinary** for image uploads.

---

## Features

- **Project Management**:
  - Add new projects with title, GitHub link, video link, and images.
  - Edit existing projects dynamically without page reload.
  - Delete projects with confirmation.
  - Drag and drop projects to reorder them.

- **Image Management**:
  - Drag and drop images into the upload area.
  - Preview uploaded images in a slider.
  - Reorder images within a project using drag-and-drop.
  - Delete individual images from a project before saving.

- **Dynamic UI**:
  - Real-time updates in the UI for all CRUD operations.
  - **Snackbar Notifications** for success/error messages.
  - **Loader** to indicate progress during data operations.

---

## Tech Stack

### **Frontend**
- **React.js**: Component-based UI.
- **React Beautiful DnD**: Drag-and-drop functionality for projects and images.
- **React Dropzone**: Drag-and-drop area for uploading images.
- **Swiper.js**: Display images in a slider.
- **Material-UI Snackbar**: User notifications.

### **Backend**
- **Firebase Firestore**: NoSQL database for storing project data.
- **Cloudinary**: Image hosting and upload management.

---

## Installation

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/project-dashboard.git
cd project-dashboard
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Set up environment variables**
Create a `.env.local` file in the root directory and add the following variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your-cloudinary-cloud-name>/image/upload
VITE_CLOUDINARY_PRESET=your_cloudinary_upload_preset
```

### **4. Start the development server**
```bash
npm run dev
```
This will start the application at `http://localhost:5173/`.

---

## Usage

### **Add a Project**
1. Click the "Add Project" button.
2. Enter the project title, GitHub link, video link, and upload images via the drag-and-drop area.
3. Click **Add Project** to save the project.

### **Edit a Project**
1. Click the "Edit" button next to a project in the table.
2. Update any details or reorder/delete images in the slider.
3. Click **Save Changes** to update the project.

### **Delete a Project**
1. Click the "Delete" button next to a project.
2. Confirm the deletion to remove the project permanently.

### **Reorder Projects**
1. Drag a project row and drop it into the desired position in the table.
2. The new order is saved automatically.

---

## File Structure

```
src/
│
├── components/
│   ├── Dashboard.jsx        # Main component for managing the dashboard
│   ├── ProjectForm.jsx      # Form component for adding/editing projects
│   ├── ProjectTable.jsx     # Table component for displaying projects
│   ├── ImageManager.jsx     # Component for managing image uploads and previews
│   └── SnackbarAlert.jsx    # Component for displaying notifications
│
├── firebaseConfig.js        # Firebase configuration file
├── App.jsx                  # Main entry point for the app
├── main.jsx                 # React DOM rendering
└── index.css                # Global styles
```

---

## Deployment

### **Build for production**
```bash
npm run build
```
This will generate a `dist/` folder with the production build.

### **Deploy**
You can deploy the `dist/` folder to any static hosting service like **Vercel**, **Netlify**, or **Firebase Hosting**.

---

## Known Issues

- None at the moment. Feel free to report issues via the [issues page](https://github.com/your-username/project-dashboard/issues).

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Firebase](https://firebase.google.com/) for the backend.
- [Cloudinary](https://cloudinary.com/) for image management.
- [Swiper.js](https://swiperjs.com/) for the slider functionality.
- [Material-UI](https://mui.com/) for UI components.

---
