// import React, { useRef } from "react";

// function Register() {
//   const navigate = useNavigate();
//   const usernameRef = useRef();
//   const passwordRef = useRef();
//   const verifyRef = useRef();

//   const submitHandler = (event) => {
//     event.preventDefault();

//     if (passwordRef.current.value === verifyRef.current.value) {
//       fetch("http://localhost:8000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: usernameRef.current.value,
//           website: passwordRef.current.value,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           navigate("/login");
//         });
//     }
//   };

//   return (
//     <>
//       <div>
//         <form onSubmit={submitHandler}>
//           <label htmlFor="username">Choose your username</label>
//           <input ref={usernameRef} type="text" id="username" />
//           <label htmlFor="password">Choose your password</label>
//           <input ref={passwordRef} type="password" id="password" />
//           <label htmlFor="verify">Verify password</label>
//           <input ref={verifyRef} type="password" id="verify" />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Register;
