import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../context/UserContext";
import * as Yup from "yup";
import { Formik } from "formik";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

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
      <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
        <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
          <AddAPhotoIcon />
        </Avatar>

        <Typography variant="h5" component="h1">
          Register
        </Typography>

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
            <Box onSubmit={handleSubmit} component={"form"} sx={{ mt: 1 }}>
              <TextField
                type="text"
                name="email"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ mb: 3, mx: "auto" }}
                id="emailR"
                fullWidth
                label="Ingresar Email"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />

              <TextField
                type="password"
                name="password"
                placeholder="******"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ mb: 3, mx: "auto" }}
                id="passwordR"
                label="Crea una contraseña"
                fullWidth
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
                Registrarse
              </LoadingButton>

              <Button fullWidth component={Link} to="/">¿Ya tienes una cuenta?, Ingresa</Button>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Register;
