import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //fetch all the data
  const [expenses, setExpenses] = useState([]);
  const [dark, setDark] = useState(false);

  const fetchExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/expense/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  //delete
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/api/expense/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpense();
    } catch (error) {
      console.log(error);
    }
  };

  //update the Expenses
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const startEdit = (item) => {
    setEditing(item.id);
    setEditForm({
      amount: item.amount,
      category: item.category,
      description: item.description,
    });
  };

  const updateExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3000/api/expense/update/${editing}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditing(null);
      fetchExpense();
      alert("Expenses updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //to handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Not authenticated - token missing");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/expense/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({ amount: "", category: "", description: "" });
      fetchExpense();
      alert("Expenses Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Error Adding Expense");
    }
  };

  return (
    <div className="container mt-5">
      <nav className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded">
        <h4>Expense Tracker</h4>

        <div>
          <button
            className="btn btn-warning me-2"
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <h2 className="text-center mb-4">Expense Dashboard</h2>
      <div className="container mt-4">
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
          <input
            type="number"
            name="amount"
            className="form-control mb-3"
            placeholder="Enter Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            className="form-control mb-3"
            placeholder="Enter Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            className="form-control mb-3"
            placeholder="Describe for what"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">Add Expense</button>
        </form>

        <h4 className="text-center mt-4">Your Expenses</h4>

        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>Rs. {item.amount}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.date?.split("T")[0]}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(item.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No Expenses Recorded Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {editing && (
          <div
            className="modal fade show d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5 className="mb-3">Edit Expense</h5>

                <input
                  className="form-control mb-2"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />

                <button
                  className="btn btn-success me-2"
                  onClick={updateExpense}
                >
                  Update
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
