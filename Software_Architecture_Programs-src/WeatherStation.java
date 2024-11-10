package Software_Architecture_Programs;

import java.util.Observable;
import java.util.Observer;

@SuppressWarnings("deprecation")
class WeatherData extends Observable {
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        // Constructor
    }

    @SuppressWarnings("deprecation")
	public void measurementsChanged() {
        setChanged(); 
        notifyObservers(); 
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    public float getTemperature() {
        return temperature;
    }

    public float getHumidity() {
        return humidity;
    }

    public float getPressure() {
        return pressure;
    }
}

@SuppressWarnings("deprecation")
class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;
    private Observable observable;

    public CurrentConditionsDisplay(Observable observable) {
        this.observable = observable;
        observable.addObserver(this); // Add this object as an observer
    }

    @Override
    public void update(Observable obs, Object arg) {
        if (obs instanceof WeatherData) {
            WeatherData weatherData = (WeatherData) obs;
            this.temperature = weatherData.getTemperature();
            this.humidity = weatherData.getHumidity();
            display();
        }
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "°C and " + humidity + "% humidity");
    }
}


public class WeatherStation {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherData);

        weatherData.setMeasurements(25.5f, 65.0f, 1013.1f);
        weatherData.setMeasurements(27.2f, 70.3f, 1012.8f);
        weatherData.setMeasurements(26.7f, 90.0f, 1011.5f);
    }
}
