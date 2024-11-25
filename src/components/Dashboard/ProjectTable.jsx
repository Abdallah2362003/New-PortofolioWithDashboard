import { Droppable, Draggable } from "react-beautiful-dnd";

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <Droppable droppableId="projects">
      {(provided) => (
        <table
          className="projects-table"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                GitHub Link
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Video Link
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Images
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <Draggable
                key={project.id}
                draggableId={project.id}
                index={index}
              >
                {(provided) => (
                  <tr
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                      background: "#1E1E1F",
                      ...provided.draggableProps.style,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {project.title}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      <a
                        href={project.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Video
                      </a>
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {project.images?.length || 0}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      <button
                        onClick={() => onEdit(project)}
                        style={{ marginRight: "10px", color: "aqua" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(project.id)}
                        style={{ color: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        </table>
      )}
    </Droppable>
  );
};

export default ProjectTable;
