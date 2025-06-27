# 🧪 Coralsoft Full-Stack Developer Test Task

Welcome! This is a **full-stack take-home task**. It's meant to evaluate your ability to reason through and improve an existing project with a typical mid-level scope.

> ⚠️ The codebase is partially complete and intentionally contains inconsistencies, missing features, and oddities. This is part of the test.


## 🏗️ Objective

Fix and complete the recipe app.

The app is a basic CRUD interface for managing food recipes. Some features exist. Others are broken or missing. You'll need to review the code, identify problems, and make it functional and maintainable.

Estimated time: **~4 hours**

## 🚀 Setup

From the repo root:

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```


## 🧰 Tech Stack

- Monorepo: [Turborepo](https://turbo.build/repo)
- Frontend: [Next.js App Router](https://nextjs.org/docs/app) (React)
- Backend: [Express.js](https://expressjs.com/)
- API: [TheMealDB](https://www.themealdb.com/api.php)
- Data Storage: In-memory (no database required)

## 📋 Your Task

- Review the codebase thoroughly
- Fix or complete missing CRUD operations (create, read, update, delete)
- Clean up code and inconsistencies where necessary
- Add or fix UI components as needed (e.g., forms, pages)
- Use **server-side data fetching** only – no direct API calls from the browser
- Work within the existing codebase – avoid complete rewrites


## ✅ Completion Checklist

You should aim to:

- [ ] Basic CRUD Operations
  - [ ] View a list of recipes
  - [ ] Create a new recipe
  - [ ] View recipe details
  - [ ] Edit an existing recipe
  - [ ] Delete a recipe
- [ ] Recipe Management
  - [ ] Implement star/favorite functionality for recipes
  - [ ] Add search functionality to filter recipes
  - [ ] Enable random recipe generation during creation
  - [ ] Implement pagination
    - [ ] Backend pagination with configurable page size
    - [ ] Frontend pagination controls and UI
    - [ ] Maintain pagination state during search/filtering
- [ ] Code Quality
  - [ ] Keep code DRY and maintainable
  - [ ] Add helpful comments for unclear sections
  - [ ] Ensure proper error handling
  - [ ] Implement input validation


## 🧐 Notes & Tips

- Not everything will make sense at first. That's expected.
- You'll probably find odd file names and broken logic. That's intentional.
- Focus on making the app functional over perfect.
- Take your time to understand the existing patterns before making changes.
