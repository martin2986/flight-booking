type storePersistTypes = {
  set: (key: string, state: string) => void;
  get: (key: string) => boolean;
  remove: (key: string) => void;
  getAll: () => void;
  clear: () => void;
};

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
  return true;
}

export const localStorageHealthCheck = async () => {
  for (var i = 0; i < localStorage.length; ++i) {
    try {
      const result = window.localStorage.getItem(localStorage.key(i));
      if (!isJsonString(result)) {
        window.localStorage.removeItem(localStorage.key(i));
      }
      if (result && Object.keys(localStorage.key(i)).length == 0) {
        window.localStorage.removeItem(localStorage.key(i));
      }
    } catch (error) {
      window.localStorage.clear();
      // Handle the exception here
      console.error("window.localStorage Exception occurred:", error);
      // You can choose to ignore certain exceptions or take other appropriate actions
    }
  }
};

export const storePersist: storePersistTypes = {
  set: (key, state) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key: string) => {
    const result = window.localStorage.getItem(key);
    if (!result) {
      return false;
    } else {
      if (!isJsonString(result)) {
        window.localStorage.removeItem(key);
        return false;
      } else return JSON.parse(result);
    }
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => {
    return window.localStorage;
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default storePersist;
