import { base, showError } from "./util.js";

async function createDataset(name, description, address, abi_id) {
  let object = {
    name: name,
    description: description,
    address: address,
    abi_id: abi_id,
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
    return null;
  }

  let data = await res.json();

  let dataset = await data["dataset"];

  return dataset;
}

async function getDataset(id) {
  let res = await fetch(base + `/api/dataset/` + id);

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let object = await res.json();
  let dataset = await object["dataset"];
  return dataset;
}

async function changeDataset(id, name, description, address) {
  let obj = {
    name: name,
    description: description,
    address: address,
  };

  let res = await fetch(base + `/api/dataset/` + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (res.status === 400) {
    alert("You must change your name or description or address!");
    return null;
  }

  let data = await res.json();

  let dataset = await data["dataset"];

  return dataset;
}

async function deleteDataset(id) {
  let res = await fetch(base + `/api/dataset/` + id, {
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

export { createDataset, getDataset, changeDataset, deleteDataset };
