/**
 * types.ts — shared shapes for the chatbot engine, knowledge base and widget.
 */

export type ChatAction =
  | { type: "call"; label?: string }
  | { type: "link"; label: string; href: string };

/**
 * A single bot bubble. `text` supports a tiny markup the widget renders:
 * **bold**, line breaks, and lines starting with "• " as bullets.
 */
export interface BotMessage {
  text: string;
  actions?: ChatAction[];
  tone?: "normal" | "alert" | "success";
}

export type FlowKind = "booking" | "quote" | "emergency" | "callback";

export type Offer =
  | { kind: "book"; service?: string; flow?: FlowKind; details?: string }
  | { kind: "callback"; topic?: string }
  | { kind: "emergency" }
  | { kind: "anything-else" };

export interface BusinessInfo {
  phone: string;
  email: string;
  address: string;
}

/** What a knowledge-base intent needs to know to phrase its answer. */
export interface ReplyContext {
  biz: BusinessInfo;
  name?: string;
  /** Last topic discussed (e.g. "water heater") for follow-ups like "how much?". */
  topic?: string;
  /** Pacific-time clock, so "are you open?" answers are about Seattle, not the visitor. */
  pacific: { hour: number; weekday: number; label: string; dateLabel: string };
  pick<T>(options: T[]): T;
  raw: string;
  norm: string;
}

export interface IntentReply {
  messages: BotMessage[];
  quickReplies?: string[];
  offer?: Offer;
  /** Start a slot-filling flow immediately. */
  startFlow?: { kind: FlowKind; service?: string; details?: string };
  /** Remember what we're talking about for follow-up questions. */
  topic?: string;
}

export interface LeadRequest {
  source: string;
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  city?: string;
  service?: string[];
  serviceType?: string;
  message?: string;
  urgency?: string;
  preferredTime?: string;
  transcript?: string;
  /** Coverage caveat for the office, e.g. "Edge of service area: please confirm". */
  areaNote?: string;
  /** Not emailed: tells the widget not to count this as an Ads conversion. */
  outOfArea: boolean;
}

export interface Turn {
  messages: BotMessage[];
  quickReplies: string[];
  /** Show the icon-button service picker under the conversation. */
  showServicePicker: boolean;
  /** Composer hint so mobile keyboards switch to the right layout. */
  input: { placeholder: string; mode: "text" | "tel" | "email" | "numeric" };
  /** A finished lead the widget must deliver, then report back via leadDelivered(). */
  lead?: LeadRequest;
}
