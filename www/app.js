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

/* ---------- DSU portal (GNUMS) text parser — pure, node-testable ---------- */
var PORTAL_LOGIN_URL = 'https://ums.mydsi.org/Login.aspx';
var PORTAL_MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
var PORTAL_DAYNAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function portalSummaryField(text, labelPattern) {
  var re = new RegExp(labelPattern + '\\s*:?\\s*(\\d+)\\s*\\/\\s*(\\d+)', 'i');
  var m = text.match(re);
  if (m) return { count: parseInt(m[1], 10), total: parseInt(m[2], 10) };
  /* Real innerText often puts the value on the NEXT line: "Present\n118".
     [^\S\r\n] is spaces/tabs only, so this pattern cannot skip lines. */
  var reNl = new RegExp(labelPattern + '[^\\S\\r\\n]*:?[^\\S\\r\\n]*\\r?\\n[^\\S\\r\\n]*(\\d+)\\b', 'i');
  var mNl = text.match(reNl);
  if (mNl) return { count: parseInt(mNl[1], 10), total: null };
  var re2 = new RegExp(labelPattern + '\\s*:?\\s*(\\d+)\\b', 'i');
  var m2 = text.match(re2);
  if (m2) return { count: parseInt(m2[1], 10), total: null };
  return null;
}

/* The real GNUMS Attendance Summary page renders stat cards with the NUMBER
   ABOVE its label ("155\nTotal Slots"); other arrangements put the label
   first. Stacked cards are ambiguous one pair at a time (in label-first
   layout each value also sits above the NEXT card's label), so the cards
   are parsed as a set: build both direction assignments and keep the one
   where Total = Present + Absent (falling back to the assignment that
   found more cards, then to number-above-label, the real page's layout).
   Returns {Total, Present, Absent, 'No Attendance'} with nulls. Pure. */
function portalSlotsCards(text) {
  var labelRe = /(Total|Present|Absent|No\s+Attendance)\s+Slots?\b/gi;
  var occ = [];
  var m;
  while ((m = labelRe.exec(text)) !== null) {
    var kind = /^total$/i.test(m[1]) ? 'Total'
      : /^present$/i.test(m[1]) ? 'Present'
      : /^absent$/i.test(m[1]) ? 'Absent' : 'No Attendance';
    occ.push({ kind: kind, start: m.index, end: m.index + m[0].length });
  }
  function adjacent(oc) {
    var before = text.slice(0, oc.start);
    var bm = before.match(/(\d+)([\s:.\-–—]*)$/);
    var after = text.slice(oc.end);
    var am = after.match(/^[\s:.\-–—]*?(\d+)/);
    return { above: bm ? parseInt(bm[1], 10) : null, below: am ? parseInt(am[1], 10) : null };
  }
  var aboveA = {}, belowA = {};
  occ.forEach(function (oc) {
    var adj = adjacent(oc);
    if (aboveA[oc.kind] == null && adj.above != null) aboveA[oc.kind] = adj.above;
    if (belowA[oc.kind] == null && adj.below != null) belowA[oc.kind] = adj.below;
  });
  function stats(a) {
    var kinds = ['Total', 'Present', 'Absent', 'No Attendance'];
    var n = kinds.filter(function (k) { return a[k] != null; }).length;
    var consistent = a.Total != null && a.Present != null && a.Absent != null &&
      a.Total === a.Present + a.Absent;
    return { n: n, consistent: consistent };
  }
  var sa = stats(aboveA), sb = stats(belowA);
  var chosen;
  if (sa.consistent !== sb.consistent) chosen = sa.consistent ? aboveA : belowA;
  else if (sa.n !== sb.n) chosen = sa.n > sb.n ? aboveA : belowA;
  else chosen = aboveA; /* the real page: number above label */
  return {
    Total: chosen.Total != null ? chosen.Total : null,
    Present: chosen.Present != null ? chosen.Present : null,
    Absent: chosen.Absent != null ? chosen.Absent : null,
    'No Attendance': chosen['No Attendance'] != null ? chosen['No Attendance'] : null
  };
}
/* One Slots card value by label pattern ('Total', 'Present', 'Absent',
   'No\\s+Attendance'), or null when the page has no such card. Pure. */
function portalSlotsField(text, labelPattern) {
  var kind = labelPattern.replace(/\\s\+/g, ' ');
  var cards = portalSlotsCards(text);
  return cards[kind] != null ? cards[kind] : null;
}

function portalPercent(text, summary) {
  var raw = text.match(/(\d+(?:\.\d+)?)\s*%/g) || [];
  var candidates = [];
  raw.forEach(function (mm) {
    var v = parseFloat(mm);
    if (v > 0 && v <= 100) candidates.push(Math.round(v * 100) / 100);
  });
  /* When Present/Absent are known, the right % is the one that equals
     100*P/(P+A) — other % values on the page (menus, other widgets)
     must not win just because they appear first. */
  if (summary && summary.present != null && summary.absent != null && (summary.present + summary.absent) > 0) {
    var expected = Math.round(calcPercent(summary.present, summary.absent) * 100) / 100;
    for (var i = 0; i < candidates.length; i++) {
      if (Math.abs(candidates[i] - expected) <= 0.05) return candidates[i];
    }
    if (!candidates.length) return expected;
  }
  if (candidates.length) return candidates[0];
  if (summary && summary.present != null && summary.absent != null) {
    return Math.round(calcPercent(summary.present, summary.absent) * 100) / 100;
  }
  return null;
}

function parsePortalRows(text) {
  var rows = [];
  var re = /(\d{1,2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2,4})/gi;
  var matches = [];
  var m;
  while ((m = re.exec(text)) !== null) {
    matches.push({ index: m.index, end: re.lastIndex, d: m[1], mon: m[2], y: m[3] });
  }
  matches.forEach(function (mt, i) {
    var segEnd = (i + 1 < matches.length) ? matches[i + 1].index : text.length;
    var segment = text.slice(mt.end, Math.min(segEnd, mt.end + 300));
    var tokens = segment.split(/\s+/).filter(Boolean);
    var slots = [];
    var started = false;
    for (var t = 0; t < tokens.length && slots.length < 6; t++) {
      var tok = tokens[t].toUpperCase().replace(/[.,;:]+$/, '');
      if (tok === 'P' || tok === 'A' || tok === 'NA' || tok === '-') { slots.push(tok); started = true; }
      else if (started) break;
    }
    if (!slots.length) return;
    var yy = parseInt(mt.y, 10); if (yy < 100) yy += 2000;
    var monKey = mt.mon.charAt(0).toUpperCase() + mt.mon.slice(1, 3).toLowerCase();
    var mm = PORTAL_MONTHS[monKey];
    var dd = parseInt(mt.d, 10);
    if (!mm || !dd) return;
    var iso = yy + '-' + String(mm).padStart(2, '0') + '-' + String(dd).padStart(2, '0');
    var weekday = PORTAL_DAYNAMES[new Date(Date.UTC(yy, mm - 1, dd)).getUTCDay()];
    var daySlots = TIMETABLE[weekday] || [];
    slots.forEach(function (tok, idx) {
      if (tok === '-') return;
      var def = daySlots[idx];
      if (!def) return;
      rows.push({
        date: iso, slotIndex: idx, weekday: weekday,
        subjectCode: def.code, time: def.time, type: def.type,
        status: tok === 'P' ? 'Present' : (tok === 'A' ? 'Absent' : 'No Attendance')
      });
    });
  });
  return rows;
}

function parsePortalText(raw) {
  var text = String(raw == null ? '' : raw);
  var result = { loginPage: false, summary: null, rows: [], ok: false };
  /* The Attendance Summary page's Slots cards win over the generic label
     patterns: "Total Slots" is the COUNTED total (Present + Absent) and
     No Attendance is a separate card — unlike the old screenshots, whose
     "Total" (166) included NA. */
  var slotsP = portalSlotsField(text, 'Present');
  var slotsA = portalSlotsField(text, 'Absent');
  var slotsNa = portalSlotsField(text, 'No\\s+Attendance');
  var slotsT = portalSlotsField(text, 'Total');
  var p = slotsP != null ? { count: slotsP, total: null } : portalSummaryField(text, 'Present');
  var a = slotsA != null ? { count: slotsA, total: null } : portalSummaryField(text, 'Absent');
  var na = slotsNa != null ? { count: slotsNa, total: null } : portalSummaryField(text, 'No\\s+Attendance');
  /* On the Slots page a missing No-Attendance card means 0, not unknown. */
  if ((slotsP != null || slotsA != null || slotsT != null) && !na) na = { count: 0, total: null };
  if (p || a || na) {
    var tot = slotsT != null ? null : portalSummaryField(text, 'Total');
    var sumCounts = (p ? p.count : 0) + (a ? a.count : 0) + (na ? na.count : 0);
    /* Trust an explicit "Total" only when it agrees with the counts (or the
       counts are incomplete) — a stray "Total" elsewhere must not win. */
    var totOk = tot && tot.count >= Math.max(p ? p.count : 0, a ? a.count : 0, na ? na.count : 0) &&
      (!(p && a && na) || tot.count === sumCounts);
    var genericTotal = (totOk ? tot.count : null) || (p && p.total) || (a && a.total) || (na && na.total) ||
      sumCounts || null;
    /* Counted total EXCLUDES NA: Total Slots when the page gave it, else
       Present + Absent, else the generic total with NA taken back out. */
    var countedTotal = slotsT != null ? slotsT
      : (p && a ? p.count + a.count
        : (genericTotal != null ? genericTotal - (na ? na.count : 0) : null));
    var total = countedTotal != null ? countedTotal + (na ? na.count : 0) : genericTotal;
    result.summary = {
      present: p ? p.count : null,
      absent: a ? a.count : null,
      na: na ? na.count : null,
      countedTotal: countedTotal,
      total: total,
      percent: null
    };
    result.summary.percent = portalPercent(text, result.summary);
  }
  result.rows = parsePortalRows(text);
  result.loginPage = /GNUMS\s*Login/i.test(text) && /Password/i.test(text) && !result.summary && result.rows.length === 0;
  result.ok = !!result.summary || result.rows.length > 0;
  return result;
}

