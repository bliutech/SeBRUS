import { base, showError } from "./util.js";

async function createABI(name, abi) {
  let object = {
    name: name,
    abi: abi,
  };

  let res = await fetch(base + `/api/abi`, {
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

  let abi_res = await data["abi"];

  return abi_res;
}

async function getABI(id) {
  let res = await fetch(base + `/api/abi/` + id);

  if (res.status >= 400) {
    if (showError) {
      console.log(res);
    }
    return null;
  }

  let object = await res.json();
  let abis = await object["abi"];
  return abis;
}

async function updateABI(id, name, abi) {
  let obj = {
    name: name,
    abi: abi,
  };

  let res = await fetch(base + `/api/abi/` + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (res.status === 400) {
    alert("You must change your name or abi!");
  }

  let data = await res.json();
  let retABI = await data["abi"];
  return retABI;
}

async function deleteABI(id) {
  let res = await fetch(base + `/api/abi/` + id, {
    method: "DELETE",
  });

  if (res.status === 400) {
    alert("You must change your name or abi!");
    return false;
  }
  return true;
}

export { createABI, getABI, updateABI, deleteABI };
