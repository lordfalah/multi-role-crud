import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { updateProducts } from "../../redux/product/ProductApi";
import Form from "../../parts/Products/Form";
import { toast } from "react-toastify";
import { reset } from "../../redux/product/ProductSlice";

const UpdateProduct = () => {
  const { product, isError } = useSelector((state) => state.product);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useLoaderData();

  const [form, setForm] = useState({
    name: product ? product[0]?.name : "",
    price: product ? product[0]?.price : "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile({ name: product[0]?.images[0].filename });
    }
  };

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProducts({ id, image: selectedFile, ...form })
      ).unwrap();

      navigate("/dashboard/product");
      if (isError) dispatch(reset());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Form
        onChanges={onChanges}
        onForm={onForm}
        handleImageChange={handleImageChange}
        image={
          selectedFile
            ? selectedFile
            : { name: product[0]?.images[0]?.filename }
        }
        name={form.name}
        price={form.price}
        method="PATCH"
      ></Form>
    </div>
  );
};

export default UpdateProduct;