/* ---------- Absent Days tab parser — pure, node-testable ----------
   The portal's "Absent Days" tab lists absences date-wise and subject-wise,
   but its exact markup is unknown, so this is defensive: find date tokens
   and associate subject references on the same line or the few lines after
   a date. Subjects match by code (25AM23xx) or by name/short-form alias. */
var ABSENT_DAY_ALIASES = [
  { code: '25AM2306', alias: 'AI for Embedded Systems' },
  { code: '25AM2306', alias: 'AI for Embedded' },
  { code: '25AM2301', alias: 'Probability & Statistics' },
  { code: '25AM2301', alias: 'Probability and Statistics' },
  { code: '25AM2301', alias: 'Probability' },
  { code: '25AM2302', alias: 'Data Structures' },
  { code: '25AM2303', alias: 'Principles of Database Management' },
  { code: '25AM2303', alias: 'Database Management' },
  { code: '25AM2303', alias: 'Database' },
  { code: '25AM2303', alias: 'DBMS' },
  { code: '25AM2304', alias: 'Artificial Intelligence' },
  { code: '25AM2304', alias: 'AI' },
  { code: '25AM2305', alias: 'Computer Organization and Architecture' },
  { code: '25AM2305', alias: 'Computer Organization & Architecture' },
  { code: '25AM2305', alias: 'Computer Organization' },
  { code: '25AM2305', alias: 'COA' },
  { code: '25AM2306', alias: 'Embedded Systems' },
  { code: '25AM2306', alias: 'Embedded' },
  { code: '25AM2307', alias: 'Java Programming' },
  { code: '25AM2307', alias: 'Java' },
  { code: '25AM2308', alias: 'Cognitive and Technical Skills' },
  { code: '25AM2308', alias: 'Cognitive & Technical Skills' },
  { code: '25AM2308', alias: 'Technical Skills' },
  { code: '25AM2308', alias: 'Cognitive' },
  { code: '25AM2308', alias: 'CTS' }
];
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
/* Subject codes mentioned in one line of text, in order, no duplicates.
   Longest alias wins on overlap (so "AI for Embedded Systems" is 2306
   only, not also 2304 via the bare "AI" inside it). */
function subjectsInLine(line) {
  var found = [];
  var codeRe = /25AM23\d{2}/g, cm;
  while ((cm = codeRe.exec(line)) !== null) {
    var code = cm[0].toUpperCase();
    if (SUBJECTS.some(function (s) { return s.code === code; })) {
      found.push({ start: cm.index, end: cm.index + cm[0].length, code: code });
    }
  }
  ABSENT_DAY_ALIASES.forEach(function (a) {
    var re = new RegExp('\\b' + escapeRegExp(a.alias) + '\\b', 'gi');
    var m;
    while ((m = re.exec(line)) !== null) {
      found.push({ start: m.index, end: m.index + m[0].length, code: a.code });
    }
  });
  found.sort(function (x, y) { return (x.start - y.start) || ((y.end - y.start) - (x.end - x.start)); });
  var codes = [], taken = [];
  found.forEach(function (f) {
    var overlaps = taken.some(function (t) { return f.start < t.end && t.start < f.end; });
    if (overlaps) return;
    taken.push(f);
    if (codes.indexOf(f.code) < 0) codes.push(f.code);
  });
  return codes;
}
/* First date token in a line: dd-MMM-yyyy, dd MMM yyyy, dd/MM/yyyy or
   dd-MM-yyyy (day-first). Returns ISO 'yyyy-mm-dd' or null. */
function absentDayDateInLine(line) {
  var m = line.match(/(\d{1,2})[-\s](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[-\s,]+(\d{4})/i);
  if (m) {
    var monKey = m[2].charAt(0).toUpperCase() + m[2].slice(1, 3).toLowerCase();
    var mm = PORTAL_MONTHS[monKey];
    var dd = parseInt(m[1], 10), yy = parseInt(m[3], 10);
    if (mm && dd >= 1 && dd <= 31) return yy + '-' + String(mm).padStart(2, '0') + '-' + String(dd).padStart(2, '0');
    return null;
  }
  m = line.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/) || line.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (m) {
    var d2 = parseInt(m[1], 10), m2 = parseInt(m[2], 10), y2 = parseInt(m[3], 10);
    if (m2 >= 1 && m2 <= 12 && d2 >= 1 && d2 <= 31) {
      return y2 + '-' + String(m2).padStart(2, '0') + '-' + String(d2).padStart(2, '0');
    }
  }
  return null;
}
function parseAbsentDaysText(raw) {
  var text = String(raw == null ? '' : raw);
  var lines = text.split(/\r?\n/);
  var rows = [];
  var seen = {};
  var currentDate = null, linesSinceDate = 999;
  function emit(date, code) {
    var key = date + '|' + code;
    if (seen[key]) return;
    seen[key] = true;
    rows.push({ date: date, slotIndex: null, subjectCode: code, time: '', type: '', status: 'Absent', absentDay: true });
  }
  lines.forEach(function (line) {
    var d = absentDayDateInLine(line);
    var codes = subjectsInLine(line);
    if (d) {
      currentDate = d; linesSinceDate = 0;
      codes.forEach(function (c) { emit(d, c); });
    } else {
      linesSinceDate++;
      /* Subject-only lines just under a date belong to that date. */
      if (currentDate && linesSinceDate <= 5) codes.forEach(function (c) { emit(currentDate, c); });
    }
  });
  return rows;
}
/* Would importing this portal row duplicate an existing entry? Pure so the
   rule is node-testable; the app delegates to it. Absent Days rows carry no
   slot/time, so for them the same subject already logged that day (any
   slot) counts as a duplicate. */
function portalRowDuplicate(entries, r) {
  return (entries || []).some(function (e) {
    if (!e || e.date !== r.date) return false;
    if (r.absentDay) return e.subjectCode === r.subjectCode;
    if (e.slotIndex != null && r.slotIndex != null && Number(e.slotIndex) === Number(r.slotIndex)) return true;
    return e.subjectCode === r.subjectCode && (e.time || '') === (r.time || '');
  });
}

var PORTAL_ATTENDANCE_PATH = '/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx';

/* Classify fetched portal text so the fetch flow knows what it landed on.
   GNUMS often bounces a cold deep-link to the student dashboard, so a fetch
   can land on an interior page instead of the attendance page.
   Returns 'login' | 'attendance' | 'interior' | 'unknown'. Pure. */
function classifyPortalText(raw) {
  var text = String(raw == null ? '' : raw);
  var parsed = parsePortalText(text);
  if (parsed.loginPage) return 'login';
  /* The Attendance Summary page is unmistakable (Slots cards / its title
     next to a %) — classify it as attendance even if the full parse failed,
     so a fetch never tries to navigate AWAY from the real page. */
  var hasSlotsCards = /\bTotal\s+Slots\b/i.test(text) || /\bPresent\s+Slots\b/i.test(text);
  var hasSummaryTitlePct = /Attendance\s+Summary/i.test(text) && /\d+(?:\.\d+)?\s*%/.test(text);
  if (hasSlotsCards || hasSummaryTitlePct) return 'attendance';
  var hasSubjectCodes = /25AM23\d{2}/.test(text);
  var hasPresentAbsentNums = /\bPresent\b[\s\S]{0,40}?\d/i.test(text) && /\bAbsent\b[\s\S]{0,40}?\d/i.test(text);
  var hasAttendancePercent = /attendance[\s\S]{0,60}?\d+(?:\.\d+)?\s*%/i.test(text) ||
    /\d+(?:\.\d+)?\s*%[\s\S]{0,60}?attendance/i.test(text);
  if (parsed.ok || hasSubjectCodes || hasPresentAbsentNums || hasAttendancePercent) return 'attendance';
  if (/NOTIFICATION/i.test(text) || /Term\s+Registration/i.test(text) ||
      /Transport\s+Registration/i.test(text) || /\bDashboard\b/i.test(text)) return 'interior';
  return 'unknown';
}

