import { Command } from "../modules/Command.js";
import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const name = "ping";
const description = "Measure the latency of the bot.";

export default new Command({
    name, 
    description,
    builder:
        new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
    run: async (client: Client<true>, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver ) => {
        await ia.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("#454FBF")
            .setDescription([
                ":desktop: ` Querying `",
                ":robot: ` Querying `",
            ].join("\n"))
            .setTimestamp(Date.now());

        const reply = await ia.editReply({ embeds: [embed] });

        const bot_latency = Math.abs(Date.now() - reply.createdTimestamp);
        const api_latency = client.ws.ping;

        embed.setDescription([
            `:desktop: \` ${api_latency}ms \``,
            `:robot: \` ${bot_latency}ms \``,
        ].join("\n"));

        await ia.editReply({ embeds: [embed] });
    }
});