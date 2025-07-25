✅ תוכן הקובץ README.md:
# ✈️ Flight Simulator Dashboard – בוחן מוניטור מכוניי טיסה

פרויקט המדמה לוח בקרה בסיסי למכוניי טיסה. המשתמש יכול להזין ערכים של שלושה פרמטרים עיקריים:
- **Altitude** – גובה (0–3000)
- **HSI** – כיוון מצפן (0–360)
- **ADI** – זווית אופק מלאכותי (−100 עד 100)

המערכת שומרת את הנתונים, מציגה אותם גם בטקסט וגם בתצוגה גרפית ויזואלית, וכוללת היסטוריית נתונים.

---

## 🛠️ טכנולוגיות

### 🔹 צד לקוח (React – תיקיית `client`)
- React
- Axios (שליחת בקשות לשרת)
- רכיבים מותאמים אישית:
  - `AltitudeBar.js` – מד גובה אנכי
  - `Compass.js` – מצפן עגול
  - `ADI.js` – מד אופק מלאכותי עגול
- שימוש ב־Hooks (`useState`, `useEffect`)

### 🔹 צד שרת (Node.js – תיקיית `server`)
- Express – שרת REST API
- Mongoose – עבודה עם MongoDB
- MongoDB מקומי (`mongodb://localhost:27017/flightDB`)
- CORS + Body-Parser

---

## 🚀 איך מריצים?

### 📦 שלב 1: התקנות

```bash
cd server
npm install

cd ../client
npm install
▶️ שלב 2: הפעלת השרת
cd server
node index.js
אמור להופיע: Server running on http://localhost:5000

💻 שלב 3: הפעלת הלקוח (React)
cd client
npm start
המערכת תיפתח אוטומטית בדפדפן בכתובת: http://localhost:3000

🧪 תכונות מיוחדות
✅ שמירת נתונים אוטומטית למסד (MongoDB)
✅ תצוגה טקסטואלית ויזואלית מתחלפת
✅ כפתור לשליפת היסטוריה + מחיקת כל ההיסטוריה
✅ תצוגות גרפיות:
Altitude – עמודה עם חץ אדום
HSI – מצפן מסתובב
ADI – מד אופק עם צבע משתנה (כחול/ירוק)
📂 מבנה התיקיות
flight-simulator/
├── client/          ← אפליקציית React
│   ├── src/
│   │   ├── App.js
│   │   ├── AltitudeBar.js
│   │   ├── Compass.js
│   │   └── ADI.js
├── server/          ← שרת Express
│   └── index.js
📌 הערות כלליות
כל הערכים מוגבלים לפי הדרישות (Altitude 0–3000, ADI −100–100, HSI 0–360)
הודעות שגיאה מוצגות בעת חריגה
קיימת אפשרות למחיקה מלאה של הנתונים
תצוגות גרפיות רספונסיביות ומגיבות לשינויים בזמן אמת
בהצלחה! 🛫


---

#
Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
