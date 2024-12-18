import useInternalToken from './useToken';
import getToken from './getToken';

function useToken() {
  const [theme, token, hashId, , scheme] = useInternalToken();

  return { theme, token, hashId, scheme };
}

export default {
  useToken,
  getToken,
};
