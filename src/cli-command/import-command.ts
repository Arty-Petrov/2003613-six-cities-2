import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { MockPaths } from '../const/index.js';
import { CityServiceInterface } from '../modules/city/city-service.interface.js';
import { CityModel } from '../modules/city/city.entity.js';
import CityService from '../modules/city/city.service.js';
import CreateCityDto from '../modules/city/dto/create-city.dto.js';
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
import { CommentModel } from '../modules/comment/comment.entity.js';
import CommentService from '../modules/comment/comment.service.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import UserService from '../modules/user/user.service.js';
import { Comment } from '../types/comment.type.js';
import { Offer } from '../types/offer.type.js';
import { User } from '../types/user.type.js';
import { createCity, createComment, createOffer, createUser, getErrorMessage } from '../utils/common.js';
import { getURI } from '../utils/db.js';
import { getRandomItem } from '../utils/random.js';
import { CliCommandInterface } from './cli-command.interface.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private readonly cityService!: CityServiceInterface;
  private readonly userService!: UserServiceInterface;
  private readonly offerService!: OfferServiceInterface;
  private readonly commentService!: CommentServiceInterface;
  private databaseService!: DatabaseInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;
  private cityIdList: string[] = [];
  private userIdList: string[] = [];
  private offerIdList: string[] = [];

  constructor() {
    this.onLineCities = this.onLineCities.bind(this);
    this.onLineUsers = this.onLineUsers.bind(this);
    this.onLineOffers = this.onLineOffers.bind(this);
    this.onLineComments = this.onLineComments.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.commentService = new CommentService(this.logger, CommentModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveCity(city: CreateCityDto): Promise<void> {
    const newCity = await this.cityService.findOrCreate({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });
    this.cityIdList.push(newCity.id);
  }

  private async saveUser(user: User): Promise<void> {
    const newUser = await this.userService.findOrCreate({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
    this.userIdList.push(newUser.id);
  }

  private async saveOffer(offer: Offer): Promise<void> {
    const newOffer = await this.offerService.create({
      ...offer,
      userId: getRandomItem(this.userIdList),
      cityId: getRandomItem(this.cityIdList),
    });
    this.offerIdList.push(newOffer.id);
  }

  private async saveComment(comment: Comment): Promise<void> {
    await this.commentService.create({
      ...comment,
      userId: getRandomItem(this.userIdList),
      offerId: getRandomItem(this.offerIdList),
    });
  }

  private async onLineCities(line: string, resolve: () => void) {
    const city = createCity(line);
    await this.saveCity(city);
    resolve();
  }

  private async onLineUsers(line: string, resolve: () => void) {
    const user = createUser(line);
    await this.saveUser(user);
    resolve();
  }

  private async onLineOffers(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async onLineComments(line: string, resolve: () => void) {
    const comment = createComment(line);
    await this.saveComment(comment);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(
    source: string, login: string, password: string,
    host: string, dbname: string, salt: string
  ): Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    const importQueue = [
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.City),
        onLine: this.onLineCities,
      },
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.User),
        onLine: this.onLineUsers,
      },
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.Offer),
        onLine: this.onLineOffers,
      },
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.Comment),
        onLine: this.onLineComments,
      },
    ];

    for (const item of importQueue) {
      await this.databaseService.connect(uri);
      item.fileReader.on('line', item.onLine);
      item.fileReader.on('end', this.onComplete);

      try {
        await item.fileReader.read();
      } catch (err) {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
      }
    }
  }
}
