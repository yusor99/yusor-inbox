const origin = "http://15.184.165.181:3000";
const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmEzMjA4Yy1hMDc5LTRjMDgtOTNiZi1lNmViYTNjYjAxOGQiLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjI4ODg1OTI4LCJleHAiOjE2MjkzMTc5Mjh9.9snrJstX2xe4b6v5DjbRZw_ffJNuP-0nl8y-Qqecl50";
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${access_token}`);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
export const apiList = (skip, take, callback) => {
  fetch(`${origin}/inbox?skip=${skip}&take=${take}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

//Retrieve
export const apiRetrieve = (callback, id) => {
  fetch(`${origin}/inbox/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};
//DESTROY api
export const apiDestroy = (callback, id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${access_token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ inboxIdList: [id] }),
  };

  fetch(`${origin}/inbox/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => callback(null, result))
    .catch((error) => callback(error, null));
};