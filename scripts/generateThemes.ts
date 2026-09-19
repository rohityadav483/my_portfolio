import { generateThemeVariables } from "../src/utils/colorUtils.ts";
import { ThemeOptions, type ThemeOptionType } from "../src/constants/themeOptions.ts";
import fs from 'fs';
import path from 'path';

type ColorProperties = {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
};

type ColorTheme = {
    [themeName in ThemeOptionType]: {
        light: ColorProperties;
        dark: ColorProperties;
    };
};

const COLOR_THEME: ColorTheme = {
    custom: {
        light: { background: '#ffffff', text: '#000000', primary: '#6600ff', secondary: '#1943ff', accent: '#8c00f0' },
        dark: { background: '#000000', text: '#ffffff', primary: '#934cfe', secondary: '#6581ff', accent: '#a855f7' }
    },
    default: {
        light: { background: '#ffffff', text: '#000000', primary: '#6600ff', secondary: '#ff00ff', accent: '#8700f0' },
        dark: { background: '#000000', text: '#ffffff', primary: '#6600ff', secondary: '#ff00ff', accent: '#8700f0' }
    },
    ocean: {
        light: { background: '#faffff', text: '#0a2230', primary: '#007aff', secondary: '#00ffef', accent: '#0050ff' },
        dark: { background: '#000a10', text: '#e8fbff', primary: '#4ca1fe', secondary: '#4cfef3', accent: '#3380ff' }
    },
    forest: {
        light: { background: '#fafffa', text: '#122012', primary: '#00a84f', secondary: '#0fcafe', accent: '#00d97a' },
        dark: { background: '#000904', text: '#e8ffe9', primary: '#00f472', secondary: '#5bdafe', accent: '#33ffaa' }
    },
    sunset: {
        light: { background: '#fffaf4', text: '#2d0d00', primary: '#ff5500', secondary: '#ffc519', accent: '#ffb300' },
        dark: { background: '#0d0400', text: '#fff0e6', primary: '#fe884c', secondary: '#ffd865', accent: '#ffcc33' }
    },
};

async function generateCSS(themes: ColorTheme) {
    let css = '/* Auto-generated theme styles */\n\n';
    for (const themeName of Object.keys(themes) as ThemeOptionType[]) {
        const themeModes = themes[themeName];
        for (const mode of Object.keys(themeModes) as Array<keyof typeof themeModes>) {
            const selector = `.theme-${themeName}.${mode}`;
            const vars = themeModes[mode];
            const themeVars = await generateThemeVariables(vars, mode);
            css += `${selector} {\n`;
            for (const [key, value] of Object.entries(themeVars)) {
                css += `  --${key}: ${value};\n`;
            }
            css += '}\n\n';
        }
    }
    return css;
}

async function generateThemeConstants() {
    let constants = '// Auto-generated theme constants\n\n';
    constants += 'export const ThemeDropdownOptions = [\n';
    for (const themeName of Object.keys(COLOR_THEME) as ThemeOptionType[]) {
        const config = COLOR_THEME[themeName].light;
        const { hexToHsl } = await import("../src/utils/colorUtils.ts");
        try {
            const primaryHsl = await hexToHsl(config.primary);
            const secondaryHsl = await hexToHsl(config.secondary);
            constants += `  {\n`;
            constants += `    name: '${themeName}',\n`;
            constants += `    displayName: '${themeName.charAt(0).toUpperCase() + themeName.slice(1)}',\n`;
            constants += `    primaryColor: 'hsl(${primaryHsl.h}, ${primaryHsl.s}%, ${primaryHsl.l}%)',\n`;
            constants += `    secondaryColor: 'hsl(${secondaryHsl.h}, ${secondaryHsl.s}%, ${secondaryHsl.l}%)',\n`;
            constants += `  },\n`;
        } catch (error) {
            console.warn(`Failed to convert colors for theme ${themeName}:`, error);
        }
    }
    constants += '];\n';
    const constantsDir = path.join(process.cwd(), 'src', 'constants');
    const outputPath = path.join(constantsDir, 'themeDropdownOptions.ts');
    if (!fs.existsSync(constantsDir)) fs.mkdirSync(constantsDir, { recursive: true });
    fs.writeFileSync(outputPath, constants);
    console.log('done themeDropdownOptions.ts');
}

async function main() {
    const cssContent = await generateCSS(COLOR_THEME);
    const stylesDir = path.join(process.cwd(), 'src', 'styles');
    const outputPath = path.join(stylesDir, 'themes.css');
    if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });
    fs.writeFileSync(outputPath, cssContent);
    console.log('done themes.css');
    await generateThemeConstants();
}

await main();