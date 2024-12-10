import { BotEventBuilder } from "~/builders/BotEventBuilder"

import type { BotEvent } from "~/structures/BotEvent"
import type { DjsClient } from "~/types/client"

export async function loadEvents(client: DjsClient, paths: string[]) {
  const events: BotEvent[] = []

  for (const path of paths) {
    const exports = (await import(path)) as Record<string, unknown>
    const builder = exports.default

    if (!BotEventBuilder.isBuilder(builder)) {
      console.warn(`File does not export a valid builder: ${path}`)
      continue
    }

    const event = builder.build(client)
    events.push(event)
  }

  return events
}
