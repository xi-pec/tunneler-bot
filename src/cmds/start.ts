import { Command } from "../modules/Command.js";
import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

const name = "start";
const description = "Starts the Minecraft Server";

export default new Command({
    name, 
    description,
    builder:
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
    run: async (client: Client<true>, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver ) => {
        await ia.deferReply({ ephemeral: true });

        try {
            await global.server.start();
            await ia.editReply({ content: "Server is now starting. Run `/ip` to connect to the server." });
        } catch(code) {
            switch(code) {
                case 1: await ia.editReply({ content: "NGROK is currently not connected." }); break;
                case 2: await ia.editReply({ content: "Server is currently busy or has already started" }); break;
            }
        }
    }
});