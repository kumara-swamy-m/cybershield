# ⚡ Cyber Security Learning Platform  

An interactive web app built with **React + Supabase**, designed to make learning cyber security fun and engaging.  
Users can sign up, take quizzes, submit reports, perform scans, and track their progress on a personal profile page.  

---

## ✨ Features  

- 🔐 **Authentication** – Sign up & Sign in with Supabase Auth.  
- 👤 **Profile Dashboard** – Track your Reports, Quizzes, and Scans progress.  
- 📝 **Reports** – Submit, view, and delete your own cyber reports.  
- 🕹 **Gamified Quizzes** – Earn badges like *Cyber Beginner*, *Cyber Pro*, or *Cyber Guardian*.  
- 📊 **Progress Tracking** – Counts update live on profile when you submit or delete content.  
- 🎨 **Modern UI** – Built with TailwindCSS + Framer Motion for smooth animations.  
- ☁️ **Supabase Storage** – (Optional) Upload profile avatars or files to buckets.  

---

## 📂 Project Structure  

src/
├── auth/
│ ├── SignIn.jsx
│ └── SignUp.jsx
├── components/
│ ├── Badge.jsx
│ ├── Navbar.jsx
│ └── ProfileCard.jsx
├── pages/
│ ├── Profile.jsx
│ ├── Reports.jsx
│ └── Quiz.jsx
├── data/
│ └── quizData.js
└── supabaseClient.js

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/cyber-platform.git
cd cyber-platform

2️⃣ Install Dependencies
npm install

3️⃣ Configure Supabase

Go to Supabase
.

Create a new project.

Copy your API URL and Anon Key.

Create a file src/supabaseClient.js:
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR-PROJECT.supabase.co";
const supabaseKey = "YOUR-ANON-KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
4️⃣ Database Setup

In Supabase SQL Editor, run:

-- Table: reports
create table reports (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table reports enable row level security;

-- Policies
create policy "Users can view their reports"
  on reports for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reports"
  on reports for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own reports"
  on reports for delete
  using (auth.uid() = user_id);

🛠️ Running Locally
npm run dev


Now open 👉 http://localhost:5173

🌟 User Flow

Sign Up → Enter name, email, and password.

Your name automatically shows up on your profile.

Profile → Track reports, quizzes, and scans.

Reports → Add, view, or delete reports (counts auto-update).

Quiz → Answer cyber security questions & earn badges.



💡 Tech Stack

Frontend: React + Vite + TailwindCSS + Framer Motion

Backend: Supabase (Auth, Database, Storage)

Icons: Lucide React

🤝 Contributing

Pull requests are welcome! If you’d like to contribute:

Fork the repo.

Create your feature branch (git checkout -b feature/new-feature).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/new-feature).

Open a Pull Request.
