import { DateHelper, DragHelper, DomHelper, Toast, Tooltip, Grid, Scheduler, ResourceModel, Store } from '@bryntum/gantt';
import Task from './Task';

interface Event {
    source: DragHelper
    context: {
        element: HTMLElement
        target: HTMLElement
        grabbed: HTMLElement
        relatedElements: HTMLElement[]
        valid: Boolean
        task: Task
        resource: ResourceModel
    }
    event: MouseEvent
}

export default class Drag extends DragHelper {
    tip: Tooltip;
    grid: Grid;
    schedule: Scheduler;

    static get configurable() {
        return {
            callOnFunctions      : true,
            // Don't drag the actual row element, clone it
            cloneTarget          : true,
            // We size the cloned element manually
            autoSizeClonedTarget : false,
            // Only allow drops on the schedule area
            dropTargetSelector   : '.b-timeline-subgrid',
            // Only allow drag of row elements inside on the unplanned grid
            targetSelector       : '.b-grid-row:not(.b-group-row)'
        };
    }

    createProxy(element: HTMLElement) {
        const schedule = this.schedule;
        const grid = this.grid;
        const proxy = document.createElement('div'),
            task = grid.getRecordFromElement(element) as Task,
            durationInPx = schedule.timeAxisViewModel.getDistanceForDuration(
                task.durationMS
            );

        // Fake an event bar
        proxy.classList.add(
            'b-sch-event-wrap',
            'b-sch-event',
            'b-unassigned-class',
            `b-sch-${schedule.mode}`
        );
        proxy.innerHTML = `<div class="b-sch-event b-has-content b-sch-event-withicon">
                <div class="b-sch-event-content">
                    <i class="${task.iconCls}"></i> ${task.name}
                </div>
            </div>`;

        if (schedule.mode === 'horizontal') {
            proxy.style.height = `${
                schedule.rowHeight - 2 * schedule.resourceMargin
            }px`;
            proxy.style.width = `${durationInPx}px`;
        }
        else {
            proxy.style.height = `${durationInPx}px`;
            proxy.style.width = `${schedule.resourceColumnWidth}px`;
        }

        return proxy;
    }

    onDragStart = function(this: Drag, { context }: Event) {
        const schedule = this.schedule;
        const grid = this.grid;
        const { eventTooltip, eventDrag } = schedule.features;

        // save a reference to the task so we can access it later
        context.task = grid.getRecordFromElement(context.grabbed) as Task;

        // Prevent tooltips from showing while dragging
        eventTooltip.disabled = true;

        schedule.enableScrollingCloseToEdges(schedule.timeAxisSubGrid);

        if (eventDrag.showTooltip && !this.tip) {
            this.tip = new Tooltip({
                align      : 'b-t',
                forElement : context.element,
                cls        : 'b-popup b-sch-event-tooltip'
            });
        }
    };

    onDrag = function(this: Drag, { event, context }: Event) {
        const schedule = this.schedule;
        const { task } = context,
            coordinate = DomHelper[`getTranslate${schedule.mode === 'horizontal' ? 'X' : 'Y'}`](
                context.element
            ),
            startDate = schedule.getDateFromCoordinate(coordinate, 'round', false),
            endDate = startDate && DateHelper.add(startDate, task.duration, task.durationUnit),
            // Coordinates required when used in vertical mode, since it does not use actual columns
            resource     = context.target && schedule.resolveResourceRecord(context.target, [event.offsetX, event.offsetY]);

        // Don't allow drops anywhere, only allow drops if the drop is on the timeaxis and on top of a Resource
        context.valid = Boolean(startDate && resource) &&
            (schedule.allowOverlap || schedule.isDateRangeAvailable(startDate, endDate, null, resource));

        // Save reference to resource so we can use it in onTaskDrop
        context.resource = resource as ResourceModel;

        if (this.tip && context.valid) {
            const
                dateFormat = schedule.displayDateFormat,
                formattedStartDate = DateHelper.format(startDate, dateFormat),
                formattedEndDate = DateHelper.format(endDate, dateFormat);

            this.tip.html = `
                <div class="b-sch-event-title">${task.name}</div>
                <div class="b-sch-tooltip-startdate">Starts: ${formattedStartDate}</div>
                <div class="b-sch-tooltip-enddate">Ends: ${formattedEndDate}</div>
            `;
            this.tip.showBy(context.element);
        }
        else if (this.tip) {
            this.tip.hide();
        }
    };

    // Drop callback after a mouse up, take action and transfer the unplanned task to the real EventStore (if it's valid)
    onDrop = function(this: Drag, { context, event }: Event) {
        const schedule = this.schedule;
        const grid = this.grid;
        const
            { task, target, resource, valid, element } = context;

        if (this.tip) {
            this.tip.hide();
        }

        schedule.disableScrollingCloseToEdges(schedule.timeAxisSubGrid);

        // If drop was done in a valid location, set the startDate and transfer the task to the Scheduler event store
        if (valid && target) {
            const
                coordinate        = DomHelper[`getTranslate${schedule.mode === 'horizontal' ? 'X' : 'Y'}`](element),
                date              = schedule.getDateFromCoordinate(coordinate, 'round', false),
                // Try resolving event record from target element, to determine if drop was on another event
                targetEventRecord = schedule.resolveEventRecord(target);

            if (date) {
                // Remove from grid first so that the data change
                // below does not fire events into the grid.
                (grid.store as Store).remove(task);

                task.startDate = date;
                task.setConstraint('startnoearlierthan', date);

                schedule.project.eventStore.add(task);
                task.assign(resource);
            }

            // Dropped on a scheduled event, display toast
            if (targetEventRecord) {
                Toast.show(`Dropped on ${targetEventRecord.name}`);
            }
        }

        if (resource) {
            resource.cls = '';
        }

        schedule.features.eventTooltip.disabled = false;
    };

    onDragAbort() {
        if (this.tip) {
            this.tip.hide();
        }
    }
}
