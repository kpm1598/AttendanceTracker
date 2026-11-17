'use strict';
/* ---------- Pure maths (also testable in node) ---------- */
function calcPercent(present, absent) {
  var counted = present + absent;
  if (counted === 0) return 0;
  return (present / counted) * 100;
}
function canMiss(present, absent, targetPct) {
  var counted = present + absent;
  if (counted === 0) return 0;
  if (calcPercent(present, absent) < targetPct) return 0;
  var x = 0;
  while (calcPercent(present, absent + x + 1) >= targetPct) x++;
  return x;
}
function needInRow(present, absent, targetPct) {
  if (calcPercent(present, absent) >= targetPct) return 0;
  if (targetPct >= 100) return Infinity;
  var y = 0;
  while (calcPercent(present + y, absent) < targetPct) y++;
  return y;
}

/* ---------- Exact data from college portal screenshots ---------- */
var BASELINE = { present: 118, absent: 37, na: 11, total: 166 };

var SUBJECTS = [
  { code: '25AM2301', name: 'Probability & Statistics', short: 'Probability & Statistics', faculty: 'Dr. Mohammed Salman M', room: 'Classroom - B222' },
  { code: '25AM2302', name: 'Data Structures', short: 'Data Structures', faculty: 'Mr. Sriramkumar R; Lab: Dr. Vinutha N, Mr. Tapan Patidar', room: 'Classroom - B222' },
  { code: '25AM2303', name: 'Principles of Database Management', short: 'DBMS', faculty: 'Ms. Bharathi Subramanian; Lab: Mr. B Ajith Kumar, Mr. Ranjan Das', room: 'Classroom - B222 / Lab A306' },
  { code: '25AM2304', name: 'Artificial Intelligence', short: 'AI', faculty: 'Mr. Subham Sahoo', room: 'Classroom - B222' },
  { code: '25AM2305', name: 'Computer Organization and Architecture', short: 'COA', faculty: 'Dr. Santosh Kumar Sahoo', room: 'Classroom - B222' },
  { code: '25AM2306', name: 'AI for Embedded Systems', short: 'AI for Embedded', faculty: 'Mr. Pancham Sharma; Lab: Ms. Bharathi Subramanian, Dr. Mude Nagarjuna Naik, Dr. Sumant Kumar Mohapatra', room: 'Classroom - B222' },
  { code: '25AM2307', name: 'Skill Enhancement Course-I (Java Programming)', short: 'Java', faculty: 'Dr. M. Gokilavani', room: 'Classroom - B222' },
  { code: '25AM2308', name: 'Cognitive and Technical Skills-III', short: 'CTS-III', faculty: 'Ms. Swetha, Mr. Gaffar Sharif H S, Mr. Apurba Rabha', room: 'Classroom - B222' }
];

