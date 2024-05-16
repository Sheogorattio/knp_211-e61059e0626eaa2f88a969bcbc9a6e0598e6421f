import * as yup from "yup";

const MIN = 5;
const MAX = 10;
const PASS_VALUE = 8;
const yupRegisterSchema = yup.object({
  name: yup.string().required("Введіть ім'я"),
  login: yup
    .string()
    .min(MIN, `Логін менше ${MIN} символів`)
    .max(MAX, `Логін більше ${MAX} символів`)
    .required("Логін треба заповнити"),
  email: yup
    .string()
    .email("Введіть коректний email")
    .required("Email треба заповнити"),
  password: yup
    .string()
    .min(PASS_VALUE, `Пароль не може бути менше ${PASS_VALUE} символів`)
    .required("Пароль треба заповнити"),
  confirmPassword: yup
    .string()
    .required("Порожнє поле")
    .oneOf([yup.ref("password")], "Паролі не однакові"),
});

export default yupRegisterSchema;
