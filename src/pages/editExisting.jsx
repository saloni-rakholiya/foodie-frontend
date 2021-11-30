import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import "../styles/album.css";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loader";
import { useState, useEffect } from "react";
import Select from "react-select";

const EditItem = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const { data: isProducts, error: productError } = useSWR(
    "http://localhost:3001/getproducts",
    fetcher
  );
  const submitForm = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (
      description === "" ||
      price <= 0 ||
      category === "" ||
      (file == {} && isFile === true) ||
      (photoUrl == "" && isFile === false) ||
      price < 0
    ) {
      return;
    }
    formdata.append("id", id);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", category);
    if (isFile) formdata.append("file", file);
    else formdata.append("photoUrl", photoUrl);
    try {
      const res = await fetch("http://localhost:3001/updatedetails", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formdata,
      });
      const json = await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("Choose File");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isFile, setIsFile] = useState(false);
  const [id, setId] = useState(-1);
  const [imgSrc, setImgSrc] = useState("");
  if (authError) return <h1>Error</h1>;
  if (productError) return <h1>Error</h1>;
  if (!isAuth) return <Loading />;
  if (!isAuth.status) navigate("/login");
  if (!isAuth.isAdmin) navigate("/home");
  if (!isProducts) return <Loading />;
  const options = isProducts.products.map(({ title }) => {
    return { value: title, label: title };
  });
  return (
    <>
      <Navbar isAdmin={true} isLoggedIn={true} />
      <Select
        onChange={(x) => {
          if (x == null) {
            setCurrent(null);
          } else {
            const product = isProducts.products.filter(
              (product) => product.title === x.value
            )[0];
            setCurrent(product);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setPhotoUrl(product.imagePath);
            setId(product._id);
            setImgSrc(product.imagePath);
          }
        }}
        options={options}
        isClearable={true}
        isSearchable={true}
      />
      {current === null ? (
        <></>
      ) : (
        <>
          {
            <>
              <form
                onSubmit={submitForm}
                className="align-items-center text-center"
              >
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
                <img
                  className="card-img-top"
                  src={imgSrc}
                  alt="Card image cap"
                />
                <div className="form-row text-center">
                  <div className="form-group col-md-6 text-center m-auto p-2">
                    <label for="photoUrl">Photo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="photoUrl"
                      name="photoUrl"
                      placeholder="Photo URL"
                      value={photoUrl}
                      onChange={(e) => {
                        setPhotoUrl(e.target.value);
                        setFile({});
                        setFileName("Choose File");
                      }}
                      onBlur={(e) => setImgSrc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row text-center">
                  <div className="input-group mb-3 col-md-6 p-2 m-auto form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Upload</span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                          // console.log(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                          setIsFile(true);
                          const reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onloadend = (e) => {
                            setImgSrc(e.target.result);
                          };
                        }}
                      />
                      <label
                        className="custom-file-label"
                        for="inputGroupFile01"
                      >
                        {fileName}
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-dark m-1">
                  Add Item
                </button>
              </form>
            </>
          }
        </>
      )}
    </>
  );
};

export default EditItem;
