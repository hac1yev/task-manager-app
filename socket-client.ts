"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.SOCKET_IO_DOMAIN || 'http://localhost:4000');