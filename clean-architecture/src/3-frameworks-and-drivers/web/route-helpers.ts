import { Controller } from "@interface-adapters/abstractions/controller";
import { Presenter } from "@interface-adapters/abstractions/presenter";

/**
 * Pairs a controller with its corresponding presenter.
 * Used to organize route dependencies.
 * @template TController - Type of the controller
 * @template TPresenter - Type of the presenter
 */
export type ControllerPresenterPair<
  TController extends Controller<any> = Controller<any>,
  TPresenter extends Presenter<any> = Presenter<any>,
> = {
  controller: TController;
  presenter: TPresenter;
};

/**
 * Map of route names to their controller/presenter pairs.
 * Used to organize all application routes.
 */
export type RouteControllers = Record<string, ControllerPresenterPair>;
