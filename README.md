# Code Editor Project

A modern online code editor supporting JavaScript and Python with real-time execution.

## Features

- 🎨 **Modern UI** - Built with React, Tailwind CSS, and Monaco Editor
- ⚡ **Fast Execution** - Run JavaScript and Python code instantly
- 💾 **Code History** - Save and retrieve your code snippets
- 🎯 **Multiple Themes** - Dark, Light, and High Contrast modes
- 📱 **Responsive Design** - Works on mobile and desktop

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- Monaco Editor (VS Code editor)
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Code execution via child processes

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Python 3 (for Python code execution)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ParthGupta1304/Code-Editor.git
   cd Code-Editor
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend** (in new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/code-editor
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- Frontend: Deploy to Vercel
- Backend: Deploy to Render or Railway
- Database: MongoDB Atlas (free tier)

## Project Structure

```
Code-Editor/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, etc.
│   │   ├── pages/        # Home, Editor, etc.
│   │   ├── context/      # Auth context
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/               # Express backend
│   ├── src/
│   │   ├── config/       # Database config
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Code execution
│   ├── server.js
│   └── package.json
│
└── DEPLOYMENT.md         # Deployment guide
```

## API Endpoints

### POST /api/codes/run
Execute code and save to database
```json
{
  "language": "javascript",
  "code": "console.log('Hello World');"
}
```

Response:
```json
{
  "output": "Hello World\n"
}
```

### GET /api/codes
Retrieve all saved code snippets

## Security Notes

⚠️ **Important**: This application executes arbitrary code. For production:
- Run backend in a sandboxed environment
- Implement rate limiting
- Add authentication
- Use containerization (Docker)
- Consider using a dedicated code execution service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC

## Author

Parth Gupta

## Acknowledgments

- Monaco Editor by Microsoft
- Tailwind CSS team
- MongoDB team
