import {TABLE_EVENTS} from './TableView';


class EventRouter {
    constructor(ee) {
        this.ee = ee;
    }
    /**
     *
     * @param {DetailsView} details
     */
    route(details) {
        this.ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            details.data = user;
            details.render('#detailsView', user);
        });
    }
}

export default EventRouter;
