import { useRoute } from 'vue-router';

const route = useRoute();

export const routeCheck = (route) => {
  if (route.name === 'ForgotPassword' || route.name === 'RecoveryEmailed') {
    route = true;
  } else {
    value = false;
  }
};
