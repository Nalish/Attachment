let str;
//Question one
function is_string(){
    return typeof testData =="string"
}
console.log(is_string('w3resource'));
console.log(is_string([1, 2, 4, 0]))


//Question 2

// function is_Blank(){
    
//     let ln=str.length;
//     console.log(ln)
//  }
 
//  is_Blank("Anita")

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



