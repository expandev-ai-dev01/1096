# TODO List Backend API

Backend REST API for TODO List System built with Node.js, Express, and TypeScript.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- SQL Server database integration
- Comprehensive error handling
- Request validation with Zod
- API versioning support
- CORS configuration
- Security middleware (Helmet)
- Compression middleware
- Logging with Morgan

## Prerequisites

- Node.js 18.x or higher
- SQL Server 2019 or higher
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Build the project:
   ```bash
   npm run build
   ```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check
```
GET /health
```

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## License

ISC