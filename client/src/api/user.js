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

async function getUser(id) {
  let res = await fetch(base + `/api/user/` + id);

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let object = await res.json();
  let users = await object["users"];
  return users[0];
}

async function updateUser(id, username, password) {
  let obj = {
    username: username,
    password: password,
  };

  let res = await fetch(base + `/api/user/` + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (res.status == 400) {
    alert("You must change your username or password!");
  }

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let object = await res.json();

  let user = await object["user"];

  return user;
}

async function deleteUser(id) {
  let res = await fetch(base + `/api/user/` + id, {
    method: "DELETE",
  });

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return false;
  }

  return true;
}

export { createUser, getUser, updateUser, deleteUser };
