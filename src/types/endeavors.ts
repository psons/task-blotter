

interface UserDomainT {
    name: string;               // a name of a "Domain" of effort and Endeavors.
                                // See user documentation.

    sprint_task_count: number;  // the ultimate constraint of tasks in a sprint.
}

// sprint metadata types.

/*
Abbreviations used in identifiers:
sid - Story ID
eid - Endeavor ID
num - number of
 */

enum TaskSprintDispositionT {
    inSprint,
    sprintOverflow,
    taskOverflow,
    storyOverFlow
}

interface TaskSprintT {
    disposition: TaskSprintDispositionT;
}


// metadata for display about how a StoryT contributes tasks to a sprint.
interface StorySprintT {
    sid: string;                    // The ID if the StoryT to which this StorySprintT applies.

    num_tasks_contributed: number;  // the number of TaskT at the top of StoryT.TaskList that
                                    // run time determines are included in the sprint.
                                    // see determineSprintContribution(-)

    sprint_end: boolean;            // Indicates that any task after num_tasks_contributed
                                    // is out of sprint, even if less than story MaxTasks
                                    // i.e. it is beyond UserDomainT.sprint_task_count
}

// metadata for display about how an EndeavorT contributes stories to a sprint.
interface EndeavorSprintT {
    eid: string;                    // The ID of the EndeavorT to which this EndeavorSprintT applies
    story_display: StorySprintT[];  // The list of metadata for stories in this endeavor.
}


// These are types representing the actual user data
// They may be wrapped in other types ending in CT (memonic: Component Type)
// representing the UI Component meta-data needs.

interface StatsT{
    task_count: number;
    endeavor_count: number;
}

interface TaskT  {
    status: string;
    title: string;
    detail: string;
    tid: string;
}

type StoryT = {
    maxTasks: number;
    name: string;
    sid: string;
    taskList: TaskT[];
}

type EndeavorT = {
    _id: string;
    name: string;
    maxStories: number
    eid:  string;
    story_list: StoryT[]
}

export type { TaskSprintDispositionT,
    TaskSprintT, StorySprintT, EndeavorSprintT,
    StatsT, TaskT, StoryT, EndeavorT};