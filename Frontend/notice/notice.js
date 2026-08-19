const data = [
  [
    1,
    "urgent",
    "Important campus schedule update",
    "Students are requested to follow the revised campus schedule and check their department timetable.",
    "Academic Office",
    "18 Aug • 09:20 AM",
    1,
    1,
  ],
  [
    2,
    "exam",
    "Internal Assessment examination schedule published",
    "The department-wise Internal Assessment schedule has been published. Verify subject, reporting time and venue.",
    "Examination Cell",
    "17 Aug • 04:15 PM",
    1,
    1,
  ],
  [
    3,
    "academic",
    "First-year academic orientation programme",
    "Orientation will cover academic rules, campus services, student support and important procedures.",
    "Student Affairs",
    "17 Aug • 11:30 AM",
    0,
    0,
  ],
  [
    4,
    "event",
    "Campus cultural event — registration open",
    "Students interested in participating can complete their registration before the deadline.",
    "Cultural Committee",
    "16 Aug • 03:40 PM",
    0,
    0,
  ],
  [
    5,
    "scholarship",
    "Scholarship application support desk",
    "Students needing assistance with applications, documents or verification can visit the support desk.",
    "Student Welfare Office",
    "16 Aug • 12:10 PM",
    1,
    0,
  ],
  [
    6,
    "placement",
    "Campus placement drive — registration open",
    "Eligible students can review the role, criteria and registration requirements before applying.",
    "Training & Placement Cell",
    "15 Aug • 05:05 PM",
    0,
    0,
  ],
  [
    7,
    "hostel",
    "Hostel room allocation and maintenance update",
    "Students should check the latest hostel instructions and complete pending formalities.",
    "Hostel Office",
    "15 Aug • 10:00 AM",
    0,
    0,
  ],
  [
    8,
    "library",
    "Library timing extended during assessment period",
    "The library will operate with extended hours during the assessment period.",
    "Central Library",
    "14 Aug • 02:25 PM",
    0,
    0,
  ],
  [
    9,
    "admin",
    "Student document verification window",
    "A dedicated window has been announced for verification and correction of student records.",
    "Administration Office",
    "14 Aug • 11:00 AM",
    1,
    0,
  ],
  [
    10,
    "academic",
    "Department timetable revision",
    "Students are advised to verify the latest timetable before attending their next class.",
    "Department Office",
    "13 Aug • 04:30 PM",
    0,
    0,
  ],
].map((x) => ({
  id: x[0],
  cat: x[1],
  title: x[2],
  desc: x[3],
  pub: x[4],
  time: x[5],
  unread: !!x[6],
  pin: !!x[7],
}));
let cat = "all",
  unread = false,
  current = null;
const list = document.querySelector("#list"),
  search = document.querySelector("#search");
function label(c) {
  return c[0].toUpperCase() + c.slice(1);
}
function render() {
  const q = search.value.toLowerCase();
  const arr = data.filter(
    (n) =>
      (cat === "all" || n.cat === cat) &&
      (!unread || n.unread) &&
      (!q ||
        [n.title, n.desc, n.pub, n.cat].join(" ").toLowerCase().includes(q)),
  );
  list.innerHTML = arr
    .map(
      (n) =>
        `<article class="notice ${n.pin ? "pinned" : ""}" onclick="openNotice(${n.id})"><div class="top"><span class="badge ${n.cat}">${n.pin ? "⌖ " : ""}${label(n.cat)}</span><span class="time">${n.unread ? "• " : ""}${n.time}</span></div><h3>${n.title}</h3><p class="desc">${n.desc}</p><div class="meta"><span>${n.pub}</span><span>${n.unread ? '<span class="new">New</span>' : "View details ↗"}</span></div></article>`,
    )
    .join("");
  document.querySelector("#count").textContent = arr.length + " notices";
  document.querySelector("#empty").style.display = arr.length
    ? "none"
    : "block";
  ["urgent", "exam", "academic", "event"].forEach(
    (c) =>
      (document.querySelector("#" + c).textContent = data.filter(
        (n) => n.cat === c,
      ).length),
  );
}
function choose(c) {
  cat = c;
  document
    .querySelectorAll("#filters button")
    .forEach((b) => b.classList.toggle("active", b.dataset.cat === c));
  render();
}
document
  .querySelectorAll("#filters button")
  .forEach((b) => (b.onclick = () => choose(b.dataset.cat)));
search.oninput = render;
document.querySelector("#unread").onclick = (e) => {
  unread = !unread;
  e.currentTarget.classList.toggle("active", unread);
  render();
};
function openNotice(id) {
  current = data.find((n) => n.id === id);
  current.unread = false;
  document.querySelector("#mcat").textContent = label(current.cat);
  document.querySelector("#mtitle").textContent = current.title;
  document.querySelector("#mdesc").textContent = current.desc;
  document.querySelector("#minfo").textContent =
    `Published by ${current.pub} • ${current.time}`;
  document.querySelector("#modal").style.display = "flex";
  render();
}
function closeModal() {
  document.querySelector("#modal").style.display = "none";
}
function save() {
  localStorage.setItem("xampus_notice_" + current.id, "saved");
  toast("Notice saved");
}
function share() {
  if (navigator.share)
    navigator.share({ title: current.title, text: current.desc });
  else {
    navigator.clipboard?.writeText(current.title);
    toast("Notice copied");
  }
}
let timer;
function toast(t) {
  const e = document.querySelector("#toast");
  e.textContent = t;
  e.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => e.classList.remove("show"), 2000);
}
document.querySelector("#date").textContent = new Date().toLocaleDateString(
  "en-IN",
  { day: "2-digit", month: "short", year: "numeric" },
);
render();


function hom() {
  window.location.replace("../home/home.html");
}
function AI() {
  window.location.replace("../AI/AI_agent.html");
}
function com() {
  window.location.replace("../community/community.html");
}
function comp() {
  window.location.replace("../complain/complaint.html");
}
