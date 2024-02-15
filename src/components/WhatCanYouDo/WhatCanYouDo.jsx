import Slides from "../Slides/Slides.jsx"
import Qualities from "../Qualities/Qualities.jsx"

export default function WhatCanYouDo(){
    return (
        <section className="sect3 innerSpace flex column justifyCenter alignCenter gap">
            <h2>O que você pode fazer</h2>
            <div className="flex justifyCenter gap wrap">
                <aside>
                    <Qualities />
                </aside>
                <Slides />
            </div>
        </section>
    )
}