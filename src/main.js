const lda = require('ldawithmorelanguages')
const {
    convert
} = require('html-to-text');
const {
    splitIntoLines
} = require('./extract');

function preprocessText(text) {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '') // Remove emails
        .replace(/[^a-z\s]/g, '') // Remove special characters, numbers, and punctuation
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Trim leading and trailing spaces
}

function removeLongNonEnglishWords(text, maxWordLength = 15) {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z\s]/g, '') // Remove special characters and numbers
        .replace(new RegExp(`\\b[a-z]{${maxWordLength},}\\b`, 'g'), '') // Remove very long words
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim(); // Trim leading/trailing spaces
}

function containsAIRegex(text) {
    const aiRegex = /\b(artificial intelligence|ai|machine learning|neural networks|deep learning|nlp|computer vision|robotics|data science|intelligence)\b/i;
    return aiRegex.test(text);
}

const options = {
    wordwrap: 130,
    // ...
};

const body = convert(document.body.innerHTML, options);
const clean = (str) => removeLongNonEnglishWords(preprocessText(str));
const text = clean(body);

// Extract sentences.
const documents = splitIntoLines(text, 100);

// Run LDA to get terms for 2 topics (5 terms each).
const numOfTopics = 3
const ldaResult = lda(documents, 3, 5);

const scores = ldaResult.map((topic) => {
    const scores = topic.map((term) => containsAIRegex(term.term) ? term.probability : 0);
    const sum = scores.reduce(
        (acc, current) => acc + current,
        0,
    );
    return sum;
})

const sum = scores.reduce(
    (acc, current) => acc + current,
    0,
);

if (sum > 0.1 * (numOfTopics - 1)) {
    document.open('text/html');
    document.write('<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>HAI</title></head><body><h1>Too much fucking AI on the net !!! Too much lies too !!!</h1></body></html>');
    document.close();
}