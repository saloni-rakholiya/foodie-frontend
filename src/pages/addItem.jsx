import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AddItem = () => {
  const navigate = useNavigate();
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState({});
  if (authError) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <h1>Loading</h1>;
  }
  if (!isAuth.status) {
    navigate("/");
  }
  if (!isAuth.isAdmin) {
    navigate("/home");
  }
  const submitForm = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (
      title == "" ||
      description == "" ||
      price == 0 ||
      category == "" ||
      file == {} ||
      price < 0
    ) {
      return;
    }
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", category);
    formdata.append("file", file);
    try {
      const res = await fetch("http://localhost:3001/imageupload", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formdata,
      });
      const json = await res.json();
      console.log(json);
      setTitle("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setFile({});
    } catch (err) {}
  };
  return (
    <form onSubmit={submitForm} className="align-items-center text-center">
      <div className="form-row text-center text-center">
        <div className="form-group col-md-6 text-center m-auto p-2">
          <label for="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-row text-center">
        <div className="form-group col-md-6 text-center m-auto p-2">
          <label for="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-row text-center">
        <div className="form-group col-md-6 text-center m-auto p-2">
          <label for="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-row text-center">
        <div className="form-group col-md-6 text-center m-auto p-2">
          <label for="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-row text-center">
        <div className="form-group col-md-6 text-center m-auto p-2">
          <label for="file">Image</label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            placeholder="Image"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-dark m-1">
        Sign in
      </button>
    </form>
  );
};

export default AddItem;
