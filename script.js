function showsection(button) {
    // Map tab button IDs to section IDs
    const sectionMap = {
      encode: "encodesection",
      decode: "decodesection",
      about: "aboutsection"
    };
  
    // Hide all sections
    for (let key in sectionMap) {
      document.getElementById(sectionMap[key]).style.display = (button.id === key) ? "block" : "none";
    }
  
    // Update active button class
    document.querySelectorAll(".tab-button").forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  }
  window.onload = function() {
    document.getElementById("encodesection").style.display = "block";
    document.getElementById("decodesection").style.display = "none";
    document.getElementById("aboutsection").style.display = "none";
  };