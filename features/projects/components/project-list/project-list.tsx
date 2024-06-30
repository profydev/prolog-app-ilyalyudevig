import { ProjectCard } from "../project-card";
import { ProjectAlert } from "../project-alert/project-alert";
import { Loader } from "@features/ui";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error } = useGetProjects();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return <ProjectAlert />;
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
