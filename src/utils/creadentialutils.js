// Promise to verify creadentials
function verifyCredentials(formData,login) {
    return new Promise((resolve, reject) => {
      if (
        formData.name === "" &&
        formData.email === "" &&
        formData.password === "" &&
        formData.confirmPassword === ""
      ) {
        reject("All fields are required");
      }
      if (formData.name === "" && !login) {
        reject("Please enter full name");
      }
      if (formData.email === "") {
        reject("Please enter email");
      }
      if (formData.password === "") {
        reject("Please enter password");
      }
      if (formData.password !== formData.confirmPassword && !login) {
        reject("Password didn't match");
      }

      resolve();
    });
  }

  export default verifyCredentials;