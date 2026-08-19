let data = [
  [
    "CMP-1048",
    "Water purifier not working",
    "infrastructure",
    "progress",
    "High",
    "Main Academic Building — 2nd Floor",
  ],
  [
    "CMP-1042",
    "Hostel corridor light issue",
    "hostel",
    "pending",
    "Normal",
    "Boys Hostel — Block B",
  ],
  [
    "CMP-1036",
    "Wi-Fi connectivity problem",
    "it",
    "resolved",
    "Normal",
    "Computer Lab 1",
  ],
  [
    "CMP-1029",
    "Classroom projector not displaying",
    "academic",
    "progress",
    "High",
    "Room 204",
  ],
].map((x) => ({
  id: x[0],
  title: x[1],
  cat: x[2],
  status: x[3],
  priority: x[4],
  location: x[5],
  desc: "Campus problem reported by a student. The responsible department is reviewing the issue.",
  dept: "Responsible Department",
  events: [
    ["Complaint submitted", "Today"],
    ["Assigned for review", "Today"],
  ],
}));
let st = "all",
  cat = null;
const label = {
    pending: "Pending",
    progress: "In Progress",
    resolved: "Resolved",
    rejected: "Rejected",
  },
  cats = {
    infrastructure: "Infrastructure",
    hostel: "Hostel",
    academic: "Academic",
    cleanliness: "Cleanliness",
    it: "IT / Network",
  };
function render() {
  let q = search.value.toLowerCase(),
    a = data.filter(
      (x) =>
        (st == "all" || x.status == st) &&
        (!cat || x.cat == cat) &&
        (!q || JSON.stringify(x).toLowerCase().includes(q)),
    );
  list.innerHTML = a
    .map(
      (x) =>
        `<article class=complaint onclick="details('${x.id}')"><div><span class="badge ${x.status}">${label[x.status]}</span> <span class=badge>${cats[x.cat] || "Other"}</span> <small>${x.id}</small></div><h3>${x.title}</h3><p>${x.desc}</p><div class=meta><span>📍 ${x.location}</span><span>${x.priority} priority</span></div></article>`,
    )
    .join("");
  count.textContent = a.length + " results";
  empty.style.display = a.length ? "none" : "block";
  total.textContent = data.length;
  pending.textContent = data.filter((x) => x.status == "pending").length;
  progress.textContent = data.filter((x) => x.status == "progress").length;
  resolved.textContent = data.filter((x) => x.status == "resolved").length;
}
document.querySelectorAll("#tabs button").forEach(
  (b) =>
    (b.onclick = () => {
      st = b.dataset.s;
      cat = null;
      document
        .querySelectorAll("#tabs button")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      render();
    }),
);
search.oninput = render;
function filterCat(c) {
  cat = c;
  st = "all";
  render();
}
function details(id) {
  let x = data.find((a) => a.id == id);
  detailBody.innerHTML = `<h2>${x.title}</h2><p>${x.desc}</p><p><b>ID:</b> ${x.id}<br><b>Category:</b> ${cats[x.cat]}<br><b>Location:</b> ${x.location}<br><b>Priority:</b> ${x.priority}</p><h3>Resolution Timeline</h3>${x.events.map((e) => `<div class=event><b>${e[0]}</b><small>${e[1]}</small></div>`).join("")}<button onclick=toast('Follow-up request sent')>Request Follow-up</button>`;
  detail.style.display = "flex";
}
function openNew() {
  newp.style.display = "flex";
}
function closeM(id) {
  document.getElementById(id).style.display = "none";
}
form.onsubmit = (e) => {
  e.preventDefault();
  let f = new FormData(form),
    id = "CMP-" + (1050 + data.length);
  data.unshift({
    id,
    title: f.get("title"),
    cat: f.get("cat"),
    status: "pending",
    priority: f.get("priority"),
    location: f.get("location"),
    desc: f.get("desc"),
    dept: "Awaiting assignment",
    events: [
      ["Complaint submitted", "Just now"],
      ["Waiting for review", "Pending"],
    ],
  });
  form.reset();
  closeM("newp");
  render();
  toast(id + " submitted successfully");
};
function toast(t) {
  let x = document.getElementById("toast");
  x.textContent = t;
  x.style =
    "position:fixed;bottom:25px;left:50%;padding:12px 16px;background:#171b22;border:1px solid #333;border-radius:10px";
  setTimeout(() => (x.style = ""), 2200);
}
render();
function hom() {
  window.location.replace("../home/home.html");
}
function AI() {
  window.location.replace("../AI/AI_agent.html");
}
function not() {
  window.location.replace("../notice/notice.html");
}
function com() {
  window.location.replace("../community/community.html");
}
