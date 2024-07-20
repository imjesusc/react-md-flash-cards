export interface MdSection {
  title: string;
  content: string;
}
export function extractMdSections(md: string): MdSection[] {
  // Expresión regular para encontrar los subtítulos de nivel ## y su contenido
  const regex = /##\s(.+?)\n\n((?:.|\n)*?)(?=\n##\s|\n*$)/g;
  const sections = [];
  let match;

  while ((match = regex.exec(md)) !== null) {
    const title = match[1].trim();
    const content = match[2].trim();
    sections.push({ title, content });
  }

  return sections;
}
