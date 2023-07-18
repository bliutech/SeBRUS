import { base, showError } from "./util.js";

const getSession = async (id) => {
  let res = await fetch(base + `/api/session/` + id, {
    method: "GET",
    credentials: "include",
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

const createSession = async (username, password) => {
  let object = {
    username: username,
    password: password,
  };

  let res = await fetch(base + `/api/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let data = await res.json();

  let session = await data["session"];

  return session.token;
};

const deleteSession = async (id) => {
  let res = await fetch(base + `/api/session/` + id, {
    method: "DELETE",
    credentials: "include",
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

export { getSession, deleteSession, createSession };
