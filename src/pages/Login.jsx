import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

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
      <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
        <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
          <AddAPhotoIcon />
        </Avatar>

        <Typography variant="h5" component="h1">
          Login
        </Typography>

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
            <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component={"form"}>
              <TextField
                type="text"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                id="email"
                label="Ingrese Email"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />

              <TextField
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                id="password"
                label="Ingrese Contraseña"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <LoadingButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                variant="contained"
                fullWidth
                sx={{ mb: 3, mx: "auto" }}
              >
                Acceder
              </LoadingButton>

              <Button fullWidth component={Link} to="/register">
                ¿No tienes cuenta?, Registrate
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
