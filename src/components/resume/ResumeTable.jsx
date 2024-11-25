import React from "react";

const ResumeTable = ({ data, fields, labels, section, onChange, onDelete }) => {
  return (
    <table className="resume-table">
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {fields.map((field, fieldIndex) => (
              <td key={fieldIndex} data-label={labels[fieldIndex]}>
                {Array.isArray(item[field]) ? (
                  <textarea
                    value={item[field]?.join(", ") || ""}
                    onChange={(e) =>
                      onChange(
                        section,
                        index,
                        field,
                        e.target.value.split(",").map((task) => task.trim())
                      )
                    }
                  />
                ) : (
                  <input
                    type={field === "proficiency" ? "number" : "text"}
                    value={item[field] || ""}
                    onChange={(e) =>
                      onChange(section, index, field, e.target.value)
                    }
                  />
                )}
              </td>
            ))}
            <td data-label="Actions">
              <button onClick={() => onDelete(section, index)} className="cancel">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResumeTable;
