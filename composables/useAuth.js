import jwt_decode from "jwt-decode";

export default () => {
  const useAuthToken = () => useState("authToken");
  const useAuthUser = () => useState("authUser");
  const useAuthLoading = () => useState("authLoading", () => true);

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setIsLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });

        setToken(data.accessToken);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.accessToken);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken) {
      return;
    }

    const jwt = jwt_decode(authToken.value);

    const newRefreshTime = jwt.exp - 6000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      try {
        await refreshToken();
        await getUser();
        reRefreshAccessToken();
        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    useAuthLoading,
    initAuth,
  };
};
