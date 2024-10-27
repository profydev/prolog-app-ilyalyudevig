import { Issue } from "@api/issues.types";
import { ProjectLanguage } from "@api/projects.types";
import styles from "./issue-card.module.scss";
import { Checkbox, CheckboxState } from "@features/ui";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { useState } from "react";
import { capitalize } from "lodash";
type IssueCardProps = {
  issue: Issue;
  projectLanguage: ProjectLanguage;
};
export function IssueCard({ issue, projectLanguage }: IssueCardProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  const statusColor = {
    error: BadgeColor.error,
    warning: BadgeColor.warning,
    info: BadgeColor.success,
  };

  const [issueCheckboxState, setIssueCheckboxState] = useState(
    "unchecked" as CheckboxState,
  );

  const handleIssueCheckboxChange = (newState: CheckboxState) => {
    setIssueCheckboxState(newState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.issueDetails}>
        <Checkbox
          size="small"
          state={issueCheckboxState}
          onChange={handleIssueCheckboxChange}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div className={styles.errorDetails}>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div className={styles.firstLineOfStackTrace}>
            {firstLineOfStackTrace}
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statsBox}>
          <p className={styles.statsTitle}>Status</p>
          <Badge color={statusColor[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </div>
        <div className={styles.statsBox}>
          <p className={styles.statsTitle}>Events</p>
          {numEvents}
        </div>
        <div className={styles.statsBox}>
          <p className={styles.statsTitle}>Users</p>
          {numUsers}
        </div>
      </div>
    </div>
  );
}
