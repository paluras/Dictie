function manageScore(similar:number) {

    if(similar === 0) return
    else if(similar < 90){
        console.log("NO POINT");
        
        return "no point"
    }else console.log("POINT");
     return "point"

}

export default manageScore
