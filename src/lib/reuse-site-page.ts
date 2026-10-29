type ReusedPageOptions = {
  loader?: unknown
  loaderDeps?: unknown
  head?: unknown
  component?: unknown
  beforeLoad?: unknown
  validateSearch?: unknown
  notFoundComponent?: unknown
}

/**
 * Copy a Spanish `_site` page's handlers onto the matching `/en` URL.
 * Only the handlers move across: id and path stay on the English route.
 */
export function reuseSitePage(options: ReusedPageOptions): never {
  return {
    loader: options.loader,
    loaderDeps: options.loaderDeps,
    head: options.head,
    component: options.component,
    beforeLoad: options.beforeLoad,
    validateSearch: options.validateSearch,
    notFoundComponent: options.notFoundComponent,
  } as never
}
