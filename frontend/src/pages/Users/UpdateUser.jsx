import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/user/UserApi";
import Form from "../../parts/Users/Form";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: profiles[0]?.name,
    email: profiles[0]?.email,
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [role, setRole] = useState(profiles[0]?.role);

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
        updateUser({
          ...form,
          role,
          uuid: profiles[0]?.uuid,
        })
      ).unwrap();

      navigate("/dashboard/users");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Form
        form={form}
        role={role}
        setRole={setRole}
        onChanges={onChanges}
        onForm={onForm}
      ></Form>
    </div>
  );
};

export default UpdateUser;
