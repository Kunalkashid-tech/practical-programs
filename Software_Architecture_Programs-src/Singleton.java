package Software_Architecture_Programs;

public class Singleton {
	
    private static volatile Singleton instance;

    private Singleton() {
       
        System.out.println("Singleton instance created.");
    }

    public static Singleton getInstance() {
        if (instance == null) { // First check (no locking)
            synchronized (Singleton.class) {
                if (instance == null) { 
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    public void showMessage() {
        System.out.println("Hello from Singleton! Hashcode: " + instance.hashCode());
    }

    public static void main(String[] args) {
        // Create multiple threads to test the Singleton pattern
        Thread thread1 = new Thread(new Runnable() {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance();
                singleton.showMessage();
            }
        });

        Thread thread2 = new Thread(new Runnable() {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance();
                singleton.showMessage();
            }
        });

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
