import { useEffect, useRef } from 'react';
import { ProjectModel } from '@bryntum/gantt';
import {
    BryntumGrid,
    BryntumScheduler,
    BryntumSplitter
} from '@bryntum/gantt-react';

import { gridConfig, schedulerConfig } from '../AppConfig';
import Task from '../lib/Task';
import Drag from '../lib/Drag';
import AppStore from '../lib/AppStore';

function SchedulerView({ project }: { project: ProjectModel }) {
    const schedulerRef = useRef<BryntumScheduler>(null);
    const schedulerInstance = () => schedulerRef.current?.instance;
    const gridRef = useRef<BryntumGrid>(null);
    const gridInstance = () => gridRef.current?.instance;

    useEffect(() => {
        const dragHelper = new Drag({
            constrain    : false,
            outerElement : gridInstance().element
        });

        dragHelper.schedule = schedulerInstance();
        dragHelper.grid = gridInstance();

        return () => {
            dragHelper.destroy();
        };
    }, []);

    return (
        <>
            <BryntumScheduler
                ref={schedulerRef}
                stripeFeature={true}
                timeRangesFeature={true}
                project={project}
                {...schedulerConfig}
            />
            <BryntumSplitter />
            <BryntumGrid
                ref={gridRef}
                store={new AppStore({
                    modelClass : Task,
                    readUrl    : 'http://localhost:3000/unplanned',
                    autoLoad   : true,
                    eventStore : project.eventStore
                })}
                {...gridConfig}
            />
        </>
    );
}

export default SchedulerView;
