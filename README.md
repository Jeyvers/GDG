# GDG OOU – Frontend Masterclass Workshop Project

A simple **Tours** app built for the **Frontend Development Masterclass** by **Google Developer Groups (GDG) on Campus – Olabisi Onabanjo University (OOU)**. This repo is the workshop/sample project used during the hands-on session, demonstrating modern React patterns, accessibility, and testing.

**Speaker:** Jeyi Adole — *Senior Frontend Developer, Payaza*

---

## Event Details

| | |
|---|---|
| **Theme** | Frontend Development Masterclass |
| **Date** | Saturday, 31st January 2026 |
| **Time** | 7:00 PM – 8:30 PM (WAT) |
| **Duration** | 1 hour 30 minutes |
| **Venue** | [Bevy (GDG OOU event)](https://gdg.community.dev/j/823hw69vkgyf6/) |
| **Organizers** | GDG on Campus – Olabisi Onabanjo University (OOU) |

The masterclass covers framework techniques, AI integrations, **accessibility best practices**, and **testing strategies**, with a mix of theory and live coding.

---

## What This Project Covers

- **React + TypeScript + Vite** – Modern tooling and component structure  
- **Mock data & state** – Faker.js, loading / error / empty states  
- **Accessibility** – ARIA, live regions, keyboard (Escape), focus management, form labels  
- **Testing** – Vitest, React Testing Library, Jest DOM, unit and component tests  

### Features

- List of tours (mock API with [Faker](https://fakerjs.dev/))
- Add tour form (image URL, name, description, date, creator)
- Test-state controls to simulate loading, error, and empty responses
- Accessible modal dialog with focus trap and Escape to close

---

## Prerequisites

- **Node.js** (LTS recommended) and npm or yarn  
- A code editor (e.g. VS Code)  
- Basic familiarity with React and TypeScript  

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm test         # Run tests (watch mode)
npm run test:run # Run tests once
npm run lint     # Run ESLint
```

---

## Project Structure (high level)

```
src/
├── api/           # Mock tours API (fetch, add, state simulation)
├── components/    # TourCard, TourList, AddTourForm, StateTester
├── types/         # Tour, AddTourInput
├── test/          # Vitest + RTL setup
├── App.tsx        # Main app and data flow
└── main.tsx       # Entry point
```

---

## Contact

- **Event coordinator:** Deborah  
  - Email: fatokideborah9@gmail.com  
  - Phone (text only): 09016962215  

For questions about the event or this workshop repo, reach out to the coordinator above.

---

*Built for the GDG OOU Frontend Development Masterclass, January 2026.*
