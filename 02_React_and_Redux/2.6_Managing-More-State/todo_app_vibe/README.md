# To‑Do List (Vanilla JS + localStorage)

## Features

- Add, edit, delete, toggle completion
- Filter by All / Active / Completed
- Persist tasks in `localStorage`
- Clear all completed tasks
- Export and import tasks as JSON
- Accessible semantics & keyboard support (Enter/Escape while editing)
- Responsive design

## Getting Started

1. Download all files.
2. Open `index.html` in your browser.
3. Start adding tasks.

## File Overview

| File         | Purpose                           |
| ------------ | --------------------------------- |
| `index.html` | Markup and layout                 |
| `styles.css` | Styling and responsive behavior   |
| `app.js`     | Application logic and persistence |
| `README.md`  | Documentation                     |

## Data Shape

Each to-do object:

```json
{
  "id": "string",
  "text": "string",
  "completed": false,
  "createdAt": 1690000000000
}
```

Stored under the key `todo-app-items-v1` in `localStorage`.

## Extending

Ideas to extend:

- Add due dates & sorting
- Add drag & drop ordering
- Add dark/light theme toggle
- Sync to a backend (replace persistence layer)
- Add unit tests (e.g., with Jest + JSDOM)

## License

Public domain / MIT — use freely.
