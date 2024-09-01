import { Command } from "../modules/Command.js";
import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

const name = "tunnel";
const description = "Starts a bore tunnel.";

export default new Command({
    name, 
    description,
    builder:
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
            .addIntegerOption(option =>
                option
                    .setName("port")
                    .setDescription("Internal port to tunnel.")
                    .setRequired(true)
            ),
    run: async (client: Client<true>, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver ) => {
        const port = options.getInteger("port", true)
        
        const response = await fetch("http://localhost:6969/api/tunnel", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ port })
        })

        const json = await response.json()

        await ia.reply({ content: JSON.stringify(json) })
    }
});