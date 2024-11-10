package Software_Architecture_Programs;

class CeilingFan {
 private int speed;
 private final int OFF = 0;
 private final int LOW = 1;
 private final int MEDIUM = 2;
 private final int HIGH = 3;

 public CeilingFan() {
     speed = OFF;
 }

 public void high() {
     speed = HIGH;
     System.out.println("Ceiling Fan is on HIGH");
 }

 public void medium() {
     speed = MEDIUM;
     System.out.println("Ceiling Fan is on MEDIUM");
 }

 public void low() {
     speed = LOW;
     System.out.println("Ceiling Fan is on LOW");
 }

 public void off() {
     speed = OFF;
     System.out.println("Ceiling Fan is OFF");
 }

 public int getSpeed() {
     return speed;
 }
}

interface Comand {
 void execute();
 void undo();
}

class CeilingFanHighCommand implements Comand {
 private CeilingFan ceilingFan;
 private int prevSpeed;

 public CeilingFanHighCommand(CeilingFan ceilingFan) {
     this.ceilingFan = ceilingFan;
 }

 public void execute() {
     prevSpeed = ceilingFan.getSpeed();
     ceilingFan.high();
 }

 public void undo() {
     if (prevSpeed == 1) {
         ceilingFan.low();
     } else if (prevSpeed == 2) {
         ceilingFan.medium();
     } else if (prevSpeed == 3) {
         ceilingFan.high();
     } else {
         ceilingFan.off();
     }
 }
}

class CeilingFanMediumCommand implements Comand {
 private CeilingFan ceilingFan;
 private int prevSpeed;

 public CeilingFanMediumCommand(CeilingFan ceilingFan) {
     this.ceilingFan = ceilingFan;
 }

 public void execute() {
     prevSpeed = ceilingFan.getSpeed();
     ceilingFan.medium();
 }

 public void undo() {
     if (prevSpeed == 1) {
         ceilingFan.low();
     } else if (prevSpeed == 2) {
         ceilingFan.medium();
     } else if (prevSpeed == 3) {
         ceilingFan.high();
     } else {
         ceilingFan.off();
     }
 }
}

class CeilingFanLowCommand implements Comand {
 private CeilingFan ceilingFan;
 private int prevSpeed;

 public CeilingFanLowCommand(CeilingFan ceilingFan) {
     this.ceilingFan = ceilingFan;
 }

 public void execute() {
     prevSpeed = ceilingFan.getSpeed();
     ceilingFan.low();
 }

 public void undo() {
     if (prevSpeed == 1) {
         ceilingFan.low();
     } else if (prevSpeed == 2) {
         ceilingFan.medium();
     } else if (prevSpeed == 3) {
         ceilingFan.high();
     } else {
         ceilingFan.off();
     }
 }
}

class CeilingFanOffCommand implements Comand {
 private CeilingFan ceilingFan;
 private int prevSpeed;

 public CeilingFanOffCommand(CeilingFan ceilingFan) {
     this.ceilingFan = ceilingFan;
 }

 public void execute() {
     prevSpeed = ceilingFan.getSpeed();
     ceilingFan.off();
 }

 public void undo() {
     if (prevSpeed == 1) {
         ceilingFan.low();
     } else if (prevSpeed == 2) {
         ceilingFan.medium();
     } else if (prevSpeed == 3) {
         ceilingFan.high();
     } else {
         ceilingFan.off();
     }
 }
}

class RmotCntrl {
 private Comand comand;
 private Comand lastComand;

 public void setComand(Comand comand) {
     this.comand = comand;
 }

 public void pressButton() {
     comand.execute();
     lastComand = comand;
 }

 public void pressUndo() {
     if (lastComand != null) {
         lastComand.undo();
     }
 }
}

public class CeilingFanTest {
 public static void main(String[] args) {
     CeilingFan ceilingFan = new CeilingFan();
     RmotCntrl remote = new RmotCntrl();

     CeilingFanHighCommand fanHigh = new CeilingFanHighCommand(ceilingFan);
     CeilingFanMediumCommand fanMedium = new CeilingFanMediumCommand(ceilingFan);
     CeilingFanLowCommand fanLow = new CeilingFanLowCommand(ceilingFan);
     CeilingFanOffCommand fanOff = new CeilingFanOffCommand(ceilingFan);

     remote.setComand(fanHigh);
     remote.pressButton();
     remote.pressUndo();

     remote.setComand(fanMedium);
     remote.pressButton();
     remote.pressUndo();

     remote.setComand(fanLow);
     remote.pressButton();
     remote.pressUndo();

     remote.setComand(fanOff);
     remote.pressButton();
     remote.pressUndo();
 }
}
