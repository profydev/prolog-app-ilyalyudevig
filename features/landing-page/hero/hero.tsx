import styles from "./hero.module.scss";
import { Loader } from "@features/ui";
import { Alert, AlertButton, AlertImage, AlertMessage } from "@features/ui";

import { useGetLanding } from "../api/use-get-landing";

export const Hero = () => {
  const { data, isLoading, isError, error, refetch } = useGetLanding();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error(error);
    return (
      <Alert>
        <AlertImage src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the landing page data
        </AlertMessage>
        <AlertButton onClick={refetch}>Try again</AlertButton>
      </Alert>
    );
  }

  interface HeroSectionData {
    sectionType: string;
    title: string;
    subtitle: string;
    image: {
      src: string;
    };
  }

  interface LandingData {
    sections: HeroSectionData[];
  }

  const heroSectionData: HeroSectionData = (
    data as LandingData
  ).sections.filter((section) => section.sectionType === "hero")[0];

  const { title, subtitle, image } = heroSectionData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.image} src={image.src} alt="Laptop image" />
    </div>
  );
};
