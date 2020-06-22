document.addEventListener("DOMContentLoaded", () => {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//display data
const guideList = document.querySelector(".guides");
const displayData = (docs) => {
  let html = "";
  if (docs.length) {
    docs.forEach((doc) => {
      const guide = doc.data();
      html += `
        <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
        </li>
        `;
    });
  } else {
    html = "<h1>not login</h1>";
  }

  guideList.innerHTML = html;
};

//display UI
const loginUIs = document.querySelectorAll(".logged-in");
const logoutUIs = document.querySelectorAll(".logged-out");
const accountDetail = document.querySelector(".account-details");
const adminUIs = document.querySelectorAll(".admin");

const displayUI = async (user) => {
  if (user) {
    if (user.admin) {
      adminUIs.forEach((item) => (item.style.display = "block"));
    }
    const doc = await db.collection("users").doc(user.uid).get();
    accountDetail.innerHTML = `<div>Logged in as ${user.email} </div>
    <div>${doc.data().bio}</div>
    <div>${user.admin ? "Admin" : ""}`;
    loginUIs.forEach((item) => (item.style.display = "block"));
    logoutUIs.forEach((item) => (item.style.display = "none"));
  } else {
    adminUIs.forEach((item) => (item.style.display = "none"));
    accountDetail.innerHTML = "";
    loginUIs.forEach((item) => (item.style.display = "none"));
    logoutUIs.forEach((item) => (item.style.display = "block"));
  }
};
