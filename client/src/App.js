// import { useEffect, useState } from "react";
// import {
//   getTasks,
//   addTask,
//   updateTask,
//   deleteTask,
// } from "./service";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTaskName, setNewTaskName] = useState("");

//   // טעינת המשימות מהשרת
//   const loadTasks = async () => {
//     try {
//       const data = await getTasks();
//       setTasks(data);
//     } catch (error) {
//       console.error("שגיאה בשליפת משימות:", error);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   // הוספת משימה חדשה
//   const handleAddTask = async () => {
//     if (!newTaskName.trim()) return;
//     try {
//       const newTask = { name: newTaskName, isComplete: false };
//       await addTask(newTask);
//       setNewTaskName("");
//       loadTasks();
//     } catch (error) {
//       console.error("שגיאה בהוספת משימה:", error);
//     }
//   };

//   // סימון משימה כהושלמה / לא הושלמה
//   const toggleComplete = async (task) => {
//     try {
//       const updated = { ...task, isComplete: !task.isComplete };
//       await updateTask(task.id, updated);
//       loadTasks();
//     } catch (error) {
//       console.error("שגיאה בעדכון משימה:", error);
//     }
//   };

//   // מחיקת משימה
//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id);
//       loadTasks();
//     } catch (error) {
//       console.error("שגיאה במחיקת משימה:", error);
//     }
//   };

//   return (
//     <div className="App" style={{ maxWidth: "400px", margin: "auto", direction: "rtl" }}>
//       <h1>רשימת משימות 📝</h1>

//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           value={newTaskName}
//           onChange={(e) => setNewTaskName(e.target.value)}
//           placeholder="הוסיפי משימה חדשה..."
//         />
//         <button onClick={handleAddTask}>הוספה</button>
//       </div>

//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <span
//               onClick={() => toggleComplete(task)}
//               style={{
//                 textDecoration: task.isComplete ? "line-through" : "none",
//                 cursor: "pointer",
//               }}
//             >
//               {task.name}
//             </span>
//             <button onClick={() => handleDelete(task.id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./service";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("שגיאה בשליפת משימות:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      const newTask = { name: newTaskName, isComplete: false };
      await addTask(newTask);
      setNewTaskName("");
      loadTasks();
    } catch (error) {
      console.error("שגיאה בהוספת משימה:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = { ...task, isComplete: !task.isComplete };
      await updateTask(task.id, updated);
      loadTasks();
    } catch (error) {
      console.error("שגיאה בעדכון משימה:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("שגיאה במחיקת משימה:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">רשימת משימות 📝</h1>

      <div className="add-task">
        <input
          type="text"
          className="task-input"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="הוסיפי משימה חדשה..."
        />
        <button className="add-btn" onClick={handleAddTask}>+</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span
              onClick={() => toggleComplete(task)}
              className={task.isComplete ? "task-complete" : ""}
            >
              {task.name}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
