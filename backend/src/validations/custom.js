export const EmailId = (value, helpers) => {
  if (
    !value.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return helpers.message("Email is invalid.");
  }
  return value;
};

export const Password = (value, helpers) => {
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/)) {
    return helpers.message(
      "Password must be 8-15 characters and contain at least one number and one special character."
    );
  }
  return value;
};
