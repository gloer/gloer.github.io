const db = firebase.database();

const id = Math.floor(Math.random() * 1000000000000000).toString(36);

const minKode = db.ref("kode/"+ id);

// Starter med ingenting
minKode.set(`.${id} {
    background-color: pink;
}`);

document.getElementById("editor").innerHTML = `#style${id} {
    background-color: pink;
}`

// Når de går ut av siden, fjerner vi brukeren
window.addEventListener("unload", function(event){
	db.ref("kode/"+ id).remove();
});

window.addEventListener("beforeunload", function(event){
	db.ref("kode/"+ id).remove();
});

var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/css");
    
        editor.getSession().on('change', function () {
            console.log(editor.getSession().getValue());
            minKode.set(editor.getSession().getValue());
            document.querySelector("#minStil").innerHTML = editor.getSession().getValue();
        });
    


document.querySelector("#txtMinKode").oninput = () => {
    minKode.set(txtMinKode.value);
}