import {TABLE_EVENTS} from './TableView';


class EventRouter {
    constructor(ee) {
        this.ee = ee;
    }

    /**
     *
     * @param {DetailsView} details
     */
    setDetailsView(details) {
        this.details = details;
    }

    /**
     *
     * @param {FormView} form
     */
    setFormView(form) {
        this.form = form;
    }

    /**
     *
     * @param {ButtonView} buttonView
     */
    setButtonView(buttonView) {
        this.buttonView = buttonView;
    }

    /**
     *
     * @param {TableView} table
     */
    setTableView(table) {
        this.table = table;
    }

    start() {
        this.ee.on(TABLE_EVENTS.ON_ROW_SELECTION_CHANGE, (user) => {
            this.details.data = user;
            this.details.render('#detailsView', user);
        });
    }
}

export default EventRouter;
