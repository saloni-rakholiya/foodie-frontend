import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Loading from "../components/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [fileName, setFileName] = useState("Choose Item Image");
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    if (isAuth) {
      if (!isAuth.status) {
        navigate("/login", { state: { message: "Not logged in" } });
      } else if (!isAuth.isAdmin) {
        navigate("/home", { state: { message: "Not an admin" } });
      }
    }
  }, [isAuth]);
  if (authError) {
    return <h1>Error</h1>;
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
      setTitle("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setFile({});
      toast.success("Item Successfully Added!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (err) {}
  };
  return (
    <>
      <Navbar isLoggedIn={true} isAdmin={true} />
      <h1>Add Items to Menu</h1>
      <form onSubmit={submitForm} className="align-items-center text-center">
        <div className="form-row text-center text-center">
          <div className="form-group col-md-6 text-center m-auto p-2">
            <label for="title" style={{ color: "white", fontSize: "20px" }}>
              Item title
            </label>
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
            <label
              for="description"
              style={{ color: "white", fontSize: "20px" }}
            >
              Description
            </label>
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
            <label for="price" style={{ color: "white", fontSize: "20px" }}>
              Price
            </label>
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
            <label for="category" style={{ color: "white", fontSize: "20px" }}>
              Category
            </label>
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
        <div className="mt-4 form-row text-center">
          <div className="input-group col-md-6 text-center m-auto form-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onloadend = (e) => setImgSrc(e.target.result);
                }}
              />
              <label className="custom-file-label" for="inputGroupFile01">
                {fileName}
              </label>
            </div>
          </div>
        </div>
        <div className="container">
          {imgSrc !== "" ? (
            <img
              src={imgSrc}
              className="col"
              style={{ height: "40%", width: "40%" }}
            />
          ) : (
            <></>
          )}
          <div className="col">
            <button type="submit" className="w-25 mt-3 btn btn-primary m-1">
              Add Item
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddItem;
