# Arena Seating App

Interactive arena seating application built with Next.js, allowing users to select and purchase seats from different sections, including VIP and standard areas.

## Features

- Interactive arena layout with clickable sections
- VIP and standard seating options
- Real-time price calculation
- Seat selection across multiple sections
- Local storage for persistent seat data
- Modal-based seat selection interface

## Tech Stack

- Next.js 14
- Redux Toolkit
- Tailwind CSS
- TypeScript
- Headless UI

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run linting

## Project Structure

```
├── app/                # Next.js app directory
├── assets/            # SVG files for sections
├── components/        # React components
├── redux/            # Redux store and slices
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Build With Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/arena-seating-app)

## License

This project is licensed under the MIT License.
