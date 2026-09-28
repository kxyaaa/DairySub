const data = {

    "Susu Sapi": {
        group: "Susu Cair",
        category: "Susu Hewani",
        type: "animal",

        substitutes: {
            "Susu Kedelai": {
                function: 88,
                nutrition: 91,
                taste: 79
            },

            "Susu Oat": {
                function: 84,
                nutrition: 76,
                taste: 87
            },

            "Susu Almond": {
                function: 80,
                nutrition: 73,
                taste: 90
            }
        }
    },


    "Susu Kambing": {
        group: "Susu Cair",
        category: "Susu Hewani",
        type: "animal",

        substitutes: {
            "Susu Kedelai": {
                function: 85,
                nutrition: 88,
                taste: 77
            },

            "Susu Oat": {
                function: 82,
                nutrition: 75,
                taste: 86
            },

            "Susu Almond": {
                function: 78,
                nutrition: 71,
                taste: 89
            }
        }
    },


    "Susu Kedelai": {
        group: "Susu Cair",
        category: "Susu Nabati / Vegan",
        type: "vegan",

        substitutes: {
            "Susu Oat": {
                function: 93,
                nutrition: 86,
                taste: 88
            },

            "Susu Almond": {
                function: 89,
                nutrition: 82,
                taste: 92
            },

            "Susu Sapi": {
                function: 88,
                nutrition: 91,
                taste: 79
            }
        }
    },


    "Susu Oat": {
        group: "Susu Cair",
        category: "Susu Nabati / Vegan",
        type: "vegan",

        substitutes: {
            "Susu Kedelai": {
                function: 93,
                nutrition: 86,
                taste: 88
            },

            "Susu Almond": {
                function: 90,
                nutrition: 78,
                taste: 91
            },

            "Susu Sapi": {
                function: 84,
                nutrition: 76,
                taste: 87
            }
        }
    },


    "Susu Almond": {
        group: "Susu Cair",
        category: "Susu Nabati / Vegan",
        type: "vegan",

        substitutes: {
            "Susu Oat": {
                function: 90,
                nutrition: 78,
                taste: 91
            },

            "Susu Kedelai": {
                function: 89,
                nutrition: 82,
                taste: 92
            },

            "Susu Sapi": {
                function: 80,
                nutrition: 73,
                taste: 90
            }
        }
    },


    "Mentega": {
        group: "Lemak Padat",
        category: "Lemak Hewani",
        type: "animal",

        substitutes: {
            "Margarin": {
                function: 94,
                nutrition: 76,
                taste: 91
            }
        }
    },


    "Margarin": {
        group: "Lemak Padat",
        category: "Lemak Nabati",
        type: "vegan",

        substitutes: {
            "Mentega": {
                function: 94,
                nutrition: 76,
                taste: 91
            }
        }
    },


    "Keju Cheddar": {
        group: "Keju",
        category: "Keju Hewani",
        type: "animal",

        substitutes: {
            "Keju Vegan": {
                function: 82,
                nutrition: 74,
                taste: 88
            },

            "Nutritional Yeast": {
                function: 69,
                nutrition: 64,
                taste: 84
            }
        }
    },


    "Keju Vegan": {
        group: "Keju",
        category: "Keju Nabati",
        type: "vegan",

        substitutes: {
            "Keju Cheddar": {
                function: 82,
                nutrition: 74,
                taste: 88
            },

            "Nutritional Yeast": {
                function: 76,
                nutrition: 69,
                taste: 83
            }
        }
    },


    "Nutritional Yeast": {
        group: "Keju",
        category: "Keju Nabati",
        type: "vegan",

        substitutes: {
            "Keju Vegan": {
                function: 76,
                nutrition: 69,
                taste: 83
            },

            "Keju Cheddar": {
                function: 69,
                nutrition: 64,
                taste: 84
            }
        }
    }
};


const ingredient = document.getElementById("ingredient");
const preference = document.getElementById("preference");
const sameGroup = document.getElementById("sameGroup");

const resultSection = document.getElementById("resultSection");
const treeSection = document.getElementById("treeSection");

const searchBtn = document.getElementById("searchBtn");
const treeBtn = document.getElementById("treeBtn");


function average(score) {
    return Math.round(
        (score.function + score.nutrition + score.taste) / 3
    );
}


