# Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, simulating WebSocket updates and managing all state via Redux.

## Features

- Responsive UI table displaying 6 crypto assets with detailed information
- Real-time price updates simulated with Redux state management
- Color-coded percentage changes (green for positive, red for negative)
- 7-day price charts for each cryptocurrency
- Sorting functionality for all columns
- Tooltips for additional information

## Tech Stack

- **React**: Frontend UI library
- **Next.js**: React framework with App Router
- **Redux Toolkit**: State management
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Canvas API**: For rendering mini charts

## Architecture

The application follows a clean architecture pattern:

- **Components**: UI components for rendering the crypto table and charts
- **Redux Store**: Central state management
  - **Slices**: Crypto slice for managing cryptocurrency data
  - **Thunks**: Async actions for fetching data
  - **Selectors**: Optimized data access
- **Utils**: Helper functions for formatting and data manipulation

## Setup Instructions

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- The application fetches initial cryptocurrency data on load
- Every 1.5 seconds, it simulates WebSocket updates by dispatching Redux actions
- These actions randomly update prices, percentage changes, and volumes
- The UI automatically re-renders with the updated data
- All state is managed through Redux, with no local component state

## Bonus Features Implemented

- Sorting functionality for all columns
- Responsive design for all screen sizes
- Tooltips for additional information
- Visual indicators for price changes
- Supply progress bars for cryptocurrencies with max supply

## Demo

![Crypto Price Tracker Demo](demo.gif)
