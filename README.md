# nova-hr

A modern and fully responsive employee management dashboard built for managing employee records and basic workforce information.

## Overview

NOVA HR is a client-side employee management dashboard that provides a simple interface for viewing, searching, filtering, adding, editing, and deleting employee records.

The application uses LocalStorage to persist employee data directly in the browser.

## Features

* Dashboard overview
* Employee statistics
* Employee management
* Add employees
* Edit employees
* Delete employees
* Delete confirmation dialog
* Search employees
* Filter by employee status
* Filter by department
* Responsive sidebar
* Mobile navigation
* Desktop employee table
* Mobile employee cards
* Form validation
* LocalStorage data persistence
* Responsive design
* Accessible focus states

## Technologies

* Next.js
* TypeScript
* CSS
* LocalStorage

## Responsive Design

The dashboard is designed to work across different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile
* Small mobile screens

The desktop version uses a sidebar and employee table, while smaller screens use a responsive navigation menu and employee cards.

The layout is optimized to prevent horizontal scrolling and maintain usability across different viewport sizes.

## Data Management

Employee records are stored using browser LocalStorage.

This allows the application to:

* Persist employees after refreshing the page
* Save newly added employees
* Update edited employees
* Remove deleted employees

No backend or external database is required.

## Project Structure

```text id="j3j44q"
nova-hr/
├── app/
├── components/
├── public/
├── styles/
├── package.json
└── README.md
```

## Getting Started

Clone the repository:

```bash id="7plw2c"
git clone https://github.com/MaZenOsama72/nova-hr.git
```

Navigate to the project:

```bash id="d9xw4a"
cd nova-hr
```

Install dependencies:

```bash id="q5lq7z"
npm install
```

Start the development server:

```bash id="jv2v7y"
npm run dev
```

Open the application:

```text id="h3q1yr"
http://localhost:3000
```

## Project Purpose

This project demonstrates frontend development skills including responsive dashboard design, CRUD functionality, client-side data management, search and filtering, form handling, and responsive user interfaces.

## Author

**Mazen**

GitHub: MaZenOsama72
