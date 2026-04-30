# 🖋️ Uprophet

**Uprophet** is a social networking platform designed to empower users to express themselves freely by creating and sharing personal quotes with their friends. 

By focusing on minimalism and impactful text, Uprophet provides a streamlined space for sharing wisdom, humor, or daily thoughts.

---

## 🚀 Features

*   **Quote Creation:** Share your original thoughts or favorite sayings with a global or friend-based network.
*   **Social Connectivity:** Engage with a community of users through quote-sharing interactions.
*   **Responsive UI:** Built with Tailwind CSS utility classes and shadcn/ui components for a polished, consistent experience across all devices.

---

## 🛠️ Tech Stack

This project leverages a modern, type-safe frontend architecture to ensure scalability and performance:

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Data Fetching** | [TanStack Query (v5)](https://tanstack.com/query/latest), [Axios](https://axios-http.com/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives), [Lucide React](https://lucide.dev/), [SweetAlert2](https://sweetalert2.github.io/) |
| **Form Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |

---

## 🏗️ Architecture Highlights

*   **Modular Feature Design:** Code is organized by features (e.g., Auth, Quotes, Search) for better maintainability.
*   **Centralized API Layer:** Dedicated service layer for handling all asynchronous data fetching.
*   **Path Aliases:** Uses `@/*` for clean, absolute imports from the `src` directory.
*   **Type Safety:** Comprehensive TypeScript integration across components and API services.

---

## ⚡ Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
*   **Node.js** (v18.17 or higher recommended for Next.js 15)
*   **npm** or **yarn** package manager

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jenkins1128/uprophet_frontend.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd uprophet-frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.



