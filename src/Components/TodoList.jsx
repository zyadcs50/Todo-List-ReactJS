import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import TasksList from "./TasksList";
import "../Styling/TodoList.css";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

export default function AddContainer() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  function showError() {
    setError(true);
    setTimeout(() => setError(false), 3000);
  }

  function showSuccess() {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  function showDeleted() {
    setDeleted(true);
    setTimeout(() => setDeleted(false), 2000);
  }
  function showCompleted() {
    setCompleted(true);
    setTimeout(() => setCompleted(false), 2000);
  }

  function renderTasks() {
    if (task.trim() === "") {
      showError();
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      status: "pending",
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
    showSuccess();
  }

  function handleDelete(id) {
    setDeleteId(id);
  }

  function deleteConfirmed(id) {
    setTasks((t) => t.filter((task) => task.id !== id));
    showDeleted();
    setDeleteId(null);
  }

  function handleEdit(id) {
    const taskToEdit = tasks.find((t) => t.id === id);
    setEditId(id);
    setEditText(taskToEdit.title);
  }
  function handleSave() {
    setTasks(
      tasks.map((t) => (t.id === editId ? { ...t, title: editText } : t)),
    );
    setEditId(null);
    setDeleteId(null);
  }

  function handleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        const updated = {
          ...t,
          status: t.status === "completed" ? "pending" : "completed",
        };

        if (updated.status === "completed") showCompleted();

        return updated;
      }),
    );
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
        padding: "25px",
        background: "#0f172a",
        borderRadius: "20px",
        boxShadow: "0 0 40px rgba(0,0,0,0.6)",
        textAlign: "center",
      }}
    >
      {error && <Alert severity="error">Please add a Task</Alert>}
      {completed && (
        <Alert severity="success">Task Completed Successfully</Alert>
      )}
      {success && <Alert severity="success">Task added Successfully ✅</Alert>}
      {deleted && <Alert severity="info">Task Deleted</Alert>}

      <h2 style={{ color: "#22c55e", fontSize: "45px" }}>To Do List 🎯</h2>

      {/* FILTERS */}
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={(e, val) => val && setFilter(val)}
        sx={{ mb: 2 }}
      >
        <ToggleButton
          value="all"
          sx={{
            color: "white",
            border: "1px solid #334155",
            "&.Mui-selected": { background: "#22c55e" },
          }}
        >
          All
        </ToggleButton>

        <ToggleButton
          value="pending"
          sx={{
            color: "white",
            border: "1px solid #334155",
            "&.Mui-selected": { background: "#f59e0b" },
          }}
        >
          Pending
        </ToggleButton>

        <ToggleButton
          value="completed"
          sx={{
            color: "white",
            border: "1px solid #334155",
            "&.Mui-selected": { background: "#22c55e" },
          }}
        >
          Completed
        </ToggleButton>
      </ToggleButtonGroup>

      {/* INPUT */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          fullWidth
          label="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && renderTasks()}
          sx={{
            input: { color: "white" },
            label: { color: "#94a3b8" },
          }}
        />

        <Button
          variant="contained"
          onClick={renderTasks}
          sx={{
            borderRadius: "20px",
            px: 3,
          }}
        >
          ADD
        </Button>
      </div>

      {/* TASKS */}
      <TasksList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
      />

      {/* DIALOG */}

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"            Are You Sure Want to Delete This Task ? "}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} autoFocus>
            No
          </Button>
          <Button onClick={() => deleteConfirmed(deleteId)}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editId !== null}
        onClose={() => setEditId(null)}
        sx={{
          "& .MuiPaper-root": {
            background: "#1e293b",
            color: "white",
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
            sx={{
              input: { color: "white" },
              mt: 1,
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditId(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
