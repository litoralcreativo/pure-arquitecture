/**
 * Presenter abstraction for transforming use case results into view models.
 * Presenters format data for the presentation layer without knowing implementation details.
 *
 * @template TViewModel - The type of view model this presenter produces
 */
export interface Presenter<TViewModel = unknown> {
  /**
   * Retrieves the current view model state.
   * @returns The formatted view model ready for presentation
   */
  getViewModel(): TViewModel;
}
