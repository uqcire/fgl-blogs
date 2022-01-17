export const validateEmailFormat = (rule: any, value: string) => {
  const mailformat = /\S+@\S+\.\S+/;
  if (!value) {
    return new Error('Please enter your email address');
    // eslint-disable-next-line no-else-return
  } else if (!mailformat.test(String(value).toLocaleLowerCase())) {
    return new Error('Please enter the correct email format');
  }
  return true;
};

export const validatePasswordFormat = (rule: any, value: string) => {
  const passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!value) {
    return new Error('Please enter your password');
    // eslint-disable-next-line no-else-return
  } else if (!passwordFormat.test(value)) {
    return new Error('Password must containers at least 8 characters at least 1 digit and at least 1 upper case alphabet');
  }
  return true;
};
