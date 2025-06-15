ALTER TABLE "ping" ALTER COLUMN "latitude" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ping" ALTER COLUMN "latitude" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "ping" ALTER COLUMN "longitude" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ping" ALTER COLUMN "longitude" SET DEFAULT '0.0';