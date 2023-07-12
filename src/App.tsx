import { Fragment, useState } from 'react';
import { BryntumButtonGroup, BryntumDemoHeader } from '@bryntum/gantt-react';
import { ProjectModel } from '@bryntum/gantt';

import GanttView from './components/GanttView';
import SchedulerView from './components/SchedulerView';
import './App.scss';

// This ProjectModel is used in Gantt, Histogram, and Scheduler so the changes
// between them are always in sync. We have initialized it outside any React
// component so we don't reinitialize it on every render
export const project = new ProjectModel({
    autoLoad  : true,
    transport : {
        load : {
            url : 'http://localhost:3000/schedule'
        }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
});

const views = [
    {
        id   : 'gantt-container',
        text : 'Gantt View',
        view : (project: ProjectModel) => <GanttView project={project} />
    },
    {
        id   : 'scheduler-container',
        text : 'Scheduler View',
        view : (project: ProjectModel) => <SchedulerView project={project} />
    }
];

function App() {
    const [currentView, setCurrentView] = useState(views[0].id);

    return (
        <Fragment>
            <BryntumDemoHeader
                children={
                    <BryntumButtonGroup
                        toggleGroup
                        cls="b-raised"
                        color="b-orange"
                        items={views.map((view) => ({
                            text    : view.text,
                            pressed : view.id === currentView,
                            onClick : () => setCurrentView(view.id)
                        }))}
                    />
                }
            />
            {views.map(view => (
                <div key={view.id} id={view.id} style={{ display : currentView === view.id ? 'flex' : 'none' }}>
                    {view.view(project)}
                </div>
            ))}
        </Fragment>
    );
}

export default App;
