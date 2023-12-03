import React, { useEffect } from "react";
import { DivSettingWindowTitle } from "../DivSettingWindowTitle";
import { EditorAndInfo } from "./EditorAndInfo";
import { StageAndActorsList } from "./StageAndActorsList";
import { EmptyProps } from "../../utils";
import { useStoreActions, useStoreState } from "../../store";
import { Modals } from "./Modals";
import { MaybeContent } from "./lesson/MaybeContent";
import classNames from "classnames";
import { useHasLinkedLesson } from "./lesson/hooks";

export const IDEContents: React.FC<EmptyProps> = () => {
  const projectName = useStoreState(
    (state) => state.activeProject.project.name
  );
  const hasLinkedLesson = useHasLinkedLesson();

  const maybeConnectToLiveReloadServer = useStoreActions(
    (actions) => actions.reloadServer.maybeConnect
  );

  useEffect(() => maybeConnectToLiveReloadServer());

  const classes = classNames("Junior-IDEContents", "abs-0000", {
    hasLinkedLesson,
  });

  return (
    <>
      <Modals />
      <DivSettingWindowTitle
        className={classes}
        windowTitle={`Pytch: ${projectName}`}
      >
        <MaybeContent />
        <EditorAndInfo />
        <StageAndActorsList />
      </DivSettingWindowTitle>
    </>
  );
};
