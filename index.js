// Esperar carga del DOM
document.addEventListener("DOMContentLoaded", function() { 

// Referencias
    const logoSelect = document.querySelector("#logos");
    const btnText = document.querySelector("#add-txt");
    const removeButton = document.querySelector("#rmv-btn");
    const canvas = new fabric.Canvas('canvas');
    const saveButton = document.querySelector("#confirm-btn");
    const uploadButton = document.querySelector("#upload-img");
    const fileInput = document.querySelector("#file-input")
    let selectedImageLogo = null;
    const imageUrl = "assets/img/Demo2.png";

// Inserción de imagen local dentro del canvas
    logoSelect.addEventListener("change", function() {
        const selectedLogo = logoSelect.value;
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
    });

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
    });

// Subir imagen a canvas
    
    function uploadImg(file){
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Solo se permiten imágenes (JPG, PNG, SVG).');
            fileInput.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            fabric.Image.fromURL(e.target.result, (img) => {
                img.scaleToWidth(100); 
                img.scaleToHeight(100);
                canvas.add(img); 
                canvas.renderAll(); 
            });
        };
        reader.readAsDataURL(file);
    }

    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
           uploadImg(file);
        }else{
            console.error("Hubo un error")
        }
    });
});




