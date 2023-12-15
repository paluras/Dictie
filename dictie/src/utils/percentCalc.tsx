import levenshteinDistance from "./levensheinDistance.tsx";
import filterAlphabetic from "./filterAlphabetic.tsx"

const percentageFunc = (spokenText: string, givenText:string) => {
    if(spokenText === "") return 0;
    const distance = levenshteinDistance(
        filterAlphabetic(spokenText.toLocaleLowerCase()),
        filterAlphabetic(givenText.toLocaleLowerCase()) // Pass givenText as a prop
      );
    
    
      
      const maxLength = Math.max(spokenText.length, givenText.length);
        const similarity = Math.max(0, (1 - distance / maxLength) * 100);

        return Math.round(similarity);
}

export default percentageFunc;