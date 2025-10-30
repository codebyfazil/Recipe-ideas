export async function fetchRecipes(type, value) {
  const base = "https://www.themealdb.com/api/json/v1/1/";
  let url;

  if (type === "category") url = `${base}filter.php?c=${value}`;
  else if (type === "area") url = `${base}filter.php?a=${value}`;
  else if (type === "ingredient") url = `${base}filter.php?i=${value}`;
  else url = `${base}search.php?s=${value}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.meals || [];
}
