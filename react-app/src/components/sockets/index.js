import React from "react";
import io from "socket.io-client";
const SOCKET_URL = "";

export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext();
