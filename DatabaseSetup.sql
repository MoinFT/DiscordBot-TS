CREATE TABLE
    `guild` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` varchar(31) NOT NULL,
        `ownerID` varchar(31) NOT NULL,
        `memberLog_active` tinyint(1) NOT NULL,
        `memberLog_channelID` bigint,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `role` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` varchar(31) NOT NULL,
        `roleID` varchar(31) NOT NULL,
        `roleType` tinyint NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `channel` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` varchar(31) NOT NULL,
        `channelID` varchar(31) NOT NULL,
        `channelType` tinyint NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    `member` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `guildID` varchar(31) NOT NULL,
        `memberID` varchar(31) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `id_UNIQUE` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;