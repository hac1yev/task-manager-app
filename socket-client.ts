"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SOCKET_IO_DOMAIN : "http://localhost:4000");