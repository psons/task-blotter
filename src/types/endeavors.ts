
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