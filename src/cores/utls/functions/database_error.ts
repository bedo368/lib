import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ServiceUnavailableException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

/**
 * Handles database errors and converts them into user-friendly messages.
 */
export function handleDatabaseError(error: any) {
  if (error instanceof QueryFailedError) {
    const { code, detail, message } = error as any;

    switch (code) {
      /** 
       * ✅ UNIQUE VIOLATION (Duplicate Key)
       * Happens when trying to insert a duplicate unique field (e.g., username, email).
       */
      case '23505':
        return new ConflictException(`Duplicate entry: ${extractConstraintName(detail, message)}`);

      /** 
       * ✅ FOREIGN KEY VIOLATION 
       * Happens when trying to insert a non-existent foreign key (e.g., invalid user_id in orders table).
       */
      case '23503':
        return new BadRequestException('Invalid reference: The related entity does not exist.');

      /** 
       * ✅ STRING TOO LONG
       * Happens when inserting a string longer than the defined column limit.
       */
      case '22001':
        return new BadRequestException('Input value is too long for a field.');

      /** 
       * ✅ NOT NULL VIOLATION
       * Happens when trying to insert NULL into a required (NOT NULL) column.
       */
      case '23502':
        return new BadRequestException(`Missing required field: ${extractColumnName(message)}`);

      /** 
       * ✅ INVALID DATE FORMAT
       * Happens when inserting an incorrectly formatted date (e.g., "abc" instead of "YYYY-MM-DD").
       */
      case '22007':
        return new BadRequestException('Invalid date format. Please use YYYY-MM-DD.');

      /** 
       * ✅ INVALID NUMERIC VALUE
       * Happens when inserting text where a number is expected.
       */
      case '22P02':
        return new BadRequestException('Invalid input type. Please check your data format.');

      /** 
       * ✅ CHECK CONSTRAINT VIOLATION
       * Happens when a value violates a CHECK constraint (e.g., age < 0 in an "age CHECK (age > 0)" constraint).
       */
      case '23514':
        return new BadRequestException('Invalid value: A constraint was violated.');

      /** 
       * ✅ INSUFFICIENT PRIVILEGES
       * Happens when the database user does not have permission to perform an action.
       */
      case '42501':
        return new ForbiddenException('You do not have permission to perform this action.');

      /** 
       * ✅ SYNTAX ERROR
       * Happens when there is a malformed SQL statement.
       */
      case '42601':
        return new InternalServerErrorException('Syntax error in the SQL query.');

      /** 
       * ✅ CONNECTION ISSUES
       * Happens when the database server is unreachable.
       */
      case '08006': // Connection failure
      case '08001': // SQL client unable to establish connection
      case '57P01': // Database shutting down
        return new ServiceUnavailableException('Database connection error. Please try again later.');

      /** 
       * ✅ DEADLOCK DETECTED
       * Happens when two transactions are blocking each other.
       */
      case '40P01':
        return new GatewayTimeoutException('Database deadlock detected. Please retry your request.');

      /** 
       * ✅ SERIALIZATION FAILURE
       * Happens when a transaction cannot complete due to concurrent updates.
       */
      case '40001':
        return new ConflictException('Concurrency conflict. Please try again.');

      /** 
       * ✅ LOCK NOT AVAILABLE
       * Happens when a row is locked and cannot be updated.
       */
      case '55P03':
        return new ConflictException('The requested resource is locked. Try again later.');

      /** 
       * ✅ UNAUTHORIZED ACCESS
       * Happens when a user tries to access a restricted database resource.
       */
      case '28000': // Invalid authorization specification
      case '28P01': // Invalid password
        return new UnauthorizedException('Invalid credentials. Access denied.');

      /** 
       * ✅ TRANSACTION ROLLBACK
       * Happens when a transaction fails and is rolled back.
       */
      case '40002':
        return new InternalServerErrorException('Transaction failed and was rolled back.');

      /** 
       * ✅ DEFAULT HANDLER FOR UNKNOWN ERRORS
       */
      default:
        return new InternalServerErrorException(`Database error: ${message}`);
    }
  }

  // Handle other unexpected errors
  return new InternalServerErrorException('An unexpected database error occurred.');
}

/**
 * Extracts the column name from a PostgreSQL error message.
 */
function extractColumnName(message: string): string {
  const match = message.match(/column "(.*?)"/);
  return match ? match[1] : 'unknown field';
}

/**
 * Extracts the constraint name from an error detail message.
 */
function extractConstraintName(detail: string, message: string): string {
  if (detail) {
    const match = detail.match(/constraint "(.*?)"/);
    return match ? match[1] : 'a unique field';
  }
  return extractColumnName(message);
}
