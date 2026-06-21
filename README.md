# 📝 React Note App

A modern, responsive note-taking application built with **React**, **TypeScript**, and **Tailwind CSS**. This application allows you to create, edit, view, and delete notes, with all data persisted locally in your browser.

## 🌐 Live Demo

The application is deployed and hosted live at: **[note-app-ziqkimi.vercel.app](https://noteapp-ziqkimi.vercel.app)**

![App Demo](./demo.webp)

## ✨ Features

- **Create Notes:** Easily add new notes with titles, content, tags, and even an optional featured image.
- **Edit & Delete:** Full CRUD operations for managing your notes.
- **Local Storage:** Your notes are automatically saved to `localStorage`, so you won't lose them when you refresh or close the page.
- **Tags & Organization:** Keep your notes organized using custom tags.
- **View Tracking:** Tracks how many times each note has been viewed.
- **Responsive Design:** Beautifully styled with Tailwind CSS to look great on desktop and mobile.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Type Checking:** TypeScript
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd note-app-react/note-app-react
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🧩 React Components

The application is structured using modular, reusable React components:

- `<App />`: The root layout component that manages the global state and provides the React Router `<Outlet />`.
- `<Header />`: A navigation bar that provides links to Home and Create New Note pages.
- `<NotesList />`: Displays the grid of all saved notes and handles the display of individual note cards.
- `<NoteDetail />`: Shows the full content of a selected note, including the featured image, tags, and view count. Provides options to edit or delete the note.
- `<NewNote />`: Contains the form for creating a new note. Handles file inputs for the featured image and converts them to Base64.
- `<EditNote />`: Pre-populates the note creation form with existing data, allowing the user to make modifications and save them.

## 🎣 Hooks Used

The project makes extensive use of built-in and custom hooks for state management and routing:

- `useState`: Used to manage local state within forms (e.g., inputs for title, content, tags, featured image).
- `useEffect`: Utilized in `App.tsx` to keep the application's local state in sync with `localStorage` and track dependencies.
- `useLocalStorage`: A **custom hook** that abstracts the logic of getting and setting data in `localStorage`. It uses lazy initialization to ensure data is safely loaded and handles parsing/stringifying JSON seamlessly.
- `useOutletContext` (React Router): Shares state and helper functions (like `addNote`, `updateNote`, `deleteNote`) from the main `App` component down to the nested route components.
- `useNavigate` (React Router): Used for programmatically redirecting the user after a note is successfully created, edited, or deleted.
- `useParams` (React Router): Extracts dynamic parameters from the URL (like the note `id`) to fetch and display the correct note data in `NoteDetail` and `EditNote`.

## 🧠 What I Learned

Building this application provided hands-on experience with several key concepts in modern web development:

- **State Management & Persistence:** Learned how to build a robust custom hook (`useLocalStorage`) to persist application data in the browser, ensuring a seamless experience across page reloads.
- **Advanced React Router 7:** Gained experience with nested routes, programmatic navigation (`useNavigate`), and passing state down the router tree using `useOutletContext`.
- **TypeScript Integration:** Improved type safety by defining strict interfaces for the `Note` object and typing React props, hooks, and event handlers.
- **File Handling in Browser:** Learned how to accept file uploads (images) and convert them to Base64 format using the `FileReader` API for easy storage in `localStorage`.
- **Tailwind CSS Styling:** Practiced rapid UI development by utilizing Tailwind's utility classes to build responsive grids, forms, and cards without writing custom CSS.
