import { Event } from "../modules/Event.js";
import { BaseInteraction } from "discord.js";

export default new Event({
    name: "interactionCreate",
    callback: async (ia: BaseInteraction) => {
        if (!ia.isChatInputCommand()) return;

        const cmd = global.cmds.get(ia.commandName);
        cmd && cmd.run(ia.client, ia, ia.options);
    }
});