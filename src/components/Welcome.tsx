import React, { useEffect } from "react";
import NavBanner from "./NavBanner";
import Button from "react-bootstrap/Button";
import TutorialMiniCard from "./TutorialMiniCard";
import { EmptyProps } from "../utils";
import { withinSite, urlWithinApp } from "../env-utils";
import { Link } from "./LinkWithinApp";

const Welcome: React.FC<EmptyProps> = () => {
  // TODO: Replace the hard-coded list of tutorial mini-cards with something
  // driven by the pytch-tutorials repo.

  useEffect(() => {
    document.title = "Pytch";
  });

  const scratchLogoUrl = urlWithinApp("/assets/scratch-logo.png");
  const pythonLogoUrl = urlWithinApp("/assets/python-logo.png");

  return (
    // The style on the Python logo <img> is to make it the same width
    // as the Scratch logo, otherwise the text block is off-centre.
    <>
      <NavBanner />
      <div className="welcome-text">
        <div className="bridge-text-wrapper">
          <div className="bridge-text">
            <img src={scratchLogoUrl} alt="Scratch logo" />
            <div>
              <p>
                Pytch is a bridge from Scratch to Python. It helps people to
                learn Python by building on skills they have developed in
                Scratch.
              </p>
              <p>Questions or comments? Email us!</p>
              <p className="contact-email">
                <a href="mailto:info@pytch.org">
                  <code>info@pytch.org</code>
                </a>
              </p>
            </div>
            <img
              src={pythonLogoUrl}
              style={{ paddingRight: "64px" }}
              alt="Python snake"
            />
          </div>
        </div>

        <h2>Featured projects</h2>

        <div className="demo-cards">
          <TutorialMiniCard
            title="Catch a star"
            slug="chase"
            screenshotBasename="screenshot.png"
          >
            <p>
              In this introduction to coding in Pytch, you control a bird using
              the keyboard, and your job is to catch the star.
            </p>
          </TutorialMiniCard>

          <TutorialMiniCard
            title="Boing"
            slug="boing"
            screenshotBasename="summary-screenshot.png"
          >
            <p>
              In the game <i>Pong</i> from 1972, players hit a ball back and
              forth. Our <i>Boing</i> game, adapted from one in{" "}
              <a href="https://wireframe.raspberrypi.org/books/code-the-classics1">
                Code the Classics
              </a>
              , lets you play against the computer.
            </p>
          </TutorialMiniCard>

          <TutorialMiniCard
            title="Q*bert"
            slug="qbert"
            screenshotBasename="screenshot.png"
          >
            <p>
              Jump around a pyramid of blocks, trying to change the whole stack
              yellow without falling off! Our version is adapted from one in{" "}
              <a href="https://wireframe.raspberrypi.org/issues/42">
                Wireframe magazine
              </a>
              , inspired by the 1982 arcade classic.
            </p>
          </TutorialMiniCard>
        </div>

        <h2>Using Pytch</h2>

        <div className="way-of-using-pytch">
          <p className="button-wrapper">
            <Link to="/tutorials/">
              <Button variant="outline-primary">Tutorials</Button>
            </Link>
          </p>
          <p>
            If you’d like to learn how to make the games in{" "}
            <i>Featured projects</i> above, each one has its own tutorial,
            taking you step by step through the process of writing the code.
          </p>
        </div>

        <div className="way-of-using-pytch">
          <p className="button-wrapper">
            <Link to="/my-projects/">
              <Button variant="outline-primary">My projects</Button>
            </Link>
          </p>
          <p>
            If you’re already using Pytch on this device, you can continue
            working on one of your projects. Or, if you have a Pytch zipfile,
            you can upload it to continue working on your project.
          </p>
        </div>

        <h2>About Pytch</h2>

        <p>
          Pytch is part of a research project at Trinity College Dublin, aiming
          to smooth a learner’s journey from Scratch to Python.
        </p>

        <p>
          MIT’s Scratch is very widely used to introduce young people to the
          ideas of programming. The learner writes code for <i>sprites</i> by
          visually clicking together blocks like <i>go forward 10 steps</i>.
          This avoids all problems with syntax, and lets students concentrate on
          the interesting parts of making their animation or game.
        </p>

        <p>
          Once a student gets proficient with Scratch, a common next step is
          Python, which is also very widely used in education as well as in
          industry. Python is a big leap from Scratch, though, because the
          student has to make two jumps at once: They have to correctly type
          their code into an editor or IDE, getting all details of the syntax
          right. They also have to leave behind the Scratch world of sprites,
          costumes, sounds, <i>when this sprite clicked</i> scripts, and so on.
        </p>

        <p>
          Pytch is a bridge between these two worlds. It has Scratch’s
          learner-friendly sprites, event-driven scripts, graphics, sounds,
          etc., while introducing the student to the idea of writing textual
          Python code instead of dragging and dropping blocks. In this way, they
          keep all the knowledge, intuition and skills they’ve built up with
          Scratch, and can focus on the task of learning the Python language.
        </p>

        <div className="end-matter">
          <h3>Acknowledgements</h3>

          <p>
            “Scratch” and the Scratch logo are trademarks of MIT’s Scratch Team.
            Their use here does not indicate any promotion or endorsement of
            Pytch by the Scratch Team. “Python” and the Python logo are
            trademarks or registered trademarks of the Python Software
            Foundation. Their use here does not indicate any promotion or
            endorsement of Pytch by the Python Software Foundation.
          </p>

          <p>
            Much of the material in our featured projects and tutorials is
            copyright Raspberry Pi Trading Ltd, who have kindly made these
            resources available under Creative Commons licences. For details,
            see the individual tutorials.
          </p>

          <p>
            In creating the Pytch system and website, we have built on others’
            work, in particular Skulpt, an in-browser implementation of Python.
            More details are given in the{" "}
            <a href={withinSite("/doc/about.html#acknowledgements")}>
              Acknowledgements
            </a>{" "}
            and <a href={withinSite("/doc/licensing.html")}>Licence</a> sections
            of the documentation.
          </p>

          <h3>Contact</h3>

          <p>
            Please email us at{" "}
            <a href="mailto:info@pytch.org">
              <code>info@pytch.org</code>
            </a>{" "}
            with any feedback or questions.
          </p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
