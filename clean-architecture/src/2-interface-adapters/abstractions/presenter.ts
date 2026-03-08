export interface Presenter<TViewModel = unknown> {
  getViewModel(): TViewModel;
}
