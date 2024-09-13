CREATE TABLE IF NOT EXISTS "goal_completions" (
	"id" text PRIMARY KEY NOT NULL,
	"goal_id" text NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL
);
