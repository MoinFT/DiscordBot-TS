import { ActivityType, Client, IntentsBitField } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import memberJoin from "./listeners/memberJoin";
import memberLeave from "./listeners/memberLeave";
import { Commands } from "./Commands";

import { botToken } from "./config";
import collectGuilds from "./data/collectGuilds";
import collectRoles from "./data/collectRoles";
import collectChannels from "./data/collectChannels";
import collectMembers from "./data/collectMembers";

console.log("Bot is starting...");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences
    ]
});

client.on("ready", async () => {
    if (!client.user || !client.application) {
        return;
    }
    await client.application.commands.set(Commands);

    console.log(`${client.user.username} is online`);

    collectGuilds(client);
    collectRoles(client);
    collectChannels(client);
    collectMembers(client);
});

interactionCreate(client);
memberJoin(client);
memberLeave(client);

client.login(botToken);