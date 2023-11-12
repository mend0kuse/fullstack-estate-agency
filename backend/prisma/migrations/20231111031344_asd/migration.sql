-- CreateTable
CREATE TABLE `ApartmentPreview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `prepayment` INTEGER NOT NULL,
    `pledge` INTEGER NOT NULL,
    `communalIncluded` BOOLEAN NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApartmentCharacteristic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `square` VARCHAR(191) NOT NULL,
    `kitchen` VARCHAR(191) NOT NULL,
    `live` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `floor` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NULL,

    UNIQUE INDEX `ApartmentCharacteristic_apartmentId_key`(`apartmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApartmentPreview` ADD CONSTRAINT `Apartment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `ApartmentPreview`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApartmentCharacteristic` ADD CONSTRAINT `ApartmentCharacteristic_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `ApartmentPreview`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
