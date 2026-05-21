import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hero_section_buttons_style" AS ENUM('primary', 'outline');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"church_website" varchar,
  	"church_address" varchar,
  	"denomination" varchar,
  	"service_type" varchar,
  	"seat_count" varchar,
  	"pastor_invite_confirm" boolean DEFAULT false,
  	"two_churches" varchar,
  	"live_stream_details" varchar,
  	"additional_info" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"users_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_section_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"style" "enum_hero_section_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "hero_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT '— Ministry of the Gospel —',
  	"name" varchar DEFAULT 'Kolton
  Oxshire',
  	"quote" varchar DEFAULT '"That''s what I do — I talk about Jesus."',
  	"description" varchar DEFAULT 'Boldly proclaiming the Gospel with the strength of a lion 
  and the heart of a servant.',
  	"background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'About Kolton',
  	"heading" varchar DEFAULT 'Called to Boldly Proclaim',
  	"portrait_id" integer,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "preaching_videos_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"embed_id" varchar NOT NULL
  );
  
  CREATE TABLE "preaching_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Watch & Listen',
  	"heading" varchar DEFAULT 'Preaching Highlights',
  	"description" varchar DEFAULT 'Watch Kolton boldly proclaiming the Gospel. Subscribe on YouTube for more.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "teaching_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "teaching_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'The Word',
  	"heading" varchar DEFAULT 'Teaching & Ministry',
  	"subheading" varchar DEFAULT 'Equipping the saints with the uncompromised truth of Scripture through every platform available.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "giving_section_impact_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "giving_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Partner With Us',
  	"heading" varchar DEFAULT 'Support the Mission',
  	"subheading" varchar DEFAULT 'Your generous giving fuels the spread of the Gospel. Every dollar sown is a seed planted for the Kingdom.',
  	"cta_label" varchar DEFAULT 'Give Now',
  	"cta_href" varchar DEFAULT '/partner',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "parallax_dividers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote1" varchar DEFAULT 'Go into all the world and preach the gospel to all creation.',
  	"quote1_highlight" varchar DEFAULT 'gospel',
  	"quote1_image_id" integer,
  	"quote2" varchar DEFAULT 'The harvest is plentiful, but the workers are few.',
  	"quote2_highlight" varchar DEFAULT 'few',
  	"quote2_image_id" integer,
  	"divider3_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "booking_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Book Kolton',
  	"heading" varchar DEFAULT 'Interested in Having Kolton Oxshire Minister at Your Church?',
  	"description" varchar DEFAULT 'To request that Kolton Oxshire come to your church, we require a head pastoral invitation. Please fill out the form below with all required information to be considered.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ministry_name" varchar DEFAULT 'Kolton Oxshire Ministries',
  	"email" varchar DEFAULT 'speakinggodsgraceandpower@gmail.com',
  	"contact_heading" varchar DEFAULT 'Get in Touch',
  	"contact_subtext" varchar DEFAULT 'Have questions, prayer requests, or want to invite Kolton to speak?
  Reach out — we''d love to hear from you.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partner_page_hero_sublines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "partner_page_additional_giving_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "partner_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline" varchar DEFAULT 'Partner With Us',
  	"hero_cta_label" varchar DEFAULT 'Join the Family',
  	"mission_statement" jsonb,
  	"bible_quote" varchar DEFAULT '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
  	"donorbox_url" varchar DEFAULT 'https://donorbox.org/embed/thank-you-for-financially-blessing-my-ministry?default_interval=o&enable_auto_scroll=true',
  	"venmo_url" varchar DEFAULT 'https://venmo.com/u/Kolton-Oxshire',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_section_buttons" ADD CONSTRAINT "hero_section_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_section" ADD CONSTRAINT "hero_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_section" ADD CONSTRAINT "about_section_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "preaching_videos_videos" ADD CONSTRAINT "preaching_videos_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."preaching_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teaching_section_cards" ADD CONSTRAINT "teaching_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."teaching_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "giving_section_impact_areas" ADD CONSTRAINT "giving_section_impact_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."giving_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parallax_dividers" ADD CONSTRAINT "parallax_dividers_quote1_image_id_media_id_fk" FOREIGN KEY ("quote1_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "parallax_dividers" ADD CONSTRAINT "parallax_dividers_quote2_image_id_media_id_fk" FOREIGN KEY ("quote2_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "parallax_dividers" ADD CONSTRAINT "parallax_dividers_divider3_image_id_media_id_fk" FOREIGN KEY ("divider3_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partner_page_hero_sublines" ADD CONSTRAINT "partner_page_hero_sublines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_page_additional_giving_links" ADD CONSTRAINT "partner_page_additional_giving_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_section_buttons_order_idx" ON "hero_section_buttons" USING btree ("_order");
  CREATE INDEX "hero_section_buttons_parent_id_idx" ON "hero_section_buttons" USING btree ("_parent_id");
  CREATE INDEX "hero_section_background_image_idx" ON "hero_section" USING btree ("background_image_id");
  CREATE INDEX "about_section_portrait_idx" ON "about_section" USING btree ("portrait_id");
  CREATE INDEX "preaching_videos_videos_order_idx" ON "preaching_videos_videos" USING btree ("_order");
  CREATE INDEX "preaching_videos_videos_parent_id_idx" ON "preaching_videos_videos" USING btree ("_parent_id");
  CREATE INDEX "teaching_section_cards_order_idx" ON "teaching_section_cards" USING btree ("_order");
  CREATE INDEX "teaching_section_cards_parent_id_idx" ON "teaching_section_cards" USING btree ("_parent_id");
  CREATE INDEX "giving_section_impact_areas_order_idx" ON "giving_section_impact_areas" USING btree ("_order");
  CREATE INDEX "giving_section_impact_areas_parent_id_idx" ON "giving_section_impact_areas" USING btree ("_parent_id");
  CREATE INDEX "parallax_dividers_quote1_image_idx" ON "parallax_dividers" USING btree ("quote1_image_id");
  CREATE INDEX "parallax_dividers_quote2_image_idx" ON "parallax_dividers" USING btree ("quote2_image_id");
  CREATE INDEX "parallax_dividers_divider3_image_idx" ON "parallax_dividers" USING btree ("divider3_image_id");
  CREATE INDEX "partner_page_hero_sublines_order_idx" ON "partner_page_hero_sublines" USING btree ("_order");
  CREATE INDEX "partner_page_hero_sublines_parent_id_idx" ON "partner_page_hero_sublines" USING btree ("_parent_id");
  CREATE INDEX "partner_page_additional_giving_links_order_idx" ON "partner_page_additional_giving_links" USING btree ("_order");
  CREATE INDEX "partner_page_additional_giving_links_parent_id_idx" ON "partner_page_additional_giving_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero_section_buttons" CASCADE;
  DROP TABLE "hero_section" CASCADE;
  DROP TABLE "about_section" CASCADE;
  DROP TABLE "preaching_videos_videos" CASCADE;
  DROP TABLE "preaching_videos" CASCADE;
  DROP TABLE "teaching_section_cards" CASCADE;
  DROP TABLE "teaching_section" CASCADE;
  DROP TABLE "giving_section_impact_areas" CASCADE;
  DROP TABLE "giving_section" CASCADE;
  DROP TABLE "parallax_dividers" CASCADE;
  DROP TABLE "booking_section" CASCADE;
  DROP TABLE "site_footer" CASCADE;
  DROP TABLE "partner_page_hero_sublines" CASCADE;
  DROP TABLE "partner_page_additional_giving_links" CASCADE;
  DROP TABLE "partner_page" CASCADE;
  DROP TYPE "public"."enum_hero_section_buttons_style";`)
}
