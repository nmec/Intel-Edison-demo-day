/*

	Crossfade the RGB backlight and display the values

*/
#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

const int colorR = 255;
const int colorG = 0;
const int colorB = 0;

const int potentiometer = A0;


void setup() {
	// set up the LCD's number of columns and rows:
	lcd.begin(16, 2);

	lcd.setRGB(colorR, colorG, colorB);

	// Print a message to the LCD.
	lcd.print("Hiya Edison");

	pinMode(potentiometer, INPUT);

	delay(1000);
}

void displayRGB(int r, int g, int b) {
	lcd.setCursor(0, 1);
	lcd.print("R:");
	lcd.print(r);

	lcd.print(" G:");
	lcd.print(g);

	lcd.print(" B:");
	lcd.print(b);
}

void loop() {

	int potVal = analogRead(potentiometer);

	int speed = 5;

	for (int red = 255; red > 0; --red)	{

		int green = map( red, 255, 0, 0, 255 );
		lcd.setRGB(red, green, 0);

		displayRGB(red, green, 0);

		delay(speed);
	}

	for (int green = 255; green > 0; --green)	{

		int blue = map( green, 255, 0, 0, 255 );
		lcd.setRGB(0, green, blue);

		displayRGB(0, green, blue);

		delay(speed);
	}

	for (int blue = 255; blue > 0; --blue)	{

		int red = map( blue, 255, 0, 0, 255 );
		lcd.setRGB(red, 0, blue);

		displayRGB(red, 0, blue);

		delay(speed);
	}

}