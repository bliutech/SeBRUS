import { base, showError } from "./util.js";

const getSession = async (id) => {
  let res = await fetch(base + `/api/user/` + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let data = await res.json();

  let session = data.session;

  return session;
};

const createSession = () => {};

const updateSession = () => {};

const deleteSession = async (id) => {
  let res = await fetch(base + `/api/user/` + id, {
    headers: {
      Method: "DELETE",
      "Content-Type": "application/json",
    },
  });

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let data = await res.json();

  let session = data.session;

  return session;
};

export { getSession, deleteSession };
