import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup
    .string()
        .required("Name is required.")
    .min(3, "Name must be at least 3 characters."),
  email: yup
    .string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Mail is invalid."
    )
    .required("Mail is required."),
  password: yup
    .string()
    .matches(/^\S*$/, "Your password should not contain spaces.")
    .required("Password is required.")
    .min(7, "Password must be at least 7 characters."),
});