/* ---------- Proof tracking (medical certificate / OD letter / event proof) ---------- */
var PROOF_TYPES = ['Medical certificate', 'OD letter', 'Event proof', 'Other', 'None'];

/* Adds proof defaults to an entry that predates proof tracking.
   A submitted proof is by definition ready. Pure — node-testable. */
function migrateEntry(e) {
  if (!e || typeof e !== 'object') return e;
  if (PROOF_TYPES.indexOf(e.proofType) < 0) e.proofType = 'None';
  if (typeof e.proofReady !== 'boolean') e.proofReady = !!e.proofReady;
  if (typeof e.proofSubmitted !== 'boolean') e.proofSubmitted = !!e.proofSubmitted;
  if (e.proofSubmitted) e.proofReady = true;
  return e;
}

/* ---------- Per-subject helpers (from logged entries only) ---------- */
/* Subject stats come from the in-app log (manual + portal-imported entries),
   NOT from the portal baseline, which only has overall totals. */
function loggedSubjectStats(entries, code) {
  var p = 0, a = 0, na = 0;
  (entries || []).forEach(function (e) {
    if (!e || e.subjectCode !== code) return;
    if (e.status === 'Present') p++;
    else if (e.status === 'Absent') a++;
    else if (e.status === 'No Attendance') na++;
  });
  return { present: p, absent: a, na: na, counted: p + a };
}

/* Danger level for a subject: null when fewer than 4 counted (P+A) classes
   are logged (small samples mislead), 'below' when under target, 'risk'
   when within 3 points above target. */
function subjectDangerLevel(present, absent, targetPct) {
  if (present + absent < 4) return null;
  var pct = calcPercent(present, absent);
  if (pct < targetPct) return 'below';
  if (pct <= targetPct + 3) return 'risk';
  return null;
}

/* ---------- Proof deadline helpers ---------- */
function isoToUTCms(iso) {
  var p = String(iso || '').split('-');
  if (p.length !== 3) return null;
  return Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}
/* Overdue proof: absence that can be taken back (Yes / Pending), proof not
   submitted, and the absence date is 3+ days before today. */
function isOverdueProof(e, todayIso) {
  if (!e || e.status !== 'Absent') return false;
  if (e.recoveryStatus !== 'Will get it back' && e.recoveryStatus !== 'Pending - applied') return false;
  if (e.proofSubmitted) return false;
  var d = isoToUTCms(e.date), t = isoToUTCms(todayIso);
  if (d == null || t == null) return false;
  return (t - d) >= 3 * 24 * 3600 * 1000;
}
function overdueProofs(entries, todayIso) {
  var list = (entries || []).filter(function (e) { return isOverdueProof(e, todayIso); });
  list.sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
  return list;
}

/* ---------- Weekly summary helpers ---------- */
function isoOfLocalDate(d) {
  var m = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + m + '-' + day;
}
/* If today is Monday, the summary covers LAST week (previous Mon–Sun);
   otherwise it covers this week so far (Mon–today). */
function weeklyRange(todayIso) {
  var p = String(todayIso || '').split('-');
  var y = Number(p[0]), m = Number(p[1]) - 1, d = Number(p[2]);
  var today = new Date(y, m, d);
  if (today.getDay() === 1) {
    return { start: isoOfLocalDate(new Date(y, m, d - 7)), end: isoOfLocalDate(new Date(y, m, d - 1)), label: 'Last week', lastWeek: true };
  }
  var offset = (today.getDay() + 6) % 7; /* days since Monday */
  return { start: isoOfLocalDate(new Date(y, m, d - offset)), end: todayIso, label: 'This week so far', lastWeek: false };
}
function weeklyStats(entries, range) {
  var p = 0, a = 0, na = 0;
  (entries || []).forEach(function (e) {
    if (!e || e.date < range.start || e.date > range.end) return;
    if (e.status === 'Present') p++;
    else if (e.status === 'Absent') a++;
    else if (e.status === 'No Attendance') na++;
  });
  return { present: p, absent: a, na: na, counted: p + a };
}

/* ---------- Absence report (plain text) ---------- */
function takeBackLabel(recoveryStatus) {
  if (recoveryStatus === 'Will get it back') return 'Yes';
  if (recoveryStatus === "Won't get it back") return 'No';
  if (recoveryStatus === 'Pending - applied') return 'Pending';
  return 'Not checked yet';
}
function buildAbsenceReport(entries, subjectMap, generatedLabel) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function longDate(iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) return String(iso || '');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return Number(p[2]) + ' ' + months[Number(p[1]) - 1] + ' ' + p[0] + ' (' + days[d.getDay()] + ')';
  }
  var absences = (entries || []).filter(function (e) { return e && e.status === 'Absent'; });
  absences.sort(function (x, y) { return (String(y.date) + String(y.time || '')).localeCompare(String(x.date) + String(x.time || '')); });
  var takeBack = absences.filter(function (e) { return e.recoveryStatus === 'Will get it back' || e.recoveryStatus === 'Pending - applied'; }).length;
  var ready = absences.filter(function (e) { return !!e.proofReady; }).length;
  var submitted = absences.filter(function (e) { return !!e.proofSubmitted; }).length;
  var pending = absences.filter(function (e) {
    return !e.proofSubmitted && (e.recoveryStatus === 'Will get it back' || e.recoveryStatus === 'Pending - applied');
  }).length;
  var lines = [];
  lines.push('Attendance — Absence Report');
  lines.push('Generated: ' + generatedLabel);
  lines.push('');
  lines.push('Summary');
  lines.push('Total absences: ' + absences.length);
  lines.push('Can be taken back: ' + takeBack);
  lines.push('Proof ready: ' + ready);
  lines.push('Proof submitted: ' + submitted);
  lines.push('Proof pending: ' + pending);
  lines.push('');
  if (!absences.length) {
    lines.push('No absences logged.');
    return lines.join('\n');
  }
  var currentDate = null;
  absences.forEach(function (e) {
    if (e.date !== currentDate) {
      currentDate = e.date;
      var count = absences.filter(function (x) { return x.date === currentDate; }).length;
      lines.push('== ' + longDate(currentDate) + ' — ' + count + (count === 1 ? ' absence' : ' absences') + ' ==');
    }
    var s = (subjectMap && subjectMap[e.subjectCode]) || { name: e.subjectCode, code: e.subjectCode };
    var reason = (e.reasonCategory || 'Not noted yet') + (e.reasonNote ? ' — ' + e.reasonNote : '');
    lines.push(e.date + ' · ' + s.name + ' (' + s.code + ') · ' + (e.time || '') + ' · ' + (e.type || '') +
      ' · Reason: ' + reason +
      ' · Can be taken back: ' + takeBackLabel(e.recoveryStatus) +
      ' · Proof: ' + (e.proofType || 'None') + ', Ready ' + (e.proofReady ? 'Yes' : 'No') + ', Submitted ' + (e.proofSubmitted ? 'Yes' : 'No'));
  });
  return lines.join('\n');
}

