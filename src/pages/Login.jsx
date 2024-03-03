import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

const onSubmit = async (
  { email, password },
  { setSubmitting, setErrors, resetForm }
) => {
  try {
    const credentialUser = await login({ email, password });
    resetForm();
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return setErrors({ email: "Usuario no registrado" });
    }
    if (error.code === "auth/wrong-password") {
      return setErrors({ password: "Password incorrecta" });
    }
  } finally {
    setSubmitting(false);
  }
};

const validationSchema = Yup.object({}).shape({
  email: Yup.string().email("Email no valido").required("Email requerido"),
  password: Yup.string()
    .trim()
    .min(6, "Minimo 6 carácteres")
    .required("Password requerido"),
});

const Login = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
              placeholder="Ingrese Email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              className="form-control m-3"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="Ingrese Contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              className="form-control m-3"
            />
            {errors.password && touched.password && errors.password}
            <div className="text-center">
              {isSubmitting ? (
                <>
                  <p className="lead">Login...</p>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    disabled={isSubmitting}
                  >
                    Login
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

export default Login;
