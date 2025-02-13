let str;
//Question one
function is_string(){
    return typeof testData =="string"
}
console.log(is_string('w3resource'));
console.log(is_string([1, 2, 4, 0]))


//Question 2
function is_Blank(){
    return str.trim ==="";
}

//Question three-split a string and convert it to an array of words.
function string_to_array(str){
    return str.split(" ")

}
console.log(string_to_array("Sharon Naliaka"))

//Question four-Extract Characters
function truncate_string(str,n){
return str.slice("",n);
}
console.log(truncate_string("Anita is cooking",4));

//Question five-Abbreviate names
str="Sharon Naliaka"
function abbrev_name(){
    str.split(' ');
    let lastWord= str.pop();

    let abbrev_lastWord =lastWord.charAt(0).toUpperCase() + '.';
    return[str, abbrev_lastWord].join(' ');
}
 
//Question six-Hide Email Address
function protect_email(email) {
    let [user, domain] = email.split('@');
    let hiddenUser = user.slice(0, 5) + "..."; 
    return hiddenUser + "@" + domain; 
}

//Question seven-parameterize a string
function string_parameterize(str) {
    return str
        str.toLowerCase() 
        str.replace(/[^\w\s]/g, '') 
        str.trim() 
        str.replace(/\s+/g, '-'); 

}
//Question eight-capitalize first letter
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//Question nine-capitalize each word
function capitalize(){
    return str.charAt(O).toUpperCase() + str.slice(1);
}
//question 10-0. Swap Case
function swapCase(str) {
    return str
        .split('') 
        .map(char => 
            char === char.toUpperCase() 
                ? char.toLowerCase()  
                : char.toUpperCase()  
        )
        .join(''); 
}
//Questiob 11-Turn a string to camel case
function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())
}
//Questio 12-uncamelizing a string
function uncamelize(str, separator = ' ') {
    return str
        .replace(/([a-z])([A-Z])/g, `$1${separator}$2`)
        .toLowerCase(); 
}
//Question 13-repeats a string
function repeatString(str, n) {
    return str.repeat(n);
}

//Question 14-insert a string into another string in a given position
function insertString(mainStr, insertStr, position) {
    if (position > mainStr.length) position = mainStr.length;
    return mainStr.slice(0, position) + insertStr + mainStr.slice(position);
}

//Question 15-Humanizes the format
function humanize_format(num) {

    let lastDigit = num % 10,  
        lastTwoDigits = num % 100;  

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return num + "th"; 
    }

}
//Question 16-. Truncate String with Ellipsis
function text_truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "..."; 
}
//Question 17-Count strings into chunks
function string_chop(str, chunkSize) {
    if (chunkSize <= 0) return []; 
    let result = [];
    for (let i = 0; i < str.length; i += chunkSize) {
        result.push(str.slice(i, i + chunkSize)); 
    }
    return result;
}
//Question 18-Count substring occurences
function countOccurrences(str, subStr) {
    if (!subStr) return 0; 

    let count = 0;
    let pos = str.indexOf(subStr);

    while (pos !== -1) {
        count++;
        pos = str.indexOf(subStr, pos + subStr.length);
    }
}

    //Question 19-Reverse Binary Representation
    function reverseBinary(num) {
        let binaryStr = num.toString(2); 
        let reversedBinaryStr = binaryStr.split('').reverse().join('');
        return parseInt(reversedBinaryStr, 2);
    }
    
//Question 20 -Pad String to Length
function padString(str, length, char = " ") {
    if (str.length >= length) return str; 
    let padding = char.repeat(length - str.length); 
    return str + padding;
}

