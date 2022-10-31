import { CommentRatingValue } from '../../const/index.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { MockGeneratorInterface } from './mock-generator.interface.js';

export default class CommentGenerator implements MockGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const text = getRandomItem<string>(this.mockData.comments);
    const rating = generateRandomValue(CommentRatingValue.Min, CommentRatingValue.Max).toString();

    return [text, rating,].join('\t');
  }
}
