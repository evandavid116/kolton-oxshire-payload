/** Where the redesign is mounted while it lives beside the current build. Change to '' when it replaces it. */
export const REDESIGN_BASE = '/redesign'

/** In-page anchor on the redesign home page, e.g. home('gospel') -> '/redesign#gospel'. */
export const home = (anchor?: string) => (anchor ? `${REDESIGN_BASE}#${anchor}` : REDESIGN_BASE)
