/*

	Flash an LED with an interval determined by a potentiometer.

*/

int led = 13;
const int potentiometer = A0;

void setup() {

	pinMode(led, OUTPUT);
	Serial.begin(9600);
	pinMode(potentiometer, INPUT);
}

void loop() {

	int potVal = analogRead(potentiometer);
    Serial.println(potVal);

    int mappedVal = map( potVal, 0, 1024, 15, 400 );

	digitalWrite(led, HIGH);
	delay(mappedVal);

	digitalWrite(led, LOW);
	delay(mappedVal);

	digitalWrite(led, HIGH);
	delay(mappedVal);

	digitalWrite(led, LOW);
	delay(1000);
}
