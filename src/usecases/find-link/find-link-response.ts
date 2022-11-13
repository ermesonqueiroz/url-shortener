import { Either } from '../../common/either';
import { LinkData } from '../../entities/link/link-data';
import { CannotFindLinkError } from '../errors/cannot-find-link-error';

export type FindLinkResponse = Either<CannotFindLinkError, LinkData>;
