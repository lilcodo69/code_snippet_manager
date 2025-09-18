
# CodeStash AI: The Intelligent Code Snippet Manager

CodeStash AI is a full-stack application designed to be an intelligent code vault for developers. It directly tackles the laborious task of writing boilerplate code by providing a centralized platform to save, find, and refine snippets. Going beyond simple storage, CodeStash AI uses ai enabled semantic search to help you find code based on its *functionality*, not just keywords. It also integrates an AI-powered review system to instantly analyze your snippets, identify potential bugs, and suggest more robust implementations.

<br>

## Live Demo

**[CodeStash]**(https://codestashin.netlify.app)

<br>

---

## Key Features in Action

### AI-Powered Semantic Search
Find snippets based on *what they do*, not just the words you use. Ask "how to make a network request in React" and find your custom hook instantly.

*(Placeholder for your Semantic Search GIF)*
`![Semantic Search GIF](https://your-link-to-search-gif)`

### Automated AI Code Review
Get instant feedback on your code. Our integrated AI, powered by the Google Gemini API, identifies potential bugs, highlights security risks, and suggests improvements on demand.

*(Placeholder for your AI Code Review GIF)*
`![AI Code Review GIF](https://your-link-to-review-gif)`

### Create, Edit, and Organize with Ease
A clean and intuitive interface for managing your code. Create new snippets, add language-specific notes with Markdown support, and edit with full syntax highlighting.

*(Placeholder for your Creating/Editing a Snippet GIF)*
`![Create and Edit GIF](https://your-link-to-create-gif)`

### Pin Your Favorites
Keep your most-used snippets just a click away. Pin and unpin snippets for quick access right from your dashboard.

*(Placeholder for your Pinning Snippet GIF)*
`![Pinning Snippet GIF](https://your-link-to-pin-gif)`

---




## Tech Stack & Architecture

This project was built with a modern, scalable, and type-safe stack.

| Category                | Technology                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**            | **React**, **TypeScript**, **Vite**, **Tailwind CSS**                                                                                                                                                    |
| **Backend & Database**  | **Supabase** (Authentication, Storage, PostgreSQL), **Supabase Edge Functions**                                                                                                                        |
| **AI & Vector Search**  | **Google AI (Gemini)**, **Supabase pgvector**                                                                                                                                                          |
| **Data Fetching**       | **TanStack React Query** for server state management, caching, and optimistic updates.                                                                                                                   |
| **Form Management**     | **React Hook Form** for performant and maintainable forms.                                                                                                                                             |
| **UI & UX**             | **React Icons**, **react-hot-toast** for notifications, **react-markdown**                                                                                                                             |
| **Code Highlighting**   | **react-syntax-highlighter**                                                                                                                                                                           |
| **Linting & Tooling**   | **ESLint**, **TypeScript-ESLint**, **Prettier**                                                                                                                                                        |

---

## Project Structure

The project maintains a clear separation between client-side code (`/src`), serverless functions (`/supabase`), and project configuration at the root level.

```
/
|-- /public               # Static assets
|-- /src                  # Frontend source code
|   |-- /assets
|   |-- /components       # Reusable components
|   |-- /context
|   |-- /hooks
|   |-- /pages
|   |-- /services         # API layer for fetching data
|   |-- /type             # TypeScript type definitions
|   |-- /ui               # Low-level UI primitives
|   |-- App.tsx
|   |-- main.tsx
|   +-- supabaseClient.ts # Supabase client instance
|-- /supabase
|   +-- /functions        # Serverless Edge Functions
|-- .env.local            # Environment variables
|-- index.html
|-- package.json
+-- vite.config.ts
```

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   Supabase CLI (for local edge function development)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/code-snippet-manager.git
    cd code-snippet-manager
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env.local` file in the root of the project. You can get these values from your Supabase and Google AI project dashboards.

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application should now be running on `http://localhost:5173`.

