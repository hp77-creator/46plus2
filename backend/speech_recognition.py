import speech_recognition as sr

# Initialize the speech recognizer
r = sr.Recognizer()

# Define the voice command function
def process_voice_command(command):
    if "book a parking slot" in command:
        # Add code for handling the "book a parking slot" command
        print("Parking slot booking initiated...")
        # Additional code for slot reservation, validation, and storage can be added here
    elif "reserve a parking space" in command:
        # Add code for handling the "reserve a parking space" command
        print("Parking space reservation initiated...")
        # Additional code for space reservation, validation, and storage can be added here
    else:
        print("Invalid command. Please try again.")

if __name__ == "__main__":
    # Record audio from the microphone
    with sr.Microphone() as source:
        print("Listening for voice commands...")
        audio = r.listen(source)

        try:
            # Use the speech recognition library to convert speech to text
            text = r.recognize_google(audio)
            print("Recognized Text:", text)

            # Process the recognized text for voice commands
            process_voice_command(text.lower())

        except sr.UnknownValueError:
            print("Speech recognition could not understand audio.")
        except sr.RequestError as e:
            print("Could not request results from speech recognition service; {0}".format(e))