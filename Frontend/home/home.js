const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotification = document.getElementById("closeNotification");
const profileBtn = document.getElementById("profileBtn");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

function updateTime() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  document.getElementById("currentTime").textContent = `${h}:${m} ${ap}`;
}
function updateDate() {
  document.getElementById("todayDate").textContent =
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
}
updateTime();
updateDate();
setInterval(updateTime, 30000);

notificationBtn.addEventListener("click", () =>
  notificationPanel.classList.add("open"),
);
closeNotification.addEventListener("click", () =>
  notificationPanel.classList.remove("open"),
);
document.addEventListener("click", (e) => {
  if (
    !notificationPanel.contains(e.target) &&
    !notificationBtn.contains(e.target)
  )
    notificationPanel.classList.remove("open");
});
profileBtn.addEventListener("click", () =>
  showToast("Profile page will open here."),
);

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;
    if (page === "home") return showToast("You are already on Home.");
    const names = {
      community: "Community",
      ai: "AI Agent",
      notice: "Notice",
      problem: "Your Problem",
    };
    showToast(`${names[page] || "XAMPUS"} page selected.`);
  });
});
document.querySelectorAll(".quick-card").forEach((card) => {
  card.addEventListener("click", () => {
    const messages = {
      scan: "QR Scanner is ready.",
      schedule: "Opening today's schedule.",
      map: "Campus Map is preparing.",
      emergency: "Emergency assistance selected.",
    };
    showToast(messages[card.dataset.action] || "Action selected.");
  });
});
document
  .getElementById("radarDetails")
  .addEventListener("click", () => showToast("Campus Radar details selected."));

let timer;
function showToast(message) {
  toastText.textContent = message;
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "n") notificationPanel.classList.toggle("open");
});


function com(){
    window.location.replace("../community/community.html");
}

function AI(){
    window.location.replace("../AI/AI_agent.html");
}
function not(){
    window.location.replace("../notice/notice.html");
}
function comp(){
    window.location.replace("../complain/complaint.html");
}