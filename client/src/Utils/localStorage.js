//as during login we are retreving the data from local storage so we also have to fetch it
// and this can't be done directly via browser axios nhi kr skta so we will use
//interceptors instead to intercept the request and response and tailor them accordingly
const KEY_ACCESS = "acess_token";
function getitem(key) {
  return localStorage.getItem(key);
}
function setitem(key, value) {
  localStorage.setItem(key, value);
}
function removeitem(key) {
  localStorage.removeItem(key);
}
export { getitem, setitem, removeitem, KEY_ACCESS };
