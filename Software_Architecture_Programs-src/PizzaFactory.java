package Software_Architecture_Programs;

abstract class Pizza {
 String name;

 void prepare() {
     System.out.println("Preparing " + name);
 }

 void bake() {
     System.out.println("Baking " + name);
 }

 void cut() {
     System.out.println("Cutting " + name);
 }

 void box() {
     System.out.println("Boxing " + name);
 }

 public String getName() {
     return name;
 }
}

class NyStyleCheesePizza extends Pizza {
 public NyStyleCheesePizza() {
     name = "NY Style Cheese Pizza";
 }
}

class ChicagoStyleCheesePizza extends Pizza {
 public ChicagoStyleCheesePizza() {
     name = "Chicago Style Cheese Pizza";
 }
}

abstract class PizzaStore {

 public Pizza orderPizza(String type) {
     Pizza pizza = createPizza(type);

     pizza.prepare();
     pizza.bake();
     pizza.cut();
     pizza.box();

     return pizza;
 }

 protected abstract Pizza createPizza(String type);
}

class NyPizzaStore extends PizzaStore {
 @Override
 protected Pizza createPizza(String type) {
     if (type.equals("cheese")) {
         return new NyStyleCheesePizza();
     } else {
         return null;
     }
 }
}

class ChicagoPizzaStore extends PizzaStore {
 @Override
 protected Pizza createPizza(String type) {
     if (type.equals("cheese")) {
         return new ChicagoStyleCheesePizza();
     } else {
         return null;
     }
 }
}

public class PizzaFactory {
 public static void main(String[] args) {
     PizzaStore nyStore = new NyPizzaStore();
     PizzaStore chicagoStore = new ChicagoPizzaStore();

     Pizza pizza = nyStore.orderPizza("cheese");
     System.out.println("Ordered a " + pizza.getName() + "\n");

     pizza = chicagoStore.orderPizza("cheese");
     System.out.println("Ordered a " + pizza.getName() + "\n");
 }
}

