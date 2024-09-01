import { Command } from "../modules/Command.js";
import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

const name = "list";
const description = "Lists all bore tunnels.";

export default new Command({
    name, 
    description,
    builder:
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
    run: async (client: Client<true>, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver ) => {    
        const response = await fetch("http://localhost:6969/api/list", { method: "GET" })
        const json = await response.json()

        await ia.reply({ content: JSON.stringify(json) })
    }
});