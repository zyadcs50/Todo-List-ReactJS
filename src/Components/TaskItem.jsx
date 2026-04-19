// TaskItem.jsx
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./TaskItem.css"

export default function TaskItem({ task, onDelete, onEdit, onComplete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "8px",
        borderRadius: "6px",
        opacity: task.status === "completed" ? 0.6 : 1,
      }}
    >
      <div className="first-part">
        <IconButton 
          onClick={() => onComplete(task.id)}
          color={task.status === "completed" ? "success" : "default"}
        >
          {task.status === "completed" ? <CheckCircleIcon className="true" style={{ color: "green" }}/> : <CheckCircleOutlinedIcon className="true" style={{ color: "green" }}/>} 
        </IconButton>
        <h3
          style={{
            textDecoration:
              task.status === "completed" ? "line-through" : "none",
            color: task.status === "completed" ? "#888" : "inherit",
          }}
        >
          {task.title}
        </h3>
      </div>

      <div>
        <IconButton onClick={() => onEdit(task.id)}>
          <EditIcon color={"primary"} />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon style={{ color: "red" }} />
        </IconButton>
      </div>
    </li>
  );
}
