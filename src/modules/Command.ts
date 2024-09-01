import { Client, ChatInputCommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

export interface CommandOptions {
    name: string
    description: string
    builder: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
    run: (client: Client, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver) => Promise<void> | void
}

export class Command {
    name: string;
    description: string;
    builder: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
    run: (client: Client, ia: ChatInputCommandInteraction, options: CommandInteractionOptionResolver) => Promise<void> | void;

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.builder = options.builder;
        this.run = options.run;
    }
}