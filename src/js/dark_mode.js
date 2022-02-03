export function darkModer(btn, theme) {
    const PREFERS_DARK_SCHEME = window.matchMedia('(prefers-color-scheme: dark)'),
        $btn = document.getElementById(btn);
    const btnContentDarkTheme = () => {
        return `
            <svg aria-label="Sun icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M1810,5071c-381-125-719-327-1006-604c-232-223-388-434-526-710C-223,2750-32,1564,761,769C1263,265,1960-12,2660,13   c548,20,1015,179,1455,496c472,339,815,837,975,1415c35,128,36,147,11,203c-26,57-84,87-156,81c-44-4-64-13-119-54   c-158-116-259-179-381-239c-283-138-527-195-839-195c-515,0-993,197-1356,559c-367,367-565,841-564,1356c1,443,131,839,380,1158   c63,81,81,134,65,189c-23,76-93,129-168,127C1942,5109,1873,5091,1810,5071z M1526,4498c-78-187-133-397-156-598   c-14-123-14-410,0-525c94-767,564-1432,1245-1764c314-154,585-219,940-228c356-9,626,42,964,184c57,24,106,41,109,39   c8-8-120-213-199-319c-440-591-1099-927-1819-927c-505,0-948,147-1354,448c-275,205-510,490-669,810c-159,321-229,624-229,987   c1,315,45,554,154,830c163,413,462,784,833,1032c71,48,212,132,222,133C1568,4600,1549,4554,1526,4498z"/>
                </g>
            </svg>
            Dark Mode
        `;
    }, 
        btnContentLightTheme = () => {
            return `
            <svg aria-label="Moon icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M2495,5106c-39-18-70-48-92-89c-16-29-18-65-18-339v-306l30-43c37-52,86-79,145-79s108,27,145,79l30,43v306   c0,302,0,308-23,347C2668,5103,2567,5140,2495,5106z"/>
                    <path d="M792,4399c-95-47-123-156-64-251c11-18,110-121,219-229c147-145,208-199,236-208c136-45,267,92,217,226   c-16,41-416,441-465,464C883,4425,845,4425,792,4399z"/>
                    <path d="M4185,4401c-49-23-449-424-465-464c-24-65-5-141,46-189c50-47,96-57,169-37c31,9,79,50,238,208c109,108,210,215,224,238   C4482,4301,4333,4473,4185,4401z"/>
                    <path d="M2440,3840c-611-55-1102-551-1160-1172c-41-453,183-918,567-1174c543-361,1262-265,1679,224c186,218,288,457,313,734   c65,699-462,1322-1174,1388c-60,5-117,9-125,9C2532,3848,2487,3844,2440,3840z M2823,3456c316-95,536-314,634-633   c25-81,27-101,27-263s-2-182-27-263c-51-166-134-304-248-413c-110-104-230-173-386-221c-81-25-101-27-263-27s-182,2-263,27   c-319,98-536,315-634,634c-25,81-27,101-27,263s2,182,27,263c106,345,353,572,708,652c45,10,108,14,214,11   C2712,3483,2749,3478,2823,3456z"/>
                    <path d="M144,2731c-17-4-44-16-60-25c-112-66-104-244,13-302c35-17,63-19,345-19h306l43,30c52,37,79,86,79,145s-27,108-79,145   l-43,30l-286,2C304,2738,161,2735,144,2731z"/>
                    <path d="M4383,2731c-77-19-133-92-133-173c0-57,27-106,79-143l43-30h306c302,0,308,0,347,23c61,35,90,84,90,152s-29,117-90,152   c-39,22-47,23-325,25C4543,2738,4400,2735,4383,2731z"/>
                    <path d="M1181,1408c-42-12-419-379-458-445c-62-106-1-240,120-260c73-12,99,7,326,231c117,116,219,225,227,243c27,63,14,135-34,187   C1313,1416,1255,1430,1181,1408z"/>
                    <path d="M3800,1398c-77-39-114-121-90-201c10-34,50-81,218-251c254-256,289-276,392-224c77,39,114,121,90,201c-10,34-50,81-218,251   C3938,1430,3903,1450,3800,1398z"/>
                    <path d="M2480,851c-19-10-48-37-65-60l-30-43V442c0-302,0-308,23-347c35-61,84-90,152-90s117,29,152,90c23,39,23,45,23,347v306   l-30,43c-37,52-86,79-145,79C2535,870,2499,862,2480,851z"/>
                </g>
            </svg>
            Ligh Mode
            `;
        };
    if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "dark-theme");
        } else {
            localStorage.setItem("theme", "light-theme");
        }
    }
    if (localStorage.getItem("theme") === "dark-theme") {
        document.body.classList.add('dark-theme');
        $btn.innerHTML = btnContentLightTheme();
    } else {
        document.body.classList.remove('dark-theme');
        $btn.innerHTML = btnContentDarkTheme();
    };
    $btn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem("theme", "light-theme");
            $btn.innerHTML = btnContentDarkTheme();
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem("theme", "dark-theme");
            $btn.innerHTML = btnContentLightTheme();
        }
    });
};