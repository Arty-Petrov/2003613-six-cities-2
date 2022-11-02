import got from 'got';
import TSVFileWriter from '../common/file-writer/file-writer.js';
import CityGenerator from '../common/mock-generator/cities-generator.js';
import UserGenerator from '../common/mock-generator/user-generator.js';
import OfferGenerator from '../common/mock-generator/offer-generator.js';
import CommentGenerator from '../common/mock-generator/comment-generator.js';
import { MockPaths } from '../const/index.js';
import {MockData} from '../types/mock-data.type.js';
import {CliCommandInterface} from './cli-command.interface.js';

const COMMENTS_RATIO = 5;
const USERS_RATIO = 0.25;

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, dist, url] = parameters;
    const baseCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }
    const genQueue = [
      {
        count: 1,
        generatorString: new CityGenerator(this.initialData),
        tsvFileWriter: new TSVFileWriter(dist.trim() + MockPaths.City),
        outputName: MockPaths.City,
      },
      {
        count: baseCount * USERS_RATIO,
        generatorString: new UserGenerator(this.initialData),
        tsvFileWriter: new TSVFileWriter(dist.trim() + MockPaths.User),
        outputName: MockPaths.User,
      },
      {
        count: baseCount,
        generatorString: new OfferGenerator(this.initialData),
        tsvFileWriter: new TSVFileWriter(dist.trim() + MockPaths.Offer),
        outputName: MockPaths.Offer,
      },
      {
        count: baseCount * COMMENTS_RATIO,
        generatorString: new CommentGenerator(this.initialData),
        tsvFileWriter: new TSVFileWriter(dist.trim() + MockPaths.Comment),
        outputName: MockPaths.Comment,
      },
    ];

    for (const item of genQueue) {
      for (let i = 0; i < item.count; i++) {
        await item.tsvFileWriter.write(item.generatorString.generate());
      }
      console.log(`File ${item.outputName} was created.`);
    }
  }
}
