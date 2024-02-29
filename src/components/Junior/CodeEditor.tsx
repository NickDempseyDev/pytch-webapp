import React, { createRef, useEffect } from "react";
import { useStoreState, useStoreActions } from "../../store";
import classNames from "classnames";

import { ActorSummaryOps } from "../../model/junior/structured-program/actor";
import {
  useHelpHatBlockDrop,
  useJrEditActions,
  useJrEditState,
  useMappedProgram,
} from "./hooks";
import { StructuredProgramOps } from "../../model/junior/structured-program";
import { NoContentHelp } from "./NoContentHelp";
import { PytchScriptEditor } from "./PytchScriptEditor";

import { AddSomethingSingleButton } from "./AddSomethingButton";
import { EmptyProps, PYTCH_CYPRESS } from "../../utils";
import { aceControllerMap } from "../../skulpt-connection/code-editor";
import { useNotableChanges } from "../hooks/notable-changes";

const AddHandlerButton: React.FC<EmptyProps> = () => {
  const focusedActorId = useJrEditState((s) => s.focusedActor);
  const launchUpsertAction = useJrEditActions(
    (a) => a.upsertHatBlockInteraction.launch
  );
  const codingDragInProgress = useJrEditState((s) => s.scriptDragInProgress);

  const launchAdd = () => {
    launchUpsertAction({ actorId: focusedActorId, action: { kind: "insert" } });
  };

  const classes = classNames({ codingDragInProgress });
  return (
    <AddSomethingSingleButton
      className={classes}
      what="script"
      label="Add script"
      onClick={launchAdd}
    />
  );
};

const ScriptsEditor = () => {
  // For side-effects only, returning void, so Cypress has access to
  // current state and actions:
  useStoreState((state) => {
    PYTCH_CYPRESS().currentProgram = state.activeProject.project.program;
  });
  useStoreActions((actions) => {
    PYTCH_CYPRESS().currentProgramActions = actions.activeProject;
  });

  const scriptsDivRef = createRef<HTMLDivElement>();

  const actorId = useJrEditState((s) => s.focusedActor);

  const { kind, handlerIds } = useMappedProgram(
    "<ScriptsEditor>",
    (program) => StructuredProgramOps.uniqueActorSummaryById(program, actorId),
    ActorSummaryOps.eq
  );

  const scriptAddedEvents = useNotableChanges(
    "script-upserted",
    (change) => change.upsertKind === "insert"
  );
  const scriptWasJustAdded = scriptAddedEvents.length > 0;

  useEffect(() => {
    // Purge map entries for handlers not in this instantiation of editor.
    aceControllerMap.deleteExcept(handlerIds);

    // If a new handler has been added, scroll parent DIV to end.
    const scrollDiv = scriptsDivRef.current?.parentElement;
    if (scrollDiv != null && scriptWasJustAdded) {
      scrollDiv.scrollTo({ top: scrollDiv.scrollHeight });
    }
  }, [handlerIds]);

  const nHandlers = handlerIds.length;

  // The "pb-5" adds padding below; without this, the above scroll
  // didn't scroll quite to the bottom.  I didn't get to the bottom of
  // this, and adding padding was an easy workaround.
  const wrap = (content: JSX.Element) => (
    <>
      <div ref={scriptsDivRef} className="pb-5 Junior-ScriptsEditor">
        {content}
      </div>
      <AddHandlerButton />
    </>
  );

  if (nHandlers === 0) {
    return wrap(<NoContentHelp actorKind={kind} contentKind="scripts" />);
  }

  // TODO: Get a list of which handlers have raised errors.  Give them a
  // red (#c66 is OK for a start) background panel.  0.5rem of padding
  // and of margin, then make the padding #c66 when that script's ID is
  // in the list.

  // For computing prevHandlerId and nextHandlerId, indexing into
  // handlerIds either with -1 or with nHandlers gives undefined, which
  // is a bit messy, but works for null.
  return wrap(
    <>
      {handlerIds.map((hid, idx) => (
        <PytchScriptEditor
          key={hid}
          actorKind={kind}
          actorId={actorId}
          handlerId={hid}
          prevHandlerId={handlerIds[idx - 1]}
          nextHandlerId={handlerIds[idx + 1]}
        />
      ))}
    </>
  );
};

export const CodeEditor = () => {
  const actorId = useJrEditState((s) => s.focusedActor);
  const [dropProps, dropRef] = useHelpHatBlockDrop(actorId);

  // Normally we'd let the <Tabs> component worry about whether a
  // particular <Tab> is shown or hidden.  But we want the
  // aceControllerMap to accurately represent whether a particular
  // editor is visible (as opposed to rendered but not displayed), so we
  // manually check whether the CodeEditor should be visible to keep
  // aceControllerMap accurate.  And at that point we may as well bail
  // out and save some work if the Code tab is not active.
  const activeTab = useJrEditState((s) => s.actorPropertiesActiveTab);
  if (activeTab !== "code") {
    aceControllerMap.clear();
    return null;
  }

  const classes = classNames("Junior-CodeEditor", "abs-0000-oflow", dropProps);

  return (
    <div ref={dropRef} className={classes}>
      <ScriptsEditor />
    </div>
  );
};
