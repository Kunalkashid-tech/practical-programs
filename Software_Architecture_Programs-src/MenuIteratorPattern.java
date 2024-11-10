package Software_Architecture_Programs;

import java.util.ArrayList;
import java.util.List;

class MenuItem {
    private String name;
    private String description;
    private boolean vegetarian;
    private double price;

    public MenuItem(String name, String description, boolean vegetarian, double price) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return name + ": " + description + " (Vegetarian: " + vegetarian + ", Price: $" + price + ")";
    }
}

interface MenuIterator {
    boolean hasNext();
    MenuItem next();
}

class BreakfastMenuIterator implements MenuIterator {
    private List<MenuItem> items;
    private int position = 0;

    public BreakfastMenuIterator(List<MenuItem> items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return position < items.size();
    }

    @Override
    public MenuItem next() {
        return items.get(position++);
    }
}

class LunchMenuIterator implements MenuIterator {
    private MenuItem[] items;
    private int position = 0;

    public LunchMenuIterator(MenuItem[] items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return position < items.length && items[position] != null;
    }

    @Override
    public MenuItem next() {
        return items[position++];
    }
}

class DinnerMenuIterator implements MenuIterator {
    private List<MenuItem> items;
    private int position = 0;

    public DinnerMenuIterator(List<MenuItem> items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return position < items.size();
    }

    @Override
    public MenuItem next() {
        return items.get(position++);
    }
}

interface Menu {
    MenuIterator createIterator();
}

// Concrete BreakfastMenu
class BreakfastMenu implements Menu {
    private List<MenuItem> menuItems;

    public BreakfastMenu() {
        menuItems = new ArrayList<>();
        addItem("Pancakes", "Pancakes with syrup", true, 5.99);
        addItem("Eggs", "Eggs with toast", false, 3.99);
        addItem("Fruit Salad", "Fresh fruit salad", true, 4.99);
    }

    public void addItem(String name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        menuItems.add(menuItem);
    }

    @Override
    public MenuIterator createIterator() {
        return new BreakfastMenuIterator(menuItems);
    }
}

class LunchMenu implements Menu {
    private static final int MAX_ITEMS = 3;
    private int numberOfItems = 0;
    private MenuItem[] menuItems;

    public LunchMenu() {
        menuItems = new MenuItem[MAX_ITEMS];
        addItem("Burger", "Beef burger with fries", false, 8.99);
        addItem("Caesar Salad", "Caesar salad with chicken", false, 7.99);
        addItem("Veggie Wrap", "Wrap with grilled veggies", true, 6.99);
    }

    public void addItem(String name, String description, boolean vegetarian, double price) {
        if (numberOfItems >= MAX_ITEMS) {
            System.err.println("Sorry, menu is full! Can't add item to lunch menu");
        } else {
            menuItems[numberOfItems] = new MenuItem(name, description, vegetarian, price);
            numberOfItems++;
        }
    }

    @Override
    public MenuIterator createIterator() {
        return new LunchMenuIterator(menuItems);
    }
}

class DinnerMenu implements Menu {
    private List<MenuItem> menuItems;

    public DinnerMenu() {
        menuItems = new ArrayList<>();
        addItem("Steak", "Steak with mashed potatoes", false, 14.99);
        addItem("Pasta", "Pasta with marinara sauce", true, 12.99);
        addItem("Soup", "Soup of the day", true, 6.99);
    }

    public void addItem(String name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        menuItems.add(menuItem);
    }

    @Override
    public MenuIterator createIterator() {
        return new DinnerMenuIterator(menuItems);
    }
}

class Waiter {
    private Menu breakfastMenu;
    private Menu lunchMenu;
    private Menu dinnerMenu;

    public Waiter(Menu breakfastMenu, Menu lunchMenu, Menu dinnerMenu) {
        this.breakfastMenu = breakfastMenu;
        this.lunchMenu = lunchMenu;
        this.dinnerMenu = dinnerMenu;
    }

    public void printMenu() {
        MenuIterator breakfastIterator = breakfastMenu.createIterator();
        MenuIterator lunchIterator = lunchMenu.createIterator();
        MenuIterator dinnerIterator = dinnerMenu.createIterator();

        System.out.println("MENU\n----\nBREAKFAST");
        printMenu(breakfastIterator);
        System.out.println("\nLUNCH");
        printMenu(lunchIterator);
        System.out.println("\nDINNER");
        printMenu(dinnerIterator);
    }

    private void printMenu(MenuIterator iterator) {
        while (iterator.hasNext()) {
            MenuItem menuItem = iterator.next();
            System.out.println(menuItem);
        }
    }
}

public class MenuIteratorPattern {
    public static void main(String[] args) {
        Menu breakfastMenu = new BreakfastMenu();
        Menu lunchMenu = new LunchMenu();
        Menu dinnerMenu = new DinnerMenu();

        Waiter waiter = new Waiter(breakfastMenu, lunchMenu, dinnerMenu);

        waiter.printMenu();
    }
}
