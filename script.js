// Get elements
const encodeTab = document.getElementById('encode-tab');
const decodeTab = document.getElementById('decode-tab');
const aboutTab = document.getElementById('about-tab');

const encodeSection = document.getElementById('encode-section');
const decodeSection = document.getElementById('decode-section');
const aboutSection = document.getElementById('about-section');

// Tab switching logic
function switchTab(activeTab, activeSection) {
    document.querySelectorAll('nav button').forEach(button => button.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

    activeTab.classList.add('active');
    activeSection.classList.add('active');
}

encodeTab.addEventListener('click', () => switchTab(encodeTab, encodeSection));
decodeTab.addEventListener('click', () => switchTab(decodeTab, decodeSection));
aboutTab.addEventListener('click', () => switchTab(aboutTab, aboutSection));

// Image upload and steganography logic
document.getElementById('encode-upload-area').addEventListener('click', () => {
    document.getElementById('encode-image-input').click();
});

document.getElementById('decode-upload-area').addEventListener('click', () => {
    document.getElementById('decode-image-input').click();
});

// A simplified steganography function
function encodeMessage(image, message) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const messageInBinary = stringToBinary(message);
    const messageLength = messageInBinary.length;

    // Check if the image has enough capacity
    if (messageLength * 8 > data.length) {
        alert("Message is too long for this image!");
        return null;
    }

    // A simple LSB (Least Significant Bit) algorithm
    for (let i = 0; i < messageLength; i++) {
        for (let j = 0; j < 8; j++) {
            const bit = messageInBinary[i * 8 + j];
            // Modify the least significant bit of the image data
            data[(i * 8 + j) * 4] = (data[(i * 8 + j) * 4] & 0xFE) | parseInt(bit);
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png'); // Return the encoded image as a data URL
}

document.getElementById('encode-button').addEventListener('click', () => {
    const file = document.getElementById('encode-image-input').files[0];
    const message = document.getElementById('secret-message-input').value;

    if (!file || !message) {
        alert("Please select an image and enter a message.");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const encodedImageURL = encodeMessage(img, message);
            if (encodedImageURL) {
                const downloadLink = document.getElementById('download-link');
                downloadLink.href = encodedImageURL;
                document.getElementById('encoded-image-output').style.display = 'block';
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});


// Helper functions for binary conversion
function stringToBinary(str) {
    return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

function binaryToString(binary) {
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
        result += String.fromCharCode(parseInt(binary.substring(i, i + 8), 2));
    }
    return result;
}