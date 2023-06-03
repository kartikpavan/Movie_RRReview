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
