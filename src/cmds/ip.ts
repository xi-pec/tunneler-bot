import { Command } from "../modules/Command.js";
import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

const name = "ip";
const description = "Get the IP of the server.";

export default new Command({
    name, 
    description,
    builder:
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
    run: async (client: Client<true>, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver ) => {
        await ia.deferReply({ ephemeral: true });

        const ip = global.server.ip();
        
        if (ip) ia.editReply({ content: `The server IP is: \`${ip}\`` });
        else ia.editReply({ content: "The server is currently offline, or is unable to get the IP."});
    }
});