var TIMETABLE = {
  Mon: [
    { time: '8:30 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '9:25 AM', code: '25AM2306', type: 'Lecture', room: 'B222' },
    { time: '10:45 AM', code: '25AM2303', type: 'Lab', room: 'A306', note: 'to 12:35 PM' },
    { time: '1:50 PM', code: '25AM2305', type: 'Lecture', room: 'B222' },
    { time: '2:40 PM', code: '25AM2302', type: 'Lecture', room: 'B222' }
  ],
  Tue: [
    { time: '8:30 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '9:25 AM', code: '25AM2303', type: 'Lecture', room: 'B222' },
    { time: '11:40 AM', code: '25AM2305', type: 'Lecture', room: 'B222' },
    { time: '1:50 PM', code: '25AM2301', type: 'Lecture', room: 'B222' },
    { time: '2:40 PM', code: '25AM2304', type: 'Lecture', room: 'B222' }
  ],
  Wed: [
    { time: '8:30 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '9:25 AM', code: '25AM2304', type: 'Lecture', room: 'B222' },
    { time: '10:45 AM', code: '25AM2302', type: 'Lecture', room: 'B222' },
    { time: '11:40 AM', code: '25AM2307', type: 'Lecture', room: 'B222' },
    { time: '1:50 PM', code: '25AM2303', type: 'Lecture', room: 'B222' },
    { time: '2:40 PM', code: '25AM2301', type: 'Lecture', room: 'B222' }
  ],
  Thu: [
    { time: '8:30 AM', code: '25AM2301', type: 'Lecture', room: 'B222' },
    { time: '10:45 AM', code: '25AM2302', type: 'Lecture', room: 'B222' },
    { time: '11:40 AM', code: '25AM2307', type: 'Lecture', room: 'B222' },
    { time: '1:50 PM', code: '25AM2306', type: 'Lecture', room: 'B222' },
    { time: '2:40 PM', code: '25AM2306', type: 'Lab', room: 'B222', note: 'to 4:20 PM' }
  ],
  Fri: [
    { time: '8:30 AM', code: '25AM2304', type: 'Lecture', room: 'B222' },
    { time: '9:25 AM', code: '25AM2303', type: 'Lecture', room: 'B222' },
    { time: '10:45 AM', code: '25AM2302', type: 'Lab', room: 'B222', note: 'to 12:35 PM' },
    { time: '1:50 PM', code: '25AM2307', type: 'Lecture', room: 'B222' },
    { time: '2:40 PM', code: '25AM2305', type: 'Lecture', room: 'B222' }
  ],
  Sat: [
    { time: '8:30 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '9:25 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '10:45 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '11:40 AM', code: '25AM2308', type: 'Lecture', room: 'B222' },
    { time: '1:50 PM', code: '25AM2308', type: 'Lecture', room: 'B222' }
  ]
};
var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function seedEntries() {
  return [
    { id: 'seed-1', date: '2026-11-17', subjectCode: '25AM2308', time: '8:30 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true },
    { id: 'seed-2', date: '2026-11-17', subjectCode: '25AM2303', time: '9:25 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true },
    { id: 'seed-3', date: '2026-11-17', subjectCode: '25AM2305', time: '11:40 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true },
    { id: 'seed-4', date: '2026-11-17', subjectCode: '25AM2301', time: '1:50 PM', type: 'Lecture', status: 'Present', reasonCategory: '', reasonNote: '', recoveryStatus: '', recoveryType: '', recoveryNote: '', countedInBaseline: true },
    { id: 'seed-5', date: '2026-11-17', subjectCode: '25AM2304', time: '2:40 PM', type: 'Lecture', status: 'Present', reasonCategory: '', reasonNote: '', recoveryStatus: '', recoveryType: '', recoveryNote: '', countedInBaseline: true }
  ];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcPercent: calcPercent, canMiss: canMiss, needInRow: needInRow, BASELINE: BASELINE, SUBJECTS: SUBJECTS, TIMETABLE: TIMETABLE };
}

/* ---------- App (browser / Capacitor only) ---------- */
if (typeof document !== 'undefined') {
  var KEY = 'kasimAttendanceV1';
  var state = loadState();
  var absenceFilter = 'all';
  var timetableDay = null;

  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var parsed = JSON.parse(raw); if (parsed && parsed.entries) return parsed; }
    } catch (e) {}
    return { baseline: BASELINE, target: 75, entries: seedEntries() };
  }
  function saveState() { localStorage.setItem(KEY, JSON.stringify(state)); }
  function subjectByCode(code) { return SUBJECTS.filter(function (s) { return s.code === code; })[0] || { code: code, name: code, short: code, faculty: '', room: '' }; }
  function overallStats() {
    var p = state.baseline.present, a = state.baseline.absent, na = state.baseline.na;
    state.entries.forEach(function (e) {
      if (e.countedInBaseline) return;
      if (e.status === 'Present') p++; else if (e.status === 'Absent') a++; else if (e.status === 'No Attendance') na++;
    });
    return { present: p, absent: a, na: na, total: p + a + na, pct: calcPercent(p, a) };
  }
  function uid() { return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function todayISO() { var d = new Date(); var m = String(d.getMonth() + 1).padStart(2, '0'); var day = String(d.getDate()).padStart(2, '0'); return d.getFullYear() + '-' + m + '-' + day; }
  function weekdayShort(dateObj) { return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.remove('hidden'); setTimeout(function () { t.classList.add('hidden'); }, 2200); }
  function statusBadge(status) {
    if (status === 'Present') return '<span class="badge present">Present</span>';
    if (status === 'Absent') return '<span class="badge absent">Absent</span>';
    return '<span class="badge na">No Attendance</span>';
  }
  function recoveryBadge(r) {
    if (r === 'Will get it back') return '<span class="badge will">Will get it back</span>';
    if (r === "Won't get it back") return '<span class="badge wont">Won\'t get back</span>';
    if (r === 'Pending - applied') return '<span class="badge pending">Pending - applied</span>';
    return '<span class="badge pending">Not checked yet</span>';
  }
  function isPendingRecovery(e) { return e.status === 'Absent' && (e.recoveryStatus === 'Pending - applied' || e.recoveryStatus === 'Not checked yet'); }

  function showView(name) {
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-' + name).classList.add('active');
    document.querySelectorAll('.bottom-nav button').forEach(function (b) { b.classList.toggle('active', b.dataset.nav === name); });
    window.scrollTo(0, 0);
  }

  function render() {
    var stats = overallStats();
    var pctText = stats.pct.toFixed(2) + '%';
    document.getElementById('overallPct').textContent = pctText;
    document.getElementById('headerPct').textContent = pctText;
    document.getElementById('overallBar').style.width = stats.pct + '%';
    document.getElementById('overallBar').style.background = stats.pct >= state.target ? '#16a34a' : '#dc2626';
    document.getElementById('overallCounts').textContent = 'Present ' + stats.present + ' · Absent ' + stats.absent + ' · NA ' + stats.na;
    document.getElementById('statPresent').textContent = stats.present;
    document.getElementById('statAbsent').textContent = stats.absent;
    document.getElementById('statNA').textContent = stats.na;
    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('targetInput').value = state.target;
    document.getElementById('canMiss').textContent = canMiss(stats.present, stats.absent, state.target);
    document.getElementById('needRow').textContent = needInRow(stats.present, stats.absent, state.target);
    document.getElementById('need80').textContent = needInRow(stats.present, stats.absent, 80);
    document.getElementById('targetHint').textContent = stats.pct >= state.target
      ? 'You are at/above your ' + state.target + '% target. One more absence still counts — check "can miss" before bunking.'
      : 'You are below your ' + state.target + '% target — attend every class until you are back above it.';
    document.getElementById('pendingRecoveries').textContent = state.entries.filter(isPendingRecovery).length;
    renderToday(); renderRecent(); renderSubjects(); renderAbsences(); renderTimetable();
  }

  function renderToday() {
    var now = new Date(); var day = weekdayShort(now);
    document.getElementById('todayLabel').textContent = '· ' + day + ' ' + todayISO();
    var el = document.getElementById('todayList');
    var slots = TIMETABLE[day] || [];
    if (!slots.length) { el.innerHTML = '<p class="muted">No classes today (Sunday).</p>'; return; }
    el.innerHTML = slots.map(function (slot, i) {
      var s = subjectByCode(slot.code);
      var existing = state.entries.filter(function (e) { return e.date === todayISO() && e.subjectCode === slot.code && e.time === slot.time; })[0];
      var right = existing ? statusBadge(existing.status)
        : '<span class="quick"><button class="p" data-quick="Present" data-idx="' + i + '">P ✓</button><button class="a" data-quick="Absent" data-idx="' + i + '">A ✗</button></span>';
      return '<div class="today-row"><div><strong>' + esc(slot.time) + ' · ' + esc(s.short) + '</strong><div class="muted small">' + esc(slot.type) + ' · ' + esc(slot.room) + '</div></div><div>' + right + '</div></div>';
    }).join('');
    el.querySelectorAll('[data-quick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slot = (TIMETABLE[day] || [])[Number(btn.dataset.idx)];
        var status = btn.dataset.quick;
        state.entries.push({ id: uid(), date: todayISO(), subjectCode: slot.code, time: slot.time, type: slot.type, status: status, reasonCategory: status === 'Absent' ? 'Not noted yet' : '', reasonNote: '', recoveryStatus: status === 'Absent' ? 'Not checked yet' : '', recoveryType: 'Other', recoveryNote: '', countedInBaseline: false });
        saveState(); render(); toast(status === 'Absent' ? 'Marked absent — add the reason in Absences' : 'Marked present');
        if (status === 'Absent') showView('absences');
      });
    });
  }

  function sortedEntries() {
    return state.entries.slice().sort(function (a, b) { return (b.date + b.time).localeCompare(a.date + a.time); });
  }
  function renderRecent() {
    var el = document.getElementById('recentList');
    var list = sortedEntries().slice(0, 15);
    if (!list.length) { el.innerHTML = '<p class="muted">No entries yet.</p>'; return; }
    el.innerHTML = list.map(function (e) {
      var s = subjectByCode(e.subjectCode);
      return '<div class="entry" data-edit="' + e.id + '"><div><strong>' + esc(e.date) + ' · ' + esc(s.short) + '</strong><div class="muted small">' + esc(e.time || '') + ' ' + esc(e.type) + (e.countedInBaseline ? ' · in baseline' : '') + '</div></div><div>' + statusBadge(e.status) + ' <button class="delete-btn" data-del="' + e.id + '" title="Delete">🗑</button></div></div>';
    }).join('');
    bindEntryClicks(el);
  }

  function renderSubjects() {
    var el = document.getElementById('subjectList');
    el.innerHTML = SUBJECTS.map(function (s) {
      var entries = state.entries.filter(function (e) { return e.subjectCode === s.code; });
      var p = entries.filter(function (e) { return e.status === 'Present'; }).length;
      var a = entries.filter(function (e) { return e.status === 'Absent'; }).length;
      var na = entries.filter(function (e) { return e.status === 'No Attendance'; }).length;
      var pct = (p + a) ? calcPercent(p, a).toFixed(1) + '%' : '—';
      var days = DAYS.filter(function (d) { return (TIMETABLE[d] || []).some(function (slot) { return slot.code === s.code; }); })
        .map(function (d) { return d + ' ' + (TIMETABLE[d] || []).filter(function (slot) { return slot.code === s.code; }).map(function (slot) { return slot.time + ' (' + slot.type + ')'; }).join(', '); }).join(' · ');
      return '<div class="card subject-card"><div class="subject-code">' + esc(s.code) + '</div><h3>' + esc(s.name) + '</h3><p class="muted small">' + esc(s.faculty) + '<br>' + esc(s.room) + '<br>' + esc(days) + '</p><div class="stats-grid"><div class="stat"><span>' + p + '</span><label>Present (in-app log)</label></div><div class="stat"><span>' + a + '</span><label>Absent</label></div><div class="stat"><span>' + na + '</span><label>NA</label></div><div class="stat"><span>' + pct + '</span><label>% in-app log</label></div></div></div>';
    }).join('');
  }

  function renderAbsences() {
    var el = document.getElementById('absenceList');
    var list = sortedEntries().filter(function (e) { return e.status === 'Absent'; }).filter(function (e) {
      if (absenceFilter === 'pending') return isPendingRecovery(e);
      if (absenceFilter === 'will') return e.recoveryStatus === 'Will get it back';
      if (absenceFilter === 'wont') return e.recoveryStatus === "Won't get it back";
      return true;
    });
    if (!list.length) { el.innerHTML = '<div class="card"><p class="muted">No absences in this filter.</p></div>'; return; }
    el.innerHTML = list.map(function (e) {
      var s = subjectByCode(e.subjectCode);
      var opts = ['Not checked yet', 'Pending - applied', 'Will get it back', "Won't get it back"].map(function (o) { return '<option ' + (e.recoveryStatus === o ? 'selected' : '') + '>' + esc(o) + '</option>'; }).join('');
      return '<div class="card" data-edit="' + e.id + '"><strong>' + esc(e.date) + ' · ' + esc(s.short) + '</strong> <span class="muted small">' + esc(e.time || '') + ' ' + esc(e.type) + '</span><p class="small">Reason: <strong>' + esc(e.reasonCategory || 'Not noted yet') + '</strong>' + (e.reasonNote ? ' — ' + esc(e.reasonNote) : '') + '<br>Recovery: ' + recoveryBadge(e.recoveryStatus) + ' <span class="muted">' + esc(e.recoveryType || '') + (e.recoveryNote ? ' · ' + esc(e.recoveryNote) : '') + '</span></p><label class="small">Update recovery: <select class="inline" data-recovery="' + e.id + '">' + opts + '</select></label></div>';
    }).join('');
    el.querySelectorAll('[data-recovery]').forEach(function (sel) {
      sel.addEventListener('click', function (ev) { ev.stopPropagation(); });
      sel.addEventListener('change', function () {
        var entry = state.entries.filter(function (e) { return e.id === sel.dataset.recovery; })[0];
        if (entry) { entry.recoveryStatus = sel.value; saveState(); render(); toast('Recovery updated'); }
      });
    });
    bindEntryClicks(el);
  }

  function renderTimetable() {
    if (!timetableDay) { var d = weekdayShort(new Date()); timetableDay = DAYS.indexOf(d) >= 0 ? d : 'Mon'; }
    var tabs = document.getElementById('dayTabs');
    tabs.innerHTML = DAYS.map(function (d) { return '<button class="chip ' + (d === timetableDay ? 'active' : '') + '" data-day="' + d + '">' + d + '</button>'; }).join('');
    tabs.querySelectorAll('[data-day]').forEach(function (b) { b.addEventListener('click', function () { timetableDay = b.dataset.day; renderTimetable(); }); });
    var el = document.getElementById('timetableList');
    el.innerHTML = (TIMETABLE[timetableDay] || []).map(function (slot) {
      var s = subjectByCode(slot.code);
      return '<div class="slot"><div><strong>' + esc(slot.time) + (slot.note ? ' ' + esc(slot.note) : '') + '</strong><div class="muted small">' + esc(slot.type) + ' · Room ' + esc(slot.room) + '</div></div><div style="text-align:right"><strong>' + esc(s.short) + '</strong><div class="muted small">' + esc(s.code) + '</div></div></div>';
    }).join('');
  }

  function bindEntryClicks(container) {
    container.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (confirm('Delete this entry?')) { state.entries = state.entries.filter(function (e) { return e.id !== btn.dataset.del; }); saveState(); render(); toast('Entry deleted'); }
      });
    });
    container.querySelectorAll('[data-edit]').forEach(function (row) {
      row.addEventListener('click', function () { openEdit(row.dataset.edit); });
    });
  }

  function fillSubjectSelect() {
    document.getElementById('fSubject').innerHTML = SUBJECTS.map(function (s) { return '<option value="' + s.code + '">' + s.code + ' — ' + esc(s.name) + '</option>'; }).join('');
  }
  function toggleAbsenceFields() {
    document.getElementById('absenceFields').classList.toggle('hidden', document.getElementById('fStatus').value !== 'Absent');
  }
  function resetForm() {
    document.getElementById('entryForm').reset();
    document.getElementById('fId').value = '';
    document.getElementById('fDate').value = todayISO();
    document.getElementById('formTitle').textContent = 'Add Entry';
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('deleteEntryBtn').classList.add('hidden');
    document.getElementById('baselineNote').classList.add('hidden');
    toggleAbsenceFields();
  }
  function openEdit(id) {
    var e = state.entries.filter(function (x) { return x.id === id; })[0];
    if (!e) return;
    document.getElementById('fId').value = e.id;
    document.getElementById('fDate').value = e.date;
    document.getElementById('fSubject').value = e.subjectCode;
    document.getElementById('fType').value = e.type || 'Lecture';
    document.getElementById('fTime').value = e.time || '';
    document.getElementById('fStatus').value = e.status;
    document.getElementById('fReasonCategory').value = e.reasonCategory || 'Not noted yet';
    document.getElementById('fReasonNote').value = e.reasonNote || '';
    document.getElementById('fRecoveryStatus').value = e.recoveryStatus || 'Not checked yet';
    document.getElementById('fRecoveryType').value = e.recoveryType || 'Other';
    document.getElementById('fRecoveryNote').value = e.recoveryNote || '';
    document.getElementById('formTitle').textContent = 'Edit Entry';
    document.getElementById('cancelEditBtn').classList.remove('hidden');
    document.getElementById('deleteEntryBtn').classList.remove('hidden');
    document.getElementById('baselineNote').classList.toggle('hidden', !e.countedInBaseline);
    toggleAbsenceFields(); showView('add');
  }

  /* init */
  document.querySelectorAll('.bottom-nav button').forEach(function (b) { b.addEventListener('click', function () { if (b.dataset.nav === 'add' && !document.getElementById('fId').value) resetForm(); showView(b.dataset.nav); }); });
  document.getElementById('fStatus').addEventListener('change', toggleAbsenceFields);
  document.getElementById('targetInput').addEventListener('change', function () {
    var v = parseFloat(this.value); if (v > 0 && v <= 100) { state.target = v; saveState(); render(); }
  });
  document.getElementById('entryForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var id = document.getElementById('fId').value;
    var status = document.getElementById('fStatus').value;
    var data = {
      date: document.getElementById('fDate').value,
      subjectCode: document.getElementById('fSubject').value,
      type: document.getElementById('fType').value,
      time: document.getElementById('fTime').value.trim(),
      status: status,
      reasonCategory: status === 'Absent' ? document.getElementById('fReasonCategory').value : '',
      reasonNote: status === 'Absent' ? document.getElementById('fReasonNote').value.trim() : '',
      recoveryStatus: status === 'Absent' ? document.getElementById('fRecoveryStatus').value : '',
      recoveryType: status === 'Absent' ? document.getElementById('fRecoveryType').value : '',
      recoveryNote: status === 'Absent' ? document.getElementById('fRecoveryNote').value.trim() : ''
    };
    if (id) {
      state.entries = state.entries.map(function (e) { return e.id === id ? Object.assign({}, e, data) : e; });
      toast('Entry updated');
    } else {
      state.entries.push(Object.assign({ id: uid(), countedInBaseline: false }, data));
      toast('Entry added');
    }
    saveState(); resetForm(); render(); showView('dashboard');
  });
  document.getElementById('cancelEditBtn').addEventListener('click', function () { resetForm(); showView('dashboard'); });
  document.getElementById('deleteEntryBtn').addEventListener('click', function () {
    var id = document.getElementById('fId').value;
    if (id && confirm('Delete this entry?')) { state.entries = state.entries.filter(function (e) { return e.id !== id; }); saveState(); resetForm(); render(); showView('dashboard'); }
  });
  document.querySelectorAll('#absenceFilters .chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      absenceFilter = chip.dataset.filter;
      document.querySelectorAll('#absenceFilters .chip').forEach(function (c) { c.classList.toggle('active', c === chip); });
      renderAbsences();
    });
  });
  document.getElementById('exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'attendance-tracker-backup.json'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById('copyBtn').addEventListener('click', function () {
    var text = JSON.stringify(state, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(function () { toast('JSON copied'); }, function () { toast('Copy failed — use Export'); }); }
    else toast('Copy not available — use Export');
  });
  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('Reset everything to the original baseline and seed entries? Your added entries will be lost.')) { localStorage.removeItem(KEY); state = loadState(); saveState(); resetForm(); render(); toast('Data reset'); }
  });

  fillSubjectSelect(); resetForm(); render();
}
