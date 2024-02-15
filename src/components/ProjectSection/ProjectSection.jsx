import ProjectTeam from "../ProjectTeam/ProjectTeam.jsx"
import ProjectTasks from "../ProjectTasks/ProjectTasks.jsx"
import ProjectPosts from "../ProjectPosts/ProjectPosts.jsx"

export default function ProjectSection({ activeSection, project }){
    if (activeSection == 'team'){
        return (
            <ProjectTeam project={project} />
        )
    } else if (activeSection == 'tasks'){
        return (
            <ProjectTasks project={project} />
        )
    } else if (activeSection == 'posts'){
        return (
            <ProjectPosts project={project} />
        )
    }
}