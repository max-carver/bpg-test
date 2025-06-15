ALTER TABLE "account" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "provider_account_id";--> statement-breakpoint
ALTER TABLE "ping" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "ping" RENAME COLUMN "parentPingId" TO "parent_ping_id";--> statement-breakpoint
ALTER TABLE "ping" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ping" DROP CONSTRAINT "ping_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ping" DROP CONSTRAINT "ping_parentPingId_ping_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ping" ADD CONSTRAINT "ping_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ping" ADD CONSTRAINT "ping_parent_ping_id_ping_id_fk" FOREIGN KEY ("parent_ping_id") REFERENCES "public"."ping"("id") ON DELETE cascade ON UPDATE no action;