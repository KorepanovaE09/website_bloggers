export const validateFormLogin = (formData, setErrors) => {
  const errors = {};
  let isValid = true;
  console.log(formData);
  for (const key in formData) {
    if (!formData[key]) {
      errors[key] = "* Поле обязательно для заполнения";
      isValid = false;
    } else {
      errors[key] = "";
    }
  }

  if (formData.password) {
    if (formData.password.length < 8) {
      errors.password = "* Пароль должен быть больше 8 символов";
      isValid = false;
    }
  }

  if (formData.password && formData.confirmPassword) {
    if (formData.password != formData.confirmPassword) {
      errors.confirmPassword = "* Пароли не совпадают";
      isValid = false;
    }
  }

  setErrors(errors);

  return { isValid };
};

export const validateFormUnique = (err, setErrors) => {
  if (
    err.message ===
    "Пользователь с этим номером телефона или email уже зарегистрирован!"
  ) {
    setErrors((prev) => ({
      ...prev,
      unique: "* Пользователь с такими данными уже существует",
    }));
    return true;
  }
  return false;
};

export const validateFormProfileUnique = (err, setErrors) => {
  if (err?.message) {
    setErrors((prev) => ({
      ...prev,
      unique: "* Пользователь с такими данными уже существует",
    }));
    return true;
  }
  return false;
};

export const validateFormProfile = (profileData) => {
  const errors = {};
  let isValid = true;

  for (const key in profileData) {
    if (!profileData[key]) {
      errors[key] = "* Поле обязательно для заполнения";
      isValid = false;
    } else {
      errors[key] = "";
    }
  }

  return { isValid, errors };
};

export const validateFormSignUp = (formData, setErrors) => {
  const errors = {};
  let isValid = true;

  // if (formData.password) {
  //   if (formData.password.length < 8) {
  //     errors.password = "* Пароль должен быть не менее 8 символов";
  //     isValid = false;
  //   }
  // }

  setErrors(errors);
  return { isValid };
};

export const signUpResponse_invalid_credentials = (response, setErrors) => {
  if (response?.status === 401) {
    setErrors({
      invalid_credentials: "* Неверный email или пароль",
    });
    return true;
  }
  return false;
};

export const validateFormAddChannel = (data, setErrors) => {
  let isValid = true;
  let errors = {};

  for (const key in data) {
    if (!data[key].trim()) {
      errors[key] = "* Поле обязательно для заполнения";
      isValid = false;
    } else {
      errors[key] = "";
    }
  }
  setErrors(errors);

  return isValid;
};

export const addChannel_already_exists = (response, setErrors) => {
  if (response?.status === 409) {
    setErrors({
      already_exists: "* Такой канал уже существует",
    });
    return true;
  }
  return false;
};

export const validateForm = (data, setErrors) => {
  let isValid = true;
  let errors = {};

  for (const key in data) {
    if (!data[key].trim()) {
      errors[key] = "* Поле обязательно для заполнения";
      isValid = false;
    } else {
      errors[key] = "";
    }
  }

  setErrors(errors);
  return isValid;
};
