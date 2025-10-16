# GEMINI.md - Gestão de Documentos

## Project Overview

This project is a "Work Contract Generator," a web application designed to simplify the creation of Brazilian work contracts. It allows users to generate three types of contracts: domestic, rural, and urban. The application guides the user through a form, and then generates a formal contract in a preview mode, which can then be exported to PDF or CSV. It also has a feature to generate and print a CTPS (Carteira de Trabalho e Previdência Social - Work and Social Security Card) label.

**Main Technologies:**

*   **Frontend:** React, TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React

**Architecture:**

The application is a single-page application (SPA) built with React. The main application state is managed in the `App.tsx` component. The application follows a component-based architecture with a clear separation of concerns:

*   `src/components`: Contains the React components for different parts of the UI (Home, ContractForm, Preview, etc.).
*   `src/utils`: Contains utility functions for contract template generation, data validation, and export functionalities.
*   `src/data`: Contains JSON files with contract templates.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can view the application in your browser at the provided URL (usually `http://localhost:5173`).

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

4.  **Linting and Type Checking:**
    ```bash
    npm run lint
    npm run typecheck
    ```
    These commands are used to check the code for linting errors and TypeScript type errors.

## Development Conventions

*   **Coding Style:** The project follows the standard React and TypeScript coding conventions.
*   **Components:** Components are defined as functional components using hooks.
*   **Styling:** Styling is done using Tailwind CSS utility classes.
*   **File Naming:** Files are named using PascalCase for components (e.g., `ContractForm.tsx`) and camelCase for other files (e.g., `contractTemplates.ts`).
*   **Testing:** There are no explicit tests in the project.
