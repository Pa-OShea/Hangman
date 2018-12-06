
export function getWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

export function doesInclude(word, letter) {
    return word.includes(letter);
}