export function validateSignUpUserInfo(userInfo) {
   const { name, email, password } = userInfo;

   const isValidName = /^[a-z A-Z]+$/;
   const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   // if there is no name
   if (!name.trim()) return { ok: false, error: "Name field is missing" };
   if (!isValidName.test(name)) return { ok: false, error: "Invlaid Name" };

   // if there is no email
   if (!email.trim()) return { ok: false, error: "Email field is missing" };
   // copied from W3 school
   if (!isValidEmail.test(email)) {
      return { ok: false, error: "Invlaid Email" };
   }

   // if there is no password
   if (!password.trim()) return { ok: false, error: "Password field is missing" };
   // password min length = 6 and max length = 8
   if (password.length < 6 && password.length > 13)
      return { ok: false, error: "Password should be 6 to 12 characters long" };

   return { ok: true };
}

export function validOneTimePassword(OTP) {
   // Check if the input is an array
   if (!Array.isArray(OTP)) {
      return false;
   }

   // Check if the input has exactly 6 digits
   if (OTP.length !== 6) {
      return false;
   }

   // Check if each string represents a valid number (between "0" and "9")
   for (let i = 0; i < OTP.length; i++) {
      const num = OTP[i];
      if (
         typeof num !== "string" ||
         num.length !== 1 ||
         isNaN(num) ||
         parseInt(num) < 0 ||
         parseInt(num) > 9
      ) {
         return false;
      }
   }

   // If all checks pass, the OTP is valid
   return true;
}

export function validateSignInInfo(userInfo) {
   const { email, password } = userInfo;

   const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

   // if there is no email
   if (!email.trim()) return { ok: false, error: "Email field is missing" };
   // copied from W3 school
   if (!isValidEmail.test(email)) {
      return { ok: false, error: "Invlaid Email" };
   }

   // if there is no password
   if (!password.trim()) return { ok: false, error: "Password field is missing" };
   // password min length = 6 and max length = 8
   if (password.length < 6 && password.length > 13)
      return { ok: false, error: "Password should be 6 to 12 characters long" };

   return { ok: true };
}
