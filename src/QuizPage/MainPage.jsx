import Buttons from "../Components/Buttons";

const MainPage = () => {
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",padding:"5vh",}}>
            <h1 className="fontUbuntu shadowBox" style={{minWidth:"80vw",textAlign:"center",backgroundColor:"white",padding:"6vw 8vw",borderRadius:"20px"}}>Q1. How many elephants in the picture</h1>
            <div style={{display:"flex",flexDirection:"column",gap:"25px",alignItems:"center",padding:"10vh 0",minWidth:"70vw",justifyContent:"center"}}>
                <div style={{ display: 'flex',gap:"25px",width:"10vw",minWidth:"400px",flexWrap:"wrap",justifyContent:"center"}}>
                    <Buttons text='1' />
                    <Buttons text='2' />
                </div>
                <div style={{ display: 'flex' ,gap:"25px",width:"10vw",flexWrap:"wrap",minWidth:"400px",justifyContent:"center"}}>
                    <Buttons text='3' />
                    <Buttons text='4' />
                </div>
            </div>
        </div>
    )

}
export default MainPage;