function seedEntries() {
  return [
    { id: 'seed-1', date: '2026-11-17', subjectCode: '25AM2308', time: '8:30 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true, proofType: 'None', proofReady: false, proofSubmitted: false },
    { id: 'seed-2', date: '2026-11-17', subjectCode: '25AM2303', time: '9:25 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true, proofType: 'None', proofReady: false, proofSubmitted: false },
    { id: 'seed-3', date: '2026-11-17', subjectCode: '25AM2305', time: '11:40 AM', type: 'Lecture', status: 'Absent', reasonCategory: 'Not noted yet', reasonNote: '', recoveryStatus: 'Not checked yet', recoveryType: 'Other', recoveryNote: '', countedInBaseline: true, proofType: 'None', proofReady: false, proofSubmitted: false },
    { id: 'seed-4', date: '2026-11-17', subjectCode: '25AM2301', time: '1:50 PM', type: 'Lecture', status: 'Present', reasonCategory: '', reasonNote: '', recoveryStatus: '', recoveryType: '', recoveryNote: '', countedInBaseline: true, proofType: 'None', proofReady: false, proofSubmitted: false },
    { id: 'seed-5', date: '2026-11-17', subjectCode: '25AM2304', time: '2:40 PM', type: 'Lecture', status: 'Present', reasonCategory: '', reasonNote: '', recoveryStatus: '', recoveryType: '', recoveryNote: '', countedInBaseline: true, proofType: 'None', proofReady: false, proofSubmitted: false }
  ];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcPercent: calcPercent, canMiss: canMiss, needInRow: needInRow, BASELINE: BASELINE, SUBJECTS: SUBJECTS, TIMETABLE: TIMETABLE, parsePortalText: parsePortalText, parsePortalRows: parsePortalRows, portalSlotsField: portalSlotsField, parseAbsentDaysText: parseAbsentDaysText, portalRowDuplicate: portalRowDuplicate, classifyPortalText: classifyPortalText, PORTAL_ATTENDANCE_PATH: PORTAL_ATTENDANCE_PATH, PORTAL_LOGIN_URL: PORTAL_LOGIN_URL, PROOF_TYPES: PROOF_TYPES, migrateEntry: migrateEntry, loggedSubjectStats: loggedSubjectStats, subjectDangerLevel: subjectDangerLevel, isOverdueProof: isOverdueProof, overdueProofs: overdueProofs, weeklyRange: weeklyRange, weeklyStats: weeklyStats, buildAbsenceReport: buildAbsenceReport, takeBackLabel: takeBackLabel };
}

/* ---------- App (browser / Capacitor only) ---------- */
if (typeof document !== 'undefined') {
  var KEY = 'kasimAttendanceV1';
  var state = loadState();
  var absenceFilter = 'all';
  var timetableDay = null;
  var formProofReady = false;
  var formProofSubmitted = false;

  function defaultPortal() { return { learnedUrl: null, lastFetchAt: null, snapshot: null }; }
  function loadState() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.entries) {
          if (!parsed.portal) parsed.portal = defaultPortal();
          parsed.entries = parsed.entries.map(migrateEntry);
          return parsed;
        }
      }
    } catch (e) {}
    return { baseline: BASELINE, target: 75, entries: seedEntries().map(migrateEntry), portal: defaultPortal() };
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
  /* Headline numbers: the portal snapshot is the source of truth when one
     exists; otherwise baseline + manual entries (overallStats). */
  function headlineStats() {
    var snap = state.portal && state.portal.snapshot;
    if (snap && snap.present != null && snap.absent != null) {
      return {
        present: snap.present, absent: snap.absent, na: snap.na || 0,
        /* countedTotal EXCLUDES NA — it is the only total the % maths may
           use as a denominator (via present+absent). total is incl. NA and
           is display-only. Older snapshots have no countedTotal stored;
           derive it from present + absent. */
        countedTotal: snap.countedTotal != null ? snap.countedTotal : (snap.present + snap.absent),
        total: snap.total || (snap.present + snap.absent + (snap.na || 0)),
        pct: snap.percent != null ? snap.percent : calcPercent(snap.present, snap.absent),
        fromPortal: true, fetchedAt: snap.fetchedAt || null
      };
    }
    var s = overallStats();
    s.countedTotal = s.present + s.absent;
    s.fromPortal = false; s.fetchedAt = null;
    return s;
  }
  function fmtTime(iso) {
    if (!iso) return 'never';
    var d = new Date(iso);
    return isNaN(d.getTime()) ? String(iso) : d.toLocaleString();
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
  /* "Can it be taken back?" = Yes (Will get it back) or Pending (applied). */
  function isTakeBack(e) { return e.recoveryStatus === 'Will get it back' || e.recoveryStatus === 'Pending - applied'; }
  /* Proof still owed: could be taken back, but the proof is not submitted yet. */
  function isProofPending(e) { return !e.proofSubmitted && isTakeBack(e); }
  function fmtDateLong(iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) return String(iso || '');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return Number(p[2]) + ' ' + months[Number(p[1]) - 1] + ' ' + p[0] + ' · ' + days[d.getDay()];
  }

  function showView(name) {
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById('view-' + name).classList.add('active');
    document.querySelectorAll('.bottom-nav button').forEach(function (b) { b.classList.toggle('active', b.dataset.nav === name); });
    window.scrollTo(0, 0);
  }

  function render() {
    var stats = headlineStats();
    var pctText = stats.pct.toFixed(2) + '%';
    document.getElementById('overallPct').textContent = pctText;
    document.getElementById('headerPct').textContent = pctText;
    document.getElementById('overallSource').textContent = stats.fromPortal
      ? 'From college portal · fetched ' + fmtTime(stats.fetchedAt) + ' · NA is excluded from %.'
      : 'Baseline 17-Nov-2026 + entries you add in the app. NA is excluded from %.';
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
    document.getElementById('proofsToSubmit').textContent = state.entries.filter(function (e) { return e.status === 'Absent' && isProofPending(e); }).length;
    renderSubjectAlerts();
    renderOverdueBanner();
    renderWeekly(stats);
    renderPortal();
    renderToday(); renderRecent(); renderSubjects(); renderAbsences(); renderTimetable();
  }

  /* Dashboard alert: subjects (with 4+ counted logged classes) that are
     below the target or within 3 points above it. Logged classes only. */
  function renderSubjectAlerts() {
    var card = document.getElementById('subjectDangerCard');
    if (!card) return;
    var danger = [];
    SUBJECTS.forEach(function (s) {
      var st = loggedSubjectStats(state.entries, s.code);
      var lvl = subjectDangerLevel(st.present, st.absent, state.target);
      if (lvl) danger.push({ s: s, st: st, lvl: lvl, pct: calcPercent(st.present, st.absent) });
    });
    if (!danger.length) { card.classList.add('hidden'); return; }
    card.classList.remove('hidden');
    document.getElementById('subjectDangerList').innerHTML = danger.map(function (d) {
      return '<div class="kv-row"><span>' + esc(d.s.short) + ' — ' + d.pct.toFixed(1) + '% (' + d.st.present + 'P / ' + d.st.absent + 'A logged)</span>' +
        (d.lvl === 'below' ? '<span class="badge wont">Below ' + state.target + '%</span>' : '<span class="badge pending">At risk</span>') + '</div>';
    }).join('') + '<p class="muted small" style="margin:6px 0 0">From your logged classes — only subjects with at least 4 counted classes are flagged.</p>';
  }

  /* Dashboard red banner: proofs 3+ days old, take-back Yes/Pending, not submitted. */
  function renderOverdueBanner() {
    var card = document.getElementById('proofOverdueCard');
    if (!card) return;
    var overdue = overdueProofs(state.entries, todayISO());
    if (!overdue.length) { card.classList.add('hidden'); return; }
    card.classList.remove('hidden');
    document.getElementById('proofOverdueText').textContent = '⚠ ' + overdue.length + (overdue.length === 1 ? ' proof' : ' proofs') +
      ' overdue — oldest from ' + fmtDateLong(overdue[0].date) + '. Tap to view proofs not submitted.';
  }

  /* Weekly Summary card: last week on Mondays, otherwise this week so far. */
  function renderWeekly(stats) {
    var el = document.getElementById('weeklySummary');
    if (!el) return;
    var range = weeklyRange(todayISO());
    var w = weeklyStats(state.entries, range);
    var head = range.label + ' · ' + fmtDateLong(range.start) + (range.end !== range.start ? ' – ' + fmtDateLong(range.end) : '');
    if (w.present + w.absent + w.na === 0) {
      el.innerHTML = '<p style="margin:0 0 6px"><strong>' + esc(head) + '</strong></p><p class="muted" style="margin:0">No classes logged this week yet.</p>';
      return;
    }
    var wpct = (w.present + w.absent) ? calcPercent(w.present, w.absent).toFixed(2) + '%' : '—';
    el.innerHTML = '<p style="margin:0 0 8px"><strong>' + esc(head) + '</strong></p>' +
      '<div class="stats-grid">' +
      '<div class="stat"><span>' + (w.present + w.absent) + '</span><label>Classes held (counted)</label></div>' +
      '<div class="stat"><span>' + w.present + '</span><label>Present</label></div>' +
      '<div class="stat"><span>' + w.absent + '</span><label>Absent</label></div>' +
      '<div class="stat"><span>' + w.na + '</span><label>NA</label></div></div>' +
      '<div class="kv-row"><span>Week %</span><strong>' + wpct + '</strong></div>' +
      '<div class="kv-row"><span>Overall now</span><strong>' + stats.pct.toFixed(2) + '%</strong></div>' +
      '<div class="kv-row"><span>Safe misses left (≥ ' + state.target + '%)</span><strong>' + canMiss(stats.present, stats.absent, state.target) + '</strong></div>';
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
        state.entries.push({ id: uid(), date: todayISO(), subjectCode: slot.code, time: slot.time, type: slot.type, status: status, reasonCategory: status === 'Absent' ? 'Not noted yet' : '', reasonNote: '', recoveryStatus: status === 'Absent' ? 'Not checked yet' : '', recoveryType: 'Other', recoveryNote: '', proofType: 'None', proofReady: false, proofSubmitted: false, countedInBaseline: false });
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
      return '<div class="entry" data-edit="' + e.id + '"><div><strong>' + esc(e.date) + ' · ' + esc(s.short) + '</strong><div class="muted small">' + esc(e.time || '') + ' ' + esc(e.type) + (e.countedInBaseline ? ' · in baseline' : '') + (e.source === 'portal' ? ' · from portal' : '') + '</div></div><div>' + statusBadge(e.status) + ' <button class="delete-btn" data-del="' + e.id + '" title="Delete">🗑</button></div></div>';
    }).join('');
    bindEntryClicks(el);
  }

  function renderSubjects() {
    var el = document.getElementById('subjectList');
    el.innerHTML = SUBJECTS.map(function (s) {
      var entries = state.entries.filter(function (e) { return e.subjectCode === s.code; });
      var st = loggedSubjectStats(state.entries, s.code);
      var p = st.present, a = st.absent, na = st.na;
      var pct = (p + a) ? calcPercent(p, a).toFixed(1) + '%' : '—';
      var days = DAYS.filter(function (d) { return (TIMETABLE[d] || []).some(function (slot) { return slot.code === s.code; }); })
        .map(function (d) { return d + ' ' + (TIMETABLE[d] || []).filter(function (slot) { return slot.code === s.code; }).map(function (slot) { return slot.time + ' (' + slot.type + ')'; }).join(', '); }).join(' · ');
      var danger = subjectDangerLevel(p, a, state.target);
      var flagHtml = '';
      if (danger === 'below') flagHtml = '<p style="margin:8px 0 0"><span class="badge wont">⚠ Below ' + state.target + '%</span> <span class="muted small">from your logged classes</span></p>';
      else if (danger === 'risk') flagHtml = '<p style="margin:8px 0 0"><span class="badge pending">At risk</span> <span class="muted small">from your logged classes</span></p>';
      var bunkHtml;
      if (st.counted >= 4) {
        bunkHtml = '<div class="kv-row"><span>Can miss (from logged classes)</span><strong>' + canMiss(p, a, state.target) + ' more</strong></div>' +
          '<div class="kv-row"><span>Need in a row for ' + state.target + '% target</span><strong>' + needInRow(p, a, state.target) + '</strong></div>';
      } else {
        bunkHtml = '<p class="muted small" style="margin:8px 0 0">Bunk calculator: not enough data yet — needs at least 4 counted classes logged for this subject.</p>';
      }
      return '<div class="card subject-card"><div class="subject-code">' + esc(s.code) + '</div><h3>' + esc(s.name) + '</h3><p class="muted small">' + esc(s.faculty) + '<br>' + esc(s.room) + '<br>' + esc(days) + '</p><div class="stats-grid"><div class="stat"><span>' + p + '</span><label>Present (in-app log)</label></div><div class="stat"><span>' + a + '</span><label>Absent</label></div><div class="stat"><span>' + na + '</span><label>NA</label></div><div class="stat"><span>' + pct + '</span><label>% in-app log</label></div></div>' + flagHtml + bunkHtml + '</div>';
    }).join('');
  }

  function updateEntry(id, fn, msg) {
    var entry = state.entries.filter(function (e) { return e.id === id; })[0];
    if (entry) { fn(entry); saveState(); render(); if (msg) toast(msg); }
  }
  function absenceMatchesFilter(e) {
    if (absenceFilter === 'pending') return isPendingRecovery(e);
    if (absenceFilter === 'takeback') return isTakeBack(e);
    if (absenceFilter === 'proofPending') return isProofPending(e);
    if (absenceFilter === 'proofSubmitted') return !!e.proofSubmitted;
    if (absenceFilter === 'wont') return e.recoveryStatus === "Won't get it back";
    return true;
  }
  function renderAbsenceSummary(absences) {
    var el = document.getElementById('absenceSummary');
    if (!el) return;
    el.innerHTML = '<div class="card"><div class="stats-grid five">' +
      '<div class="stat"><span>' + absences.length + '</span><label>Total absences</label></div>' +
      '<div class="stat"><span>' + absences.filter(isTakeBack).length + '</span><label>Can be taken back</label></div>' +
      '<div class="stat"><span>' + absences.filter(function (e) { return !!e.proofReady; }).length + '</span><label>Proof ready</label></div>' +
      '<div class="stat"><span>' + absences.filter(function (e) { return !!e.proofSubmitted; }).length + '</span><label>Proof submitted</label></div>' +
      '<div class="stat"><span>' + absences.filter(isProofPending).length + '</span><label>Proof pending</label></div></div></div>';
  }
  function toggleChipHTML(label, on, attr, id) {
    return '<button type="button" class="toggle-chip ' + (on ? 'on' : 'off') + '" ' + attr + '="' + id + '">' + label + ': ' + (on ? 'Yes ✓' : 'No') + '</button>';
  }
  function renderAbsences() {
    var allAbsences = sortedEntries().filter(function (e) { return e.status === 'Absent'; });
    renderAbsenceSummary(allAbsences);
    var el = document.getElementById('absenceList');
    var list = allAbsences.filter(absenceMatchesFilter);
    if (!list.length) { el.innerHTML = '<div class="card"><p class="muted">No absences in this filter.</p></div>'; return; }
    /* Group by date — list is already newest-first, so groups come out date-wise, newest date first. */
    var groups = [];
    list.forEach(function (e) {
      var g = null;
      for (var i = 0; i < groups.length; i++) if (groups[i].date === e.date) { g = groups[i]; break; }
      if (!g) { g = { date: e.date, items: [] }; groups.push(g); }
      g.items.push(e);
    });
    var html = '';
    groups.forEach(function (g) {
      html += '<div class="date-group-head">' + esc(fmtDateLong(g.date)) + ' <span class="muted">· ' + g.items.length + (g.items.length === 1 ? ' absence' : ' absences') + '</span></div>';
      g.items.forEach(function (e) {
        var s = subjectByCode(e.subjectCode);
        var recOpts = [['Will get it back', 'Yes — will get it back'], ['Pending - applied', 'Pending'], ['Not checked yet', 'Not checked yet'], ["Won't get it back", "No — won't get it back"]].map(function (pair) {
          return '<option value="' + esc(pair[0]) + '"' + (e.recoveryStatus === pair[0] ? ' selected' : '') + '>' + esc(pair[1]) + '</option>';
        }).join('');
        var showRecType = (e.recoveryStatus === 'Will get it back' || e.recoveryStatus === 'Pending - applied');
        var typeOpts = ['OD', 'Medical leave', 'Faculty correction', 'Other'].map(function (o) { return '<option' + (e.recoveryType === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('');
        var proofOpts = PROOF_TYPES.map(function (o) { return '<option' + ((e.proofType || 'None') === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('');
        html += '<div class="card absence-card" data-edit="' + e.id + '">' +
          '<div class="absence-head"><div><strong>' + esc(s.name) + '</strong><div class="muted small">' + esc(s.code) + ' · ' + esc(e.time || '') + ' · ' + esc(e.type || '') + (e.countedInBaseline ? ' · in baseline' : '') + (e.source === 'portal' ? ' · from portal' : '') + '</div></div><div>' + statusBadge(e.status) + (isOverdueProof(e, todayISO()) ? ' <span class="badge wont">Overdue proof</span>' : '') + '</div></div>' +
          '<div class="kv-row"><span>Reason</span><strong>' + esc(e.reasonCategory || 'Not noted yet') + '</strong></div>' +
          (e.reasonNote ? '<p class="small muted" style="margin:2px 0 6px">' + esc(e.reasonNote) + '</p>' : '') +
          '<label class="kv-row"><span>Can it be taken back?</span><select class="inline" data-recovery="' + e.id + '">' + recOpts + '</select></label>' +
          (showRecType ? '<label class="kv-row"><span>Recovery type</span><select class="inline" data-recovery-type="' + e.id + '">' + typeOpts + '</select></label>' : '') +
          (e.recoveryNote ? '<p class="small muted" style="margin:2px 0 6px">' + esc(e.recoveryNote) + '</p>' : '') +
          '<label class="kv-row"><span>Proof type</span><select class="inline" data-proof-type="' + e.id + '">' + proofOpts + '</select></label>' +
          '<div class="kv-row"><span>Proof ready?</span>' + toggleChipHTML('Ready', !!e.proofReady, 'data-proof-ready', e.id) + '</div>' +
          '<div class="kv-row"><span>Proof submitted?</span>' + toggleChipHTML('Submitted', !!e.proofSubmitted, 'data-proof-submitted', e.id) + '</div>' +
          '<p class="muted small" style="margin:8px 0 0">Tap the card to edit the reason / full entry.</p>' +
          '</div>';
      });
    });
    el.innerHTML = html;
    function bindSelect(attr, getId, apply, msg) {
      el.querySelectorAll('[' + attr + ']').forEach(function (sel) {
        sel.addEventListener('click', function (ev) { ev.stopPropagation(); });
        sel.addEventListener('change', function () { updateEntry(getId(sel), function (e) { apply(e, sel.value); }, msg); });
      });
    }
    bindSelect('data-recovery', function (sel) { return sel.dataset.recovery; }, function (e, v) { e.recoveryStatus = v; }, 'Recovery updated');
    bindSelect('data-recovery-type', function (sel) { return sel.dataset.recoveryType; }, function (e, v) { e.recoveryType = v; }, 'Recovery type updated');
    bindSelect('data-proof-type', function (sel) { return sel.dataset.proofType; }, function (e, v) { e.proofType = v; }, 'Proof type updated');
    el.querySelectorAll('[data-proof-ready]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        updateEntry(btn.dataset.proofReady, function (e) { e.proofReady = !e.proofReady; if (!e.proofReady) e.proofSubmitted = false; }, 'Proof updated');
      });
    });
    el.querySelectorAll('[data-proof-submitted]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        updateEntry(btn.dataset.proofSubmitted, function (e) { e.proofSubmitted = !e.proofSubmitted; if (e.proofSubmitted) e.proofReady = true; }, 'Proof updated');
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
  function renderFormProofToggles() {
    var r = document.getElementById('fProofReady');
    var s = document.getElementById('fProofSubmitted');
    if (r) { r.textContent = 'Ready: ' + (formProofReady ? 'Yes ✓' : 'No'); r.className = 'toggle-chip ' + (formProofReady ? 'on' : 'off'); }
    if (s) { s.textContent = 'Submitted: ' + (formProofSubmitted ? 'Yes ✓' : 'No'); s.className = 'toggle-chip ' + (formProofSubmitted ? 'on' : 'off'); }
  }
  function resetForm() {
    document.getElementById('entryForm').reset();
    document.getElementById('fId').value = '';
    document.getElementById('fDate').value = todayISO();
    document.getElementById('formTitle').textContent = 'Add Entry';
    document.getElementById('cancelEditBtn').classList.add('hidden');
    document.getElementById('deleteEntryBtn').classList.add('hidden');
    document.getElementById('baselineNote').classList.add('hidden');
    formProofReady = false; formProofSubmitted = false;
    renderFormProofToggles();
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
    document.getElementById('fProofType').value = e.proofType || 'None';
    formProofReady = !!e.proofReady; formProofSubmitted = !!e.proofSubmitted;
    renderFormProofToggles();
    document.getElementById('formTitle').textContent = 'Edit Entry';
    document.getElementById('cancelEditBtn').classList.remove('hidden');
    document.getElementById('deleteEntryBtn').classList.remove('hidden');
    document.getElementById('baselineNote').classList.toggle('hidden', !e.countedInBaseline);
    toggleAbsenceFields(); showView('add');
  }

  /* ---------- College Sync (DSU portal via @capgo/inappbrowser) ----------
     API notes (verified against @capgo/inappbrowser 7.29.4 definitions):
     - openWebView({url, title, toolbarType, showReloadButton, visibleTitle})
     - executeScript({code}) returns Promise<void> — it does NOT return the
       script's value, so the injected script sends the page text back with
       window.mobileApp.postMessage({detail:{...}}) and the app listens to
       'messageFromWebview' (event.detail). Text is sent in 12k chunks and
       reassembled here.
     - Events: 'urlChangeEvent' ({url}), 'closeEvent' ({url}),
       'browserPageLoaded' (no payload), 'pageLoadError'. */
  var IAB = (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.InAppBrowser) || null;
  var portalMode = null; /* 'connect' | 'fetch' */
  var portalCurrentUrl = '';
  var portalHandled = false;
  var portalExtractAttempts = 0;
  var portalChunks = {};
  var portalChunkTotal = 0;
  var portalTimer = null;
  var portalListenersReady = false;
  var pendingPortal = null;
  var lastFetchedRaw = '';
  var portalStatusMsg = '';
  var portalNavHops = 0;        /* menu-navigation hops used in this fetch */
  var portalNavTimer = null;    /* fallback: re-extract if a hop never loads */
  var portalAwaitingNav = false;
  var portalShortRetried = false;
  var portalSlotsRetried = false; /* attendance page seen but Slots cards not captured yet */
  var portalConnectUrls = [];   /* URLs seen while the Connect browser is open */
  var portalPhase = 'main';     /* 'main' (summary page) | 'absent' (Absent Days tab) */
  var lastAbsentRaw = '';       /* raw text of the Absent Days capture */
  var portalAbsentTimer = null; /* fallback: settle summary-only if the tab step stalls */

  var EXTRACT_CODE = "(function(){try{var parts=[];function add(t){if(t)parts.push(t);}try{add(document.body?document.body.innerText:'');}catch(e){}var frames=document.querySelectorAll('iframe,frame');for(var i=0;i<frames.length;i++){try{var d=frames[i].contentDocument;if(d&&d.body)add(d.body.innerText);}catch(e){}}var text=parts.join('\\n').slice(0,80000);try{if(window.mobileApp&&window.mobileApp.postMessage){var CH=12000;var total=Math.max(1,Math.ceil(text.length/CH));for(var c=0;c<total;c++){window.mobileApp.postMessage({detail:{type:'attendanceTextChunk',index:c,total:total,text:text.slice(c*CH,(c+1)*CH)}});}}}catch(e){}return text;}catch(err){return '';}})();";

  /* Injected when a fetch lands on a portal interior page (e.g. the student
     dashboard): walk the portal's own menu to the attendance page.
     1) click an anchor whose href contains 'StudentAttendance',
     2) else click an anchor/menu element whose text mentions attendance,
     3) else navigate straight to the attendance path (same origin).
     Searches the main document and every same-origin frame. */
  var NAV_CODE = "(function(){function search(doc){try{var as=doc.querySelectorAll('a');var i;for(i=0;i<as.length;i++){var h=as[i].getAttribute('href')||'';if(/StudentAttendance/i.test(h)){as[i].click();return true;}}for(i=0;i<as.length;i++){var t=(as[i].innerText||as[i].textContent||'').trim();if(t&&t.length<80&&/attendance/i.test(t)){as[i].click();return true;}}var els=doc.querySelectorAll('li,span,div,td,button');for(i=0;i<els.length;i++){var tx=(els[i].innerText||els[i].textContent||'').trim();if(tx&&tx.length<60&&/attendance/i.test(tx)&&els[i].children.length===0){els[i].click();return true;}}}catch(e){}return false;}try{if(search(document))return 'clicked';var frames=document.querySelectorAll('iframe,frame');for(var f=0;f<frames.length;f++){try{var d=frames[f].contentDocument;if(d&&search(d))return 'clicked-frame';}catch(e){}}}catch(e){}try{window.location.href=window.location.origin+'/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx';}catch(e){window.location.href='/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx';}return 'navigated';})();";

  /* Injected on the Attendance Summary page: find the "Absent Days" tab
     (main document + same-origin frames), click it, and report back via
     postMessage whether it was found. The tab switch may be a postback
     (new page load) or an in-page render — the fetch flow handles both. */
  var ABSENT_TAB_CODE = "(function(){function pass(doc,sel){try{var els=doc.querySelectorAll(sel);for(var i=0;i<els.length;i++){var t=(els[i].innerText||els[i].textContent||'').trim();if(t==='Absent Days'||(t.indexOf('Absent Days')===0&&t.length<40)){els[i].click();return true;}}}catch(e){}return false;}function search(doc){return pass(doc,'a,li,button,[role=tab]')||pass(doc,'span,div,td');}var found=false;try{if(search(document))found=true;else{var frames=document.querySelectorAll('iframe,frame');for(var f=0;f<frames.length;f++){try{var d=frames[f].contentDocument;if(d&&search(d)){found=true;break;}}catch(e){}}}}catch(e){}try{if(window.mobileApp&&window.mobileApp.postMessage)window.mobileApp.postMessage({detail:{type:'absentTab',found:found}});}catch(e){}return found;})();";

  function portalAvailable() { return !!IAB; }
  function ensurePortal() { if (!state.portal) state.portal = defaultPortal(); return state.portal; }

  function renderPortal() {
    var p = ensurePortal();
    document.getElementById('portalState').textContent = p.learnedUrl ? 'Session saved — attendance page learned' : 'Not connected';
    document.getElementById('portalLastFetch').textContent = 'Last fetch: ' + (p.lastFetchAt ? fmtTime(p.lastFetchAt) : 'never');
    var snapEl = document.getElementById('portalSnapshot');
    if (p.snapshot) {
      var s = p.snapshot;
      snapEl.innerHTML = '<div class="stats-grid">' +
        '<div class="stat"><span>' + s.present + '</span><label>Present (portal)</label></div>' +
        '<div class="stat"><span>' + s.absent + '</span><label>Absent (portal)</label></div>' +
        '<div class="stat"><span>' + (s.na || 0) + '</span><label>NA (portal)</label></div>' +
        '<div class="stat"><span>' + (s.percent != null ? Number(s.percent).toFixed(2) + '%' : '—') + '</span><label>Portal %</label></div></div>' +
        '<p class="muted small">Portal counted total ' + (s.countedTotal != null ? s.countedTotal : (s.present + s.absent)) + ' (' + (s.total || (s.present + s.absent + (s.na || 0))) + ' incl. NA) · fetched ' + fmtTime(s.fetchedAt) + '. This snapshot is the headline % above.</p>';
    } else {
      snapEl.innerHTML = '<p class="muted small">No portal snapshot yet. Connect once, then Fetch — the portal totals will become your headline %.</p>';
    }
    document.getElementById('portalMsg').textContent = portalStatusMsg;
  }

  function setupPortalListeners() {
    if (portalListenersReady || !IAB) return;
    portalListenersReady = true;
    IAB.addListener('urlChangeEvent', function (e) {
      if (e && e.url) {
        portalCurrentUrl = e.url;
        if (portalMode === 'connect') portalConnectUrls.push(e.url);
      }
    });
    IAB.addListener('closeEvent', function (e) {
      if (e && e.url) portalCurrentUrl = e.url;
      clearTimeout(portalTimer);
      clearTimeout(portalNavTimer);
      if (portalMode === 'connect') {
        /* Prefer the last Attendance page seen during this Connect session —
           the final URL can be a dashboard/menu page the user ended on. */
        var learned = '';
        for (var ci = portalConnectUrls.length - 1; ci >= 0; ci--) {
          if (/attendance/i.test(portalConnectUrls[ci])) { learned = portalConnectUrls[ci]; break; }
        }
        var candidate = learned || portalCurrentUrl;
        portalConnectUrls = [];
        if (candidate && !/Login\.aspx/i.test(candidate)) {
          ensurePortal().learnedUrl = candidate;
          saveState(); render();
          toast('Attendance page saved — you are connected');
        } else {
          toast('Portal closed on the login page — next time open your Attendance page before closing');
        }
      } else if (portalMode === 'fetch' && !portalHandled) {
        portalHandled = true;
        toast('Portal fetch cancelled');
      }
      portalMode = null;
    });
    IAB.addListener('browserPageLoaded', function () {
      if (portalMode === 'fetch' && !portalHandled) setTimeout(runPortalExtraction, 1200);
    });
    IAB.addListener('pageLoadError', function () {
      if (portalMode === 'fetch' && !portalHandled) {
        /* A failed Absent Days postback must not lose the summary that was
           already captured — settle with the summary only. */
        if (portalPhase === 'absent') { settleAbsentDays(); return; }
        portalHandled = true;
        clearTimeout(portalTimer);
        closePortalBrowser();
        portalStatusMsg = 'Could not load the portal page — check your internet and try Fetch again.';
        portalMode = null;
        render();
      }
    });
    IAB.addListener('messageFromWebview', function (e) {
      if (portalMode !== 'fetch' || portalHandled) return;
      var d = (e && e.detail) || {};
      var payload = d.detail || d;
      if (!payload) return;
      if (payload.type === 'absentTab') {
        if (!payload.found) { settleAbsentDays(); return; }
        /* Found and clicked: a postback load will trigger extraction via
           browserPageLoaded; an in-page render will not, so extract after
           ~3s either way. settleAbsentDays' guard makes doubles harmless. */
        clearTimeout(portalAbsentTimer);
        portalAbsentTimer = setTimeout(function () {
          if (portalMode === 'fetch' && !portalHandled && portalPhase === 'absent') runPortalExtraction();
        }, 3000);
        return;
      }
      if (payload.type === 'attendanceText' && typeof payload.text === 'string') {
        finishFetch(payload.text);
      } else if (payload.type === 'attendanceTextChunk' && typeof payload.text === 'string') {
        portalChunks[payload.index] = payload.text;
        portalChunkTotal = payload.total || 0;
        if (portalChunkTotal && Object.keys(portalChunks).length >= portalChunkTotal) {
          var full = '';
          for (var i = 0; i < portalChunkTotal; i++) full += portalChunks[i] || '';
          finishFetch(full);
        }
      }
    });
  }

  function openPortalBrowser(url) {
    return IAB.openWebView({ url: url, title: 'DSU Portal', toolbarType: 'navigation', showReloadButton: true, visibleTitle: true });
  }
  function closePortalBrowser() { if (IAB) { try { var r = IAB.close(); if (r && r.catch) r.catch(function () {}); } catch (e) {} } }

  function startConnect() {
    if (!portalAvailable()) { toast('In-app browser is not available in this build'); return; }
    document.getElementById('portalHelpSheet').classList.remove('hidden');
  }
  function doConnectOpen() {
    document.getElementById('portalHelpSheet').classList.add('hidden');
    setupPortalListeners();
    portalMode = 'connect';
    portalConnectUrls = [];
    portalCurrentUrl = PORTAL_LOGIN_URL;
    var r = openPortalBrowser(PORTAL_LOGIN_URL);
    if (r && r.catch) r.catch(function () { portalMode = null; toast('Could not open the portal — check internet'); });
  }

  function startFetch() {
    if (!portalAvailable()) { toast('In-app browser is not available in this build'); return; }
    if (portalMode) return;
    var p = ensurePortal();
    if (!p.learnedUrl) { toast('Connect first — log in and open your Attendance page'); startConnect(); return; }
    setupPortalListeners();
    portalMode = 'fetch';
    portalHandled = false;
    portalExtractAttempts = 0;
    portalNavHops = 0;
    portalAwaitingNav = false;
    portalShortRetried = false;
    portalSlotsRetried = false;
    portalPhase = 'main';
    lastAbsentRaw = '';
    clearTimeout(portalNavTimer);
    clearTimeout(portalAbsentTimer);
    portalChunks = {}; portalChunkTotal = 0;
    portalCurrentUrl = p.learnedUrl;
    var r = openPortalBrowser(p.learnedUrl);
    if (r && r.catch) r.catch(function () { portalMode = null; toast('Could not open the portal — check internet'); });
    clearTimeout(portalTimer);
    portalTimer = setTimeout(function () {
      if (portalMode === 'fetch' && !portalHandled) {
        portalHandled = true;
        closePortalBrowser();
        portalStatusMsg = 'Portal fetch timed out — the page took too long. Try Fetch again (portal is down daily 11:55 PM–12:30 AM).';
        portalMode = null;
        render();
      }
    }, 90000); /* 90s: up to 3 menu-navigation hops + the Absent Days tab step */
  }

  function runPortalExtraction() {
    if (portalMode !== 'fetch' || portalHandled || !IAB) return;
    portalExtractAttempts++;
    portalChunks = {}; portalChunkTotal = 0;
    try {
      var r = IAB.executeScript({ code: EXTRACT_CODE });
      if (r && r.catch) r.catch(function () {});
    } catch (e) {}
  }

  function runPortalNavigation() {
    if (portalMode !== 'fetch' || portalHandled || !IAB) return;
    try {
      var r = IAB.executeScript({ code: NAV_CODE });
      if (r && r.catch) r.catch(function () {});
    } catch (e) {}
  }

  function runAbsentTabClick() {
    if (portalMode !== 'fetch' || portalHandled || !IAB) return;
    try {
      var r = IAB.executeScript({ code: ABSENT_TAB_CODE });
      if (r && r.catch) r.catch(function () {});
    } catch (e) {}
  }

  /* Summary captured. Before finishing, also read the portal's Absent Days
     tab (date-wise, subject-wise absences). If anything in this step fails,
     settleAbsentDays() falls back to the summary-only result. */
  function beginAbsentDaysStep() {
    portalPhase = 'absent';
    portalShortRetried = false; /* the tab capture gets its own short-text retry */
    portalStatusMsg = 'Summary read — opening the Absent Days tab…';
    render();
    runAbsentTabClick();
    clearTimeout(portalAbsentTimer);
    portalAbsentTimer = setTimeout(function () {
      if (portalMode === 'fetch' && !portalHandled && portalPhase === 'absent') settleAbsentDays();
    }, 8000);
  }

  function settleAbsentDays() {
    if (portalHandled || portalPhase !== 'absent') return;
    portalHandled = true;
    clearTimeout(portalTimer);
    clearTimeout(portalAbsentTimer);
    closePortalBrowser();
    portalMode = null;
    portalPhase = 'main';
    if (pendingPortal) showPortalConfirm(pendingPortal);
  }

  /* Raw-text viewer content: both captures, labelled, when a fetch read
     the Absent Days tab as well as the summary page. */
  function combinedFetchedText() {
    if (!lastFetchedRaw && !lastAbsentRaw) return '(Nothing fetched yet in this session.)';
    var t = '— Summary page —\n' + (lastFetchedRaw || '(none)');
    if (lastAbsentRaw) t += '\n\n— Absent Days page —\n' + lastAbsentRaw;
    return t;
  }

  function finishFetch(text) {
    if (portalHandled) return;
    portalAwaitingNav = false;
    clearTimeout(portalNavTimer);
    if (portalPhase === 'absent') {
      /* This capture is the Absent Days tab. Parse its absences into the
         pending result and finish — the summary-only success stands even
         if nothing parses here. */
      lastAbsentRaw = String(text == null ? '' : text);
      if (lastAbsentRaw.length < 200 && !portalShortRetried) {
        portalShortRetried = true;
        setTimeout(runPortalExtraction, 2500);
        return;
      }
      if (pendingPortal && classifyPortalText(lastAbsentRaw) !== 'login') {
        parseAbsentDaysText(lastAbsentRaw).forEach(function (r) {
          var already = pendingPortal.rows.some(function (x) { return x.date === r.date && x.subjectCode === r.subjectCode; });
          if (!already) pendingPortal.rows.push(r);
        });
      }
      settleAbsentDays();
      return;
    }
    lastFetchedRaw = String(text == null ? '' : text);
    /* Frames/pages that render late can return almost no text on the first
       pass — extract once more after a pause before judging the page. */
    if (lastFetchedRaw.length < 200 && !portalShortRetried) {
      portalShortRetried = true;
      setTimeout(runPortalExtraction, 2500);
      return;
    }
    var cls = classifyPortalText(lastFetchedRaw);
    if (cls === 'login') {
      portalHandled = true;
      clearTimeout(portalTimer);
      closePortalBrowser();
      portalMode = null;
      portalStatusMsg = 'Session expired — tap Connect and log in again.';
      render();
      toast('Session expired — log in again via Connect');
      return;
    }
    if (cls === 'attendance') {
      var parsed = parsePortalText(lastFetchedRaw);
      if (parsed.ok) {
        /* Summary is in — keep the browser open and read the Absent Days
           tab too; settleAbsentDays() shows the confirm sheet. */
        pendingPortal = parsed;
        beginAbsentDaysStep();
        return;
      }
      /* On the real attendance page but the Slots cards have not rendered
         into the text yet — wait ~2s and extract once more before giving up. */
      var hasSlotsNums = portalSlotsField(lastFetchedRaw, 'Total') != null ||
        portalSlotsField(lastFetchedRaw, 'Present') != null ||
        portalSlotsField(lastFetchedRaw, 'Absent') != null;
      if (!portalSlotsRetried && !hasSlotsNums) {
        portalSlotsRetried = true;
        portalStatusMsg = 'Attendance page found — reading the summary cards…';
        render();
        setTimeout(runPortalExtraction, 2000);
        return;
      }
      /* Attendance markers but nothing parseable — fall through to the
         one retry / give-up below. */
    }
    if (cls === 'interior' && portalNavHops < 3) {
      /* GNUMS bounced the deep-link to an interior page (usually the student
         dashboard). Walk the portal's own menu to the attendance page and
         extract again when the next page loads. */
      portalNavHops++;
      portalAwaitingNav = true;
      portalStatusMsg = 'Portal opened its dashboard — navigating to the attendance page…';
      render();
      runPortalNavigation();
      clearTimeout(portalNavTimer);
      portalNavTimer = setTimeout(function () {
        /* The hop produced no page load — re-extract whatever is showing. */
        if (portalMode === 'fetch' && !portalHandled && portalAwaitingNav) {
          portalAwaitingNav = false;
          runPortalExtraction();
        }
      }, 6000);
      return;
    }
    if (cls !== 'interior' && portalExtractAttempts < 2) { setTimeout(runPortalExtraction, 2500); return; }
    portalHandled = true;
    clearTimeout(portalTimer);
    closePortalBrowser();
    portalMode = null;
    portalStatusMsg = "Couldn't read the attendance page. Tap “View fetched text” to see what the portal sent, or use Re-learn to teach the app the page again.";
    render();
    toast("Couldn't read the attendance page");
  }

  function isDuplicateRow(r) { return portalRowDuplicate(state.entries, r); }
  function countNewRows(rows) { return rows.filter(function (r) { return !isDuplicateRow(r); }).length; }

  function showPortalConfirm(parsed) {
    var s = parsed.summary;
    var txt;
    if (s) {
      txt = 'Portal says — Present ' + (s.present != null ? s.present : '—') +
        ' / Absent ' + (s.absent != null ? s.absent : '—') +
        ' / NA ' + (s.na != null ? s.na : '—') +
        ' / Counted total ' + (s.countedTotal != null ? s.countedTotal : '—') +
        ' / Total incl. NA ' + (s.total != null ? s.total : '—') +
        ' / ' + (s.percent != null ? Number(s.percent).toFixed(2) + '%' : '—');
    } else {
      txt = 'Portal summary was not on the page (dated rows only).';
    }
    txt += ' — and ' + countNewRows(parsed.rows) + ' new dated rows (' + parsed.rows.length + ' rows read). Apply?';
    document.getElementById('portalConfirmText').textContent = txt;
    document.getElementById('portalConfirmSheet').classList.remove('hidden');
  }

  function applyPortalResult() {
    if (!pendingPortal) return;
    var parsed = pendingPortal;
    pendingPortal = null;
    document.getElementById('portalConfirmSheet').classList.add('hidden');
    var p = ensurePortal();
    var nowIso = new Date().toISOString();
    p.lastFetchAt = nowIso;
    if (parsed.summary && parsed.summary.present != null && parsed.summary.absent != null) {
      var sm = parsed.summary;
      p.snapshot = {
        present: sm.present,
        absent: sm.absent,
        na: sm.na || 0,
        countedTotal: sm.countedTotal != null ? sm.countedTotal : (sm.present + sm.absent),
        total: sm.total != null ? sm.total : ((sm.countedTotal != null ? sm.countedTotal : (sm.present + sm.absent)) + (sm.na || 0)),
        percent: sm.percent != null ? sm.percent : Math.round(calcPercent(sm.present, sm.absent) * 100) / 100,
        fetchedAt: nowIso
      };
    }
    var added = 0;
    parsed.rows.forEach(function (r) {
      if (isDuplicateRow(r)) return;
      state.entries.push({
        id: uid(), date: r.date, slotIndex: r.slotIndex, subjectCode: r.subjectCode,
        time: r.time, type: r.type, status: r.status,
        reasonCategory: r.status === 'Absent' ? 'Not noted yet' : '', reasonNote: '',
        recoveryStatus: r.status === 'Absent' ? 'Not checked yet' : '', recoveryType: 'Other', recoveryNote: '',
        proofType: 'None', proofReady: false, proofSubmitted: false,
        countedInBaseline: r.date <= '2026-11-17', source: 'portal'
      });
      added++;
    });
    portalStatusMsg = 'Portal attendance applied — ' + added + ' new dated rows imported' + (p.snapshot ? ', headline % now from the portal.' : '.');
    saveState();
    render();
    toast('Portal attendance applied (' + added + ' new rows)');
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
      recoveryNote: status === 'Absent' ? document.getElementById('fRecoveryNote').value.trim() : '',
      proofType: status === 'Absent' ? document.getElementById('fProofType').value : 'None',
      proofReady: status === 'Absent' ? formProofReady : false,
      proofSubmitted: status === 'Absent' ? formProofSubmitted : false
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
  function setAbsenceFilter(f) {
    absenceFilter = f;
    document.querySelectorAll('#absenceFilters .chip').forEach(function (c) { c.classList.toggle('active', c.dataset.filter === f); });
    renderAbsences();
  }
  document.querySelectorAll('#absenceFilters .chip').forEach(function (chip) {
    chip.addEventListener('click', function () { setAbsenceFilter(chip.dataset.filter); });
  });
  document.getElementById('proofsToSubmitCard').addEventListener('click', function () { setAbsenceFilter('proofPending'); showView('absences'); });
  document.getElementById('proofOverdueCard').addEventListener('click', function () { setAbsenceFilter('proofPending'); showView('absences'); });
  function currentAbsenceReport() {
    var map = {};
    SUBJECTS.forEach(function (s) { map[s.code] = s; });
    return buildAbsenceReport(state.entries, map, new Date().toLocaleString());
  }
  document.getElementById('exportReportBtn').addEventListener('click', function () {
    var blob = new Blob([currentAbsenceReport()], { type: 'text/plain' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'absence-report.txt'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById('copyReportBtn').addEventListener('click', function () {
    var text = currentAbsenceReport();
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(function () { toast('Report copied'); }, function () { toast('Copy failed — use Export Report'); }); }
    else toast('Copy not available — use Export Report');
  });
  document.getElementById('fProofReady').addEventListener('click', function () { formProofReady = !formProofReady; if (!formProofReady) formProofSubmitted = false; renderFormProofToggles(); });
  document.getElementById('fProofSubmitted').addEventListener('click', function () { formProofSubmitted = !formProofSubmitted; if (formProofSubmitted) formProofReady = true; renderFormProofToggles(); });
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

  /* College Sync wiring */
  if (!portalAvailable()) {
    portalStatusMsg = 'Portal sync is not available in this preview/browser build — it works in the Android app, which includes the InAppBrowser plugin.';
  }
  document.getElementById('portalConnectBtn').addEventListener('click', startConnect);
  document.getElementById('portalRelearnBtn').addEventListener('click', function () {
    if (!portalAvailable()) { toast('In-app browser is not available in this build'); return; }
    toast('Log in if asked, open your Attendance page, then close the portal');
    startConnect();
  });
  document.getElementById('portalFetchBtn').addEventListener('click', startFetch);
  document.getElementById('portalHelpOpen').addEventListener('click', doConnectOpen);
  document.getElementById('portalHelpCancel').addEventListener('click', function () { document.getElementById('portalHelpSheet').classList.add('hidden'); });
  document.getElementById('portalApplyBtn').addEventListener('click', applyPortalResult);
  document.getElementById('portalDiscardBtn').addEventListener('click', function () {
    pendingPortal = null;
    document.getElementById('portalConfirmSheet').classList.add('hidden');
    toast('Portal update discarded — nothing changed');
  });
  document.getElementById('portalRawToggle').addEventListener('click', function () {
    var pre = document.getElementById('portalRaw');
    pre.textContent = combinedFetchedText();
    pre.classList.toggle('hidden');
  });

  fillSubjectSelect(); resetForm(); render();

  /* Auto-fetch on open: learned page + last fetch older than 6 hours.
     The fetched data is still only applied after the confirm sheet. */
  if (portalAvailable() && ensurePortal().learnedUrl) {
    var last = ensurePortal().lastFetchAt ? new Date(ensurePortal().lastFetchAt).getTime() : 0;
    if (!last || (Date.now() - last > 6 * 3600 * 1000)) {
      setTimeout(function () {
        if (!portalMode) { toast('Syncing with college portal…'); startFetch(); }
      }, 1500);
    }
  }
}
