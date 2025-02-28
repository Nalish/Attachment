type Rectangle = {
    width: number;
    height: number;
}

const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle:Rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};
type Ingredients ={
    name:string;
    quantity:string;
}
type Recipe = {
    title: string;
    instructions: string;
    ingredients:Array<Ingredients>
  };
  
  const processRecipe = (recipe: Recipe) => {
    // Do something with the recipe in here
  };
  
  processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
  });

  type items =[
    "item1","item2","item3"
  ];
  type ShoppingCart = {
    userId: string;
    items:string[];
  };
  
  const processCart = (cart: ShoppingCart) => {
    // Do something with the cart in here
  };
  
  processCart({
    userId: "user123",
    items: ["item1", "item2", "item3"],
  
  });