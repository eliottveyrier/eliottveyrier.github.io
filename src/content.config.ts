import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/blog",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),

        tags: z.array(z.string()).default([]),
        heroImage: z.string().optional(),
        draft: z.boolean().default(false),

        slug: z.string(),
    }),
});

const articles = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/articles",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),

        category: z.string(),
        tags: z.array(z.string()).default([]),
        heroImage: z.string().optional(),
        draft: z.boolean().default(false),

        slug: z.string(),
    }),
});

const music = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/music",
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        year: z.number().optional(),
        priority : z.number().optional(),
        google_drive_id : z.string().optional(),
        youtube_id : z.string().optional(),
    }),
});

const highlightListItem = z.enum([
    "violins-i",
    "violins-ii",
    "celli",
    "violas",
    "harp",
    "contrabasses",
    "keyboard-left",
    "keyboard-right",
    "woodwinds",
    "choir",
    "horns",
    "brass",
    "percussion",
    "synths",
    "fx",

    "strings",
    "keyboard",
    "voices",
    "all",
]);

const instruments = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/orchestration/instruments",
    }),
    schema: z.object({
        fullName: z.string(),

        sittingChartSections: z.array(
            highlightListItem
        ),

        category: z.enum([
            "strings",
            "keyboard",
            "woodwinds",
            "voices",
            "brass",
            "percussion",
            "synths",
            "fx",
        ]),

        slug: z.string(),

        family: z.string(),
    }),
});

export const collections = { blog, articles, music, instruments };