import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  container: { padding: "20px", maxWidth: "800px", margin: "auto" },
  button: {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  addButton: { backgroundColor: "#4CAF50", color: "white" },
  editButton: { backgroundColor: "#FFC107", color: "white" },
  deleteButton: { backgroundColor: "#F44336", color: "white" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  thTd: { border: "1px solid #ddd", padding: "10px", textAlign: "left" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  model: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: "8px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  modelButtons: { display: "flex", justifyContent: "space-around" },
  closeButton: {
    backgroundColor: "#aaa",
    color: "white",
    borderRadius: "15px",
    width: "80px",
    margin: "5px 10px",
    height: "30px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "15px",
    width: "80px",
    margin: "5px 10px",
    height: "30px",
  },
};

const CrudApi = () => {
  const [editAddModal, setEditAddModal] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({ todo_list: [] });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://akashsir.in/myapi/crud/todo-list-api.php")
      .then((res) => setData(res.data));
  };

  const handleClose = () => {
    setEditAddModal(false);
    setDeleteTask(false);
    setId("");
    setTitle("");
    setDescription("");
    setEditMode(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("todo_title", title);
    formData.append("todo_details", description);

    if (editMode) {
      formData.append("todo_id", id);
      axios
        .post("https://akashsir.in/myapi/crud/todo-update-api.php", formData)
        .then(() => {
          setEditAddModal(false);
          fetchData();
        });
    } else {
      axios
        .post("https://akashsir.in/myapi/crud/todo-add-api.php", formData)
        .then(() => {
          setEditAddModal(false);
          fetchData();
        });
    }
  };

  const handleEdit = (id) => {
    axios
      .get(`https://akashsir.in/myapi/crud/todo-detail-api.php?todo_id=${id}`)
      .then((res) => {
        setEditAddModal(true);
        setEditMode(true);
        setId(id);
        setTitle(res.data.todo_title);
        setDescription(res.data.todo_details);
      });
  };

  const handleDelete = (id) => {
    setDeleteTask(true);
    setId(id);
  };

  const deleteData = () => {
    const formData = new FormData();
    formData.append("todo_id", id);
    axios
      .post("https://akashsir.in/myapi/crud/todo-delete-api.php", formData)
      .then(() => {
        setDeleteTask(false);
        fetchData();
      });
  };

  return (
    <div style={styles.container}>
      <h2>CRUD Operations with help of API</h2>
      <button
        style={{ ...styles.button, ...styles.addButton }}
        onClick={() => setEditAddModal(true)}
      >
        Add New Item
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>ID</th>
            <th style={styles.thTd}>Title</th>
            <th style={styles.thTd}>Details</th>
            <th style={styles.thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.todo_list?.map((item) => (
            <tr key={item.todo_id}>
              <td style={styles.thTd}>{item.todo_id}</td>
              <td style={styles.thTd}>{item.todo_title}</td>
              <td style={styles.thTd}>{item.todo_details}</td>
              <td style={styles.thTd}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => handleEdit(item.todo_id)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDelete(item.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editMode ? "Edit" : "Add"} Item</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={styles.modalButtons}>
              <button style={styles.closeButton} onClick={handleClose}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSubmit}>
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTask && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Delete Confirmation</h3>
            <p>Are you sure you want to delete this item?</p>
            <div style={styles.modalButtons}>
              <button style={styles.closeButton} onClick={handleClose}>
                No
              </button>
              <button style={styles.deleteButton} onClick={deleteData}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Link
          to="/"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#4caf50",
            color: "white",
            textDecoration: "none",
            borderRadius: "25px",
            display: "inline-block",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CrudApi;
