import { useEffect, useState } from "react";
import API from "./api";

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get("products/");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD or UPDATE
  const handleSubmit = async () => {
    if (!name || !price) {
      alert("Enter all fields");
      return;
    }

    if (editId) {
      // UPDATE
      await API.put(`products/${editId}/`, {
        name,
        price: Number(price),
      });
      setEditId(null);
    } else {
      // ADD
      await API.post("products/", {
        name,
        price: Number(price),
      });
    }

    setName("");
    setPrice("");
    fetchProducts();
  };

  // DELETE
  const deleteProduct = async (id) => {
    await API.delete(`products/${id}/`);
    fetchProducts();
  };

  // EDIT
  const editProduct = (p) => {
    setName(p.name);
    setPrice(p.price);
    setEditId(p.id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛒 Product Manager</h2>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* PRODUCT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">₹{p.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => editProduct(p)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;