import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  campaigns: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    type: v.string(), // "project" or "expert"
    status: v.string(), // "draft", "active", "completed"
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  participants: defineTable({
    campaignId: v.id("campaigns"),
    name: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    team: v.optional(v.string()),
    status: v.string(), // "pending", "in_progress", "completed"
    createdAt: v.number(),
  }).index("by_campaign", ["campaignId"]),

  topics: defineTable({
    campaignId: v.id("campaigns"),
    participantId: v.optional(v.id("participants")),
    name: v.string(),
    description: v.optional(v.string()),
    suggestedBy: v.optional(v.string()),
    priority: v.optional(v.number()),
    status: v.string(), // "pending", "partial", "complete"
    createdAt: v.number(),
  }).index("by_campaign", ["campaignId"]),

  sessions: defineTable({
    campaignId: v.id("campaigns"),
    participantId: v.optional(v.id("participants")),
    scheduledAt: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    status: v.string(), // "scheduled", "in_progress", "completed"
    createdAt: v.number(),
  })
    .index("by_campaign", ["campaignId"])
    .index("by_participant", ["participantId"]),

  transcripts: defineTable({
    sessionId: v.id("sessions"),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_session", ["sessionId"]),

  knowledge: defineTable({
    campaignId: v.id("campaigns"),
    sessionId: v.optional(v.id("sessions")),
    topicId: v.optional(v.id("topics")),
    content: v.string(),
    type: v.string(), // "fact", "process", "insight"
    confidence: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_campaign", ["campaignId"]),
});
