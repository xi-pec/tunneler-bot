import { Client, Collection } from "discord.js";

declare global {
    var __filename: string;
    var __dirname: string;

    var client: Client;
    var cmds: Collection<string, any>;
}