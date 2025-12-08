console.log("PWA JS Loaded");

let deferredPrompt = null;

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("installPrompt");
    const installBtn = document.getElementById("installBtn");
    const dismissBtn = document.getElementById("dismissBtn");

    // Show popup only if app is not installed
    function shouldShowPopup() {
        return !localStorage.getItem("pwa-installed");
    }

    // Fired when PWA is installable
    window.addEventListener("beforeinstallprompt", (event) => {
        console.log("🔥 beforeinstallprompt fired");

        // stop default banner
        event.preventDefault();

        // save event for the install button
        deferredPrompt = event;

        if (shouldShowPopup()) {
            popup.classList.remove("d-none");
        }
    });

    // User clicks INSTALL
    installBtn.addEventListener("click", async () => {
        console.log("👉 User clicked Install");

        if (!deferredPrompt) {
            console.log("No install prompt available");
            return;
        }

        // Show browser install UI
        deferredPrompt.prompt();

        // Wait for user response
        const choice = await deferredPrompt.userChoice;

        console.log("User choice:", choice.outcome);

        if (choice.outcome === "accepted") {
            console.log("PWA Installed!");
            localStorage.setItem("pwa-installed", "yes");
        }

        popup.classList.add("d-none");

        deferredPrompt = null;
    });

    // User clicks NOT NOW
    dismissBtn.addEventListener("click", () => {
        popup.classList.add("d-none");
    });

    // Detect installation
    window.addEventListener("appinstalled", () => {
        console.log("✔ App installed");
        localStorage.setItem("pwa-installed", "yes");
        popup.classList.add("d-none");
    });
});
