import { Controller } from "@interface-adapters/abstractions/controller";
import { Presenter } from "@interface-adapters/abstractions/presenter";

export type ControllerPresenterPair<
  TController extends Controller<any> = Controller<any>,
  TPresenter extends Presenter<any> = Presenter<any>,
> = {
  controller: TController;
  presenter: TPresenter;
};

export type RouteControllers = Record<string, ControllerPresenterPair>;
