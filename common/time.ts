export const timestampStringToLocaleDateString = (
  timestampString: string | null
) => {
  if (timestampString === null) {
    return "";
  }

  const localeString = new Date(timestampString).toLocaleDateString();
  return localeString;
};
