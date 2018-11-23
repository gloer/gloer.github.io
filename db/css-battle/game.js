const db = firebase.database();
const kodene = db.ref("kode");


function visFigur(snap) {
    //console.log(snap.val());
    snap.forEach(element => {
        const htmlID = "style" + element.key;
        console.log(document.getElementById(`${htmlID}`));

        if(document.getElementById(`${htmlID}`) === null) {
            const div = document.createElement("div");
            div.id = htmlID;
            document.querySelector("main").appendChild(div);

            const styleElement = document.createElement("style");
            styleElement.classList.add(htmlID);
            document.head.appendChild(styleElement);

            console.log(div);
        } else {
            //document.getElementById(`${element.key}`).style = element.val();
            document.getElementsByClassName(`${htmlID}`)[0].innerHTML = "\n" + element.val() + "\n";
        }
        
        //console.log(element.key);
        //console.log(element.val());
    });
}

kodene.on("value", visFigur);

kodene.on("child_removed", (snap) => {
    elementToRemove = document.getElementById("style" + snap.key);
    document.querySelector("main").removeChild(elementToRemove);

});