const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
const state = {
  page: "home",
  community: "all",
  problem: "all",
  aiMode: "text",
  notifs: 3,
};
const content = $("#content");
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(window.tt);
  window.tt = setTimeout(() => t.classList.remove("show"), 2200);
}
function nav(page) {
  state.page = page;
  $$(".nav").forEach((n) =>
    n.classList.toggle("active", n.dataset.page === page),
  );
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$$(".nav").forEach((n) => (n.onclick = () => nav(n.dataset.page)));
function header(title, sub) {
  $("#pageTitle").textContent = title;
  $("#pageSub").textContent = sub;
}
function render() {
  if (state.page === "home") home();
  if (state.page === "community") community();
  if (state.page === "ai") ai();
  if (state.page === "notice") notice();
  if (state.page === "problem") problem();
}
function home() {
  header(
    "Good morning, Dibakar",
    "Everything important on your campus, in one place.",
  );
  content.innerHTML = `<section class="hero"><span class="eyebrow">CAMPUS PULSE • LIVE</span><h2>Know what matters. <span>Act faster.</span></h2><p>XAMPUS connects students and teachers with AI assistance, community knowledge, notices and real problem resolution.</p></section><div class="quick-grid"><button class="quick" onclick="nav('ai')"><b>✦</b><span>Ask XAMPUS AI</span></button><button class="quick" onclick="openReport()"><b>＋</b><span>Report a Problem</span></button><button class="quick" onclick="nav('notice')"><b>▤</b><span>Latest Notices</span></button><button class="quick" onclick="nav('community')"><b>♧</b><span>Campus Community</span></button></div><section class="section"><div class="section-head"><h3>Campus Pulse</h3><span>Today</span></div><div class="grid2"><div class="card"><strong>3 new notices</strong><p>Academic, exam and campus updates need your attention.</p><span class="status">Updated</span></div><div class="card"><strong>2 problems in progress</strong><p>Your reported issues are being tracked with status and timeline.</p><span class="status">Tracking</span></div></div></section><section class="section"><div class="section-head"><h3>Quick campus actions</h3><span>Useful</span></div><div class="card"><strong>Need help but don't know where to start?</strong><p>Tell the AI Agent in text or voice. It can guide you to the right campus service, explain notices, draft a complaint and help track your issue.</p><button class="primary" style="margin-top:12px" onclick="nav('ai')">Open AI Agent →</button></div></section>`;
}
function community() {
  header(
    "Community Space",
    "Students and teachers can learn, share, ask and collaborate.",
  );
  content.innerHTML = `<section class="hero"><span class="eyebrow">CAMPUS COMMUNITY</span><h2>Your campus <span>has a voice.</span></h2><p>Posts, notes, groups, questions, events and resources — all in one moderated campus space.</p></section><input id="commSearch" class="search" style="margin-top:14px" placeholder="Search posts, notes, groups or questions..."><div class="feed-tabs">${["all", "post", "note", "group", "question", "event", "resource"].map((x, i) => `<button class="pill ${state.community === x ? "active" : ""}" onclick="setComm('${x}')">${x === "all" ? "All" : x[0].toUpperCase() + x.slice(1) + (x === "post" ? "s" : "")}</button>`).join("")}</div><div class="create"><div class="avatar">D</div><div class="create-input" onclick="openPost()">Share something with your campus...</div><button class="primary" onclick="openPost()">Post</button></div><div id="feed"></div>`;
  $("#commSearch").oninput = (e) => filterFeed(e.target.value);
  renderFeed();
}
const posts = [
  [
    "post",
    "Prof. S. Mukherjee",
    "TEACHER",
    "Internal Hackathon: team registration closes this Friday.",
    "Official update for teams. Please check the Notice Center for the final deadline.",
  ],
  [
    "question",
    "Ananya Das",
    "STUDENT",
    "Does anyone have previous semester DBMS question papers?",
    "Looking for the last two years. Please share useful resources here.",
  ],
  [
    "note",
    "Rahul Ghosh",
    "STUDENT",
    "Data Structures — Linked List short notes",
    "Revision sheet covering insertion, deletion, traversal and interview questions.",
  ],
  [
    "group",
    "Coding Club",
    "GROUP",
    "Join the Coding Club",
    "Build projects, practice DSA and prepare for hackathons together.",
  ],
  [
    "event",
    "XAMPUS Events",
    "EVENT",
    "Campus Innovation Day",
    "Auditorium • 10:00 AM • Open for students and teachers.",
  ],
  [
    "resource",
    "XAMPUS Resources",
    "RESOURCE",
    "First Year Programming Resources",
    "C, C++, Python, SQL and web development learning materials.",
  ],
];
function renderFeed() {
  const f = $("#feed");
  if (!f) return;
  const q = ($("#commSearch")?.value || "").toLowerCase();
  let a = posts.filter(
    (p) =>
      (state.community === "all" || p[0] === state.community) &&
      (!q || p.join(" ").toLowerCase().includes(q)),
  );
  f.innerHTML =
    a
      .map(
        (p) =>
          `<article class="card post"><div class="author"><div class="avatar">${p[1][0]}</div><div><strong>${p[1]} <span class="role">${p[2]}</span></strong><small>Campus • recently</small></div></div><h3>${p[3]}</h3><p>${p[4]}</p><div class="actions"><button class="action" onclick="toast('Liked')">♡ Like</button><button class="action" onclick="toast('Comments opened')">◌ Comment</button><button class="action" onclick="toast('Share options ready')">↗ Share</button><button class="action" onclick="toast('Saved')">♧ Save</button></div></article>`,
      )
      .join("") ||
    '<div class="card"><strong>No matching content</strong><p>Try another category or search term.</p></div>';
}
function setComm(x) {
  state.community = x;
  render();
}
function filterFeed(v) {
  renderFeed();
}
function ai() {
  header(
    "AI Agent",
    "Ask XAMPUS by typing or speaking — your campus assistant.",
  );
  content.innerHTML = `<section class="ai-shell"><div class="ai-head"><div class="ai-orb">✦</div><h2>XAMPUS AI Agent</h2><p>Your intelligent campus guide — ask about notices, problems, study help or campus services.</p></div><div class="ai-modes"><button class="mode ${state.aiMode === "text" ? "active" : ""}" onclick="setAiMode('text')"><b>⌨ Text Chat</b><span>Type your question</span></button><button class="mode ${state.aiMode === "voice" ? "active" : ""}" onclick="setAiMode('voice')"><b>◉ Voice Assistant</b><span>Speak naturally</span></button></div><div class="chat" id="chat"><div class="bubble bot">Hi! I’m XAMPUS AI. You can type or speak. Try: “আমার problem-এর status কী?”, “আজকের notice কী?”, or “একটা complaint লিখে দাও।”</div></div><div class="ai-input"><textarea id="aiText" placeholder="Write your question..."></textarea><button class="mic" id="micBtn" title="Speak">🎙</button><button class="send" onclick="sendAI()">➤</button></div><div class="ai-tools"><button class="tool" onclick="quickAI('আজকের গুরুত্বপূর্ণ notice দেখাও')">▤ Notices</button><button class="tool" onclick="quickAI('আমার problem track করতে সাহায্য করো')">◇ Track Problem</button><button class="tool" onclick="quickAI('একটি complaint লিখে দাও')">✎ Draft Complaint</button><button class="tool" onclick="quickAI('আমাকে study plan দাও')">⌘ Study Help</button><button class="tool" onclick="quickAI('campus service কোথায় পাব?')">⌖ Campus Guide</button><button class="tool" onclick="quickAI('আমার জন্য একটি community post তৈরি করো')">♧ Create Post</button></div></section>`;
  $("#micBtn").onclick = startVoice;
}
function setAiMode(m) {
  state.aiMode = m;
  ai();
  if (m === "voice")
    toast("Voice mode selected — tap the microphone and speak.");
}
function quickAI(t) {
  $("#aiText").value = t;
  sendAI();
}
function addBubble(text, who = "bot") {
  const c = $("#chat");
  if (!c) return;
  const d = document.createElement("div");
  d.className = "bubble " + who;
  d.textContent = text;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}
function sendAI() {
  const input = $("#aiText");
  if (!input || !input.value.trim()) return;
  const q = input.value.trim();
  addBubble(q, "user");
  input.value = "";
  setTimeout(() => addBubble(aiReply(q), "bot"), 450);
}
function aiReply(q) {
  const x = q.toLowerCase();
  if (x.includes("notice"))
    return "Notice Center-এ academic, exam, event, emergency এবং general notices category-wise দেখতে পারবে। আমি চাইলে important notices আলাদা করে দেখাতে পারি।";
  if (x.includes("problem") || x.includes("complaint"))
    return "Your Problem থেকে issue report, category/priority filter, status, assigned department, timeline এবং resolution feedback দেখা যাবে। চাইলে এখনই complaint draft করে দিতে পারি।";
  if (x.includes("study") || x.includes("পড়") || x.includes("study plan"))
    return "তোমার subject ও exam date দিলে আমি একটি practical study plan সাজিয়ে দিতে পারি।";
  if (x.includes("community") || x.includes("post"))
    return "Community-তে student ও teacher দুজনেই post, question, note, event ও resource share করতে পারে।";
  if (x.includes("service") || x.includes("কোথায়"))
    return "Campus Guide ব্যবহার করে প্রয়োজনীয় service বা department খুঁজে নিতে পারবে।";
  return "আমি XAMPUS-এর campus assistant হিসেবে তোমাকে guide করতে পারি। Notice, complaint, community, study help বা campus service সম্পর্কে প্রশ্ন করো।";
}
function startVoice() {
  const B = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!B) {
    toast("এই browser-এ voice recognition support নেই। Chrome-এ চেষ্টা করো।");
    return;
  }
  const b = $("#micBtn");
  const r = new B();
  r.lang = "bn-IN";
  r.interimResults = false;
  r.maxAlternatives = 1;
  b.classList.add("listening");
  b.textContent = "●";
  toast("Listening… speak now");
  r.onresult = (e) => {
    $("#aiText").value = e.results[0][0].transcript;
    sendAI();
  };
  r.onerror = () => toast("Voice input পাওয়া যায়নি। আবার চেষ্টা করো।");
  r.onend = () => {
    b.classList.remove("listening");
    b.textContent = "🎙";
  };
  r.start();
}
function notice() {
  header(
    "Notice Center",
    "Important campus information, organized by type and priority.",
  );
  const n = [
    [
      "Academic",
      "Semester registration and academic schedule update",
      "Today • 09:20",
    ],
    ["Exam", "Internal assessment submission deadline", "Yesterday • 18:10"],
    ["Event", "Campus Innovation Day — registration open", "18 Aug • 12:30"],
    [
      "Emergency",
      "Temporary water supply interruption in Block B",
      "18 Aug • 08:15",
    ],
    ["General", "Library timing and resource update", "17 Aug • 16:40"],
    [
      "Placement",
      "Upcoming aptitude and coding preparation session",
      "17 Aug • 11:05",
    ],
  ];
  content.innerHTML = `<div class="filter-row">${["All", "Academic", "Exam", "Event", "Emergency", "General", "Placement"].map((x, i) => `<button class="pill ${i === 0 ? "active" : ""}" onclick="toast('${x} notices selected')">${x}</button>`).join("")}</div><div class="notice-grid">${n.map((x, i) => `<article class="notice"><div class="notice-top"><span class="tag">${x[0]}</span><small>${x[2]}</small></div><h3>${x[1]}</h3><p>Open notice to see complete details, attachments, responsible department and relevant action.</p><button class="primary" style="margin-top:10px" onclick="toast('Notice details opened')">View Details →</button></article>`).join("")}</div>`;
}
function problem() {
  header(
    "Your Problems",
    "Report, track and resolve campus issues with transparency.",
  );
  const p = [
    [
      "XP-1042",
      "Classroom projector not working",
      "IT / Classroom",
      "In Progress",
      "High",
    ],
    ["XP-1031", "Hostel water supply issue", "Hostel", "Assigned", "Medium"],
    ["XP-1019", "Library access card problem", "Library", "Resolved", "Low"],
    ["XP-1007", "Wi-Fi connectivity in Lab 2", "IT Network", "Pending", "High"],
  ];
  content.innerHTML = `<button class="primary" onclick="openReport()">＋ Report New Problem</button><div class="filter-row" style="margin-top:14px">${["all", "pending", "assigned", "in progress", "resolved"].map((x) => `<button class="pill ${state.problem === x ? "active" : ""}" onclick="setProblem('${x}')">${x === "all" ? "All" : x}</button>`).join("")}</div><div class="problem-list">${p
    .filter(
      (x) => state.problem === "all" || x[3].toLowerCase() === state.problem,
    )
    .map(
      (x) =>
        `<article class="problem"><div class="problem-row"><div class="avatar">!</div><div style="flex:1"><span class="problem-id">${x[0]} • ${x[4]} priority</span><h3>${x[1]}</h3><p>${x[2]} • Status: <b>${x[3]}</b></p></div></div><div class="timeline"><i class="step done"></i><i class="step done"></i><i class="step ${x[3] === "Resolved" ? "done" : "active"}"></i><i class="step ${x[3] === "Resolved" ? "done" : ""}"></i></div><div class="actions"><button class="action" onclick="openTrack('${x[0]}')">Track Timeline</button><button class="action" onclick="toast('Department contact opened')">Contact Department</button><button class="action" onclick="toast('Feedback form opened')">Feedback</button></div></article>`,
    )
    .join("")}</div>`;
}
function setProblem(x) {
  state.problem = x;
  problem();
}
function openTrack(id) {
  $("#modalBox").innerHTML =
    `<button class="modal-close" onclick="closeModal()">×</button><h2>Problem Timeline • ${id}</h2><p>Transparent tracking from report to resolution.</p><div class="form"><div class="card"><strong>✓ Report submitted</strong><p>Issue received by XAMPUS.</p></div><div class="card"><strong>✓ Department assigned</strong><p>Responsible team has been notified.</p></div><div class="card"><strong>● Investigation in progress</strong><p>Current status — action is being taken.</p></div><div class="card"><strong>○ Resolution & feedback</strong><p>Will become available after resolution.</p></div></div>`;
  openModal();
}
function openReport() {
  $("#modalBox").innerHTML =
    `<button class="modal-close" onclick="closeModal()">×</button><h2>Report a Campus Problem</h2><p>Give enough information so the right department can act quickly.</p><div class="form"><input id="rTitle" placeholder="Problem title"><select id="rCat"><option>Academic</option><option>Infrastructure</option><option>Hostel</option><option>IT / Network</option><option>Library</option><option>Safety</option><option>Other</option></select><select id="rPriority"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select><textarea id="rDesc" rows="5" placeholder="Describe the problem, location and useful details..."></textarea><button class="primary" onclick="submitReport()">Submit Problem →</button></div>`;
  openModal();
}
function submitReport() {
  if (!$("#rTitle").value.trim() || !$("#rDesc").value.trim()) {
    toast("Please complete title and description.");
    return;
  }
  closeModal();
  toast("Problem submitted • ID XP-" + Math.floor(1000 + Math.random() * 8999));
  state.page = "problem";
  setTimeout(problem, 250);
}
function openPost() {
  $("#modalBox").innerHTML =
    `<button class="modal-close" onclick="closeModal()">×</button><h2>Create Community Post</h2><p>Students and teachers can share posts, notes, questions, events or resources.</p><div class="form"><select><option>Post</option><option>Question</option><option>Note</option><option>Event</option><option>Resource</option></select><textarea id="postText" rows="6" placeholder="What would you like to share?"></textarea><button class="primary" onclick="publishPost()">Publish →</button></div>`;
  openModal();
}
function publishPost() {
  if (!$("#postText").value.trim()) {
    toast("Write something first.");
    return;
  }
  closeModal();
  toast("Published to Community.");
}
function notifications() {
  header(
    "Notifications",
    "Stay updated without missing important campus activity.",
  );
  content.innerHTML = `<div class="section-head"><h3>Recent notifications</h3><button class="pill" onclick="state.notifs=0;$('#notifDot').style.display='none';toast('All notifications marked read')">Mark all read</button></div><div class="notice-grid"><div class="notification unread"><div class="avatar">!</div><div><b>New notice published</b><p>Internal assessment submission deadline was updated.</p></div></div><div class="notification unread"><div class="avatar">◇</div><div><b>Problem status changed</b><p>XP-1042 is now In Progress.</p></div></div><div class="notification"><div class="avatar">♧</div><div><b>Community reply</b><p>Someone replied to your question.</p></div></div></div>`;
}
function profile() {
  header(
    "Your Profile",
    "Manage your campus identity, preferences and activity.",
  );
  content.innerHTML = `<section class="profile-card"><div class="big-avatar">D</div><h2>Dibakar</h2><p>Student • XAMPUS Campus Member</p><div class="profile-stats"><div><b>12</b><span>Posts</span></div><div><b>4</b><span>Problems</span></div><div><b>8</b><span>Saved</span></div></div></section><section class="section"><div class="card"><strong>Profile & privacy</strong><p>Update your profile, notification preferences and community visibility.</p><button class="primary" style="margin-top:12px" onclick="toast('Profile settings opened')">Manage Settings</button></div></section><section class="section"><div class="card"><strong>Help & support</strong><p>Need assistance? Ask XAMPUS AI or contact campus support.</p><button class="primary" style="margin-top:12px" onclick="nav('ai')">Ask AI →</button></div></section>`;
}
$("#notifyBtn").onclick = notifications;
$("#profileBtn").onclick = profile;
function openModal() {
  $("#modal").classList.add("open");
}
function closeModal() {
  $("#modal").classList.remove("open");
}
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") closeModal();
};
let lp = 0;
const lt = [
  "Initializing XAMPUS",
  "Connecting Campus",
  "Preparing AI Agent",
  "Loading Smart Services",
  "Almost Ready",
  "XAMPUS Ready",
];
const timer = setInterval(() => {
  lp++;
  $("#loadBar").style.width = lp + "%";
  $("#loadPct").textContent = lp + "%";
  if (lp % 20 === 0)
    $("#loadText").textContent = lt[Math.min(5, Math.floor(lp / 20))];
  if (lp >= 100) {
    clearInterval(timer);
    setTimeout(() => {
      $("#splash").classList.add("out");
      $("#app").classList.remove("hidden");
      render();
    }, 450);
  }
}, 25);


function hom() {
  window.location.replace("../home/home.html");
}
function com() {
  window.location.replace("../community/community.html");
}
function not() {
  window.location.replace("../notice/notice.html");
}
function comp() {
  window.location.replace("../complain/complaint.html");
}
