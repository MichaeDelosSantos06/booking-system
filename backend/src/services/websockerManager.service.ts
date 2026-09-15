import type WebSocket from "ws";

const connections = new Map<number, Set<WebSocket>>();

export const addConnection = (userId: number, ws: WebSocket) => {
  const userConnections = connections.get(userId) ?? new Set<WebSocket>();

  userConnections.add(ws);
  connections.set(userId, userConnections);
};

export const removeConnection = (userId: number, ws: WebSocket) => {
  const userConnections = connections.get(userId);

  if (!userConnections) {
    return;
  }

  userConnections.delete(ws);

  if (userConnections.size === 0) {
    connections.delete(userId);
  }
};

export const sendToUser = (userId: number, message: unknown) => {
  const userConnections = connections.get(userId);

  console.log("Sending notification to user:", userId);
  console.log("User connections:", userConnections);

  if (!userConnections) {
    return;
  }

  const data = JSON.stringify(message);

  for (const ws of userConnections) {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  }
};
