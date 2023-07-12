/**
 * Application configuration
 */
import { AvatarRendering, ResourceModel } from '@bryntum/gantt';
import { BryntumGanttProps,  BryntumGridProps, BryntumSchedulerProps } from '@bryntum/gantt-react';

const ganttConfig: BryntumGanttProps = {
    dependencyIdField       : 'sequenceNumber',
    resourceImageFolderPath : 'users/',
    startDate               : '2019-01-11',
    endDate                 : '2019-03-24',
    viewPreset              : 'weekAndDayLetter',
    columnLines             : true,
    labelsFeature           : {
        left : {
            field  : 'name',
            editor : {
                type : 'textfield'
            }
        }
    },
    columns : [
        { type : 'name', width : 280 },
        { type : 'resourceassignment', showAvatars : true, width : 170 }
    ]
};

const avatarRendering = new AvatarRendering();

const gridConfig: BryntumGridProps = {
    width         : 270,
    stripeFeature : true,
    sortFeature   : 'name',
    columns       : [
        {
            text       : 'Unassigned tasks',
            flex       : 1,
            field      : 'name',
            htmlEncode : false
        },
        {
            text   : 'Duration',
            width  : 100,
            align  : 'right',
            editor : false,
            field  : 'duration'
        }
    ],
    rowHeight : 50
};

// Toolbar
const onAction = ({ source }: {source: any}) => {
    source.up('resourcehistogram').extraData.onToolbarAction(source);
};

const toolbarConfig = {
    cls   : 'histogram-toolbar',
    items : [
        {
            type    : 'checkbox',
            dataset : { action : 'showBarText' },
            text    : 'Show bar texts',
            tooltip : 'Check to show resource allocation in the bars',
            checked : false,
            onAction
        },
        {
            type    : 'checkbox',
            dataset : { action : 'showMaxEffort' },
            text    : 'Show max allocation',
            tooltip : 'Check to display max resource allocation line',
            checked : true,
            onAction
        },
        {
            type    : 'checkbox',
            dataset : { action : 'showBarTip' },
            text    : 'Enable bar tooltip',
            tooltip : 'Check to show tooltips when moving mouse over bars',
            checked : true,
            onAction
        }
    ]
};

const histogramConfig = {
    resourceImagePath      : 'users/',
    startDate              : '2019-01-11',
    endDate                : '2019-03-24',
    viewPreset             : 'weekAndDayLetter',
    hideHeaders            : true,
    rowHeight              : 50,
    showBarTip             : true,
    scheduleTooltipFeature : false,
    tbar                   : toolbarConfig,
    columns                : [
        { type : 'resourceInfo', field : 'name', showEventCount : false, width : 410 }
    ]
};

const schedulerConfig: BryntumSchedulerProps = {
    rowHeight         : 50,
    barMargin         : 4,
    eventColor        : 'indigo',
    resourceImagePath : 'users/',

    columns : [
        {
            type           : 'resourceInfo',
            text           : 'Name',
            width          : 200,
            showEventCount : false,
            showRole       : true
        },
        {
            text     : 'Nbr tasks',
            editor   : false,
            renderer : (data: any) => `${data.record.events.length || ''}`,
            align    : 'center',
            sortable : (a: ResourceModel, b: ResourceModel) => (a.events.length < b.events.length ? -1 : 1),
            width    : 100
        }
    ],

    viewPreset : {
        base : 'weekAndDayLetter'
    },

    startDate : '2019-01-14',
    endDate   : '2019-03-20'
};

export { ganttConfig, gridConfig, histogramConfig, schedulerConfig };
