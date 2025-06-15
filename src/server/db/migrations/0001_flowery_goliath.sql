CREATE TABLE "ping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"parentPingId" uuid,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ping" ADD CONSTRAINT "ping_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ping" ADD CONSTRAINT "ping_parentPingId_ping_id_fk" FOREIGN KEY ("parentPingId") REFERENCES "public"."ping"("id") ON DELETE cascade ON UPDATE no action;