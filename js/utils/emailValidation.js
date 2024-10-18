export function emailValidation(email) {
  let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (!validEmail.test(email)) {
    alert("Por favor ingresa un email valido");
    return false;
  }
  return true;
}
