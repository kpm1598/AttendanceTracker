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
- **Add:** log any class — date, subject, Lecture/Lab, Present/Absent/No Attendance. If Absent, fill the reason and the "will I get attendance back?" fields.
- **Absences:** all absences in one place, filter by recovery status, update recovery inline. Tap any absence to edit its reason.
- **Timetable:** Mon–Sat timetable. Sunday = no classes.
- **Export JSON** (Dashboard → Data) downloads a backup of everything.

Note: the 5 entries for Tue 17-Nov-2026 are already seeded and marked "in baseline" — they are part of the 118/37 counts, so they don't double-count.
