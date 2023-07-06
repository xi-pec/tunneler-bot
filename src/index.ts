import "dotenv/config";

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import isOnline from "is-online";

import { Event } from "./modules/Event.js";
import { Command } from "./modules/Command.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

async function main(): Promise<void> {
    while (!await isOnline({ timeout: 5000 })) {
        console.log("waiting for connection");
    }

    global.__filename = fileURLToPath(import.meta.url);
    global.__dirname = dirname(__filename);
    
    global.client = new Client({
        intents: 
            Object.entries(GatewayIntentBits)
                .map(intent => parseInt(intent[0]))
                .filter(intent => !isNaN(intent))
    });
    
    global.cmds = new Collection();
    
    const eventlist: string[] = readdirSync("./build/events/").filter(e => e.endsWith(".js"));
    for (const file of eventlist) {
        const event: Event = (await import(`./events/${file}`)).default as Event;
        global.client.on(event.name, event.callback);
        console.log(`loaded event ${event.name}`);
    }
    
    const cmdlist: string[] = readdirSync("./build/cmds/").filter(e => e.endsWith(".js"));
    for (const file of cmdlist) {
        const cmd: Command = (await import(`./cmds/${file}`)).default as Command;
        global.cmds.set(cmd.name, cmd);
        console.log(`loaded cmd ${cmd.name}`);
    }
    
    global.client.login(process.env.TOKEN);
}

main();