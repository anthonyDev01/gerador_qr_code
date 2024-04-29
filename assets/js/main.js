const form = document.getElementById("generate-form");
const qrcode = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if (url === "") {
        alert("Please enter a URL");
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            showScanner();

            setTimeout(() => {
                const saveUrl = qrcode.querySelector("canvas").toDataURL();
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });
};

const clearUI = () => {
    qrcode.innerHTML = "";
    const saveBtn = document.getElementById("save-link");

    if (saveBtn) {
        saveBtn.remove();
    }
};

const showScanner = () => {
    const scanner = document.getElementById("qrCodeContainer");
    scanner.style.display = "block";
};

const showSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";
};

const hideSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a");

    link.id = "save-link";
    link.innerHTML = "Save Image";

    link.href = saveUrl;
    link.download = "qrcode.png";

    const saveContainer = document.getElementById("save-container");
    saveContainer.appendChild(link);
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);