export function generateSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // remove all non-alphanumeric except space and dashes
    .trim()
    .replace(/\s+/g, "-");
}
