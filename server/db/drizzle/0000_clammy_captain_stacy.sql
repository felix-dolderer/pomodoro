CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"name" varchar(256),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
