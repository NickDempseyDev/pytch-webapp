import React, { useEffect, useState } from "react";
import { DivSettingWindowTitle } from "../DivSettingWindowTitle";
import { EditorAndInfo } from "./EditorAndInfo";
import { StageAndActorsList } from "./StageAndActorsList";
import { EmptyProps } from "../../utils";
import { useStoreActions, useStoreState } from "../../store";
import { Modals } from "./Modals";
import classNames from "classnames";
import { ActivityBar } from "./ActivityBar";
import { useJrEditState } from "./hooks";
import { ActivityContent } from "./ActivityContent";
import { StageWithControls } from "../StageWithControls";
import SessionForm from "./SessionForm";

export const IDEContents: React.FC<EmptyProps> = () => {
  const [hasTokens, setHasTokens] = useState(false);
  const logging = false;
  const projectName = useStoreState(
    (state) => state.activeProject.project.name
  );
  const projectId = useStoreState((state) => state.activeProject.project.id);
  const isFullScreen = useStoreState(
    (state) => state.ideLayout.fullScreenState.isFullScreen
  );
  const activityContentFullStateLabel = useJrEditState(
    (s) => s.activityContentFullStateLabel
  );

  const maybeConnectToLiveReloadServer = useStoreActions(
    (actions) => actions.reloadServer.maybeConnect
  );

  useEffect(() => maybeConnectToLiveReloadServer());

  useEffect(() => {
    console.log(localStorage.getItem("sessionCode"));

    if (localStorage.getItem("sessionCode")) {
      setHasTokens(true);
    }

    localStorage.setItem("isLogging", logging.toString());

  }, []);

  if (!hasTokens) {
    return <SessionForm setHasTokens={setHasTokens} />;
  }

  if (isFullScreen) {
    const divProps = {
      className: `ProjectIDE full-screen`,
      windowTitle: `Pytch: ${projectName}`,
    };

    return (
      <DivSettingWindowTitle {...divProps} data-project-id={projectId}>
        <div className="FullScreenStage">
          <StageWithControls />
        </div>
      </DivSettingWindowTitle>
    );
  } else {
    const classes = classNames(
      "Junior-IDEContents",
      "abs-0000",
      `activity-content-${activityContentFullStateLabel}`
    );

    return (
      <>
        <Modals />
        <DivSettingWindowTitle
          className={classes}
          windowTitle={`Pytch: ${projectName}`}
        >
          <ActivityBar />
          <ActivityContent />
          <EditorAndInfo />
          <StageAndActorsList />
        </DivSettingWindowTitle>
      </>
    );
  }
};
