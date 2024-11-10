package Software_Architecture_Programs;

interface Command {
 void execute();
 void undo();
}

class LightOnCommand implements Command {
 private Light light;

 public LightOnCommand(Light light) {
     this.light = light;
 }

 public void execute() {
     light.on();
 }

 public void undo() {
     light.off();
 }
}

class LightOffCommand implements Command {
 private Light light;

 public LightOffCommand(Light light) {
     this.light = light;
 }

 public void execute() {
     light.off();
 }

 public void undo() {
     light.on();
 }
}

class FanOnCommand implements Command {
 private Fan fan;

 public FanOnCommand(Fan fan) {
     this.fan = fan;
 }

 public void execute() {
     fan.on();
 }

 public void undo() {
     fan.off();
 }
}

class FanOffCommand implements Command {
 private Fan fan;

 public FanOffCommand(Fan fan) {
     this.fan = fan;
 }

 public void execute() {
     fan.off();
 }

 public void undo() {
     fan.on();
 }
}

class Light {
 public void on() {
     System.out.println("The light is on.");
 }

 public void off() {
     System.out.println("The light is off.");
 }
}

class Fan {
 public void on() {
     System.out.println("The fan is on.");
 }

 public void off() {
     System.out.println("The fan is off.");
 }
}

class RemoteControl {
 private Command[] onCommands;
 private Command[] offCommands;
 private Command undoCommand;

 public RemoteControl() {
     onCommands = new Command[2];
     offCommands = new Command[2];

     Command noCommand = new NoCommand();
     for (int i = 0; i < 2; i++) {
         onCommands[i] = noCommand;
         offCommands[i] = noCommand;
     }
     undoCommand = noCommand;
 }

 public void setCommand(int slot, Command onCommand, Command offCommand) {
     onCommands[slot] = onCommand;
     offCommands[slot] = offCommand;
 }

 public void onButtonWasPressed(int slot) {
     onCommands[slot].execute();
     undoCommand = onCommands[slot];
 }

 public void offButtonWasPressed(int slot) {
     offCommands[slot].execute();
     undoCommand = offCommands[slot];
 }

 public void undoButtonWasPressed() {
     undoCommand.undo();
 }
}

class NoCommand implements Command {
 public void execute() {
     System.out.println("No command assigned to this slot.");
 }

 public void undo() {
     System.out.println("No command to undo.");
 }
}

public class RemoteControlTest {
 public static void main(String[] args) {
     RemoteControl remoteControl = new RemoteControl();

     Light livingRoomLight = new Light();
     Fan ceilingFan = new Fan();

     LightOnCommand lightOn = new LightOnCommand(livingRoomLight);
     LightOffCommand lightOff = new LightOffCommand(livingRoomLight);
     FanOnCommand fanOn = new FanOnCommand(ceilingFan);
     FanOffCommand fanOff = new FanOffCommand(ceilingFan);

     remoteControl.setCommand(0, lightOn, lightOff);
     remoteControl.setCommand(1, fanOn, fanOff);

     System.out.println("Pressing Light On button:");
     remoteControl.onButtonWasPressed(0);
     System.out.println("Pressing Light Off button:");
     remoteControl.offButtonWasPressed(0);
     System.out.println("Pressing Undo button:");
     remoteControl.undoButtonWasPressed();

     System.out.println("Pressing Fan On button:");
     remoteControl.onButtonWasPressed(1);
     System.out.println("Pressing Fan Off button:");
     remoteControl.offButtonWasPressed(1);
     System.out.println("Pressing Undo button:");
     remoteControl.undoButtonWasPressed();
 }
}
