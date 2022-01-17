import * as ERROR_MESSAGES from './customErrorMessages';

export const getFirebaseErrorMessage = (code) => {
  let message = null;

  switch (code) {
    case 'auth/user-not-found':
      message = ERROR_MESSAGES.USER_NOT_FOUND;
      break;
    case 'auth/email-already-exists':
      message = ERROR_MESSAGES.EMAIL_ALREADY_EXIST;
      break;
    case 'auth/too-many-requests':
      message = ERROR_MESSAGES.TOO_MANY_REQUESTS;
      break;
    case 'auth/email-already-in-use':
      message = ERROR_MESSAGES.EMAIL_ALREADY_IN_USE;
      break;
    case 'auth/invalid-email':
      message = ERROR_MESSAGES.INVALID_EMAIL;
      break;
    case 'auth/wrong-password':
      message = ERROR_MESSAGES.WRONG_PASSWORD;
      break;
    default:
      message = ERROR_MESSAGES.DEFAULT_MESSAGE;
      break;
  }
  return message;
};
