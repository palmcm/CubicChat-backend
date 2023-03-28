interface ServerToClientEvents {
  chatMessage: (data: string) => void;
}

interface ClientToServerEvents {
  chatMessage: (data: string) => void;
}
