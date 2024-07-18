import { ProjectCard } from "../project-card";
import { Alert, AlertButton, AlertImage, AlertMessage } from "@features/ui";
import { Loader } from "@features/ui";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return (
      <Alert>
        <AlertImage src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the projects data
        </AlertMessage>
        <AlertButton onClick={refetch}>Try again</AlertButton>
      </Alert>
    );
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
