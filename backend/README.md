# Backend Service for OpenAI Realtime Agents

This is the backend service for the OpenAI Realtime Agents project, built with Node.js and Express.js. It handles API requests and manages communication with OpenAI's services.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- OpenAI API key

## Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/yourusername/openai-realtime-agents-min.git
   cd openai-realtime-agents-min/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```

2. Configure the following environment variables in your `.env` file:
   ```
   PORT=3001
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

To start the development server:

```bash
npm run dev
```

To start the production server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3001).

## API Endpoints

- `POST /api/session` - Create a new chat session
- `POST /api/chat/completions` - Send messages to OpenAI and receive responses

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── .env              # Environment variables
├── .env.example      # Example environment file
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── README.md         # This file
```

## Development

- The server uses nodemon for hot-reloading during development
- ESLint is configured for code linting
- Environment variables are managed using dotenv

## Error Handling

The API includes proper error handling and will return appropriate HTTP status codes and error messages when issues occur.

## Security Notes

- Never commit your `.env` file
- Always use environment variables for sensitive data
- The OpenAI API key should be kept secure and never exposed to the client

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details