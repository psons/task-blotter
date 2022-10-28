

// These are types representing the actual user data
// They may be wrapped in other types ending in CT
// representing the UI Component meta-data needs.
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

export type { TaskT, StoryT, EndeavorT}