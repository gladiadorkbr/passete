import { BaseManager } from "discord.js"

import type { BaseStore } from "~/stores/BaseStore"
import type { DjsClient } from "~/types/client"
import type { Stores } from "~/types/stores"

/** Manages all of the stores used in the bot. */
export class StoreManager extends BaseManager {
  protected readonly _stores: Stores

  constructor(client: DjsClient, stores: Stores = {}) {
    super(client)

    this._stores = stores

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target._stores && typeof prop === "string") {
          return target._stores[prop as keyof Stores]
        }
        return target[prop as keyof typeof target]
      },
    })
  }

  public async init() {
    this.client.stores = this

    for (const key of Object.keys(this._stores)) {
      await (this._stores[key as keyof Stores] as BaseStore).init(this.client)
    }

    return this
  }
}