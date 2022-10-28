export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),

  AuthTokenServiceInterface: Symbol.for('AuthTokenServiceInterface'),
  AuthTokenModel: Symbol.for('AuthTokenModel'),
  AuthTokenController: Symbol.for('AuthTokenController'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),

  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CityModel: Symbol.for('CityModel'),
  CityController: Symbol.for('CityController'),

  FeatureServiceInterface: Symbol.for('FeatureServiceInterface'),
  FeatureModel: Symbol.for('FeatureModel'),
  FeatureController: Symbol.for('FeatureController'),
} as const;
