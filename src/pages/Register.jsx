import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";
import { Formik } from "formik";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("Email es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Contraseña es requerida"),
  });

  const handleSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const credentialUser = await register({ email, password });
      resetForm();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return setErrors({ email: "Email no valido" });
      }
      if (error.code === "auth/wrong-password") {
        return setErrors({ password: "Password no valida" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Ingrese un Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control m-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Cree una Contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control m-3"
            />
            {errors.password && touched.password && errors.password}
            <div className="text-center">
              {isSubmitting ? (
                <>
                  <p className="lead">Registering...</p>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
