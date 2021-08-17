export const key = 'authenticated';

export const getAuthenticated = () => !!localStorage.getItem(key);

export const setAuthenticated = (authenticated: boolean) => {
  if (authenticated) {
    localStorage.setItem(key, '1');
  } else {
    localStorage.removeItem(key);
  }
};
