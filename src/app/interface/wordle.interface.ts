export interface DictionaryI {
    dictionary: string[]
}

export interface GuessResponseI {
    guesses: GuessScoreI[]
    verdict: number
    guessesRemaining: number

}

export interface GuessScoreI {
    Word: string
    Score: number[]
}

export interface RulesI {
    length_word: number
    total_guesses: number
}

