import { Client, Collection } from "discord.js";
import { Server } from "./modules/Server.js";
import path from "path";
import { fileURLToPath } from "url";

declare global {
    var __filename: string;
    var __dirname: string;
}