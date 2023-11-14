document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateButton");
  const imageInput = document.getElementById("imageInput");
  const generatedAltTexts = document.querySelector(".generatedAltTexts");

  // Event listener for generating alt text
  generateButton.addEventListener("click", async () => {
    if (!imageInput.files.length) {
      return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);

    try {
      // Display "Generating..." message
      generateButton.textContent = "Generating...";

      // Clear previously generated alt text
      generatedAltTexts.innerHTML = "";

      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Restore the original button text
      generateButton.textContent = "Generate Alt Texts";

      // Create a container for the generated alt text
      const altTextDiv = document.createElement("div");
      altTextDiv.classList.add("altText");

      const p = document.createElement("p");
      p.textContent = data.altText;

      altTextDiv.appendChild(p);
      generatedAltTexts.appendChild(altTextDiv);
    } catch (error) {
      console.error(error);
      generateButton.textContent = "Generate Alt Texts";
    }
  });

  // Event listeners for file uploads (Inspired from: https://codepen.io/dcode-software/pen/xxwpLQo)
  document.querySelectorAll(".upload-input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".upload");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    // Prevent event propagation
    inputElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);

        generateButton.removeAttribute("disabled");
        generateButton.classList.add("button-hover");
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drag-hover");
    });

    // Handle drag events
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drag-hover");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);

        generateButton.removeAttribute("disabled");
        generateButton.classList.add("button-hover");
      }

      dropZoneElement.classList.remove("drag-hover");
    });
  });

  // Function to update thumbnail
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".inputedImage");

    if (dropZoneElement.querySelector(".upload-label")) {
      dropZoneElement.querySelector(".upload-label").remove();
    }

    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("inputedImage");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
});
