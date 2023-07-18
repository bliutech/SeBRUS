import { base, showError } from "./util.js";

async function createUser(username, password) {
  let object = {
    username: username,
    password: password,
  };

  let res = await fetch(base + `/api/user`, {
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
  }

  let data = await res.json();

  let user = await data["user"];

  return user;
}

async function getUser(username) {
  const response = await fetch(base + `/api/user`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = `An error has occurred`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object;
}

async function changeUser(username, password) {
  /* TODO: implement this thing! */
  return;
}

async function deleteUser(username, password) {
  /* TODO: implement this thing! */
  return;
}

export { createUser, getUser, changeUser, deleteUser };
