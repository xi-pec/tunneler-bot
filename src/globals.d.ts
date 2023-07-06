import { Client, Collection } from "discord.js";
import { Server } from "./modules/Server.js";

declare global {
    var __filename: string;
    var __dirname: string;

    var client: Client;
    var cmds: Collection<string, any>;
    var server: Server;
}