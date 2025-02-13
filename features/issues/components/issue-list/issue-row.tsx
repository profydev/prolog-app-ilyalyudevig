import { useEffect, useState } from "react";
import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import { Checkbox, CheckboxState } from "@features/ui";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
  allChecked: boolean;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({
  projectLanguage,
  issue,
  allChecked,
}: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  const [issueCheckboxState, setIssueCheckboxState] = useState(
    "unchecked" as CheckboxState,
  );

  useEffect(() => {
    setIssueCheckboxState(allChecked ? "checked" : "unchecked");
  }, [allChecked]);

  const handleIssueCheckboxChange = (newState: CheckboxState) => {
    setIssueCheckboxState(newState);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.issueCell}>
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
        <div>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </td>
      <td className={styles.cell}>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </td>
      <td className={styles.cell}>{numEvents}</td>
      <td className={styles.cell}>{numUsers}</td>
    </tr>
  );
}
