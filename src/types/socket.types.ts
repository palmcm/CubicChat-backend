export interface ServerToClientEvents {
  chatMessage: (data: string) => void;
}

export interface ClientToServerEvents {
  chatMessage: (data: string) => void;
}
