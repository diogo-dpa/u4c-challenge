import { UserRoutes } from "./UserRoutes";
import { EventRoutes } from "./EventRoutes";
import { VehicleRoutes } from "./VehicleRoutes";
import { OccurenceType } from "./OccurenceTypeRoutes";

export const routes = [].concat(
	new UserRoutes().returnDomainRoutes(),
	new EventRoutes().returnDomainRoutes(),
	new VehicleRoutes().returnDomainRoutes(),
	new OccurenceType().returnDomainRoutes()
);
