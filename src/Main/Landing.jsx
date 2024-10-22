import ButtonLink from "../Components/ButtonLink";
const Landing = () => {

    return (

        <div className="divLanding" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", top: "4vh", alignItems: "center", height: "70vh", width: "100vw" }}>
            <div className="questionMark" style={{ position: "absolute", fontSize: "70vh", color: "white", zIndex: -1 }}>?</div>
            <div className="landingText" style={{ display: "flex", top: "0", flexDirection: "column", alignItems: "center", gap: "4vh", justifyContent: "center", maxWidth: "max-content", width: "60%", textAlign: "center", color: "#387080", textShadow: "black 0 0 0 1.5px, transparent 0 0 0 0" }}>
                Challenge Yourself, Test Your Knowledge, Explore, Learn, Have Fun!
                <ButtonLink  tot="/set-question" text="Getting Started &gt;" />
            </div>
        </div>



    )
}

export default Landing;