import { BaseLink, baseLinkVariants } from "@repo/ui/base-link"

import type { BaseLinkProps } from "@repo/ui/base-link"

export const linkVariants = baseLinkVariants

export interface LinkProps extends BaseLinkProps {}

export function Link({ children, href, external, ...props }: LinkProps) {
  return (
    <BaseLink href={href} {...props}>
      <a href={href} data-astro-prefetch={!external}>
        {children}
      </a>
    </BaseLink>
  )
}