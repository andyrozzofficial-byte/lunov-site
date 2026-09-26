CREATE TABLE `activity_log` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`entity_type` text,
	`entity_id` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `client_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`client_name` text NOT NULL,
	`project_name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'not_started' NOT NULL,
	`deadline` text,
	`price` real DEFAULT 0 NOT NULL,
	`paid_amount` real DEFAULT 0 NOT NULL,
	`start_date` text,
	`completed_date` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `costs` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`service` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'SEK' NOT NULL,
	`is_recurring` integer DEFAULT false NOT NULL,
	`monthly_amount` real,
	`date` text NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `inbox_items` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`project_id` text,
	`converted_to_task_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `project_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`next_step` text,
	`deadline` text,
	`notes` text,
	`color` text DEFAULT '#d4ff3f',
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `revenues` (
	`id` text PRIMARY KEY NOT NULL,
	`client_job_id` text,
	`project_id` text,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'SEK' NOT NULL,
	`status` text DEFAULT 'unpaid' NOT NULL,
	`date` text NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`client_job_id`) REFERENCES `client_jobs`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `waiting_items` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`project_id` text,
	`client_job_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`client_job_id`) REFERENCES `client_jobs`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `week_focus` (
	`id` text PRIMARY KEY NOT NULL,
	`week_start` text NOT NULL,
	`project_id` text,
	`title` text NOT NULL,
	`description` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `week_focus_week_start_unique` ON `week_focus` (`week_start`);--> statement-breakpoint
CREATE TABLE `weekly_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`week_start` text NOT NULL,
	`day_of_week` integer NOT NULL,
	`project_id` text,
	`client_job_id` text,
	`estimated_minutes` integer DEFAULT 60 NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`client_job_id`) REFERENCES `client_jobs`(`id`) ON UPDATE no action ON DELETE set null
);
