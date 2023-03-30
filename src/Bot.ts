import { ActivityType, Client, IntentsBitField } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import memberJoin from "./listeners/memberJoin";
import memberLeave from "./listeners/memberLeave";
import { Commands, AdminCommands } from "./Commands";

import { botToken } from "./config";
import collectGuilds from "./data/collectGuilds";
import collectRoles from "./data/collectRoles";
import collectChannels from "./data/collectChannels";
import collectMembers from "./data/collectMembers";
import roleCreate from "./listeners/roleCreate";
import roleDelete from "./listeners/roleDelete";

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

    AdminCommands.forEach((adminCommandValue) => {
        let command = client.application?.commands.cache.find((value) => { return value.name === adminCommandValue.name });

        if (command !== undefined) {
            command.setDefaultMemberPermissions("Administrator");
        }
    });

    console.log(`${client.user.username} is online`);

    collectGuilds(client);
    collectRoles(client);
    collectChannels(client);
    collectMembers(client);
});

interactionCreate(client);
memberJoin(client);
memberLeave(client);
roleCreate(client);
roleDelete(client);

client.login(botToken);