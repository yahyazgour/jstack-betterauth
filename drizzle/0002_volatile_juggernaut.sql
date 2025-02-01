CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `idx_posts_name` ON `posts` (`name`);--> statement-breakpoint
CREATE INDEX `idx_posts_name` ON `user` (`name`);