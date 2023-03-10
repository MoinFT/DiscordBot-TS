CREATE TABLE
    `guild` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` bigint NOT NULL,
        `ownerID` bigint NOT NULL,
        `memberLog_active` tinyint(1) NOT NULL,
        `memberLog_channelID` bigint,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `role` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` bigint NOT NULL,
        `roleID` bigint NOT NULL,
        `roleType` tinyint NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `channel` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` bigint NOT NULL,
        `channelID` bigint NOT NULL,
        `channelType` tinyint NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `member` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` bigint NOT NULL,
        `memberID` bigint NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;