function findRecommendation(source) {

    const sourceData = data[source];

    let candidates = Object.keys(sourceData.substitutes);

    if (preference.value === "vegan") {

        const veganCandidates = candidates.filter(
            item => data[item].type === "vegan"
        );

        if (veganCandidates.length > 0) {
            candidates = veganCandidates;
        }
    }


    if (preference.value === "lactose") {

        const lactoseCandidates = candidates.filter(
            item => data[item].type === "vegan"
        );

        if (lactoseCandidates.length > 0) {
            candidates = lactoseCandidates;
        }
    }


    if (sameGroup.checked) {

        const sameGroupCandidates = candidates.filter(
            item => data[item].group === sourceData.group
        );

        if (sameGroupCandidates.length > 0) {
            candidates = sameGroupCandidates;
        }
    }


    candidates.sort((a, b) => {

        const scoreA = average(sourceData.substitutes[a]);
        const scoreB = average(sourceData.substitutes[b]);

        return scoreB - scoreA;
    });


    return candidates[0];
}


function searchSubstitution() {

    const source = ingredient.value;

    if (source === "") {

        alert("Silakan pilih bahan terlebih dahulu.");

        return;
    }


    const result = findRecommendation(source);

    const sourceData = data[source];
    const resultData = data[result];

    const score = sourceData.substitutes[result];

    document.getElementById("originalName").textContent = source;
    document.getElementById("originalCategory").textContent =
        sourceData.category;


    document.getElementById("substituteName").textContent = result;
    document.getElementById("substituteCategory").textContent =
        resultData.category;


    document.getElementById("groupInfo").textContent =
        "Kelompok " + sourceData.group;


    document.getElementById("functionScore").textContent =
        score.function + "%";

    document.getElementById("nutritionScore").textContent =
        score.nutrition + "%";

    document.getElementById("tasteScore").textContent =
        score.taste + "%";


    document.getElementById("functionText").textContent =
        getFunctionExplanation(source, result);


    document.getElementById("nutritionText").textContent =
        getNutritionExplanation(source, result);


    document.getElementById("tasteText").textContent =
        getTasteExplanation(source, result);


    const total = average(score);

    document.getElementById("overallScore").textContent =
        total + "%";


    document.getElementById("overallText").textContent =
        getOverallExplanation(total);


    resultSection.style.display = "block";

    treeSection.style.display = "none";

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function getFunctionExplanation(source, result) {

    if ((source === "Mentega" && result === "Margarin") || (source === "Margarin" && result === "Mentega")) {
        return "Keduanya punya rasio lemak sekitar 80% yang bikin sifat emulsinya sama kuat. Jadi sama-sama mantap buat ngembangin adonan kue atau bikin tumisan licin merata.";
    }

    if ((source === "Keju Cheddar" && result === "Keju Vegan") || (source === "Keju Vegan" && result === "Keju Cheddar")) {
        return "Keduanya sama-sama padat dan bisa diparut. Keju vegan modern juga dirancang punya titik leleh (melting point) mirip keju sapi berkat emulsi minyak nabatinya.";
    }

    if (source === "Keju Cheddar" && result === "Nutritional Yeast") {
        return "Walau bentuknya serpihan kering, bahan ini ngasih efek pengikat rasa (flavor enhancer) yang cara kerjanya sama persis kayak taburan keju parmesan pada makanan hangat.";
    }

    if (source === "Nutritional Yeast" && result === "Keju Cheddar") {
        return "Serpihan ragi ini memberikan fungsi penambah rasa gurih yang cara kerjanya mirip dengan keju cheddar saat dicampur ke dalam saus atau masakan.";
    }

    if (source === "Keju Vegan" && result === "Nutritional Yeast") {
        return "Keduanya sama-sama tidak meleleh seperti keju balok, melainkan berfungsi optimal sebagai pemberi tekstur taburan atau penguat rasa gurih.";
    }

    if (source === "Nutritional Yeast" && result === "Keju Vegan") {
        return "Keduanya sama-sama andalan dalam masakan vegan untuk memberikan sensasi gurih khas keju tanpa menggunakan produk hewani.";
    }

    if (source.includes("Susu") && result.includes("Susu")) {
        return "Keduanya memiliki karakteristik cairan yang seimbang, sehingga dapat disubstitusi dengan takaran 1:1 di berbagai resep minuman maupun adonan kue.";
    }

    return "Kedua bahan ini memiliki cara kerja, tekstur, dan interaksi yang sangat mirip terhadap suhu panas maupun saat dicampur ke dalam masakan.";
}


function getNutritionExplanation(source, result) {

    if ((source === "Mentega" && result === "Margarin") || (source === "Margarin" && result === "Mentega")) {
        return "Sama-sama merupakan sumber kalori padat. Margarin memberikan pasokan energi dari lemak nabati yang secara alami 100% bebas dari kolesterol hewani.";
    }

    if ((source === "Keju Cheddar" && result === "Keju Vegan") || (source === "Keju Vegan" && result === "Keju Cheddar")) {
        return "Sama-sama menyuplai kalori dan lemak untuk energi. Keju vegan umumnya juga sudah difortifikasi kalsium dan Vitamin B12 agar nilai gizinya mendekati keju sapi.";
    }

    if ((source === "Keju Cheddar" && result === "Nutritional Yeast") || (source === "Nutritional Yeast" && result === "Keju Cheddar")) {
        return "Sama-sama kaya akan kandungan protein. Nutritional Yeast unggul karena menyuplai Vitamin B-Kompleks komplit yang sangat baik untuk metabolisme tubuh.";
    }

    if ((source === "Keju Vegan" && result === "Nutritional Yeast") || (source === "Nutritional Yeast" && result === "Keju Vegan")) {
        return "Keduanya merupakan komponen nabati unggulan yang sama-sama rendah kolesterol serta kaya akan protein penunjang kesehatan harian.";
    }

    if (source.includes("Susu") && result.includes("Susu")) {
        return "Keduanya memiliki nilai ekuivalen makronutrisi yang seimbang, di mana produk alternatif umumnya sudah diperkaya (fortifikasi) kalsium dan vitamin setara susu hewani.";
    }

    return "Kedua bahan ini memiliki kandungan nutrisi yang saling melengkapi dan sebanding untuk memenuhi kebutuhan gizi harianmu.";
}


function getTasteExplanation(source, result) {

    if ((source === "Mentega" && result === "Margarin") || (source === "Margarin" && result === "Mentega")) {
        return "Margarin diformulasikan khusus dengan perisa tambahan (butter flavor) untuk meniru sensasi asin, gurih, dan creamy yang identik dengan mentega.";
    }

    if ((source === "Keju Cheddar" && result === "Keju Vegan") || (source === "Keju Vegan" && result === "Keju Cheddar")) {
        return "Keduanya sama-sama menonjolkan profil rasa asin dan gurih yang kuat di lidah, sehingga sukses memberikan sensasi keju yang akrab di mulut.";
    }

    if ((source === "Keju Cheddar" && result === "Nutritional Yeast") || (source === "Nutritional Yeast" && result === "Keju Cheddar")) {
        return "Tingginya kandungan asam glutamat alami di ragi ini menghasilkan rasa umami yang kuat, sangat mirip dengan sensasi gurih tajam khas keju tua.";
    }

    if ((source === "Keju Vegan" && result === "Nutritional Yeast") || (source === "Nutritional Yeast" && result === "Keju Vegan")) {
        return "Keduanya sama-sama memanjakan lidah dengan cita rasa umami dan gurih yang pekat, sangat pas dijadikan pengganti rasa keju.";
    }

    if (source.includes("Susu") && result.includes("Susu")) {
        return "Profil rasanya berada di spektrum yang sama-sama lembut dan gurih ringan, membuat lidah merasa familiar tanpa merusak rasa asli resep utamanya.";
    }

    return "Profil rasa dari kedua bahan ini selaras dan berada di kategori yang sama, memberikan kelezatan yang konsisten pada masakanmu.";
}


function getNutritionExplanation(source, result) {

    if (source === "Mentega" && result === "Margarin") {
        return "Kemiripan gizi digunakan sebagai salah satu pertimbangan, tetapi komposisi zat gizi setiap produk dapat berbeda.";
    }

    if (source === "Susu Sapi" && result === "Susu Kedelai") {
        return "Susu kedelai dapat menjadi alternatif nabati dengan karakteristik gizi yang berbeda dari susu sapi.";
    }

    return "Kemiripan gizi menjadi salah satu indikator dalam pemilihan alternatif.";
}


function getTasteExplanation(source, result) {

    if (source === "Mentega" && result === "Margarin") {
        return "Keduanya memiliki karakter rasa gurih dan digunakan untuk memberikan cita rasa pada masakan.";
    }

    if (source.includes("Susu")) {
        return "Karakter rasa yang relatif dekat membuat alternatif lebih mudah digunakan pada beberapa jenis olahan.";
    }

    if (source.includes("Keju")) {
        return "Kemiripan rasa gurih menjadi salah satu alasan kandidat dipertimbangkan sebagai substitusi.";
    }

    return "Kemiripan rasa menjadi salah satu indikator pemilihan.";
}


function getOverallExplanation(score) {

    if (score >= 90) {
        return "Tingkat kemiripan tinggi berdasarkan tiga indikator.";
    }

    if (score >= 80) {
        return "Tingkat kemiripan cukup tinggi berdasarkan tiga indikator.";
    }

    return "Kandidat memiliki kemiripan yang lebih rendah dibanding alternatif lainnya.";
}


searchBtn.addEventListener("click", searchSubstitution);


treeBtn.addEventListener("click", function() {

    const source = ingredient.value;
    const result = findRecommendation(source);

    createTree(source, result);

    treeSection.style.display = "block";

    treeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


function createTree(source, result) {

    const svg = document.getElementById("treeSvg");
    svg.innerHTML = "";

    const nodes = {

        /* PILAR TENGAH (LEMAK) DIGESER +40px DARI VERSI ORIGINAL */
        root: { x: 590, y: 45, label: "Produk Dairy & Alternatifnya", width: 210 },
        
        /* PILAR KIRI (SUSU) TETAP */
        milk: { x: 210, y: 155, label: "Kelompok Susu Cair", width: 180 },
        
        fat: { x: 590, y: 155, label: "Kelompok Lemak Padat", width: 180 },
        
        /* PILAR KANAN (KEJU) DIGESER +20px DARI VERSI ORIGINAL */
        cheese: { x: 910, y: 155, label: "Kelompok Keju", width: 150 },

        animalMilk: { x: 110, y: 265, label: "Susu Hewani", width: 125 },
        veganMilk: { x: 310, y: 265, label: "Susu Nabati", width: 125 },

        animalFat: { x: 510, y: 265, label: "Lemak Hewani", width: 125 },
        veganFat: { x: 670, y: 265, label: "Lemak Nabati", width: 125 },

        animalCheese: { x: 830, y: 265, label: "Keju Hewani", width: 125 },
        veganCheese: { x: 990, y: 265, label: "Keju Nabati", width: 125 }
    };

    /* SUSU ALMOND DLL DIRAPATKAN AGAR MENJAUH DARI JALUR MENTEGA */
    const milkItems = [
        { label: "Susu Sapi", x: 60, y: 385 },
        { label: "Susu Kambing", x: 155, y: 475 },
        { label: "Susu Kedelai", x: 225, y: 385 },
        { label: "Susu Oat", x: 310, y: 475 },
        { label: "Susu Almond", x: 395, y: 385 }
    ];

    const fatItems = [
        { label: "Mentega", x: 510, y: 475 },
        { label: "Margarin", x: 670, y: 385 }
    ];

    const cheeseItems = [
        { label: "Keju Cheddar", x: 830, y: 475 },
        { label: "Keju Vegan", x: 930, y: 385 },
        { label: "Nutritional Yeast", x: 1040, y: 475 }
    ];


    const edges = [
        ["root", "milk"],
        ["root", "fat"],
        ["root", "cheese"],
        ["milk", "animalMilk"],
        ["milk", "veganMilk"],
        ["fat", "animalFat"],
        ["fat", "veganFat"],
        ["cheese", "animalCheese"],
        ["cheese", "veganCheese"]
    ];

    edges.forEach(edge => {
        drawEdge(
            svg,
            nodes[edge[0]],
            nodes[edge[1]],
            isActiveParent(edge[1], source, result)
        );
    });

    milkItems.forEach(item => {
        const parent =
            item.label === "Susu Sapi" || item.label === "Susu Kambing"
                ? nodes.animalMilk
                : nodes.veganMilk;
        drawLeafEdge(svg, parent, item, item.label === source || item.label === result);
    });

    fatItems.forEach(item => {
        const parent =
            item.label === "Mentega"
                ? nodes.animalFat
                : nodes.veganFat;
        drawLeafEdge(svg, parent, item, item.label === source || item.label === result);
    });

    cheeseItems.forEach(item => {
        const parent =
            item.label === "Keju Cheddar"
                ? nodes.animalCheese
                : nodes.veganCheese;
        drawLeafEdge(svg, parent, item, item.label === source || item.label === result);
    });

    drawNode(svg, nodes.root, "normal");
    drawNode(svg, nodes.milk, data[source].group === "Susu Cair" ? "active" : "normal");
    drawNode(svg, nodes.fat, data[source].group === "Lemak Padat" ? "active" : "normal");
    drawNode(svg, nodes.cheese, data[source].group === "Keju" ? "active" : "normal");

    drawNode(svg, nodes.animalMilk, "normal");
    drawNode(svg, nodes.veganMilk, "normal");
    drawNode(svg, nodes.animalFat, "normal");
    drawNode(svg, nodes.veganFat, "normal");
    drawNode(svg, nodes.animalCheese, "normal");
    drawNode(svg, nodes.veganCheese, "normal");

    milkItems.forEach(item => {
        let type = "normal";
        if (item.label === source) type = "active";
        if (item.label === result) type = "result";
        drawLeaf(svg, item, type);
    });

    fatItems.forEach(item => {
        let type = "normal";
        if (item.label === source) type = "active";
        if (item.label === result) type = "result";
        drawLeaf(svg, item, type);
    });

    cheeseItems.forEach(item => {
        let type = "normal";
        if (item.label === source) type = "active";
        if (item.label === result) type = "result";
        drawLeaf(svg, item, type);
    });
}


function isActiveParent(parent, source, result) {

    const sourceGroup = data[source].group;

    if (parent === "milk") {
        return sourceGroup === "Susu Cair";
    }

    if (parent === "fat") {
        return sourceGroup === "Lemak Padat";
    }

    if (parent === "cheese") {
        return sourceGroup === "Keju";
    }

    return false;
}


function drawEdge(svg, from, to, active) {

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    line.setAttribute(
        "d",
        `M ${from.x} ${from.y + 28}
         C ${from.x} ${from.y + 65},
           ${to.x} ${to.y - 65},
           ${to.x} ${to.y - 28}`
    );

    line.setAttribute(
        "class",
        active
            ? "tree-edge active"
            : "tree-edge"
    );

    svg.appendChild(line);
}


function drawLeafEdge(svg, parent, item, active) {

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    const targetY = item.y;

    line.setAttribute(
        "d",
        `M ${parent.x} ${parent.y + 28}
         C ${parent.x} ${parent.y + 55},
           ${item.x} ${targetY - 45},
           ${item.x} ${targetY}`
    );

    line.setAttribute(
        "class",
        active
            ? "tree-edge active"
            : "tree-edge"
    );

    svg.appendChild(line);
}


function drawNode(svg, node, type) {

    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    group.setAttribute(
        "class",
        `tree-node ${type}`
    );


    const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    rect.setAttribute(
        "x",
        node.x - node.width / 2
    );

    rect.setAttribute(
        "y",
        node.y - 28
    );

    rect.setAttribute(
        "width",
        node.width
    );

    rect.setAttribute(
        "height",
        56
    );

    rect.setAttribute(
        "rx",
        12
    );


    const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);

    text.textContent = node.label;


    group.appendChild(rect);
    group.appendChild(text);

    svg.appendChild(group);
}


function drawLeaf(svg, item, type) {

    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    group.setAttribute(
        "class",
        `tree-node ${type}`
    );


    const width =
        item.label.length > 15
            ? 125
            : 105;

    const targetY = item.y;


    const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    rect.setAttribute(
        "x",
        item.x - width / 2
    );

    rect.setAttribute(
        "y",
        targetY
    );

    rect.setAttribute(
        "width",
        width
    );

    rect.setAttribute(
        "height",
        55
    );

    rect.setAttribute(
        "rx",
        12
    );


    const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );

    text.setAttribute(
        "x",
        item.x
    );

    text.setAttribute(
        "y",
        targetY + 28
    );

    text.textContent = item.label;


    group.appendChild(rect);
    group.appendChild(text);

    svg.appendChild(group);
}


/* NAVIGASI */

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");


navButtons.forEach(button => {

    button.addEventListener("click", function() {

        const pageName = this.dataset.page;


        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");


        pages.forEach(page => {
            page.classList.remove("active");
        });


        document.getElementById(pageName)
            .classList.add("active");

    });

});


/* TOMBOL MULAI */

document.getElementById("startBtn")
    .addEventListener("click", function() {

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        document
            .querySelector('[data-page="search"]')
            .classList.add("active");


        pages.forEach(page => {
            page.classList.remove("active");
        });

        document
            .getElementById("search")
            .classList.add("active");

    });

/* FITUR PERGANTIAN TEMA (GELAP/TERANG) */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});