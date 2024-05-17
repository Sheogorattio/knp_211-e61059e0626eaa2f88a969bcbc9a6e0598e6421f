import * as yup from "yup";


export const yupAuthSchemaOne = yup.object({
    email: yup.string().email("Введіть коректний email").required(),
    login: yup.string().required("Required")
});

export const yupAuthSchemaTwo = yup.object({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
})