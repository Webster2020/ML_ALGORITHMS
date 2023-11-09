//tsc -w app.ts || or tsc -w

// interface Admin {
type Admin = {
  name: string;
  privilages: string[];
};

// interface Employee {
type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privilages: ["server"],
  startDate: new Date(),
};

console.log(e1);

// interception types
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function add(n1: Combinable, n2: Combinable) {
//   return n1 + n2;
// }

// OVERLOAD FUNCTIONS
function add(n1: number, n2: number): number; // overload function (it means: if n1 and n2 are numbers -> return number)
function add(n1: string, n2: string): string;
function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

console.log(add(2, 5));
// console.log(add("3", 8));

// OPTIONAL CHAINING
const fetchUserData = {
  id: "u1",
  name: "Max",
  // job: { title: "CEO", description: "My own comapny" },
};

console.log(fetchUserData?.job?.title);

// NULLISH COALESCING
const userInput = null;
const storedData = userInput ?? "DEFAULT";
console.log(storedData);

type UnknowEmployee = Employee | Admin;

function printEmplyoeeInformation(emp: UnknowEmployee) {
  console.log("Name: " + emp.name);
  if ("privilages" in emp) {
    console.log("Privileges: " + emp.privilages);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}

printEmplyoeeInformation(e1);

class Car {
  drive() {
    console.log("Driving a car...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo... " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }
  // second way (maybe better)
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(2000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")
// );
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi there!";

interface ErrorContainer {
  [prop: string]: string; //key and value must be a string in object
}

const errorBag: ErrorContainer = {
  1: "Dupa", // 1 is ok key because it can be converted to a number
  email: "Not a valid email!",
};
