import { Client } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import { Commands } from "./Commands";

import { botToken } from "./config";

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

client.on("ready", async () => {
    if (!client.user || !client.application) {
        return;
    }
    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);
});

interactionCreate(client);

client.login(botToken);