# Managing and Updating Lernstation Content

Welcome to the documentation for the Virtual Learn Station website. This guide is designed for non-developers and will walk you through how to update text, images, and videos, as well as how to create new pages.

## 1. Project Workflow & Branches (GitHub)

This project uses **GitHub** to manage different versions of the website. Understanding the branches is important for knowing where to make changes and how they become live.

-   **`development` Branch:**
    * This is the main branch for **making changes** and adding new content.
    * Work done on this branch should be tested locally on your computer.
    * To test, you can run a simple local web server. Open a terminal or command prompt in the project's main folder and run: `python -m http.server`. Then, open your web browser to `http://localhost:8000`.
-   **`testing` Branch:**
    * **Accessing the Testing Site:** The live testing website is available at: [https://besu-solutions.github.io/Lebaz-Lernstation/](https://besu-solutions.github.io/Lebaz-Lernstation/)
    * **Important:** This link goes to the main landing page (`index.html`). To view specific content pages, you need to add the full path to the URL manually. For example:
        * `https://besu-solutions.github.io/Lebaz-Lernstation/pages/oprt/oprt-001.html`
        * `https://besu-solutions.github.io/Lebaz-Lernstation/pages/vrtl/vrtl-001.html`
    * This branch is connected to **GitHub Pages**. Any changes pushed to this branch will automatically be **deployed** to the live testing website.
    * **Only push changes here when they are ready for review and testing by others.**
-   **`production` Branch:**
    * *(Currently unused)* This branch will eventually hold the final, stable version of the website for the public.
-   **Experimental Branches:**
    * You can create **new branches** based on `development` if you want to try out significant changes or experiment without affecting the main development work. Once the experiment is successful, the new branch can be merged back into `development`.

**Basic Workflow:**
1.  Make all your content edits (text, images, videos, new pages) on the `development` branch.
2.  Test your changes locally using the Python server method.
3.  When ready for wider testing, merge the `development` branch into the `testing` branch.
4.  GitHub Pages will automatically update the testing website within a few minutes.

---

## 2. Getting the Project Code

You can get a copy of the website's code from the GitHub repository in two ways:

-   **Cloning (Recommended for Development):**
    * Use a Git client (like GitHub Desktop or the command line) to "clone" the repository.
    * This creates a local copy that is linked to the online repository, allowing you to easily pull updates and push your changes.
    * This is the best method if you plan to regularly contribute changes.
-   **Downloading (For Backup or Deployment):**
    * On the main page of the GitHub repository, click the green "<> Code" button.
    * Select "Download ZIP".
    * This downloads a snapshot of the current branch as a ZIP file.
    * This is useful for creating backups or if you need to deploy the website files to a different web server (not GitHub Pages).

---

## 3. Understanding the Folder Structure

The project is organized into a few key folders. Understanding what each one does will help you find the files you need to edit.

-   **/assets/**: This is where all your media files are stored (images, icons, videos).
-   **/css/**: Contains the main stylesheet (`custom.css`). You **won't need to edit** this file for content changes.
-   **/js/**: Contains the JavaScript files that add interactivity. You **won't need to edit** these files.
-   **/pages/**: This is the **most important** folder. It contains the website's pages and reusable parts, organized by section.
    -   **/pages/vrtl/**: Contains the **landing pages** for each individual virtual machine (e.g., `vrtl-001.html`, `vrtl-002.html`). These pages are the entry points for a specific process.
    -   **/pages/oprt/**: Contains the **step-by-step content pages** for the "Operations" virtual station (`oprt-001.html`, `oprt-002.html`, etc.) and its specific navigation header (`oprt_header.html`).
    -   **/pages/envr/**: (Example) Contains the content pages and header for a future "Environment" virtual station.
    -   `_footer.html`: The **shared footer** file used on all content pages.
-   `index.html`: The main **overall landing page** for the entire application (located in the top-level project folder).

---

## 4. How to Edit the Website Content

The website is built from reusable parts (like the header) and individual pages that use them.

### 4.1. The Landing Page for the Website (`index.html`)

This acts as the landing page for the website. It's located in the main project folder (the top level). It is not neccesary to show this page to the users, but if you need a generic page to represent the learn station as a whole then this is where you can do that. The design for this has currently been decided. We can discuss it if needed. You can make temporary changes as below.

-   **To change the main headline and subtitle:**
    Open `index.html` and edit the text inside these tags:
    ```html
    <h1 class="text-5xl font-bold text-white">
        Willkommen bei der Lernfabrik
    </h1>
    <p class="mt-4 text-lg text-gray-300 max-w-md">
        Ihre interaktive Lernumgebung für industrielle Prozesse.
    </p>
    ```

-   **To change the background image:**
    1.  Place your new image in the `/assets/images/` folder.
    2.  In `index.html`, update the `url()` in this line:
    ```html
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('assets/images/deco_image.png');"></div>
    ```

-   **To change the loading status text:**
    Edit the text inside the `<span>` tag:
    ```html
    <span class="text-lg">Place an object to start the learn station</span>
    ```

---

### 4.2. Landing Pages for virtual machines (e.g., `/pages/vrtl/vrtl-001.html`)

Theser are the placeholder pages for the landing page for the virtual machines. The design is still in discussion and not final yet.

    - vrtl-001.html = Mechanical Treatment
    - vrtl-002.html = Partikelvorbehandlung
    - vrtl-003.html = Laserkonvektionierung
    - vrtl-004.html = TGA / Trockenraum

**To change content:** Open the relevant file (e.g., `vrtl-001.html`) and edit the HTML text and image paths directly. You can customize the design and content of these pages as needed.


---

### 4.3. The Header & Navigation (`/pages/oprt/oprt_header.html`)

Each content section (like `oprt`, `envr`) has its own header file that controls the circular navigation for that section's numbered pages.

-   **Icon Styling Method:**
    * Currently, the website uses a **CSS grayscale filter** to automatically make the inactive icons gray. You only need to provide the **color** version of each icon.
    * If you prefer to use **separate gray image files** for the inactive state, you can switch the method:
        1.  Open the `/js/config.js` file.
        2.  Change the line `const USE_GRAYSCALE_FILTER = true;` to `const USE_GRAYSCALE_FILTER = false;`.

-   **To change an icon (using separate gray/green files when `USE_GRAYSCALE_FILTER` is `false`):**
    1.  Place your new **color** (active) icon and **gray** (inactive) icon PNGs in `assets/icons/`.
    2.  Open the relevant header file (e.g., `oprt_header.html`).
    3.  Find the `<a>` tag for the step you want to change.
    4.  Update the `src` (initially gray), `data-inactive-src` (gray path), `data-active-src` (color path), and `alt` attributes of the `<img>` tag inside it.
    ```html
    <a href="/pages/oprt/oprt-002.html" class="nav-tab ...">
        <img src="/assets/icons/oprt_002_gray.png" 
             data-inactive-src="/assets/icons/oprt_002_gray.png" 
             data-active-src="/assets/icons/oprt_002_green.png" 
             alt="Step 2" 
             class="w-12 h-12 ...">
    </a>
    ```

-   **To change an icon (using grayscale filter when `USE_GRAYSCALE_FILTER` is `true`):**
    1.  Place your new **color** icon PNG in `/assets/icons/`.
    2.  Open the relevant header file (e.g., `oprt_header.html`).
    3.  Find the `<a>` tag for the step you want to change.
    4.  Update the `src` attribute to point to the **color** icon. The `data-inactive-src` and `data-active-src` attributes are **still required** by the script but should **both** point to the **color** icon path. Update the `alt` text.
    ```html
    <a href="/pages/oprt/oprt-002.html" class="nav-tab ...">
        <img src="/assets/icons/oprt_002_green.png" 
             data-inactive-src="/assets/icons/oprt_002_green.png" {/* Points to color icon */}
             data-active-src="/assets/icons/oprt_002_green.png" {/* Points to color icon */}
             alt="Step 2" 
             class="w-12 h-12 ...">
    </a>
    ```

-   **To change which page an icon links to:**
    Update the `href` attribute in the `<a>` tag. **Ensure the filename follows the `[section]-XXX.html` pattern** (e.g., `/pages/oprt/oprt-003.html`).

-   **To add or remove a step in the navigation sequence:**
    Simply copy and paste (or delete) an entire `<a>...</a>` block within the `<nav>` tags. Update the `href` and image paths (following the chosen styling method) for any new link. The JavaScript will handle the rest automatically.

---

### 4.4. Main Content Pages (e.g., `/pages/oprt/oprt-001.html`)

This is the template for your main content pages (the ones with the interactive elements). All pages within a section (like `/oprt/`) will follow this structure.

-   **To change the page title (shown in the browser tab):**
    Edit the `<title>...</title>` tag near the top of the file.

-   **To change the main headline and description:**
    Edit the text inside the `<h1 id="main-headline">` and the `<p>` tag that follows it within the first `<section>`.

-   **To change the main image with hotspots:**
    1.  Place your new image in `/assets/images/`.
    2.  Update the `src` attribute in the `<img src="./assets/images/factory.jpg" ...>` tag.
    3.  *Note: The hotspot positions (`top`, `left` percentages in the `style` attribute) will need to be adjusted to match the correct location.*

-   **To change hotspot information:**
    Find the `<button class="hotspot"...>` you want to edit and change the `data-title` (for the popup title) and `data-text` (for the popup description) attributes.
    ```html
    <button class="hotspot ..." data-title="New Title Here" data-text="New description text for the popup.">
        01
    </button>
    ```

-   **To edit the scrolling feature tabs:**
    1.  Find the `<div>` with the `id="tab-container"`.
    2.  Locate the specific `<div class="tab-item ...">` you want to change.
    3.  Edit the text inside the `<h4>` (title) and `<p>` (description) tags within that tab item.
    ```html
    <div class="tab-item ..." data-tab="feature1">
        <h4 class="font-bold text-xl">New Title for Tab 1</h4>
        <p class="text-gray-600">New description for tab 1.</p>
    </div>
    ```

-   **To edit the content that appears when a tab is clicked:**
    1.  Find the `<div>` with the `id="tab-content-container"`.
    2.  Locate the content block (`<div class="tab-content ...">`) with the `data-tab` attribute matching the tab you want to edit (e.g., `data-tab="feature1"`).
    3.  Edit the headlines (`<h2>`), paragraphs (`<p>`), and image thumbnails (`<img>`) inside this specific block as needed.

-   **To change the video for a specific tab:**
    1.  Make sure your new video file (in `.mp4` format, lowercase filename) is in the `/assets/videos/` folder.
    2.  Find the `<div>` with the class `open-video-modal-trigger` inside the correct tab's content block.
    3.  Update the `data-video-src` path to point to your new video file.
    ```html
    <div class="open-video-modal-trigger ..." data-video-src="/assets/videos/new_video_for_this_tab.mp4">
        <img src="..." alt="New Video Thumbnail Description" ...> {/* Optional: Update thumbnail image/alt text */}
    </div>
    ```

---

## 5. How to Create a New Page

Creating a new page within an existing section (like "Operations") is straightforward:

1.  **Duplicate an Existing Page:**
    -   Go to the folder where you want the new page (e.g., `/pages/oprt/`).
    -   Make a copy of an existing file like `oprt-001.html`.

2.  **Rename the New File:**
    -   Rename the copy using lowercase letters and hyphens (e.g., `oprt-new-process.html`).

3.  **Link the Correct Header:**
    -   Open the new file. At the top, find the `<div id="header-placeholder">`.
    -   Ensure the `data-header-src` path points to the correct header for this section (e.g., `/pages/oprt/oprt_header.html`). This should already be correct if you duplicated a file from the same folder.
    ```html
    <div id="header-placeholder" data-header-src="/pages/oprt/oprt_header.html"></div>
    ```

4.  **Update All Content:**
    -   Go through the new file and change the `<title>`, main headline, description, images, hotspot info, tab content, and video paths as described in section 2.3.

5.  **Add Link in Header:**
    -   Open the relevant header file (e.g., `/pages/oprt/oprt_header.html`).
    -   Decide where the new step fits in the sequence.
    -   Add a new `<a>...</a>` block for the icon, making sure the `href` points to your new file name (e.g., `href="/pages/oprt/oprt-new-process.html"`). Ensure you have the corresponding icon images ready in `/assets/icons/`.


---

## 6. Note on NFC Trigger Integration

This website is designed to be navigated partly via external triggers, like placing an object with an NFC tag on the station. When configuring these triggers:

-   The URL should point to the specific content page you want to launch.
-   Use **root-relative paths** starting with `/` to ensure the link works reliably.
-   **Example:** To start the "Operations" process at step 1, the NFC tag should trigger the URL: `/pages/oprt/oprt-001.html`. To start at step 3, it would trigger `/pages/oprt/oprt-003.html`.
-   The landing pages in the `/pages/vrtl/` folder can also be triggered if you want to show a general intro screen for a machine before the user proceeds to a specific step. For example: `/pages/vrtl/vrtl-001.html`.

Following the consistent naming convention is crucial for these triggers to function reliably.

---

## 7. Configuring the Base Path (Important for Deployment)

The website uses a configuration file (`/js/config.js`) to manage the base URL path, ensuring that links to assets (CSS, JS, images) work correctly in different deployment environments (local server, GitHub Pages, custom server).

**File:** `/js/config.js`

```javascript
// Define the base path for your website.
// Examples:
//   - For GitHub Pages: '/Lebaz-Lernstation/'
//   - For deploying to the root of your own domain: '/'
//   - For deploying to a subdirectory 'my-app' on your own domain: '/my-app/'

const BASE_PATH = '/Lebaz-Lernstation/';
```

**How to Use:**

-   **Local Development (using `python -m http.server`):**
    * Change `BASE_PATH` to `'/'`.
    * Access the site at `http://localhost:8000`.
-   **GitHub Pages Deployment (on `testing` branch):**
    * Ensure `BASE_PATH` is set to `'/[Your-Repository-Name]/'` (e.g., `'/Lebaz-Lernstation/'`).
-   **Deploying to Your Own Server:**
    * If deploying to the **root** of a domain (e.g., `www.yourdomain.com`), set `BASE_PATH` to `'/'`.
    * If deploying to a **subdirectory** (e.g., `www.yourdomain.com/learn-app/`), set `BASE_PATH` to `'/learn-app/'`.

**Important:** You **only need to edit this one line** in `js/config.js` when changing where the website is hosted. All links within the HTML files should remain relative to the project root (e.g., `assets/css/custom.css`, `js/layout-loader.js`).