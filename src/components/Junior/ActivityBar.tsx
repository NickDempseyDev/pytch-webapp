import React from "react";
import {
  ActivityContentState,
  ActivityBarTabKey,
} from "../../model/junior/edit-state";
import { useJrEditActions, useJrEditState } from "./hooks";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-common-types";
import { useHasLinkedLesson } from "./lesson/hooks";
import { EmptyProps } from "../../utils";
import { useStoreState } from "../../store";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import FramesHelp from "./FramesHelp";

type TabKeyUiDetails = { icon: IconName; tooltip: string };

const uiDetailsFromTabKeyLut = new Map<ActivityBarTabKey, TabKeyUiDetails>([
  ["helpsidebar", { icon: "question-circle", tooltip: "Scratch/Python help" }],
  ["lesson", { icon: "book", tooltip: "Lesson content" }],
]);

function uiDetailsFromTabKey(tab: ActivityBarTabKey): TabKeyUiDetails {
  const mDetails = uiDetailsFromTabKeyLut.get(tab);
  if (mDetails == null) {
    throw new Error(`unrecognised tab-key name "${tab}"`);
  }
  return mDetails;
}

const tabIsActive = (tab: ActivityBarTabKey, barState: ActivityContentState) =>
  barState.kind === "expanded" && barState.tab === tab;

type ActivityBarTabProps = { tab: ActivityBarTabKey; isActive: boolean };
const ActivityBarTab: React.FC<ActivityBarTabProps> = ({ tab, isActive }) => {
  const collapseAction = useJrEditActions((a) => a.collapseActivityContent);
  const expandAction = useJrEditActions((a) => a.expandActivityContent);

  const onClick = isActive ? () => collapseAction() : () => expandAction(tab);
  const uiDetails = uiDetailsFromTabKey(tab);
  const classes = classNames("ActivityBarTab", { isActive });

  return (
    <div className={classes} onClick={onClick}>
      <div className="tabkey-icon">
        <FontAwesomeIcon icon={uiDetails.icon} />
      </div>
      <div className="tabkey-tooltip">{uiDetails.tooltip}</div>
    </div>
  );
};

export const ActivityBar: React.FC<EmptyProps> = () => {
  const activityContentState = useJrEditState((s) => s.activityContentState);
  const pendingActionsExist = useStoreState(
    (s) => s.activeProject.pendingSyncActionsExist
  );

  const program = useStoreState((s) => s.activeProject.project.program);

  // TODO: Should the computation of the list of valid activity-tab-keys
  // be part of the model?
  const hasLinkedLesson = useHasLinkedLesson();
  let tabs: Array<ActivityBarTabKey> = hasLinkedLesson
    ? ["helpsidebar", "lesson"]
    : ["helpsidebar"];

  if (program.kind === "per-method-frames" && hasLinkedLesson) {
    tabs = ["lesson"];
  }

  const [showFramesHelp, setShowFramesHelp] = React.useState(false);

  const syncClasses = classNames("sync-indicator", { pendingActionsExist });
  return (
    <div className="ActivityBar">
      {showFramesHelp && <FramesHelp isActive={showFramesHelp} setIsActive={setShowFramesHelp} />}
      <div className="activity-bar-tabs">
        {tabs.map((tab) => (
          <ActivityBarTab
            key={tab}
            tab={tab}
            isActive={tabIsActive(tab, activityContentState)}
          />
        ))}
        {program.kind === 'per-method-frames' && <div className={classNames("ActivityBarTab", true)}>
          <div className="tabkey-icon" onClick={() => setShowFramesHelp(true)}>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
          <div className="tabkey-tooltip">Frames help</div>
        </div>}
      </div>
      <div className={syncClasses}>
        <FontAwesomeIcon icon="arrows-rotate" />
      </div>
    </div>
  );
};
