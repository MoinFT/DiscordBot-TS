import { ActivityType, Client, IntentsBitField } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import { AdminCommands, DefaultCommands } from "./Commands";

import { botToken } from "./config";
import collectGuilds from "./data/collectGuilds";
import collectRoles from "./data/collectRoles";
import collectChannels from "./data/collectChannels";
import collectMembers from "./data/collectMembers";
import memberJoin from "./listeners/memberJoin";
import memberUpdate from "./listeners/memberUpdate";
import memberLeave from "./listeners/memberLeave";
import roleCreate from "./listeners/roleCreate";
import roleUpdate from "./listeners/roleUpdate";
import roleDelete from "./listeners/roleDelete";
import channelCreate from "./listeners/channelCreate";
import channelDelete from "./listeners/channelDelete";
import guildCreate from "./listeners/guildCreate";
import guildDelete from "./listeners/guildDelete";

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
    await client.application.commands.set(DefaultCommands.concat(AdminCommands));

    console.log(`${client.user.username} is online`);

    collectGuilds(client);
    collectRoles(client);
    collectChannels(client);
    collectMembers(client);
});

interactionCreate(client);
memberJoin(client);
memberUpdate(client);
memberLeave(client);
roleCreate(client);
roleUpdate(client);
roleDelete(client);
channelCreate(client);
channelDelete(client);
guildCreate(client);
guildDelete(client);

client.login(botToken);