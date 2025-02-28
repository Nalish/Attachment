//Question one
function getUsername(username: string | null): string | null {
    if (username !== null) {
        return `User: ${username}`
    } else {
        return 'Guest'
    }
}
const result1 = getUsername("Alice")
console.log(result1);
const result2 = getUsername(null)
console.log(result2);

//Question Two
type Direction="up" |"down" | "left"| "right";
function move(direction: Direction, distance: number) {
    // Move the specified distance in the given direction
    return `You moved ${direction} in ${distance}`
  }
  move("up",20);
  console.log(move("left",20))



  export function validateUsername(username: string | null): boolean {
    if(typeof username === 'string'){
      return username.length > 5
    }else{
      return false
    }
  }
  
