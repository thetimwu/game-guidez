// call cloud functions
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  const res = await addAdminRole({ email: email });
  console.log(res);
});

//listen for auth status changes
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const res = await user.getIdTokenResult();
    user.admin = res.claims.admin;
    displayUI(user);
    //get data from firestore
    db.collection("guides").onSnapshot(
      (res) => {
        displayData(res.docs);
      },
      (err) => {
        console.log(err.message);
      }
    );
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
  const bio = signupForm["signup-bio"].value;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(res.user.uid).set({
      bio: bio,
    });
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector(".error").innerHTML = "";
  } catch (err) {
    signupForm.querySelector(".error").innerHTML = err.message;
  }
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

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    console.log(res.user);
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector(".error").innerHTML = "";
  } catch (err) {
    loginForm.querySelector(".error").innerHTML = err.message;
  }
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
