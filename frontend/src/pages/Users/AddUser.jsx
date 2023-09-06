import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../../redux/user/UserApi";
import Form from "../../parts/Users/Form";
import { toast } from "react-toastify";
import { reset } from "../../redux/user/UserSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [role, setRole] = useState("user");

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onForm = async (e) => {
    e.preventDefault();

    try {
      await dispatch(getUsers()).unwrap();
      const response = await dispatch(addUser({ ...form, role })).unwrap();
      if (response) dispatch(reset());
      navigate("/dashboard/users");
      toast.success("Success add Users");
    } catch (error) {
      toast.error(error);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setRole("user");
      dispatch(reset());
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Form
        role={role}
        setRole={setRole}
        form={form}
        onForm={onForm}
        onChanges={onChanges}
        method="POST"
      ></Form>
    </div>
  );
};

export default AddUser;
