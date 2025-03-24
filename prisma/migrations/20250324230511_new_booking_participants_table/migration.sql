-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `Bookings_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `birthdate` DATETIME(3) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `bookings_participants` (
    `booking_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `bookings_participants_booking_id_idx`(`booking_id`),
    INDEX `bookings_participants_user_id_idx`(`user_id`),
    PRIMARY KEY (`booking_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Bookings_user_id_place_id_key` ON `bookings`(`user_id`, `place_id`);

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `Bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings_participants` ADD CONSTRAINT `bookings_participants_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings_participants` ADD CONSTRAINT `bookings_participants_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
