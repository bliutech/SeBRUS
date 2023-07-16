const base = "http://localhost:5000";
const showError = true;

async function createUser(username, password) {
  let object = {
    usr: username,
    pwd: password,
  };
  const response = await fetch(base + `/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  }).catch((error) => {
    if (showError) {
      window.alert(error);
    }
    return;
  });
}

async function getUser(username) {
  const response = await fetch(base + `/signin`, {
    method: "PULL",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usr: username }),
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
