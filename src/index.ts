import * as readline from 'readline';

class Game {
    private secretNumber: number;
    private maxGuesses: number;
    private currentGuessCount: number;
    private rl: readline.Interface;

    constructor(maxGuesses: number = 5) {
        this.maxGuesses = maxGuesses;
        this.secretNumber = this.generateSecretNumber();
        this.currentGuessCount = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.log("Welcome to Guess the Number!");
        console.log(`I'm thinking of a number between 1 and 100. You have ${this.maxGuesses} guesses.`);
    }

    private generateSecretNumber(): number {
        return Math.floor(Math.random() * 100) + 1;
    }

    public start(): void {
        this.promptForGuess();
    }

    private promptForGuess(): void {
        if (this.isGameOver()) {
            console.log(`Game Over! The secret number was ${this.secretNumber}.`);
            this.rl.close();
            return;
        }

        this.rl.question("Enter your guess: ", (answer) => {
            const guessNum = parseInt(answer);

            if (isNaN(guessNum)) {
                console.log("Invalid input. Please enter a number.");
                this.promptForGuess();
                return;
            }

            const result = this.guess(guessNum);
            console.log(result);

            if (guessNum === this.secretNumber) {
                this.rl.close();
            } else {
                this.promptForGuess();
            }
        });
    }

    public guess(num: number): string {
        this.currentGuessCount++;

        if (num === this.secretNumber) {
            return `Congratulations! You guessed the number ${this.secretNumber} in ${this.currentGuessCount} guesses.`;
        } else if (num < this.secretNumber) {
            return `Too low! You have ${this.maxGuesses - this.currentGuessCount} guesses left.`;
        } else {
            return `Too high! You have ${this.maxGuesses - this.currentGuessCount} guesses left.`;
        }
    }

    public isGameOver(): boolean {
        return this.currentGuessCount >= this.maxGuesses;
    }

    public getSecretNumber(): number {
        return this.secretNumber;
    }
}

// Example usage
const myGame = new Game();
myGame.start();