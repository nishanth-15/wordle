export async function getWordOfTheDay(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching words list:", err);
    return [];
  }
}
