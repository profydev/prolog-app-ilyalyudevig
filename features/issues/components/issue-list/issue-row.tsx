import { useState } from "react";
import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import { Checkbox } from "@features/ui";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

type CheckboxState = "unchecked" | "checked" | "partially-checked";

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  const [checkboxState, setCheckboxState] =
    useState<CheckboxState>("unchecked");

  const handleClick = (state: CheckboxState) => {
    let newState: CheckboxState;
    switch (state) {
      case "unchecked":
        newState = "checked";
        break;
      case "checked":
        newState = "partially-checked";
        break;
      default:
        newState = "unchecked";
    }

    setCheckboxState(newState);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.issueCell}>
        <Checkbox size="small" state={checkboxState} onChange={handleClick} />
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
