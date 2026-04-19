// TasksList.jsx
import TaskItem from "./TaskItem";

export default function TasksList({ tasks, onDelete, onEdit, onComplete }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
        />
      ))}
    </ul>
  );
}