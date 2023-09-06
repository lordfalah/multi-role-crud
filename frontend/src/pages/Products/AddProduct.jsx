import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProduct } from "../../redux/product/ProductApi";
import { useNavigate } from "react-router-dom";
import Form from "../../parts/Products/Form";
import { toast } from "react-toastify";
import { reset } from "../../redux/product/ProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const onForm = async (e) => {
    e.preventDefault();
    const { name, price } = form;

    try {
      await dispatch(getProduct()).unwrap();
      const resp = await dispatch(
        createProduct({ name, price: parseInt(price), image: selectedFile })
      ).unwrap();

      if (resp) dispatch(reset());
      navigate("/dashboard/product");
    } catch (error) {
      if (error) {
        dispatch(reset());
        setForm({
          name: "",
          price: "",
        });
        setSelectedFile(null);
        toast.error(error);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Fragment>
      <div className="w-full flex justify-center items-center">
        <Form
          onForm={onForm}
          onChanges={onChanges}
          handleImageChange={handleImageChange}
          name={form.name}
          price={form.price}
          image={selectedFile}
          method="POST"
        ></Form>
      </div>
    </Fragment>
  );
};

export default AddProduct;
