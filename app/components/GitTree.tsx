import React from 'react';
import {Domain, Prisma} from "@prisma/client";
import RoundUserGetPayload = Prisma.RoundUserGetPayload;
import "./gittree.css";

function GitTree({roundUsers}: {
    roundUsers: RoundUserGetPayload<{ include: { round: { include: { Meet: true } }, Meet_User: true } }>[]
}) {
    const roundUsersSorted = roundUsers.sort((a, b) => a.round.number - b.round.number);
    return (
        <div id="git" style={{overflow: "auto", height: `92vh`}}>
            {/*<Gitgraph options={{orientation: Orientation.VerticalReverse }}>{(gitgraph) => {*/}

            {/*    const master = gitgraph.branch("master");*/}
            {/*    master.commit("Initial commit");*/}
            {/*    const develop = gitgraph.branch("develop");*/}
            {/*    develop.commit("Add TypeScript");*/}
            {/*    master.commit("Add JavaScript");*/}
            {/*    develop.commit("Add React");*/}
            {/*    develop.merge(master);*/}
            {/*}}</Gitgraph>*/}
            {Object.keys(Domain).map((domain) => {
                if (roundUsers.filter(i => i.round.domain === domain).length)
                    return <div key={domain}>
                        <h3>
                            {domain.toUpperCase()}
                        </h3>
                        <ul>
                            {roundUsersSorted.filter(i => i.round.domain === domain).map((roundUser) => {
                                    if (roundUser.round.type === 'interview') {
                                        if (roundUser.status === 'pending' && roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    {roundUser.Meet_User ? <>
                                                            <li>Meeting slot has been scheduled.</li>
                                                            <li>Kindly attend the meeting at the scheduled time.</li>
                                                        </>
                                                        : <li>Please schedule a meeting slot.</li>}

                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'pending' && !roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    <li>The deadline for this round has passed.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'promoted' && !roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    <li>Meeting slot has been scheduled.</li>
                                                    <li>Meeting has been attended.</li>
                                                </ul>
                                            </li>

                                        } else if (roundUser.status === 'promoted' && roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    <li>Meeting slot has been scheduled.</li>
                                                    <li>Meeting has been attended.</li>
                                                    <li>You have made it to the next Round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'rejected') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    <li>Meeting slot has been scheduled.</li>
                                                    <li>Meeting has been attended.</li>
                                                    <li>We&apos;re sorry. You have not made it to the next round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'evaluate') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>{roundUser.round.Meet?.title}</h5>
                                                <ul>
                                                    <li>Meeting slot has been scheduled.</li>
                                                    <li>Meeting has been attended.</li>
                                                    <li>Your performance is being evaluated.</li>
                                                </ul>
                                            </li>
                                        }
                                    } else if (roundUser.round.type === 'form') {
                                        if (roundUser.status === 'pending' && roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>Kindly fill the form.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'pending' && !roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>The deadline for this round has passed.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'promoted' && !roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>Form has been filled.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'promoted' && roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>Form has been filled.</li>
                                                    <li>You have made it to the next Round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'rejected') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>Form has been filled.</li>
                                                    <li>We&apos;re sorry. You have not made it to the next round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'evaluate') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Form</h5>
                                                <ul>
                                                    <li>Form has been filled.</li>
                                                    <li>Your responses are being evaluated.</li>
                                                </ul>
                                            </li>
                                        }
                                    } else if (roundUser.round.type === 'task') {
                                        if (roundUser.status === 'pending' && roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>Kindly complete the task.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'pending' && !roundUser.round.active) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>The deadline for this round has passed.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'promoted' && !roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>Task has been completed.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'promoted' && roundUser.round.eliminates) {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>Task has been submitted.</li>
                                                    <li>You have made it to the next Round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'rejected') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>Task has been submitted.</li>
                                                    <li>We&apos;re sorry. You have not made it to the next round.</li>
                                                </ul>
                                            </li>
                                        } else if (roundUser.status === 'evaluate') {
                                            return <li key={roundUser.id}>
                                                <h4>Round {roundUser.round.number}</h4>
                                                <h5>Task</h5>
                                                <ul>
                                                    <li>Task has been submitted.</li>
                                                    <li>Your task is being evaluated.</li>
                                                </ul>
                                            </li>
                                        }
                                    }
                                    return null;
                                }
                            )
                            }
                        </ul>
                    </div>
            })}
        </div>
    )

        ;
}

export default GitTree;