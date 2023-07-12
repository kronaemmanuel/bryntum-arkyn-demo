import { useEffect, useRef } from 'react';
import { BryntumGantt, BryntumResourceHistogram, BryntumSplitter } from '@bryntum/gantt-react';
import { ganttConfig, histogramConfig } from '../AppConfig';
import { ProjectModel } from '@bryntum/gantt';

function GanttView({ project }: {project: ProjectModel}) {
    const ganttRef = useRef<BryntumGantt>(null);
    const ganttInstance = () => ganttRef.current?.instance;
    const histogramRef = useRef<BryntumResourceHistogram>(null);
    const histogramInstance = () => histogramRef.current?.instance;

    useEffect(() => {
        histogramInstance().addPartner(ganttInstance());
    }, []);

    // Toolbar checkboxes click handler
    const onToolbarAction = (source: any) => {
        const action = source.dataset.action;
        // @ts-ignore
        histogramInstance()[action] = source.checked;
    };

    return (
        <>
            <BryntumGantt ref={ganttRef} project={project} {...ganttConfig} />
            <BryntumSplitter/>
            <BryntumResourceHistogram ref={histogramRef} extraData={{ onToolbarAction }} project={project} {...histogramConfig} />
        </>
    );
}

export default GanttView;
