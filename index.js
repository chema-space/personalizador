// Agregar logo al canvas

let selectedImageLogo = null;
const logoSelect = document.querySelector("#logos");
document.addEventListener("DOMContentLoaded", function() { 
    const btnText = document.querySelector("#add-txt")
    const removeButton = document.querySelector("#rmv-btn")
    const canvas = new fabric.Canvas('canvas');
    const saveButton = document.querySelector("#confirm-btn")
    logoSelect.addEventListener("change", function() {
        const selectedLogo = logoSelect.value;
        // Construir la URL de la imagen dinámicamente
        const logo = `assets/img/${selectedLogo}`;
        if (selectedImageLogo) {
            canvas.remove(selectedImageLogo);
        }
        console.log(logo)
        
        fabric.Image.fromURL(logo, function(image) {
            image.scaleToWidth(50);
            image.scaleToHeight(50);
            image.set({
                selectable: true,
            });
            canvas.add(image);
            selectedImageLogo = image;
            canvas.renderAll();
        });
    });

        const imageUrl = "assets/img/Demo2.png";

        // Cargar la imagen y establecerla como fondo del canvas
        fabric.Image.fromURL(imageUrl, function (img) {
            // Escalar la imagen para que ocupe todo el tamaño del canvas (opcional)
            const scaleFactor = Math.max(
                canvas.width / img.width,
                canvas.height / img.height
            );
            img.scale(scaleFactor);

            // Establecer la imagen como fondo
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: scaleFactor,
                scaleY: scaleFactor - 0.1,
            });
        });

        // Agregar texto al canvas
        function addText () {
            const text = new fabric.Textbox("Texto editable", {
                left: 50,
                top: 50,
                width: 200,
                fontSize: 20,
                fill: "black",
                editable: true, // Habilitar edición
            });
            canvas.add(text);
        }
        btnText.addEventListener("click", () => {
            addText()
        })

        // Remover objetos del canvas.
        removeButton.addEventListener("click", function () {
            const activeObjects = canvas.getActiveObjects();
            if (activeObjects.length) {
                activeObjects.forEach((obj) => {
                    canvas.remove(obj); 
                });
                canvas.discardActiveObject(); 
                canvas.renderAll();
            }
        });

        // Generar url de imagen
        function saveImg(){
            const generatedDataURL = canvas.toDataURL({
                format: 'png',
                quality: 0.9
            });
            localStorage.setItem("img", generatedDataURL)
        }
        saveButton.addEventListener("click", () => {
            saveImg()
        })
});


