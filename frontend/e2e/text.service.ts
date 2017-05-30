export interface GeneratorConfig {
  lowerCase?: boolean;
  onlyNumbers?: boolean;
  onlyText?: boolean;
}

export class TextService {
  private ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private ALL_LETTERS = 52;
  private ALL_DIGITS = -10;
  private LOWER_LETTERS = 26;

  generateText(length: number, config?: GeneratorConfig) {
    let text = '';
    const newAlphabet = this.alphabetSlice(config);
    for (let i = 0; i < length; i++) {
      text += newAlphabet.charAt(Math.floor(Math.random() * newAlphabet.length));
    }

    return text;
  }

  private alphabetSlice(config: GeneratorConfig): string {
    console.log(this.ALPHABET);
    if (config.onlyNumbers) {
      return this.ALPHABET.slice(this.ALL_LETTERS);
    } else if (config.onlyText && config.lowerCase) {
      return this.ALPHABET.slice(0, this.ALL_DIGITS).slice(this.LOWER_LETTERS);
    } else if (config.onlyText) {
      return this.ALPHABET.slice(0, this.ALL_DIGITS);
    } else if (config.lowerCase) {
      return this.ALPHABET.slice(this.LOWER_LETTERS);
    }

    return this.ALPHABET;
  }
}
