import * as yup from "yup";

export const addBookSchema = yup.object().shape({
  title: yup.string().required("Title is required."),
  author: yup.string().required("Author is required."),
  totalPages: yup
    .number()
    .typeError("Number of pages must be a number.")
    .min(1, "Number of pages must be at least 1.")
    .required("Number of pages are required."),
});
