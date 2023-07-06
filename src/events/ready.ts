import { Event } from "../modules/Event.js";
import { Client, REST, Routes } from "discord.js";

export default new Event({
    name: "ready",
    callback: async (client: Client<true>) => {
        const rest = new REST().setToken(process.env.TOKEN!);

        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: global.cmds.map(cmd => cmd.builder.toJSON()) },
            );
        } catch (e) { console.log(e); }

        console.log("bot ready");
    }
});