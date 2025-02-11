import chalk from "chalk";

//Question one-Check if a string is a palindrome
const str= "race car";
function checkPalindrome(str){

let str2= str.replace(/\s+/g,'')//removes whitespace


const str3= str2.split('').filter(char => /[a-zA-Z0-9]/.test(char)).join('');

const str1= str3.toLowerCase().split('').reverse().join('');

return str1 === str3.toLowerCase();
}

console.log(checkPalindrome("A man, a plan ,a canal, Panama"));
console.log(checkPalindrome("Was it a car or a cat I saw?"));
console.log(checkPalindrome('Hello World'));


//Question 2-Reverse a string
function reverseString(str){

    return str.split('').reverse().join('');

}
console.log(reverseString(str));

//Question three- Find the longest palindrome substring
function longestPalindromicSubstring(s) { 
    // Your code here
    const s1=s.split("")
    const s2=s.split("").reverse()
    let arr=[]
    for(let i=0; i < s1.length; i++){
        if(s1[i]==s2[i]){
            arr.push(s1[i])
        }
        else{
            continue
        }
       
    }
    return arr.join("")
} 
    // Test Cases 
    console.log(longestPalindromicSubstring('babad')); 
    // Output: 'bab' or 'aba' 
    console.log(longestPalindromicSubstring('cbbd')); 
    // Output: 'bb'

//Question 4-Check if two strings are anagrams
function areAnagrams(){
let name1="silent"
let name2="lISTEN"
   let name =name1.toLowerCase().replace(/\s+/g,'').split('').sort().join('')
   let name3 =name2.toLowerCase().replace(/\s+/g,'').split('').sort().join('')

   return name === name3;
}
console.log(areAnagrams())
//Question five-Removes duplicates from a str
function removeDuplicates(str) {
    let seen = new Set();
    return str
        .split('')
        .filter(function(char) {
            if (!seen.has(char)) {    //checks for characters that were not seen before
                seen.add(char);      // and adds them
                return true;
            }
            return false;
        })
        .join('');
}

console.log(removeDuplicates("programming")); 
console.log(removeDuplicates("hello world"));
console.log(removeDuplicates("aaaaa"));
console.log(removeDuplicates("abcd"));
console.log(removeDuplicates("aabbcc"));


//6. Count Palindromes in a String
function countPalindromes(str) {
    let uniquePalindromes = new Set();

   
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            let substring = str.substring(i, j + 1);
            if (arePalindrome(substring)) {
                uniquePalindromes.add(substring); // Store unique palindromes
            }
        }
    }

    return uniquePalindromes.size; // Count of distinct palindromes
}

//Question 6 Count Palindromes in a String
function arePalindrome(s) {
    return s === s.split('').reverse().join('');
}

// Test Cases
console.log(countPalindromes("ababa")); 
console.log(countPalindromes("racecar")); 
console.log(countPalindromes("aabb")); 
console.log(countPalindromes("a")); 
console.log(countPalindromes("abc"));


//Question seven- Longest Common Prefix

function longestCommonPrefix([word1,word2,word3]){

let word4 =word1.split("");
let word5 =word2.split("");
let word6 =word3.split("");

let output="";

for( let  i=0; i< word1.length && i< word2.length && i< word3.length; i++){
    if(word4[i] === word5[i] && word5[i] === word6[i] && word4[i] === word6[i]){
         output += word1[i];
    }
    else{
        break;
    }
}
return output;
}
console.log(longestCommonPrefix(['flower','flour','flight']));
console.log(longestCommonPrefix(['dog','racecar','car']));
console.log(longestCommonPrefix(['interspecies','interstellar','interstate']));
console.log(longestCommonPrefix(['prefix','prefixes','perform']));
console.log(longestCommonPrefix(['apple','banana','cherry']));

//Question 8 Case insensitive palidrome
function isCaseSensitivePalindrome(value){

let value1= value.toLowerCase().split('').reverse().join('');

let value2= value.charAt(0).toUpperCase() + value1.slice(1);

return value1 === value2.toLowerCase()
}

console.log(isCaseSensitivePalindrome('Aba'));
console.log(isCaseSensitivePalindrome('Racecar'));
console.log(isCaseSensitivePalindrome('Palindrome'));
console.log(isCaseSensitivePalindrome('Racecar'));
console.log(isCaseSensitivePalindrome('Madam'));
console.log(isCaseSensitivePalindrome('Hello'));



