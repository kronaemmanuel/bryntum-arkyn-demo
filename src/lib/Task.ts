/**
 * Custom Task model
 *
 * Taken from the vanilla dragfromgrid example
 */

import { TaskModel } from '@bryntum/gantt';

export default class Task extends TaskModel {

    static $name = 'Task';

    static defaults = {
        // In this demo, default duration for tasks will be days
        durationUnit : 'day',

        // Use a default name, for better look in the grid if unassigning a new event
        name : 'New event',

        // Use a default icon also
        iconCls : 'b-fa b-fa-asterisk'
    };
}
