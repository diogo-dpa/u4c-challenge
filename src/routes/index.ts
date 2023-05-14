import { UserRoutes } from "./UserRoutes";
import { eventRoutes } from "./EventRoutes";
import { vehicleRoutes } from "./VehicleRoutes";
import { occurenceTypeRoutes } from "./OccurenceTypeRoutes";

export const routes = [].concat(
    new UserRoutes().returnDomainRoutes(), 
    eventRoutes, 
    vehicleRoutes, 
    occurenceTypeRoutes
);
