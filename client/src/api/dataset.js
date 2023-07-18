import { base, showError } from "./util.js";

async function createDataset(username, password) {
  let object = {
    username: username,
    password: password,
  };

  let res = await fetch(base + `/api/dataset`, {
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

async function getDataset(id) {
  const response = await fetch(base + `/api/dataset/` + id, {
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
  const dataset = object.address; // correct?
  return dataset;
}

async function changeDataset(username, password) {
  /* TODO: implement this thing! */
  return;
}

async function deleteDataset(username, password) {
  /* TODO: implement this thing! */
  return;
}

export { createDataset, getDataset, changeDataset, deleteDataset };
