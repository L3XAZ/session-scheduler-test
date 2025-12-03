# Session Scheduler — Test Assignment for 6037

🔗 **Live Demo:** https://session-scheduler-test.vercel.app/  
📦 **GitHub Repository:** https://github.com/L3XAZ/session-scheduler-test

This project is a full implementation of the official Frontend Engineer test task from 6037 Venture Partnership.
It includes a fully responsive booking interface with dynamic date and time slot generation.

## 🧰 How to install & run locally

1. Clone the repository
   git clone https://github.com/L3XAZ/session-scheduler-test.git

   `cd session-scheduler-test`

2. Install dependencies

   `npm install`

3. Run the development server

   `npm run dev`

Your app will be available at:
[http://localhost:3000]([http://localhost:3000])

## 🔧 Optional: Linting & Formatting

Run ESLint

    `npm run lint`

Fix ESLint issues automatically

    `npm run lint:fix`

Run Prettier formatting

    `npm run format:fix`

## 📌 Features

### ✔ Fully responsive UI

From **iPhone SE** to **4K desktops**. Layouts adapt between mobile and desktop shells.

### ✔ Modern React + Next.js stack

Built using the latest versions:

- **React 19**
- **Next.js 16 (App Router)**
- **TypeScript**
- **TailwindCSS v4**
- **date-fns**

### ✔ Dynamic date & time generation

- Dates generated for **6 weeks ahead**
- Timeslots every **15 minutes**
- Times in the **future only**
- 12-hour format display

### ✔ Smooth horizontal scroll with arrow controls

- Custom scroll rail
- Auto-scroll to selected pill
- Month labels that respond to scroll position

### ✔ ESLint + Prettier compliant

Configured under:

- `eslint-config-next`
- Airbnb-like rules
- TypeScript strict mode
- Tailwind Prettier plugin

---

## 🛠 Tech Stack

| Technology      | Purpose                                 |
|-----------------|-----------------------------------------|
| **React 19**    | UI + hooks + memoized components        |
| **Next.js 16**  | Structure, bundling, image optimization |
| **TypeScript**  | Strict typing across entire codebase    |
| **TailwindCSS** | Modern utility-first styling            |
| **date-fns**    | Managing and formatting date/time       |
| **Vercel**      | Production deployment                   |

---
