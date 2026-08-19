const postModal = document.getElementById("postModal"),
  openPost = document.getElementById("openPost"),
  postButton = document.getElementById("postButton"),
  closeModal = document.getElementById("closeModal"),
  cancelModal = document.getElementById("cancelModal"),
  publishPost = document.getElementById("publishPost"),
  postInput = document.getElementById("postInput"),
  toast = document.getElementById("toast");
function openCreatePost() {
  postModal.classList.add("open");
  setTimeout(() => postInput.focus(), 200);
}
function closeCreatePost() {
  postModal.classList.remove("open");
}
openPost.addEventListener("click", openCreatePost);
postButton.addEventListener("click", openCreatePost);
closeModal.addEventListener("click", closeCreatePost);
cancelModal.addEventListener("click", closeCreatePost);
postModal.addEventListener("click", (e) => {
  if (e.target === postModal) closeCreatePost();
});
document.querySelectorAll(".type-btn").forEach((button) =>
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".type-btn")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  }),
);
publishPost.addEventListener("click", function () {
  const text = postInput.value.trim();
  if (!text) {
    showToast("Write something before posting.");
    return;
  }
  closeCreatePost();
  postInput.value = "";
  showToast("Your post has been published.");
});
const categories = document.querySelectorAll(".category");
categories.forEach((category) =>
  category.addEventListener("click", function () {
    categories.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
    const filter = this.dataset.filter;
    document.querySelectorAll("[data-type]").forEach((item) => {
      item.style.display =
        filter === "all" ? "" : item.dataset.type === filter ? "" : "none";
    });
  }),
);
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  document
    .querySelectorAll(".post,.question,.group-card,.event-card")
    .forEach((item) => {
      item.style.display =
        !query || item.innerText.toLowerCase().includes(query) ? "" : "none";
    });
});
document.querySelectorAll(".action").forEach((button) =>
  button.addEventListener("click", function () {
    const text = this.innerText.toLowerCase();
    if (text.includes("save")) {
      this.classList.toggle("saved");
      showToast(
        this.classList.contains("saved")
          ? "Saved to your collection."
          : "Removed from saved.",
      );
    } else if (text.includes("share")) showToast("Share options are ready.");
    else showToast("Action recorded.");
  }),
);
document.querySelectorAll(".join").forEach((button) =>
  button.addEventListener("click", function () {
    this.textContent = "Joined ✓";
    showToast("You joined the group.");
  }),
);
document
  .querySelectorAll(".event-btn")
  .forEach((button) =>
    button.addEventListener("click", () =>
      showToast("Event details selected."),
    ),
  );
document
  .getElementById("filterBtn")
  .addEventListener("click", () =>
    showToast("Use the categories to filter the community."),
  );
document
  .getElementById("searchBtn")
  .addEventListener("click", () => searchInput.focus());
document.querySelectorAll(".nav-item").forEach((item) =>
  item.addEventListener("click", function () {
    const page = this.dataset.page;
    if (page === "community") return;
    const names = {
      home: "Home",
      ai: "AI Agent",
      notice: "Notice",
      problem: "Your Problem",
    };
    showToast(names[page] + " page selected.");
  }),
);
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function hom() {
  window.location.replace("../home/home.html");
}
function AI() {
  window.location.replace("../AI/AI_agent.html");
}
function not() {
  window.location.replace("../notice/notice.html");
}
function comp() {
  window.location.replace("../complain/complaint.html");
}
