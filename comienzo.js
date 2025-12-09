function startClassification() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        classifier = ml5.soundClassifier('Archivos Aliens/model.json', modelReady);
    })
    .catch(function(err) {
        console.error('getUserMedia error:', err);
        alert('No se pudo acceder al micrófono. Revisa permisos y HTTPS/localhost.');
    });
}

function modelReady() {
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } 
    
    else {
        console.log(results);
        random_number_r = Math.floor(Math.random() * 255) + 1;
        random_number_g = Math.floor(Math.random() * 255) + 1;
        random_number_b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("result_label").innerHTML = 'Escucho - ' + results[0].label;
        document.getElementById("result_confidence").innerHTML = 'Precisión - ' + (results[0].confidence * 100).toFixed(2) + " %";
        document.getElementById("result_label").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";
        document.getElementById("result_confidence").style.color = "rgb(" + random_number_r + "," + random_number_g + "," + random_number_b + ")";

        // elementos de imagen
        const img = document.getElementById('alien1');
        const img1 = document.getElementById('alien2');
        const img2 = document.getElementById('alien3');
        const img3 = document.getElementById('alien4');

        // asegurar que usen las imágenes estáticas iniciales (las que están en index.html)
        img.src = 'aliens-01.png';
        img1.src = 'aliens-02.png';
        img2.src = 'aliens-03.png';
        img3.src = 'aliens-04.png';

        // normalizar etiqueta y hacer matching tolerante (español/inglés/parciales)
        const label = String(results[0].label).toLowerCase();

        // función que activa una imagen (añade clase) y desactiva las demás
        function setActive(index) {
            const imgs = [img, img1, img2, img3];
            imgs.forEach((el, i) => {
                if (!el) return;
                if (i === index) el.classList.add('active'); else el.classList.remove('active');
            });
        }

        if (label.includes('aplaus') || label.includes('clap') || label.includes('aplauso')) {
            setActive(0);
        } else if (label.includes('campan') || label.includes('bell')) {
            setActive(1);
        } else if (label.includes('chas') || label.includes('snap')) {
            setActive(2);
        } else {
            // categoría por defecto: activa el cuarto
            setActive(3);
        }
    }
}