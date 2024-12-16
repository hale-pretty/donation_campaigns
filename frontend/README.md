Prerequisites

Before you begin, ensure you have the following installed:

Node.js v18.16.0 (required)

Note: This project requires Node.js version 18.16.0. Ensure you have the correct version installed to avoid compatibility issues. You can use nvm to manage Node.js versions:

nvm install 18.16.0
nvm use 18.16.0

Installation

Clone the repository:

git clone <repository_url>

Install dependencies:

npm install

Scripts

The following npm scripts are available:

npm run dev: Start the development server using Vite.

npm run build: Build the application for production.

npm run lint: Run ESLint to check for linting errors.

npm run preview: Preview the production build.

Development Workflow

Start the development server:

npm run dev

Open the application in your browser:

http://localhost:

Linting

Ensure your code adheres to the project's linting rules by running:

npm run lint

Fix any issues reported by ESLint to maintain code quality.

Building for Production

To create an optimized production build:

npm run build

The built files will be located in the dist directory.

Previewing the Production Build

To preview the production build locally:

npm run preview

Dependencies

Runtime Dependencies

react: ^18.3.1

react-dom: ^18.3.1

Development Dependencies

@eslint/js: ^9.15.0

@types/react: ^18.3.12

@types/react-dom: ^18.3.1

@vitejs/plugin-react-swc: ^3.5.0

eslint: ^9.15.0

eslint-plugin-react: ^7.37.2

eslint-plugin-react-hooks: ^5.0.0

eslint-plugin-react-refresh: ^0.4.14

globals: ^15.12.0

vite: ^6.0.1
