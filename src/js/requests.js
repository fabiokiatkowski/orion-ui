export default function GetAsync(userId) {
  return fetch(`http://192.168.0.193:8080/users/${userId}/stages`)
    .then(response => response.json()
      .then(responseJson => responseJson));
}
