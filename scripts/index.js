document.addEventListener("DOMContentLoaded", () => {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//display data
const guideList = document.querySelector(".guides");
let html = "";
const displayData = (docs) => {
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

const displayUI = (user) => {
  if (user) {
    loginUIs.forEach((item) => (item.style.display = "block"));
    logoutUIs.forEach((item) => (item.style.display = "none"));
  } else {
    loginUIs.forEach((item) => (item.style.display = "none"));
    logoutUIs.forEach((item) => (item.style.display = "block"));
  }
};
