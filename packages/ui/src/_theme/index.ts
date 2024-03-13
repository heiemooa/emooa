import useInternalToken from './useToken';
import getToken from './getToken';

function useToken() {
  const [theme, token, hashId] = useInternalToken();

  return { theme, token, hashId };
}

export default {
  useToken,
  getToken,
};
