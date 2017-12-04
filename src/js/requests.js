export function getAsync() {
  return fetch('http://localhost:8080/users/202/stages')
  .then((response) => response.json()
    .then((responseJson) => {
      return responseJson
  }));
}