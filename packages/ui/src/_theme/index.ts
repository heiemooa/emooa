import useInternalToken from './useToken';

function useToken() {
  const [theme, token, hashId] = useInternalToken();

  return { theme, token, hashId };
}

export default {
  useToken,
};
