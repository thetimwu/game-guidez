//listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    //get data from firestore
    db.collection("guides")
      .get()
      .then((res) => {
        displayData(res.docs);
        displayUI(user);
      });
  } else {
    displayData([]);
    displayUI();
  }
});

//signup
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  const res = await auth.createUserWithEmailAndPassword(email, password);
  console.log(res.user);
  const modal = document.querySelector("#modal-signup");
  M.Modal.getInstance(modal).close();
  signupForm.reset();
});

//logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  const lg = await auth.signOut();
  //   console.log("logged out");
});

//login
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  const res = await auth.signInWithEmailAndPassword(email, password);
  console.log(res.user);
  const modal = document.querySelector("#modal-login");
  M.Modal.getInstance(modal).close();
  loginForm.reset();
});

//create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await db.collection("guides").add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    });
    const modal = document.querySelector("#modal-create");
    M.Modal.getInstance(modal).close();
    createForm.reset();
  } catch (err) {
    console.log(err.message);
  }
});
