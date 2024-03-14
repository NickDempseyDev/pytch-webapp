import React, { createRef, useEffect } from "react";
import { useStoreState, useStoreActions } from "../../store";
import classNames from "classnames";

import { Actor, ActorOps, ActorSummaryOps } from "../../model/junior/structured-program/actor";
import {
  useFramesProgram,
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
import { FBFrameT, FrameBasedStructuredProgramOps, createAssignment, createComment, createExpression, createFor, createIf, createWhile, findFrame } from "../../model/frame-based";

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

  const isFrames = useStoreState((state) => state.activeProject.project.program).kind === 'per-method-frames';

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

  const createNewFrame = (frame: FBFrameT) => {
    if (focusedHandler) {
      createFrame({
        newFrame: frame,
        parentId: focusedDropZoneCoords.frameId,
        index: focusedDropZoneCoords.index,
        handlerId: focusedHandler.id,
        actorId: actorId
      });
    }
  }

  useEffect(() => {
    // Purge map entries for handlers not in this instantiation of editor.
    aceControllerMap.deleteExcept(handlerIds);

    // If a new handler has been added, scroll parent DIV to end.
    const scrollDiv = scriptsDivRef.current?.parentElement;
    if (scrollDiv != null && scriptWasJustAdded) {
      scrollDiv.scrollTo({ top: scrollDiv.scrollHeight });
    }
  }, [handlerIds]);

  const framesProgram = useFramesProgram();
  const focusedActor = framesProgram.actors.find((actor) => actor.id === actorId) as Actor
  const focusedHandler = focusedActor.currentlyFocusedDropzone.handlerId ? ActorOps.handlerById(focusedActor, focusedActor.currentlyFocusedDropzone.handlerId) : null
  const isEditing = focusedActor.isEditingText;
  const focusedDropZoneCoords = focusedActor.currentlyFocusedDropzone;

  const moveFrame = useStoreActions((actions) => actions.activeProject.moveFrame)
  const deleteFrame = useStoreActions((actions) => actions.activeProject.deleteFrame)
  const createFrame = useStoreActions((actions) => actions.activeProject.createFrame)
  const editFrame = useStoreActions((actions) => actions.activeProject.editFrame)
  const setFocusedDropDownCoords = useStoreActions((actions) => actions.activeProject.setFocusedDropDownCoords)
  const setIsEditingText = useStoreActions((actions) => actions.activeProject.setIsEditingText)

  const nHandlers = handlerIds.length;

  // The "pb-5" adds padding below; without this, the above scroll
  // didn't scroll quite to the bottom.  I didn't get to the bottom of
  // this, and adding padding was an easy workaround.
  const handleKeyDown = (e: KeyboardEvent, isEditing: boolean) => {
    if (!isEditing) {
      switch (e.key) {
        case "ArrowUp":
          const newCoords = FrameBasedStructuredProgramOps.getNextCoordUp(framesProgram, focusedDropZoneCoords, actorId);
          if (newCoords) {
            setFocusedDropDownCoords({ actorId: actorId, newDropZone: newCoords });
          }
          break;
        case "ArrowDown":
          const newCoordsDown = FrameBasedStructuredProgramOps.getNextCoordDown(framesProgram, focusedDropZoneCoords, actorId);
          if (newCoordsDown) {
            setFocusedDropDownCoords({ actorId: actorId, newDropZone: newCoordsDown });
          }
          break;
        case "i":
          if (focusedHandler) {
            const parentFrame = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrame) {
              const newIf = createIf("", -1, parentFrame?.depth + 1, []);
              createNewFrame(newIf)
            }
          }
          break;
        case "w":
          if (focusedHandler) {
            const parentFrameWhile = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrameWhile) {
              const newWhile = createWhile("", -1, parentFrameWhile?.depth + 1, []);
              createNewFrame(newWhile);
            }
          }
          break;
        case "a":
          if (focusedHandler) {
            const parentFrameAssignment = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrameAssignment) {
              const newAssignment = createAssignment("", "", -1, parentFrameAssignment?.depth + 1);
              createNewFrame(newAssignment);
            }
          }
          break;
        // case "c":
        //   if (focusedHandler) {
        //     const parentFrameClass = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
        //     if (parentFrameClass) {
        //       const newClass = createClassDefinition("", [], -1, parentFrameClass?.depth + 1);
        //       createNewFrame({ frame: newClass, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        //     }
        //   }
        //   break;
        case "/":
          if (focusedHandler) {
            const parentFrameComment = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrameComment) {
              const newComment = createComment("", -1, parentFrameComment?.depth + 1);
              createNewFrame(newComment);
            }
          }
          break;
        case "e":
          if (focusedHandler) {
            const parentFrameExpression = findFrame(focusedHandler?.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrameExpression) {
              const newExpression = createExpression("", -1, parentFrameExpression?.depth + 1);
              createNewFrame(newExpression)
            }
          }
          break;
        case "f":
          if (focusedHandler) {
            const parentFrameFor = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
            if (parentFrameFor) {
              const newFor = createFor("", "", -1, parentFrameFor?.depth + 1, []);
              createNewFrame(newFor);
            }
          }
          break;
        // case "m":
        // 	const parentFrameFunctionCall = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        // 	if (parentFrameFunctionCall) {
        // 		const newFunctionCall = createFunctionCall("", [], -1, parentFrameFunctionCall?.depth + 1);
        // 		createNewFrame({ frame: newFunctionCall, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        // 	}
        // 	break;
        // case "d":
        // 	const parentFrameFunctionDefinition = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        // 	if (parentFrameFunctionDefinition) {
        // 		const newFunctionDefinition = createFunctionDefinition("", [], -1, parentFrameFunctionDefinition?.depth + 1);
        // 		createNewFrame({ frame: newFunctionDefinition, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        // 	}
        // 	break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleKeyDownWrapper = (e: KeyboardEvent) => handleKeyDown(e, isEditing);
    window.addEventListener("keydown", handleKeyDownWrapper);

    return () => {
      window.removeEventListener("keydown", handleKeyDownWrapper);
    }
  }, [focusedDropZoneCoords, isEditing]);

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
      {handlerIds.map((hid, idx) => {
        const h = ActorOps.handlerById(focusedActor, hid);
        return <PytchScriptEditor
          key={hid}
          actorKind={kind}
          actorId={actorId}
          handlerId={hid}
          isFrames={isFrames}
          prevHandlerId={handlerIds[idx - 1]}
          nextHandlerId={handlerIds[idx + 1]}
          baseFrame={h.baseFrame}
          moveFrame={moveFrame}
          editFrame={editFrame}
          deleteFrame={deleteFrame}
          applyFocus={setFocusedDropDownCoords}
          focusedDropZoneCoords={focusedDropZoneCoords}
          setIsEditingText={setIsEditingText}
        />
      })}
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
