# QuickNotes

QuickNotes is a lightweight, responsive note-taking web app that lets you capture short notes, organize them into Personal, Work, or Study categories, search your notes instantly, and keep them available after refreshing the page through browser localStorage.

## Features

- Add notes with Personal, Work, or Study categories.
- Validate note content and enforce a 200-character maximum.
- Display each note as a readable card with its category and creation date/time.
- Delete individual notes.
- Search note text case-insensitively using one or more search words.
- Show clear note counts for zero, one, and multiple notes.
- Persist notes in browser localStorage so they survive page refreshes.
- Responsive layout that stacks form controls on screens 600px wide or smaller.
- Uses semantic HTML, accessible labels, buttons, and live status/error messaging.

## How to run locally

1. Clone or download this repository.
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a modern web browser.

No build tools, package manager, server, or external dependencies are required.

## What I learned

- How semantic HTML and accessible form labels improve the structure and usability of a web page.
- How Flexbox and media queries can create a clean layout that adapts to smaller screens.
- How JavaScript arrays and objects can model application state and drive dynamic DOM rendering with `createElement` and `textContent`.
- How `localStorage`, `JSON.stringify()`, and `JSON.parse()` can provide simple client-side persistence.
- How search, validation, and event listeners work together to make a small interactive web application.
- How meaningful Git commits help track a project as functionality is built in stages.

## Project structure

All required project files are kept in the repository root:

```text
quicknotes-app/
├── index.html
├── style.css
├── script.js
└── README.md
```
