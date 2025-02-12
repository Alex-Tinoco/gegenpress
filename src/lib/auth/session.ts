import { v4 as uuidv4 } from "uuid";
import { serialize, parse } from "cookie";

// In-memory store for sessions (use a database or cache in production)
const sessions = {};

// Generate a unique session identifier
function generateSessionId() {
  return uuidv4();
}

// Create a new session
function createSession() {
  const sessionId = generateSessionId();
  return sessionId;
}

export {
  createSession,
  //   verifySession,
  //   destroySession,
  //   serializeSessionCookie,
  //   parseSessionId,
};
