import React from "react";
import classNames from "classnames";
import {
  AssetMetaDataOps,
  ActorKind,
  StructuredProgramOps,
  Uuid,
} from "../../model/junior/structured-program";
import { useStoreActions, useStoreState } from "../../store";
import { AssetImageThumbnail } from "../AssetImageThumbnail";
import { AddSomethingSingleButton } from "./AddSomethingButton";
import {
  useJrEditActions,
  useJrEditState,
  useMappedProgram,
  useStructuredProgram,
} from "./hooks";
import { Dropdown, DropdownButton } from "react-bootstrap";

type ActorThumbnailProps = { id: Uuid };
const ActorThumbnail: React.FC<ActorThumbnailProps> = ({ id }) => {
  const maybeFirstImage = useStoreState((state) =>
    AssetMetaDataOps.firstMatching(
      state.activeProject.project.assets,
      id,
      "image"
    )
  );

  const wrap = (content: JSX.Element) => (
    <div className="thumbnail">{content}</div>
  );

  if (maybeFirstImage == null) {
    return wrap(<div className="asset-preview">[No costumes]</div>);
  }

  if (maybeFirstImage.presentation.kind !== "image") {
    throw new Error(
      "expecting an image but presentation is of kind " +
        `"${maybeFirstImage.presentation.kind}"`
    );
  }

  return wrap(
    <AssetImageThumbnail
      image={maybeFirstImage.presentation.image}
      maxSize={60}
    />
  );
};

type RenameSpriteDropdownItemProps = {
  isAllowed: boolean;
  actorId: Uuid;
  previousName: string;
};
const RenameSpriteDropdownItem: React.FC<RenameSpriteDropdownItemProps> = ({
  isAllowed,
  actorId,
  previousName,
}) => {
  const launch = useJrEditActions((a) => a.upsertSpriteInteraction.launch);
  const existingNames = useMappedProgram(
    "RenameSpriteDropdownItem",
    (program) => StructuredProgramOps.spriteNames(program)
  );
  const doRename = () =>
    launch({
      upsertionAction: { kind: "update", actorId, previousName },
      existingNames,
    });

  return (
    <Dropdown.Item onClick={doRename} disabled={!isAllowed}>
      Rename
    </Dropdown.Item>
  );
};

type ActorCardDropdownProps = {
  kind: ActorKind;
  name: string;
  id: Uuid;
};
const ActorCardDropdown: React.FC<ActorCardDropdownProps> = ({
  kind,
  name,
  id,
}) => {
  const deleteActorThunk = useStoreActions(
    (actions) => actions.userConfirmations.launchDeleteJuniorSprite
  );

  // You can only delete sprites, not the stage.
  const isAllowed = kind === "sprite";

  // TODO: Add undo functionality for "delete sprite" action.
  const doDelete: React.MouseEventHandler = () => {
    if (!isAllowed) {
      console.warn("ActorCardDropdown.doDelete(): should not be running");
      return;
    }

    deleteActorThunk({ spriteDisplayName: name, actorId: id });
  };

  return (
    <DropdownButton align="end" title="⋮">
      <RenameSpriteDropdownItem
        actorId={id}
        isAllowed={kind === "sprite"}
        previousName={name}
      />
      <Dropdown.Item
        className="danger"
        onClick={doDelete}
        disabled={!isAllowed}
      >
        DELETE
      </Dropdown.Item>
    </DropdownButton>
  );
};

type ActorCardProps = {
  isFocused: boolean;
  kind: ActorKind;
  id: Uuid;
  name: string;
};
const ActorCard: React.FC<ActorCardProps> = ({ isFocused, kind, id, name }) => {
  const setFocusedActorAction = useJrEditActions((a) => a.setFocusedActor);
  const setFocusedActor = () => setFocusedActorAction(id);

  const className = classNames("ActorCard", `kind-${kind}`, { isFocused });
  return (
    <div className={className} onClick={setFocusedActor}>
      <div className="ActorCardContent">
        <ActorThumbnail id={id} />
        <div className="label">{name}</div>
      </div>
      <ActorCardDropdown kind={kind} name={name} id={id} />
    </div>
  );
};

export const ActorsList = () => {
  const program = useStructuredProgram();
  const focusedActor = useJrEditState((s) => s.focusedActor);

  const launchAddSpriteModalAction = useJrEditActions(
    (a) => a.upsertSpriteInteraction.launch
  );
  const existingNames = StructuredProgramOps.spriteNames(program);

  const launchAddSpriteModal = () => {
    launchAddSpriteModalAction({
      upsertionAction: { kind: "insert" },
      existingNames,
    });
  };

  return (
    <div className="Junior-ActorsList-container">
      <div className="abs-0000-oflow">
        <div className="ActorsList">
          {program.actors.map((a) => {
            const isFocused = a.id === focusedActor;
            return (
              <ActorCard
                key={a.id}
                isFocused={isFocused}
                kind={a.kind}
                id={a.id}
                name={a.name}
              />
            );
          })}
        </div>
        <AddSomethingSingleButton onClick={() => launchAddSpriteModal()} />
      </div>
    </div>
  );
};
