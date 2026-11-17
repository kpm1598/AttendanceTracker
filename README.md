# Attendance Tracker — Android App

Per-subject college attendance tracker for Kasim (Sem 3, A.Y. 2026-27 Odd, Dayananda Sagar University).

- Baseline (17-Nov-2026, from college portal): Present 118, Absent 37, No Attendance 11, Total 166 — **76.13%** (NA excluded from %)
- Track each subject, note the **reason** when you're absent, and track **"will I get attendance back?"** (OD / Medical leave / Faculty correction — Pending, Will get it back, Won't get it back, Not checked yet)
- Data is saved on the phone itself (localStorage, key `kasimAttendanceV1`). No internet needed, no account.

## Which folder to open

This zip contains a folder called **AttendanceTracker/**. That is the project folder.

- In Android Studio, open the **`AttendanceTracker/android`** folder (see Option A).
- For the GitHub APK build, the code is already at **github.com/kpm1598/AttendanceTracker** (see Option B).

App ID: `com.kasim.attendancetracker` · Built for: OnePlus Nord CE3 Lite (works on any Android 10+ phone)

---

## Option A — Run it in Android Studio (on your Windows laptop)

1. Extract the zip.
2. Open **Android Studio** → Open → select the `AttendanceTracker\android` folder.
3. Wait for Gradle sync to finish (first time takes a few minutes, needs internet once).
4. Connect your phone with a USB cable and turn ON **USB Debugging** (Settings → About phone → tap Build Number 7 times → Developer options → USB Debugging).
5. Click the green **Run ▶** button and pick your phone. The app installs and opens.

If you change anything in `www\` later, run this in a terminal inside `AttendanceTracker` first, then Run again in Android Studio:
```
npm install
npx cap sync android
```

## Option B — Get an APK from GitHub Actions (no Android Studio build)

This code lives at **https://github.com/kpm1598/AttendanceTracker**.

1. In the repo, go to the **Actions** tab → the "Build APK" workflow runs automatically on every push to `main` (or run it manually with "Run workflow").
2. When it's green, open the run → download the **app-debug-apk** artifact → unzip it → you get `app-debug.apk`.
3. Send the APK to your phone and install it (allow "Install via USB / unknown apps" if Android asks).

## How to use

- **Dashboard:** overall %, how many classes you can still miss, how many presents in a row to reach your target (default 75%, editable), pending recoveries, and today's classes with quick **P ✓ / A ✗** buttons.
- **Subjects:** one card per subject with faculty, room, days/times and your in-app log.
- **Add:** log any class — date, subject, Lecture/Lab, Present/Absent/No Attendance. If Absent, fill the reason, the "will I get attendance back?" fields, and the Proof section (proof type, proof ready?, proof submitted?).
- **Absences:** all absences in one tab, grouped **date-wise** (newest date first, with the weekday and how many absences that day). A summary strip on top shows Total absences · Can be taken back · Proof ready · Proof submitted · Proof pending. Every absence card shows the **date, subject (name + code), time and Lecture/Lab**, an **Absent** badge, and these options you can set right on the card (they save immediately):
  - **Reason** — category (Sick, Travel, Overslept, Personal/Family, College event/Hackathon, Other) plus your note; tap the card to edit the full entry.
  - **Can it be taken back?** — Yes — will get it back / Pending / Not checked yet / No — won't get it back, with a recovery type (OD / Medical leave / Faculty correction / Other) when it's Yes or Pending.
  - **Proof type** — Medical certificate / OD letter / Event proof / Other / None (the proof you use to claim the attendance back).
  - **Proof ready?** — Yes/No toggle.
  - **Proof submitted?** — Yes/No toggle (marking it submitted automatically marks the proof ready).
  Filter chips: All, Can be taken back, Pending decision, Proof not submitted, Proof submitted, Won't get back. The Dashboard also has a **Proofs to submit** card — tap it to jump straight to the absences whose proof is still not submitted.
- **Per-subject danger alert:** on the Subjects tab, a subject is flagged **Below target** (red) or **At risk** (amber, within 3 points above your target) based on your logged classes; the Dashboard shows a warning card listing any danger subjects. Only subjects with at least 4 counted (P+A) classes logged are flagged, so small samples don't mislead.
- **Per-subject bunk calculator:** every subject card shows **Can miss: N more** and **Need in a row for target: M** for that subject (from its logged classes; "not enough data yet" until 4 counted classes are logged).
- **Proof deadline warning:** an absence that can be taken back (Yes/Pending) whose proof is still not submitted **3 or more days** after the absence gets an **Overdue proof** badge in the Absences tab, and the Dashboard shows a red banner ("⚠ N proofs overdue — oldest from …") — tap it to jump to the proofs not submitted.
- **Absence report export:** the Absences tab has **Export Report (.txt)** and **Copy Report** buttons — a clean plain-text report (title, generated date, summary counts, then date-wise lines with subject, time, type, reason, can-be-taken-back status and proof type / ready / submitted) to show or send to faculty.
- **Weekly Summary:** a Dashboard card that summarises **Last week** on Mondays, otherwise **This week so far** (Mon–today): classes held (counted, with NA shown separately), presents, absences, that week's %, plus your current overall % and safe-misses-left.
- **Timetable:** Mon–Sat timetable. Sunday = no classes.
- **Export JSON** (Dashboard → Data) downloads a backup of everything.

Note: the 5 entries for Tue 17-Nov-2026 are already seeded and marked "in baseline" — they are part of the 118/37 counts, so they don't double-count.

---

## V2 — College Sync (DSU Portal auto-fetch)

The Dashboard has a **College Sync (DSU Portal)** card that can fetch your attendance straight from the college portal (GNUMS, `ums.mydsi.org`) using the `@capgo/inappbrowser` plugin.

**How it works — Connect → Learn → Fetch:**

1. **Connect / Log in** — tap it and read the 3 steps, then the college's own login page opens inside the app. Log in with **Role = Student**.
2. **Learn** — from the portal menu, open your **Attendance** page (the date-wise P/A table), then close the portal browser with its **X** button. The app remembers that page's address ("learned page") and the portal's session stays saved on your phone, the same way the DSU Student app stays logged in.
3. **Fetch Attendance Now** — the app re-opens the learned page by itself, reads the summary (Present / Absent / No Attendance / Total / %) and the date-wise P/A grid, closes the browser, and shows you a **confirm sheet**. **Nothing is applied until you tap Apply.** On Apply:
   - the portal totals are stored as a snapshot and become your headline % ("From college portal, fetched …"),
   - dated rows are imported as entries (marked "from portal"), skipping any date+slot you already have; new **Absent** rows land in the Absence Log with reason "Not noted yet" and recovery "Not checked yet" for you to fill in.

**Auto-fetch:** when you open the app, if a page has been learned and the last fetch was more than **6 hours** ago, it fetches by itself (you'll see "Syncing with college portal…" and the portal browser briefly opens and closes). The confirm sheet still appears — data is never applied silently.

**Good to know:**

- **Session expiry:** if the portal sends you back to the login page, the app says "Session expired — tap Connect and log in again." Just Connect once more; the learned page is kept.
- **Maintenance window:** the portal is down daily **11:55 PM–12:30 AM** — fetches will fail/time out then; try again in the morning.
- **Re-learn:** if the portal changes its pages and Fetch says "Couldn't read the attendance page", tap **Re-learn Attendance Page** and repeat the Connect steps. There's also a **View fetched text** toggle on the card to see exactly what the portal sent.
- **Password safety:** your password is only ever typed into the college's own login page inside the in-app browser. The app never sees it, never stores it, and it is not part of the Export JSON. Only the learned page address, last fetch time and the fetched totals live in the app's data (inside the same `kasimAttendanceV1` store, under `portal`, and included in Export JSON; Reset clears them).
